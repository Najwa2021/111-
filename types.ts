export enum Section {
  Home = 'الرئيسية',
  Rights = 'حقوق الطفل',
  Hobbies = 'هواياتي وطني',
  Heritage = 'تراثنا فخرنا',
  Figures = 'قدوتي العُمانية',
  Ask = 'اسأل حكمة',
  Quiz = 'اختبار تفاعلي'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface CertificateData {
  name: string;
  date: string;
  score: number;
  totalQuestions: number;
}
