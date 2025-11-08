import React, { useState, useCallback } from 'react';
import { Section } from './types';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import ContentSection from './components/ContentSection';
import Quiz from './components/Quiz';
import AskHikma from './components/AskHikma';
import { MenuIcon, CloseIcon } from './components/Icons';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.Home);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSectionChange = useCallback((section: Section) => {
    setCurrentSection(section);
    setSidebarOpen(false); // Close sidebar on section change on mobile
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const renderSection = () => {
    switch (currentSection) {
      case Section.Home:
        return <Home onSectionChange={handleSectionChange} />;
      case Section.Rights:
        return <ContentSection 
                 section={Section.Rights}
                 title="حقوق الطفل في سلطنة عمان"
                 description="حقوقكِ مصانة في وطننا، فهي الأساس لمستقبل مشرق. تعرفي عليها لتكوني مواطنة واعية ومسؤولة."
                 topics={[
                    { name: "الحق في التعليم", image: "https://picsum.photos/seed/education/200" },
                    { name: "الحق في الرعاية الصحية", image: "https://picsum.photos/seed/health/200" },
                    { name: "الحق في الحماية", image: "https://picsum.photos/seed/protection/200" },
                    { name: "الحق في التعبير عن الرأي", image: "https://picsum.photos/seed/expression/200" },
                 ]}
               />;
      case Section.Hobbies:
        return <ContentSection 
                 section={Section.Hobbies}
                 title="هواياتي في خدمة وطني"
                 description="كل موهبة لديكِ هي بذرة عطاء لوطنك. استثمري هوايتك لتكون بصمة إيجابية في مجتمعك."
                 topics={[
                    { name: "الرسم والفن التشكيلي", image: "https://picsum.photos/seed/art/200" },
                    { name: "كتابة القصص والشعر", image: "https://picsum.photos/seed/writing/200" },
                    { name: "البرمجة والتصميم الرقمي", image: "https://picsum.photos/seed/coding/200" },
                    { name: "التصوير الفوتوغرافي", image: "https://picsum.photos/seed/photo/200" },
                 ]}
               />;
      case Section.Heritage:
        return <ContentSection 
                 section={Section.Heritage}
                 title="تراثنا.. فخرنا وهويتنا"
                 description="تراثنا ليس مجرد حكايات من الماضي، بل هو جذورنا التي تمنحنا القوة والأصالة. اكتشفي كنوز أجدادنا."
                 topics={[
                    { name: "الأزياء العمانية التقليدية", image: "https://picsum.photos/seed/fashion/200" },
                    { name: "صناعة الفخار في بهلاء", image: "https://picsum.photos/seed/pottery/200" },
                    { name: "نظام الأفلاج المائي", image: "https://picsum.photos/seed/aflaj/200" },
                    { name: "صناعة الحلوى العمانية", image: "https://picsum.photos/seed/halwa/200" },
                 ]}
               />;
      case Section.Figures:
        return <ContentSection 
                 section={Section.Figures}
                 title="قدوتي العُمانية"
                 description="في تاريخنا العريق رجال ونساء أضاؤوا دروب المجد. تعرفي على قصصهم واستلهمي من إنجازاتهم."
                 topics={[
                    { name: "السيد سعيد بن سلطان", image: "https://picsum.photos/seed/sultan/200" },
                    { name: "أحمد بن ماجد", image: "https://picsum.photos/seed/majid/200" },
                    { name: "الطبيبة ظبية بنت محمد", image: "https://picsum.photos/seed/doctor/200" },
                    { name: "الإمام جابر بن زيد", image: "https://picsum.photos/seed/jabir/200" },
                    { name: "سير سلاطين سلطنة عمان", image: "https://picsum.photos/seed/sultans_oman/200" },
                 ]}
               />;
      case Section.Ask:
        return <AskHikma />;
      case Section.Quiz:
        return <Quiz />;
      default:
        return <Home onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar 
        currentSection={currentSection} 
        onSectionChange={handleSectionChange}
        isOpen={isSidebarOpen} 
      />
      <div className="flex-1 flex flex-col transition-all duration-300 md:mr-64">
        <header className="md:hidden p-4 bg-white shadow-md flex justify-between items-center z-30">
             <h1 className="text-xl font-bold text-green-800"> قيم وولاء</h1>
            <button onClick={toggleSidebar} className="text-gray-600">
                {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
        </header>
        {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"></div>}
        <main className="flex-1 overflow-y-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default App;
