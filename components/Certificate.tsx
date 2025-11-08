
import React from 'react';
import { CertificateData } from '../types';
import { CertificateIcon } from './Icons';

interface CertificateProps {
  data: CertificateData;
  onRestart: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ data, onRestart }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 md:p-8 flex flex-col items-center justify-center">
      <div id="certificate" className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl border-8 border-green-800 relative bg-gradient-to-br from-green-50 to-white">
        <div className="absolute top-4 right-4 text-green-700 opacity-10">
          <CertificateIcon />
        </div>
        <div className="absolute bottom-4 left-4 text-red-700 opacity-10 transform rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 11c0 3.517-1.009 6.789-2.75 9.565M12 11c3.517 0 6.789-1.009 9.565-2.75M12 11V3m0 8c-3.517 0-6.789 1.009-9.565 2.75m16.565-5.5A9.962 9.962 0 0112 21a9.962 9.962 0 01-9.565-8.25m19.13 0a9.962 9.962 0 00-9.565-8.25 9.962 9.962 0 00-9.565 8.25" />
            </svg>
        </div>
        
        <div className="text-center border-b-4 border-double border-green-800 pb-4 mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900">شهادة إنجاز</h1>
          <p className="text-lg text-gray-600 mt-2">من مبادرة "قيم وولاء"</p>
        </div>

        <div className="text-center my-8">
          <p className="text-xl text-gray-700 mb-4">تُمنح هذه الشهادة إلى الطالبة المتميزة</p>
          <p className="text-3xl md:text-4xl font-bold text-red-700 tracking-wider bg-yellow-50 inline-block px-4 py-2 rounded-lg">{data.name}</p>
          <p className="text-xl text-gray-700 mt-4">
            لإتمامها بنجاح الاختبار التفاعلي بتاريخ <span className="font-semibold">{data.date}</span>
          </p>
          <p className="text-2xl text-green-800 font-bold mt-6">
            بنتيجة: {data.score} / {data.totalQuestions}
          </p>
        </div>

        <div className="mt-8 flex justify-between items-center text-sm text-gray-500">
          <div>
            <p className="font-bold">مدرسة الطريف</p>
            <p>سلطنة عمان</p>
          </div>
          <div>
            <p className="font-bold">"أنتِ فخر عمان"</p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex space-x-4 space-x-reverse">
        <button onClick={handlePrint} className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition-colors">
          طباعة الشهادة
        </button>
        <button onClick={onRestart} className="px-6 py-3 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition-colors">
          إعادة الاختبار
        </button>
      </div>
    </div>
  );
};

export default Certificate;
