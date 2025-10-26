import React, { useState } from 'react'
import Leasons from '../MyCoursesComponents/Leasons'
import Overview from '../MyCoursesComponents/Overview'
import Quiz from '../MyCoursesComponents/Quiz'
import Resource from '../MyCoursesComponents/Resource'
import Comment from '../MyCoursesComponents/Comment'
import Topic from '../DashboardComponents/Topic'

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Common button style
  const tabButton = (tab) =>
    `md:py-3 md:px-8 sm:py-2 sm:px-4 py-0.5 px-4 rounded-full border transition duration-300 ${
      activeTab === tab
        ? 'bg-Secondary text-white'
        : 'bg-white text-black hover:bg-gray-100'
    }`;

  return (
    <div>
      <Leasons />
      <div className='flex flex-wrap gap-4 md:gap-6 my-4 md:py-8'>
        <button onClick={() => setActiveTab('overview')} className={tabButton('overview')}>Overview</button>
        <button onClick={() => setActiveTab('resource')} className={tabButton('resource')}>Resource</button>
        {/* <button onClick={() => setActiveTab('quiz')} className={tabButton('quiz')}>Quiz</button> */}
        <button onClick={() => setActiveTab('comments')} className={tabButton('comments')}>Comments</button>
      </div>

      <div>
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'resource' && <Resource />}
        {/* {activeTab === 'quiz' && <Quiz />} */}
        {activeTab === 'comments' && <Comment />}
      </div>

    </div>
  )
}

export default MyCourses
