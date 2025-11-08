import React from 'react';
import { Section } from '../types';
import { RightsIcon, HobbiesIcon, HeritageIcon, FiguresIcon, QuizIcon, AskIcon } from './Icons';

interface HomeProps {
  onSectionChange: (section: Section) => void;
}

const SectionCard: React.FC<{ title: Section; description: string; icon: React.ReactNode; onClick: () => void }> = ({ title, description, icon, onClick }) => (
  <div onClick={onClick} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center border-b-4 border-red-700">
    <div className="p-4 bg-green-100 rounded-full text-green-800 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-green-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home: React.FC<HomeProps> = ({ onSectionChange }) => {
  return (
    <div className="p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center bg-cover bg-center" style={{backgroundImage: 'url(https://picsum.photos/1200/300?blur=2)'}}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
            <h2 className="text-4xl font-extrabold text-white mb-4">أهلاً بكِ في مبادرة "قيم وولاء"</h2>
            <p className="text-lg text-green-200 leading-relaxed max-w-4xl mx-auto">
              تهدف مبادرة مدرسة الطريف إلى غرس قيم المواطنة وتعزيز الهوية الوطنية لديكِ، باعتباركِ ثروة الوطن. نسعى لبناء جيل واعٍ بهويته، مدرك لحقوقه، وملتزم بواجباته، ليساهم في نهضة عُمان ويمثلها خير تمثيل، بما يتماشى مع رؤية عمان ٢٠٤٠.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SectionCard 
          title={Section.Rights} 
          description="تعرفي على حقوقك التي يكفلها لكِ قانون وطننا الغالي." 
          icon={<RightsIcon />} 
          onClick={() => onSectionChange(Section.Rights)} 
        />
        <SectionCard 
          title={Section.Hobbies} 
          description="اكتشفي كيف يمكن لهواياتكِ أن تساهم في خدمة مجتمعك ووطنك." 
          icon={<HobbiesIcon />} 
          onClick={() => onSectionChange(Section.Hobbies)} 
        />
        <SectionCard 
          title={Section.Heritage} 
          description="أبحري في كنوز تراثنا العريق واستمعي لقصص من عبق الماضي." 
          icon={<HeritageIcon />} 
          onClick={() => onSectionChange(Section.Heritage)} 
        />
        <SectionCard 
          title={Section.Figures} 
          description="تعرفي على شخصيات عُمانية ملهمة واتخذيهم قدوة في مسيرتك." 
          icon={<FiguresIcon />} 
          onClick={() => onSectionChange(Section.Figures)} 
        />
         <SectionCard 
          title={Section.Ask} 
          description="هل لديكِ سؤال محدد؟ اسألي 'حكمة' مباشرةً لتحصلي على إجابة." 
          icon={<AskIcon />} 
          onClick={() => onSectionChange(Section.Ask)} 
        />
        <SectionCard 
          title={Section.Quiz} 
          description="اختبري معلوماتكِ في رحلة ممتعة وتحدٍ شيّق عن وطنك." 
          icon={<QuizIcon />} 
          onClick={() => onSectionChange(Section.Quiz)} 
        />
      </div>
    </div>
  );
};

export default Home;
