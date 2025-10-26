import React, { useState } from 'react'
import Title from '../common/Title'
import Topic from '../DashboardComponents/Topic'

const Comment = () => {
     const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Shakeeb Ahmed',
      role: 'Student',
      avatar: 'https://i.pravatar.cc/150?img=12',
      text: 'Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.dolor sit amet, consectetur adipiscing elited do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      replies: []
    },
    {
      id: 2,
      author: 'Shakeeb Ahmed',
      role: 'Student',
      avatar: 'https://i.pravatar.cc/150?img=13',
      text: 'Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus.',
      replies: [
        {
          id: 21,
          placeholder: 'Add a reply...'
        }
      ]
    },
    {
      id: 3,
      author: 'Shakeeb Ahmed',
      role: 'Student',
      avatar: 'https://i.pravatar.cc/150?img=14',
      text: 'Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
      text2: 'liqua Quis ipsum suspendisse ultrices gravida Risus',
      replies: [
        {
          id: 31,
          author: 'Shakeeb Ahmed',
          avatar: 'https://i.pravatar.cc/150?img=15',
          text: 'sgsdatgwchfghkag',
          showReplyButton: true
        }
      ]
    }
  ]);

  const [activeReply, setActiveReply] = useState(null);
  const [replyText, setReplyText] = useState('');
  return (
    <div className='space-y-4'>
        <Title level="title24">Master Algebra with Confidence Build Strong Foundations for Exams</Title>
        <Title level="title18">Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.dolor sit amet, consectetur adipiscing elited do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Title>
          <div className="w-full flex flex-col lg:flex-row gap-10 mt-8 ">
        <div className="lg:w-[40%] ">
          <Topic />
        </div>
        <div className="lg:w-[60%]">
  <div className="max-w-4xl mx-auto space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white dark:bg-[#0B1120]  dark:border rounded-lg p-6 shadow-sm">
            <div className="flex gap-3">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <div className="mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{comment.author}</h3>
                  <p className="text-xs text-gray-500 dark:text-white">{comment.role}</p>
                </div>
                <p className="text-sm text-gray-700 dark:text-white mb-3 leading-relaxed">
                  {comment.text}
                </p>
                {comment.text2 && (
                  <p className="text-sm text-gray-700 dark:text-white  mb-3 leading-relaxed">
                    {comment.text2}
                  </p>
                )}
                <button 
                  onClick={() => setActiveReply(activeReply === comment.id ? null : comment.id)}
                  className="text-sm font-medium text-gray-900 hover:text-gray-700 dark:text-white transition-colors"
                >
                  Reply
                </button>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        {reply.placeholder ? (
                          <>
                            <img
                              src="https://i.pravatar.cc/150?img=16"
                              alt="User"
                              className="w-8 h-8 rounded-full flex-shrink-0"
                            />
                            <div className="flex-1 bg-gray-50 dark:bg-[#0B1120] dark:border rounded-lg px-4 py-3 text-sm text-gray-400">
                              {reply.placeholder}
                            </div>
                          </>
                        ) : (
                          <>
                            <img
                              src={reply.avatar}
                              alt={reply.author}
                              className="w-8 h-8 rounded-full flex-shrink-0"
                            />
                            <div className="flex-1 bg-gray-50 dark:bg-[#0B1120] dark:border rounded-lg px-4 py-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-sm text-gray-900  dark:text-white">
                                  {reply.author}
                                </span>
                                {reply.showReplyButton && (
                                  <button className="bg-blue-400 text-white text-xs font-medium px-4 py-1.5 rounded-full hover:bg-blue-500 transition-colors">
                                    Reply
                                  </button>
                                )}
                              </div>
                              <p className="text-sm text-gray-700 dark:text-white">{reply.text}</p>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
        </div>
      </div>
    </div>
  )
}

export default Comment