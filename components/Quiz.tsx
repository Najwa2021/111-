
import React, { useState, useEffect, useCallback } from 'react';
import { QuizQuestion, CertificateData } from '../types';
import { generateQuizQuestions } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import Certificate from './Certificate';

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [studentName, setStudentName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const loadQuestions = useCallback(async () => {
    setIsLoading(true);
    const fetchedQuestions = await generateQuizQuestions();
    setQuestions(fetchedQuestions);
    setIsLoading(false);
    // Reset state for a new quiz
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
    setIsCorrect(null);
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleAnswer = (answer: string) => {
    if (selectedOption) return; // Prevent changing answer

    setSelectedOption(answer);
    setUserAnswers([...userAnswers, answer]);
    
    const correct = answer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResults(true);
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim()) {
      setNameSubmitted(true);
    }
  };
  
  const handleRestart = () => {
      setNameSubmitted(false);
      setStudentName('');
      loadQuestions();
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">جاري تحضير الأسئلة...</h2>
        <LoadingSpinner />
      </div>
    );
  }

  if (!nameSubmitted) {
     return (
        <div className="p-4 md:p-8 flex items-center justify-center h-full">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
                <h2 className="text-2xl font-bold text-green-900 mb-4">قبل أن نبدأ...</h2>
                <p className="text-gray-600 mb-6">اكتبي اسمكِ الكامل للحصول على شهادتكِ عند إتمام الاختبار.</p>
                <form onSubmit={handleNameSubmit}>
                    <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="الاسم الكامل"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                        required
                    />
                    <button type="submit" className="w-full py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-colors">
                        بدء الاختبار
                    </button>
                </form>
            </div>
        </div>
     )
  }

  if (showResults) {
    const certificateData: CertificateData = {
      name: studentName,
      date: new Date().toLocaleDateString('ar-OM'),
      score: score,
      totalQuestions: questions.length
    };
    return <Certificate data={certificateData} onRestart={handleRestart} />;
  }

  if (questions.length === 0) {
    return <div className="text-center p-8">لم يتم تحميل الأسئلة. حاول تحديث الصفحة.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4 md:p-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl mx-auto">
        <div className="mb-6">
          <p className="text-sm text-gray-500">سؤال {currentQuestionIndex + 1} من {questions.length}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{currentQuestion.question}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === option;
            let buttonClass = 'p-4 rounded-lg border-2 text-lg text-right w-full transition-all duration-200 ';
            if (isSelected) {
                buttonClass += isCorrect ? 'bg-green-100 border-green-500 text-green-800 font-bold' : 'bg-red-100 border-red-500 text-red-800 font-bold';
            } else if (selectedOption && option === currentQuestion.correctAnswer) {
                buttonClass += 'bg-green-100 border-green-500 text-green-800';
            }
             else {
                buttonClass += 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-400';
            }

            return (
              <button key={index} onClick={() => handleAnswer(option)} disabled={!!selectedOption} className={buttonClass}>
                {option}
              </button>
            );
          })}
        </div>
        
        {selectedOption && (
            <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                <h3 className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'إجابة صحيحة! أحسنتِ.' : 'إجابة غير صحيحة.'}
                </h3>
                <p className="mt-2 text-gray-700">{currentQuestion.explanation}</p>
                 <button onClick={handleNextQuestion} className="mt-4 px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors">
                    {currentQuestionIndex < questions.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
