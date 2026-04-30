import React, { useState } from "react";
import { BsCheckCircleFill, BsQuestionCircle, BsLightbulb, BsPlayCircle, BsDownload } from "react-icons/bs";
import { IoTimerOutline, IoPauseOutline, IoReloadOutline } from "react-icons/io5";

const TaskModeQuiz = ({ quizData }) => {
  const [activeTab, setActiveTab] = useState("question"); // question, markScheme, modelSolution, video
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedMarks, setSelectedMarks] = useState({}); // { questionIdx: [markId, ...] }
  const [showModelSolutionInline, setShowModelSolutionInline] = useState(false);

  // Mock data for static design as per image
  const questions = [
    {
      id: 1,
      number: "16",
      text: "In this right-angled triangle, a = 16cm, a : c = 4 : 5. Work out the area of the triangle.",
      marks: 4,
      markTypes: ["M1", "M2", "A1", "M3"],
      imageUrl: "https://i.ibb.co/6R2nQ6k/triangle-q.png", // Placeholder
      markSchemeUrl: "https://i.ibb.co/6R2nQ6k/triangle-q.png",
      modelSolutionUrl: "https://i.ibb.co/6R2nQ6k/triangle-q.png",
      videoUrl: "https://vimeo.com/...",
      modelAnswer: {
        steps: [
          { label: "Base of triangle = 4/5 * 16 = 12.8cm", mark: "M1", detail: "Correctly using the ratio to find base of 12.8cm" },
          { label: "Area = 1/2 * 12.8 * 16", mark: "M2", detail: "Using 1/2 * base * height" },
          { label: "Area = 102.4cm²", mark: "M3", detail: "Obt 1102.4" }
        ],
        totalMarks: 4,
        calculator: "Yes",
        paper: "Edexcel P1 Q12",
        difficulty: "Apprentice"
      }
    },
    // ... more questions
  ];

  const currentQ = questions[currentQuestionIdx] || questions[0];
  const marksForCurrent = selectedMarks[currentQuestionIdx] || [];

  const toggleMark = (mark) => {
    const currentSelected = [...marksForCurrent];
    const index = currentSelected.indexOf(mark);
    if (index > -1) {
      currentSelected.splice(index, 1);
    } else {
      currentSelected.push(mark);
    }
    setSelectedMarks({ ...selectedMarks, [currentQuestionIdx]: currentSelected });
  };

  const tabs = [
    { id: "question", label: "Question" },
    { id: "markScheme", label: "Mark Scheme" },
    { id: "modelSolution", label: "Model Solution" },
    { id: "video", label: "Video" },
  ];

  return (
    <div className="bg-white min-h-[600px] rounded-2xl overflow-hidden border border-[#f1f5f9] shadow-sm">
      {/* Quiz Header */}
      <div className="bg-white px-6 py-2 md:py-4 flex items-center justify-end border-b border-[#f1f5f9]">


        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-[#f1f5f9] px-3 py-1.5 rounded-full">
              <IoTimerOutline className="text-[#64748b]" />
              <span className="text-sm font-bold text-[#1e293b]">02:32</span>
           </div>
           <button className="p-1.5 bg-[#f1f5f9] rounded-full text-[#64748b] hover:text-[#1e293b]">
              <IoPauseOutline />
           </button>
           <button className="p-1.5 bg-[#f1f5f9] rounded-full text-[#64748b] hover:text-[#1e293b]">
              <IoReloadOutline />
           </button>
        </div>
      </div>

      {/* Tab Navigation - Scrollable on mobile */}
      <div className="px-4 md:px-6 pt-4 flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 md:px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? "bg-[#334155] text-white" 
                : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Question Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className=" p-4 md:p-6 shadow-sm flex flex-col min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl md:text-2xl font-bold text-[#1e293b]">{currentQ.number}</span>
              <div className="flex items-center gap-3 md:gap-4 text-[#94a3b8]">
                <span className="text-xs font-bold flex items-center gap-1">
                   <BsDownload /> Marks: {currentQ.marks}
                </span>
                <BsQuestionCircle className="cursor-pointer" />
                <button onClick={() => {}} className="hover:text-red-500 text-lg">×</button>
              </div>
            </div>

            {/* Question Text / Image */}
            <div className="flex-grow mb-8">
               <p className="text-[#1e293b] font-medium mb-4 text-sm md:text-base">{currentQ.text}</p>
               {/* Question Image Container */}
               <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-4 md:p-8 flex items-center justify-center">
                  <div className="text-center w-full">
                     <p className="text-gray-400 text-[10px] md:text-sm mb-2">Question Image Placeholder</p>
                     <img src="https://i.ibb.co/6R2nQ6k/triangle-q.png" alt="triangle" className="max-w-full h-auto mx-auto" />
                  </div>
               </div>

               {/* Mark Scheme / Model Answer */}
               {(activeTab === "markScheme" || activeTab === "modelSolution") && (
                  <div className="mt-6 bg-[#fffbeb] border border-[#fef3c7] rounded-xl overflow-hidden">
                     <div className="bg-[#fefce8] px-4 py-2 flex items-center justify-between border-b border-[#fef3c7]">
                        <span className="text-xs md:text-sm font-bold text-[#854d0e] bg-[#fef9c3] px-2 py-0.5 rounded flex items-center gap-2">
                           Model Answer
                        </span>
                        <span className="text-[10px] md:text-xs font-bold text-[#854d0e]">Marks: {currentQ.marks}</span>
                     </div>
                     <div className="p-2 md:p-4 overflow-x-auto">
                        <table className="w-full text-xs md:text-sm text-[#1e293b] min-w-[300px]">
                           <tbody>
                              {currentQ.modelAnswer.steps.map((step, idx) => (
                                 <tr key={idx} className={idx !== 0 ? "border-t border-[#fef3c7]" : ""}>
                                    <td className="py-2 md:py-3 pr-2 md:pr-4 font-medium">{step.label}</td>
                                    <td className="py-2 md:py-3 px-2 md:px-4 font-bold text-[#854d0e] border-l border-r border-[#fef3c7]">{step.mark}</td>
                                    <td className="py-2 md:py-3 pl-2 md:pl-4 text-[#92400e] text-[10px] md:text-xs leading-relaxed">{step.detail}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                     <div className="bg-white p-3 flex flex-wrap gap-1.5 items-center">
                        <span className="bg-[#fefce8] text-[#854d0e] text-[9px] md:text-[10px] font-bold px-2 py-1 rounded">Marks: {currentQ.modelAnswer.totalMarks}</span>
                        <span className="bg-[#f1f5f9] text-[#64748b] text-[9px] md:text-[10px] font-bold px-2 py-1 rounded">Calculator: {currentQ.modelAnswer.calculator}</span>
                        <span className="bg-[#f1f5f9] text-[#64748b] text-[9px] md:text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap">{currentQ.modelAnswer.paper}</span>
                        <span className="bg-[#ffedd5] text-[#9a3412] text-[9px] md:text-[10px] font-bold px-2 py-1 rounded">{currentQ.modelAnswer.difficulty}</span>
                     </div>
                  </div>
               )}
            </div>

            {/* Bottom Actions - Responsive Stack */}
            <div className="mt-auto pt-6 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
               <button className="w-full md:w-auto flex items-center justify-center gap-2 text-xs font-bold text-[#64748b] bg-[#f1f5f9] px-4 py-2.5 rounded-lg hover:bg-[#e2e8f0] transition-all">
                  <BsDownload /> Download question
               </button>

               <div className="flex items-center gap-1 bg-[#f1f5f9] p-1 rounded-lg overflow-x-auto max-w-full scrollbar-hide">
                  <span className="text-[10px] font-bold text-[#64748b] px-2 whitespace-nowrap">Q1</span>
                  {[1,2,3,4,5,6,7].map(num => (
                     <button key={num} className={`w-7 h-7 flex-shrink-0 flex items-center justify-center text-[10px] font-bold rounded-md ${num === 5 ? 'bg-[#1e293b] text-white' : 'hover:bg-[#e2e8f0]'}`}>
                        {num}
                     </button>
                  ))}
                  <button className="px-2 text-[#64748b]">...</button>
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Marking System */}
        <div className="lg:col-span-4 space-y-6">


           <div className="bg-white rounded-2xl border border-[#f1f5f9] p-4 shadow-sm">
              <div className="grid grid-cols-4 gap-2 mb-6">
                 {currentQ.markTypes.map((mark) => (
                    <button
                       key={mark}
                       onClick={() => toggleMark(mark)}
                       className={`py-2 rounded-lg text-sm font-bold border transition-all ${
                          marksForCurrent.includes(mark)
                             ? "bg-[#3b82f6] text-white border-[#3b82f6]"
                             : "bg-white text-[#64748b] border-[#e2e8f0] hover:border-[#3b82f6]"
                       }`}
                    >
                       {mark}
                    </button>
                 ))}
              </div>

              <div className="bg-[#f8fafc] rounded-xl p-5 border border-[#f1f5f9] relative overflow-hidden">
                 {/* Overlay if not revealed (optional based on image 3) */}
                 {/* <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4">
                    <div className="w-10 h-10 bg-[#f1f5f9] rounded-full flex items-center justify-center mb-3">
                       <img src="https://api.iconify.design/heroicons:lock-closed-20-solid.svg" className="w-5 h-5 text-[#94a3b8]" alt="lock" />
                    </div>
                    <p className="text-xs font-medium text-[#64748b]">Reveal mark scheme to begin marking your work.</p>
                 </div> */}

                 <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                       {currentQ.markTypes.map(mark => (
                          <div key={mark} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold ${
                             marksForCurrent.includes(mark) ? 'bg-[#fffbeb] border-[#fde68a] text-[#854d0e]' : 'bg-white border-[#e2e8f0] text-[#94a3b8]'
                          }`}>
                             {marksForCurrent.includes(mark) && <BsCheckCircleFill className="text-green-500 w-3 h-3" />}
                             {mark}
                          </div>
                       ))}
                    </div>

                    <div className="pt-4 border-t border-[#e2e8f0]">
                       <p className="text-xs font-bold text-[#64748b] mb-1">Marks achieved: <span className="text-[#1e293b]">{marksForCurrent.length} / {currentQ.marks}</span></p>
                       <p className="text-[10px] font-medium text-[#94a3b8]">Selected marks: <span className="font-bold text-[#64748b]">{marksForCurrent.join(", ") || "None"}</span></p>
                    </div>

                    <div className="flex gap-3 pt-2">
                       <button className="flex-1 py-2.5 bg-[#f1f5f9] text-[#1e293b] font-bold rounded-xl text-sm hover:bg-[#e2e8f0]">
                          Previous
                       </button>
                       <button className="flex-[2] py-2.5 bg-[#4e94ff] text-white font-bold rounded-xl text-sm hover:bg-[#3b82f6] shadow-lg shadow-blue-200">
                          Save & Next
                       </button>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-1">
                 {[1,2,3,4].map(n => (
                    <button key={n} className={`w-8 h-8 flex items-center justify-center text-[10px] font-bold rounded-full border ${n === 4 ? 'bg-[#1e293b] text-white border-[#1e293b]' : 'bg-white text-[#94a3b8] border-[#f1f5f9]'}`}>
                       Q{n} {n === 4 && <span className="ml-1 w-2 h-2 bg-blue-400 rounded-full"></span>}
                    </button>
                 ))}
                 {[3,10,11,12].map(n => (
                    <button key={n} className="w-8 h-8 flex items-center justify-center text-[10px] font-bold text-[#94a3b8] border border-transparent">
                       {n}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModeQuiz;
