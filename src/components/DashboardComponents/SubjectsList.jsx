import React from "react";
import { getSubjectIcon } from "./subjectIcons";

const SubjectsList = ({ subjects, onSectionChange, courseId }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
      {subjects.map((subject) => {
        const iconConfig = getSubjectIcon(subject.title);
        const isActive = subject.isActive;

        return (
          <div
            key={subject.id}
            className="flex flex-col items-center min-w-[120px] cursor-pointer"
            onClick={() =>
              onSectionChange({
                section_title: subject.title,
                course_id: courseId,
              })
            }
          >
            <div
              className={`w-full flex items-center gap-2.5 py-2 px-2 rounded-lg xl:rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md active:scale-[0.97] ${
                isActive
                  ? "bg-Primary border-Primary/20 text-white"
                  : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800"
              }`}
            >
              {/* Icon container - small rounded square with colored bg */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${
                  isActive
                    ? "bg-white/20 text-white"
                    : `${iconConfig.bg} ${iconConfig.text}`
                }`}
              >
                {iconConfig.icon}
              </div>
              <span
                className={`font-semibold text-sm whitespace-nowrap ${
                  isActive
                    ? "text-white"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                {subject.title}
              </span>
            </div>
            {subject.lessons && (
              <span className="text-xs text-slate-400 mt-1.5 whitespace-nowrap">
                {subject.lessons}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SubjectsList;
