import React, { useState } from 'react';
import { Section } from '../types';
import { fetchContent } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { AskIcon } from './Icons';

const AskHikma: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnswer('');

    try {
      const result = await fetchContent(Section.Ask, question);
      setAnswer(result);
    } catch (err) {
      setError('حدث خطأ ما، الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
        <div className="inline-block p-4 bg-green-100 rounded-full text-green-800 mb-4">
            <AskIcon />
        </div>
        <h2 className="text-3xl font-bold text-green-900 mb-2">اسأل حكمة</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">هل لديكِ فضول حول موضوع ما؟ أو سؤال يحيرك؟ اكتبي سؤالكِ هنا، و"حكمة" ستجيبكِ بكل سرور.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <form onSubmit={handleSubmit}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="اكتبي سؤالك هنا..."
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            required
          />
          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-4 w-full py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-colors disabled:bg-gray-400 flex items-center justify-center"
          >
            {isLoading ? 'جاري التفكير...' : 'احصلي على الإجابة'}
          </button>
        </form>
      </div>

      {(isLoading || answer || error) && (
        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[200px]">
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-600 text-center">{error}</p>}
          {answer && (
            <div className="prose max-w-none text-gray-800 leading-loose">
               <h3 className="text-2xl font-bold text-green-800 border-b-2 border-green-200 pb-2 mb-4">إجابة حكمة:</h3>
               {answer.split('\n').map((paragraph, index) => <p key={index} className="mb-4">{paragraph}</p>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AskHikma;
