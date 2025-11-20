import React from "react";
import blog from '../../assets/images/blog.jpg'
export default function BlogDetails() {
  return (
    <div className="section-padding-y section-padding-x">
      
      {/* Container */}
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <p className="text-sm  mb-3">
          Blog <span className="mx-1">›</span> Blog Details
        </p>

        {/* Title */}
        <h1 className="text-3xl font-semibold  mb-6 leading-snug">
          How to revise GCSE Maths effectively (UK-specific)
        </h1>

        {/* Blog Image */}
        <div className="w-full h-[380px] rounded-2xl overflow-hidden mb-8">
          <img
            src={blog}
            className="w-full h-full object-cover"
            alt="Blog"
          />
        </div>

        {/* Content Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">

          {/* Description */}
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            Description:
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Revising for GCSE Maths can feel overwhelming especially when you’re balancing school,
            homework, and other subjects. But the truth is simple: Maths isn’t about memorising.
            It’s about practising the right topics in the right way.
            <br /><br />
            This guide breaks down exactly how students in the UK can revise GCSE Maths effectively
            and steadily build their grades toward a 7–9.
          </p>

          {/* SECTION 1 */}
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            1. Start by Knowing Your Exam Board (AQA, Edexcel, OCR)
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            In the UK, your exam format matches your exam board.  
            Each board tests differently:
          </p>

          <ul className="list-disc list-inside text-slate-700 mb-6 space-y-1">
            <li>Style of questions</li>
            <li>Working marks</li>
            <li>Topic differences</li>
            <li>Mark schemes</li>
            <li>Topic difficulty</li>
            <li>Past paper layout</li>
          </ul>

          <h3 className="font-semibold text-slate-800 mb-2">What to do:</h3>
          <ul className="list-disc list-inside text-slate-700 mb-6 space-y-1">
            <li>Check your school's exam board</li>
            <li>Download the specification</li>
            <li>Build your revision plan based on your board's topics</li>
          </ul>

          <p className="text-slate-700 italic mb-10">
            Pro Tip: Maths automatically organises lessons and quizzes by topic so you never revise the wrong content.
          </p>

          {/* SECTION 2 */}
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            2. Build Your Foundation First
          </h2>

          <p className="text-slate-700 leading-relaxed mb-4">
            Most students struggle with basic topics, not advanced ones.
            Grade 8–9 students are simply stronger in foundation skills.
          </p>

          <p className="text-slate-700 leading-relaxed mb-3">Focus on:</p>

          <ul className="list-disc list-inside text-slate-700 mb-6 space-y-1">
            <li>Number skills</li>
            <li>Fractions, decimals, percentages</li>
            <li>Ratio and proportion</li>
            <li>Basic algebra</li>
            <li>Negative numbers</li>
            <li>Indices</li>
          </ul>

          <p className="text-slate-700 leading-relaxed mb-10">
            If your foundation is weak, your higher-tier topics will collapse.
            Fixing the basics often jumps students from Grade 3 → Grade 5 quickly.
          </p>

          {/* SECTION 3 */}
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            3. Use Active Revision Not Passive Learning
          </h2>

          <p className="text-slate-700 leading-relaxed mb-4">
            Active revision = solving questions.  
            Passive revision = watching videos only.
          </p>

          <p className="text-slate-700 leading-relaxed mb-3">
            You need both, but the balance should be 20% watching + 80% practice.
          </p>

          <h3 className="font-semibold text-slate-800 mb-2">Active revision includes:</h3>

          <ul className="list-disc list-inside text-slate-700 mb-6 space-y-1">
            <li>Solving exam questions</li>
            <li>Checking mark schemes</li>
            <li>Reviewing mistakes</li>
            <li>Re-doing incorrect questions</li>
            <li>Using traffic-light confidence rating (Green, Amber, Red)</li>
          </ul>

          <p className="text-slate-700 leading-relaxed mb-10">
            In Maths, every lesson has a quiz underneath so you instantly practise what you learned.
          </p>

          {/* SECTION 4 */}
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            4. Break Your Revision into Small, Daily Sessions
          </h2>

          <p className="text-slate-700 leading-relaxed mb-4">
            1–2 hours every few days is far less effective than 20–40 minutes daily.
          </p>

          <h3 className="font-semibold text-slate-800 mb-2">Why?</h3>

          <p className="text-slate-700 leading-relaxed mb-3">
            Because maths requires repetition and spaced practice.
          </p>

          <h3 className="font-semibold text-slate-800 mb-3">A sample daily plan:</h3>

          <ul className="list-disc list-inside text-slate-700 space-y-1 mb-10">
            <li>10 mins: Recap notes</li>
            <li>15–20 mins: Past paper questions</li>
            <li>5–10 mins: Complete the quiz</li>
            <li>5 mins: Review mistakes</li>
            <li>5 mins: Update your confidence tracker</li>
          </ul>

          <p className="text-slate-700 leading-relaxed">
            Small steps → big progress.
          </p>

        </div>

        {/* SECOND IMAGE */}
        <div className="w-full h-[380px] rounded-2xl overflow-hidden mt-10">
          <img
            src={blog}
            className="w-full h-full object-cover"
            alt="Blog"
          />
        </div>

      </div>
    </div>
  );
}
