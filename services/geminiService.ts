import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, Section } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder. Please provide a valid API key for the app to function.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

const model = 'gemini-2.5-flash';

const getBasePrompt = (section: Section, topic?: string): string => {
  const base = "أنت مساعد ذكي تربوي ومُلهم اسمه 'حكمة'، صُممت خصيصًا لدعم مبادرة 'قيم وولاء' في مدرسة الطريف بسلطنة عمان. تستهدف طالبات الصف السابع إلى العاشر. مهمتك هي تعزيز القيم الوطنية بأسلوب تفاعلي، محفّز، ومناسب لأعمارهن. استخدم لغة عربية سليمة ومبسطة ونبرة دافئة ومشجعة.";
  
  switch (section) {
    case Section.Rights:
      return `${base} عرّفي الطالبات بحقوقهن في سلطنة عمان بأسلوب مبسط ومشوق. ركزي على حق واحد في كل مرة، واربطيه بالقانون العُماني ومثال واقعي من حياتهن اليومية. اشرحي الآن عن: ${topic}.`;
    case Section.Hobbies:
      return `${base} شجعي الطالبات على ربط هواياتهن بخدمة الوطن. طالبة ذكرت أن هوايتها هي "${topic}". اقترحي عليها ٣ أفكار مبتكرة لكيفية استخدام هذه الهواية في خدمة مجتمعها ووطنها عُمان، مع غرس روح الانتماء.`;
    case Section.Heritage:
      return `${base} قدّمي معلومات ممتعة عن تراث سلطنة عمان بأسلوب سردي مشوّق يحاكي قصص الجدات. تحدثي الآن عن: ${topic} في عمان.`;
    case Section.Figures:
      return `${base} عرّفي الطالبات بشخصية عُمانية مؤثرة. اربطي إنجازاتهم بالقيم الوطنية مثل الإخلاص والشجاعة والابتكار. استخدمي أسلوب "قدوتي العُمانية" لتشجيعهن على الاقتداء بهم. اكتبي الآن عن: ${topic}.`;
    case Section.Ask:
      return `${base} طالبة تسأل السؤال التالي. أجيبي على سؤالها بأسلوب تربوي، دقيق، ومناسب لعمرها، مع الحفاظ على نبرة 'حكمة' الدافئة والمشجعة. السؤال هو: "${topic}"`;
    default:
      return base;
  }
};

export const fetchContent = async (section: Section, topic: string): Promise<string> => {
  try {
    const prompt = getBasePrompt(section, topic);
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching content from Gemini:", error);
    return "عذراً، حدث خطأ أثناء محاولة جلب المعلومات. يرجى المحاولة مرة أخرى.";
  }
};

export const generateQuizQuestions = async (): Promise<QuizQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: `
        أنت خبير في إعداد الاختبارات التربوية لسلطنة عمان.
        أنشئ اختبارًا تفاعليًا من 5 أسئلة بصيغة الاختيار من متعدد لطالبات الصف السابع إلى العاشر.
        يجب أن تغطي الأسئلة المحاور التالية: حقوق الطفل في عمان، التراث العماني، شخصيات عمانية مؤثرة، وقيم المواطنة.
        يجب أن تكون الأسئلة محفزة للتفكير وتناسب الفئة العمرية.
        لكل سؤال، قدّم 4 خيارات، وحدد الإجابة الصحيحة، مع شرح بسيط ومحفز للإجابة الصحيحة.
        أرجع الإجابة بتنسيق JSON فقط.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              description: 'قائمة الأسئلة',
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING, description: 'نص السؤال' },
                  options: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'قائمة الخيارات الأربعة' },
                  correctAnswer: { type: Type.STRING, description: 'الإجابة الصحيحة من قائمة الخيارات' },
                  explanation: { type: Type.STRING, description: 'شرح بسيط ومحفز للإجابة الصحيحة' }
                },
                required: ['question', 'options', 'correctAnswer', 'explanation']
              }
            }
          },
          required: ['questions']
        }
      }
    });
    
    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    return parsed.questions;

  } catch (error) {
    console.error("Error generating quiz:", error);
    // Fallback to static questions if API fails
    return [
      { question: 'ما هو الحق الأساسي الذي يكفله قانون الطفل العماني؟', options: ['اللعب فقط', 'التعليم والرعاية الصحية', 'العمل', 'امتلاك هاتف'], correctAnswer: 'التعليم والرعاية الصحية', explanation: 'قانون الطفل العماني يضمن حقوقاً أساسية أهمها التعليم والرعاية الصحية لينشأ جيلاً واعياً وقوياً.' },
      { question: 'ما اسم الخنجر الذي يعد جزءاً من الزي الوطني العماني للرجال؟', options: ['السيف', 'الخنجر العماني', 'الترس', 'الرمح'], correctAnswer: 'الخنجر العماني', explanation: 'الخنجر العماني رمز للأصالة والهوية، وهو جزء لا يتجزأ من تراثنا العريق.' },
      { question: 'من هو البحار العماني الشهير الذي ساعد فاسكو دا غاما في الوصول إلى الهند؟', options: ['أحمد بن ماجد', 'ابن بطوطة', 'الإدريسي', 'الخوارزمي'], correctAnswer: 'أحمد بن ماجد', explanation: 'أحمد بن ماجد، أسد البحار، ملاح عُماني فذ أذهلت خبرته العالم وأسهمت في رسم خرائط البحار.' },
      { question: 'المحافظة على نظافة مدرستك ومجتمعك تعد من:', options: ['الحقوق', 'الهوايات', 'الواجبات الوطنية', 'لا شيء مما سبق'], correctAnswer: 'الواجبات الوطنية', explanation: 'المواطنة الصالحة تبدأ من إحساسنا بالمسؤولية تجاه محيطنا، ونظافة وطننا تبدأ من نظافة أحيائنا ومدارسنا.' },
      { question: 'ماذا يمثل يوم الثامن عشر من نوفمبر في سلطنة عمان؟', options: ['يوم الشجرة', 'العيد الوطني', 'يوم المعلم', 'عيد الأم'], correctAnswer: 'العيد الوطني', explanation: 'العيد الوطني هو يوم فخر وولاء، نحتفل فيه بإنجازات وطننا الغالي ونجدد العهد على مواصلة البناء والتقدم.' },
    ];
  }
};
