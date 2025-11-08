import React from 'react';
import { Section } from '../types';
import { HomeIcon, RightsIcon, HobbiesIcon, HeritageIcon, FiguresIcon, QuizIcon, AskIcon } from './Icons';

interface SidebarProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  isOpen: boolean;
}

const navItems = [
  { section: Section.Home, icon: <HomeIcon /> },
  { section: Section.Rights, icon: <RightsIcon /> },
  { section: Section.Hobbies, icon: <HobbiesIcon /> },
  { section: Section.Heritage, icon: <HeritageIcon /> },
  { section: Section.Figures, icon: <FiguresIcon /> },
  { section: Section.Ask, icon: <AskIcon /> },
  { section: Section.Quiz, icon: <QuizIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ currentSection, onSectionChange, isOpen }) => {
  return (
    <aside className={`fixed top-0 right-0 h-full bg-green-800 text-white transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 md:relative md:w-64 flex-shrink-0`}>
      <div className="p-4 flex flex-col h-full">
        <h1 className="text-2xl font-bold text-center mb-10 border-b-2 border-green-600 pb-4">
          قيم وولاء
        </h1>
        <nav className="flex-grow">
          <ul>
            {navItems.map((item) => (
              <li key={item.section} className="mb-2">
                <button
                  onClick={() => onSectionChange(item.section)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    currentSection === item.section
                      ? 'bg-white text-green-800 font-bold'
                      : 'hover:bg-green-700'
                  }`}
                >
                  {item.icon}
                  <span className="mr-4">{item.section}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-center text-sm text-green-300 mt-auto">
          <p>مبادرة مدرسة الطريف</p>
          <p>&copy; 2024</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
