import React, { useState } from 'react';
import { Download } from 'lucide-react';
import VideoQuestionLayout from '../MyCoursesComponents/VideoQuestionLayout';

// Past Papers Component
const PastPapers = () => {
  const [selectedExamBoard, setSelectedExamBoard] = useState('Edexcel');
  
  const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023];
  
  return (
    <div className="bg-Secondary dark:bg-[#0B1120] dark:border rounded-lg p-6">
      <h2 className="text-white text-xl font-semibold mb-4">Past Papers</h2>
      
      {/* Exam Board Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSelectedExamBoard('Edexcel')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            selectedExamBoard === 'Edexcel'
              ? 'bg-white  text-slate-800'
              : 'bg-slate-600 text-white hover:bg-slate-500'
          }`}
        >
          Edexcel
        </button>
        <button
          onClick={() => setSelectedExamBoard('AQA')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            selectedExamBoard === 'AQA'
              ? 'bg-white text-slate-800'
              : 'bg-slate-600 text-white hover:bg-slate-500'
          }`}
        >
          AQA
        </button>
        <button
          onClick={() => setSelectedExamBoard('OCR')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            selectedExamBoard === 'OCR'
              ? 'bg-white text-slate-800'
              : 'bg-slate-600 text-white hover:bg-slate-500'
          }`}
        >
          OCR
        </button>
      </div>
      
      {/* Year List */}
      <div className="space-y-3">
        {years.map((year) => (
          <div
            key={year}
            className="flex items-center justify-between bg-white dark:bg-[#0B1120] dark:border rounded-lg p-4"
          >
            <span className="text-slate-800 dark:text-white font-semibold">{year}</span>
            <div className="flex gap-2">
              <button className="bg-Secondary text-white px-4 py-1.5 rounded font-medium text-sm">
                P1
              </button>
              <button className="bg-Secondary text-white px-4 py-1.5 rounded font-medium text-sm">
                P2
              </button>
              <button className="bg-Secondary text-white px-4 py-1.5 rounded font-medium text-sm">
                P3
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Question Grid Component
const QuestionGrid = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  
  const questions = Array.from({ length: 20 }, (_, i) => i + 1);
  
  return (
    <div className="bg-white dark:bg-[#0B1120] dark:border rounded-lg p-6">
      <h2 className="text-slate-800 dark:text-white text-xl font-semibold mb-2">
        Edexcel AS LEVEL PAPER P1 2017
      </h2>
      <p className="text-slate-600 dark:text-gray-400 text-sm mb-6">
        For game-changing, fast, dependable grade improvement, use THE TT REVISION METHOD to study this paper
      </p>
      
      {/* Questions Grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-3">
        {questions.map((num) => (
  <label
  key={num}
  className="flex items-center gap-3 cursor-pointer p-2 rounded transition-colors
             hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-gray-200"
>
  <input
    type="radio"
    name="question"
    value={num}
    checked={selectedQuestion === num}
    onChange={() => setSelectedQuestion(num)}
    className="w-4 h-4 text-blue-600 dark:accent-blue-500"
  />
  <span className="text-slate-700 dark:text-gray-200 font-medium">
    QUESTION {num}
  </span>
</label>

        ))}
      </div>
    </div>
  );
};

// Paper Documents Component
const PaperDocuments = () => {
  return (
    <div className="bg-white dark:bg-[#0B1120] dark:border rounded-lg p-6">
      <h2 className="text-slate-800 text-xl font-semibold mb-4 dark:text-white">
        PAPER DOCUMENTS
      </h2>
      
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-Secondary hover:bg-slate-800 text-white py-3 px-4 rounded-lg font-medium transition-colors">
          <Download size={20} />
          Practice Questions Set
        </button>
        
        <button className="w-full flex items-center justify-center gap-2 bg-Secondary hover:bg-slate-800 text-white py-3 px-4 rounded-lg font-medium transition-colors">
          <Download size={20} />
          Mark Scheme
        </button>
      </div>
    </div>
  );
};

// Main App Component
export default function MyQuiz() {
  return (
    
  <div className=''>

    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Past Papers - Takes 1 column */}
      <div className="lg:col-span-1">
        <PastPapers />
      </div>
      
      {/* Question Grid - Takes 1 column */}
      <div className="lg:col-span-1">
        <QuestionGrid />
      </div>
      
      {/* Paper Documents - Takes 1 column */}
      <div className="lg:col-span-1">
        <PaperDocuments />
      </div>
    </div>
    <div>
      <VideoQuestionLayout />
    </div>
  </div>
 
  );
}