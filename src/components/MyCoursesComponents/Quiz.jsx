import React, { useState } from 'react'
import Title from '../common/Title'
import Topic from '../DashboardComponents/Topic'

const Quiz = () => {
  const questions = [
    {
      id: 1,
      question: "A triangle has sides 3 cm, 4 cm, and 5 cm. What type of triangle is this?",
      options: ["Isosceles", "Equilateral", "Right-angled", "Scalene"],
      correct: "Right-angled"
    },
    {
      id: 2,
      question: "What is the value of 5²?",
      options: ["10", "15", "20", "25"],
      correct: "25"
    },
    {
      id: 3,
      question: "Which of the following is a prime number?",
      options: ["4", "6", "9", "13"],
      correct: "13"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = selected;
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(updatedAnswers[currentQuestion + 1] || "");
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelected(answers[currentQuestion - 1] || "");
    }
  };

  const calculateScore = () => {
    return answers.filter((ans, index) => ans === questions[index].correct).length;
  };

  if (showResult) {
    return (
      <div className="bg-white dark:bg-[#0B1120] shadow-lg p-8 rounded-2xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Quiz Result</h2>
        <p className="text-lg">You scored <b>{calculateScore()}</b> out of <b>{questions.length}</b></p>

        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={q.id} className="p-4 border rounded-lg">
              <p className="font-medium">{index + 1}. {q.question}</p>
              <p>Your answer: <span className={answers[index] === q.correct ? "text-green-600" : "text-red-600"}>
                {answers[index] || "Not answered"}
              </span></p>
              {answers[index] !== q.correct && (
                <p>Correct answer: <span className="text-green-600">{q.correct}</span></p>
              )}
            </div>
          ))}
        </div>

        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-4 '>
      {/* <Title level="title32" className=" dark:text-white ">Take a Quick Quiz</Title> */}
   
    
        <div className=" bg-white dark:bg-[#0B1120] dark:border rounded-2xl shadow-lg p-6">
          <h2 className="text-lg mb-6">Q{currentQuestion + 1}. {questions[currentQuestion].question}</h2>

          <div className="space-y-3 mb-6">
            {questions[currentQuestion].options.map((option, i) => (
              <button
                key={i}
                onClick={() => setSelected(option)}
                className={`w-full p-4 border rounded-lg text-left transition ${
                  selected === option ? "bg-blue-50 border-blue-500 dark:text-black" : "bg-white dark:border   dark:bg-[#0B1120]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="px-6 py-2 border rounded-lg"
              disabled={currentQuestion === 0}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!selected}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            >
              {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
     
    </div>
  );
};

export default Quiz;
