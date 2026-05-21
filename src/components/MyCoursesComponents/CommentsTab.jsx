import React from "react";
import { BsTrash } from "react-icons/bs";

const CommentsTab = ({ 
  user, 
  commentsData, 
  commentsLoading, 
  commentText, 
  setCommentText, 
  onCommentSubmit, 
  onCommentButtonClick, 
  isPostingComment,
  onDeleteComment
}) => {
  return (
    <div className="p-4 bg-[#f8fafc] dark:bg-gray-800 rounded-2xl border border-[#f1f5f9] dark:border-gray-700">
      <div className="flex gap-3 md:gap-4 mb-6">
        <img
          src={user?.avatar}
          alt=""
          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shrink-0"
        />

        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <div className="flex-1 bg-white dark:bg-gray-700 border border-[#e2e8f0] dark:border-gray-600 rounded-xl p-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={onCommentSubmit}
              placeholder="Write a comment..."
              className="w-full bg-transparent outline-none text-xs md:text-sm text-slate-700 dark:text-white"
              disabled={isPostingComment}
            />
          </div>
          <button
            onClick={onCommentButtonClick}
            disabled={isPostingComment || !commentText.trim()}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-500 text-white rounded-xl text-xs md:text-sm font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            Post
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {commentsLoading ? (
          <div className="text-center py-8">
            <div className="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-sm text-[#94a3b8]">
              Loading comments...
            </p>
          </div>
        ) : commentsData?.data?.length > 0 ? (
          commentsData.data.map((comment) => (
            <div key={comment.id} className="flex gap-4 group">
              <img
                src={comment.user_avatar}
                alt={comment.user_name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                      {comment.user_name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {comment.human_time}
                    </span>
                  </div>
                  
                  {/* Delete Button - Only show for owner */}
                  {comment.user_id === user?.id && (
                    <button 
                      onClick={() => onDeleteComment && onDeleteComment(comment.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1"
                      title="Delete comment"
                    >
                      <BsTrash size={14} />
                    </button>
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {comment.comment}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-[#94a3b8]">
            <p className="text-sm">
              No comments yet. Be the first to ask a question!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsTab;

