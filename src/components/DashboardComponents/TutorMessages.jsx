import React from "react";
import { Link } from "react-router-dom";
import { MessageIcon } from "../DashboardIcons/DashIcons";

const TutorMessages = ({ tutorMessages }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          Tutor Messages
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#E7F7F1] rounded-xl flex items-center justify-center text-[#4FC29C]">
            <MessageIcon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Message from {tutorMessages.sender_name}
            </h4>
            <p className="text-sm text-slate-500">
              {tutorMessages.humanize_date}
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
          "{tutorMessages.message}"
        </p>

        <Link
          to="/dashboard/message"
          className="w-full block text-center bg-Secondary hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-Secondary/20"
        >
          {tutorMessages.open_messages_label || "Open Messages"}
        </Link>
      </div>
    </div>
  );
};

export default TutorMessages;
