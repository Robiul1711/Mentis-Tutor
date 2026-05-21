import React, { useState } from "react";
import {
  BsCheckCircleFill,
  BsQuestionCircle,
  BsDownload,
  BsPlayFill,
  BsLockFill,
  BsInfoCircle,
} from "react-icons/bs";
import { useApiMutation } from "@/hooks/apiMutation";
import { Image } from "antd";

const TaskModeQuiz = ({ quizData }) => {
  const [activeTab, setActiveTab] = useState("question"); // question, markScheme, modelSolution, video
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedMarks, setSelectedMarks] = useState({}); // { questionIdx: [markType, ...] }
  const [submissionResult, setSubmissionResult] = useState(null);
  const [revealedQuestions, setRevealedQuestions] = useState({});

  const questions = quizData?.questions || [];
  const currentQ = questions[currentQuestionIdx];
  const isCurrentRevealed = revealedQuestions[currentQuestionIdx];

  const handleReveal = () => {
    setRevealedQuestions({
      ...revealedQuestions,
      [currentQuestionIdx]: true,
    });
  };

  const { mutate: submitQuiz, isPending: isSubmitting } = useApiMutation({
    url: `/quizzes/submit/${quizData?.id}`,
    method: "POST",
    secure: true,
    onSuccess: (res) => {
      setSubmissionResult(res);
    },
  });

  if (!currentQ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <BsQuestionCircle className="text-slate-400 text-2xl" />
        </div>
        <p className="text-slate-500 font-medium">
          No questions available for this quiz.
        </p>
      </div>
    );
  }

  const marksForCurrent = selectedMarks[currentQuestionIdx] || [];

  const toggleMark = (markType) => {
    setSubmissionResult(null); // Clear result when modifying
    const currentSelected = [...marksForCurrent];
    const index = currentSelected.indexOf(markType);
    if (index > -1) {
      currentSelected.splice(index, 1);
    } else {
      currentSelected.push(markType);
    }
    setSelectedMarks({
      ...selectedMarks,
      [currentQuestionIdx]: currentSelected,
    });
  };

  const tabs = [
    { id: "question", label: "Question" },
    { id: "markScheme", label: "Mark Scheme" },
    { id: "modelSolution", label: "Model Solution" },
    // { id: "video", label: "Video" },
  ];

  const handleDownload = (imageUrl, filename) => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.target = "_blank";
    link.download = filename || "question_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className=" sm:dark:bg-[#0f172a] min-h-[600px] rounded-xl overflow-hidden sm:border border-[#f1f5f9] dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none animate-in fade-in duration-500">
      {/* Tab Navigation */}
      <div className="px-2 pt-6 flex gap-3 overflow-x-auto scrollbar-hide pb-2 border-b border-slate-50 dark:border-slate-800/50">
        {tabs.map((tab) => {
          const isDisabled = !isCurrentRevealed && tab.id !== "question";
          return (
            <button
              key={tab.id}
              disabled={isDisabled}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 md:px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-[#1e293b] text-white shadow-lg shadow-slate-200 dark:shadow-none dark:bg-blue-600"
                  : isDisabled
                    ? "bg-slate-50 text-slate-300 cursor-not-allowed dark:bg-slate-800/20 dark:text-slate-600"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              {tab.label}
              {isDisabled && <BsLockFill className="text-xs" />}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:p-4">
        {/* Left Side: Content */}
        <div className="lg:col-span-8">
          <div className="flex flex-col min-h-[500px]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-lg md:text-xl">
                  {currentQuestionIdx + 1}
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Question
                  </h4>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    GCSE Mathematics
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 border-slate-50 dark:border-slate-800/50 pt-3 sm:pt-0">
                <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-tighter border border-orange-100 dark:border-orange-500/10">
                  {currentQ.total_marks} Marks
                </span>
                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  <BsQuestionCircle size={18} />
                </button>
              </div>
            </div>

            {/* Dynamic Content Area */}
            <div className="flex-grow space-y-6">
              {activeTab === "question" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">
                    {currentQ.question}
                  </h3>
                  {currentQ.question_image && (
                    <div className="group relative">
                      <Image
                        width="100%"
                        src={currentQ.question_image}
                        alt="Question"
                        className="max-w-full h-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}

              {activeTab === "markScheme" && (
                <div className="space-y-6 transition-all duration-300">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                      {currentQ.scheme_title || "Mark Scheme Overview"}
                    </h3>
                    {currentQ.scheme_image && (
                      <div className="">
                        <Image
                          width="100%"
                          src={currentQ.scheme_image}
                          alt="Mark Scheme"
                          className="max-w-full h-80 rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  {currentQ.marking_breakdown?.length > 0 && (
                    <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[500px] md:min-w-0">
                          <thead className="bg-slate-50 dark:bg-slate-800/80">
                            <tr>
                              <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Type
                              </th>
                              <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Description
                              </th>
                              <th className="px-4 md:px-6 py-3 md:py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Mark
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {currentQ.marking_breakdown.map((mb, index) => (
                              <tr
                                key={mb.id || index}
                                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                              >
                                <td className="px-4 md:px-6 py-3 md:py-4">
                                  <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-black px-2 py-1 rounded">
                                    {mb.type}
                                  </span>
                                </td>
                                <td className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                                  {mb.description}
                                </td>
                                <td className="px-4 md:px-6 py-3 md:py-4 text-right font-black text-slate-800 dark:text-slate-100 text-xs md:text-sm">
                                  {mb.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "modelSolution" && (
                <div className="space-y-4 transition-all duration-300">
                  {currentQ.solution_title && (
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                      {currentQ.solution_title}
                    </h3>
                  )}
                  <div
                    className="prose prose-slate dark:prose-invert max-w-full text-slate-600 dark:text-slate-300 bg-green-50/30 dark:bg-green-900/10 p-4 rounded-xl border border-green-100/50 dark:border-green-900/20"
                    dangerouslySetInnerHTML={{
                      __html: currentQ.soluation_explanation,
                    }}
                  />
                </div>
              )}

              {activeTab === "video" && (
                <div className="space-y-6 transition-all duration-300">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                    {currentQ.video_title || "Video Tutorial"}
                  </h3>
                  {currentQ.vimeo_url ? (
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-900  ring-1 ring-slate-200 dark:ring-slate-800">
                      <iframe
                        src={`${currentQ.vimeo_url.replace("vimeo.com/", "player.vimeo.com/video/")}?title=0&byline=0&portrait=0`}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-20 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                      <BsPlayFill className="text-4xl text-slate-300 mb-4" />
                      <p className="text-slate-500 font-medium italic">
                        No video tutorial available.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="mt-4 pt-4  border-t border-slate-100 dark:border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-6">
              <button
                onClick={() => handleDownload(currentQ.question_image)}
                disabled={!currentQ.question_image}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-6 py-3 rounded-lg  disabled:opacity-30 uppercase tracking-widest"
              >
                <BsDownload /> Download Image
              </button>

              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 p-1 rounded-lg">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentQuestionIdx(idx);
                      setActiveTab("question");
                      setSubmissionResult(null);
                    }}
                    className={`w-8 h-8 flex-shrink-0 flex items-center justify-center text-xs font-black rounded-md transition-all duration-300 ${
                      currentQuestionIdx === idx
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                        : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/80 rounded-xl md:p-4 md:border border-slate-100 dark:border-slate-800 shadow-sm sticky top-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              Marking System
            </h3>

            {/* Mark Buttons Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-3 mb-6 md:mb-8">
              {currentQ.marking_breakdown?.map((mb) => (
                <button
                  key={mb.id}
                  disabled={!isCurrentRevealed}
                  onClick={() => toggleMark(mb.type)}
                  className={`h-10 md:h-11 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black transition-all duration-300 border-2 ${
                    marksForCurrent.includes(mb.type)
                      ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                      : "bg-white dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/30"
                  } ${!isCurrentRevealed ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {mb.type}
                </button>
              ))}
            </div>

            {/* Progress/Selection Summary */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm">
              {!isCurrentRevealed ? (
                <div className="flex flex-col items-center text-center space-y-4 py-2">
                  <div
                    onClick={handleReveal}
                    className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  >
                    <BsLockFill className="text-blue-500 text-xl" />
                  </div>
                  <div>
                    <button
                      onClick={handleReveal}
                      className="text-sm font-bold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Reveal the mark scheme
                    </button>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[200px] mx-auto">
                      to view the marking points and self-mark your answer.
                    </p>
                  </div>

                  <div className="w-full pt-4 mt-2 border-t border-slate-50 dark:border-slate-700/50">
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Achieved
                      </p>
                      <p className="text-xl font-black text-slate-800 dark:text-slate-100">
                        0
                        <span className="text-slate-300 dark:text-slate-600 font-medium mx-1">
                          /
                        </span>
                        {currentQ.total_marks}
                      </p>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-200 dark:bg-slate-600 w-0" />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-slate-50/80 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 rounded-lg text-left w-full mt-2">
                    <BsInfoCircle className="text-slate-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      You must reveal the mark scheme before you can self-mark.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {submissionResult && (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                          Server Verified
                        </p>
                        <BsCheckCircleFill className="text-emerald-500 w-3 h-3" />
                      </div>
                      <p className="text-xl font-black text-slate-800 dark:text-white">
                        {submissionResult.score}{" "}
                        <span className="text-slate-400 font-medium">
                          / {submissionResult.total_marks}
                        </span>
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 min-h-[40px]">
                    {marksForCurrent.length > 0 ? (
                      marksForCurrent.map((mark) => (
                        <div
                          key={mark}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-900/50 text-xs font-black text-blue-600 dark:text-blue-400 uppercase animate-in zoom-in duration-200"
                        >
                          <BsCheckCircleFill className="w-3 h-3" />
                          {mark}
                        </div>
                      ))
                    ) : (
                      <p className="text-[10px] font-bold text-slate-300 uppercase italic py-2">
                        No marks selected yet
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-50 dark:border-slate-700/50">
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Achieved
                      </p>
                      <p className="text-xl font-black text-slate-800 dark:text-slate-100">
                        {marksForCurrent.length}
                        <span className="text-slate-300 dark:text-slate-600 font-medium mx-1">
                          /
                        </span>
                        {currentQ.total_marks}
                      </p>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-700 ease-out shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                        style={{
                          width: `${(marksForCurrent.length / currentQ.total_marks) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      disabled={currentQuestionIdx === 0}
                      onClick={() => {
                        setCurrentQuestionIdx((prev) => prev - 1);
                        setActiveTab("question");
                        setSubmissionResult(null);
                      }}
                      className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 font-bold rounded-lg text-xs hover:bg-slate-200 dark:hover:bg-slate-600 transition-all disabled:opacity-30 uppercase tracking-widest"
                    >
                      Prev
                    </button>
                    <button
                      disabled={isSubmitting}
                      onClick={() => {
                        if (submissionResult) {
                          if (currentQuestionIdx < questions.length - 1) {
                            setCurrentQuestionIdx((prev) => prev + 1);
                            setActiveTab("question");
                            setSubmissionResult(null);
                          }
                        } else {
                          submitQuiz({
                            marks: {
                              [currentQ.id]: marksForCurrent.length,
                            },
                          });
                        }
                      }}
                      className="flex-[2] py-3 bg-blue-500 text-white font-black rounded-lg text-xs hover:bg-blue-600 transition-all shadow-md shadow-blue-200 dark:shadow-none uppercase tracking-widest disabled:opacity-50"
                    >
                      {isSubmitting
                        ? "Saving..."
                        : submissionResult
                          ? currentQuestionIdx === questions.length - 1
                            ? "Finish"
                            : "Next"
                          : "Save"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModeQuiz;
