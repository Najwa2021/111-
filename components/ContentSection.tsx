
import React, { useState, useCallback } from 'react';
import { Section } from '../types';
import { fetchContent } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

interface Topic {
    name: string;
    image: string;
}

interface ContentSectionProps {
  section: Section;
  title: string;
  description: string;
  topics: Topic[];
}

const ContentSection: React.FC<ContentSectionProps> = ({ section, title, description, topics }) => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTopicClick = useCallback(async (topic: Topic) => {
    if (selectedTopic?.name === topic.name && content) {
      // If the same topic is clicked again, just ensure it's visible
      setSelectedTopic(topic);
      return;
    }
    
    setSelectedTopic(topic);
    setIsLoading(true);
    setError(null);
    setContent('');
    try {
      const result = await fetchContent(section, topic.name);
      setContent(result);
    } catch (err) {
      setError('حدث خطأ ما، الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  }, [section, selectedTopic, content]);

  return (
    <div className="p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-green-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="mb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topics.map((topic) => (
          <button
            key={topic.name}
            onClick={() => handleTopicClick(topic)}
            className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-center text-white font-semibold bg-cover bg-center ${selectedTopic?.name === topic.name ? 'ring-4 ring-offset-2 ring-red-600' : ''}`}
            style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${topic.image})`}}
          >
            {topic.name}
          </button>
        ))}
      </div>

      {(isLoading || content || error) && (
        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[200px]">
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-600 text-center">{error}</p>}
          {content && selectedTopic && (
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <img 
                    src={selectedTopic.image} 
                    alt={selectedTopic.name}
                    className="w-full md:w-1/3 lg:w-1/4 h-auto object-cover rounded-lg shadow-lg self-center md:self-start"
                />
                <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap flex-1">
                   <h3 className="text-2xl font-bold text-green-800 border-b-2 border-green-200 pb-2 mb-4">{selectedTopic.name}</h3>
                   {content.split('\n').map((paragraph, index) => <p key={index} className="mb-4">{paragraph}</p>)}
                </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentSection;
