import React, { useState } from "react";
import Title from "../common/Title";
import Topic from "../DashboardComponents/Topic";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";

const Quiz = ({ quizData }) => {
  // Use the first quiz from the array if available
  const activeQuiz = quizData && quizData.length > 0 ? quizData[0] : null;
  const questions = activeQuiz ? activeQuiz.questions : [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(""); // Stores option ID or content
  const [answers, setAnswers] = useState({}); // Map question ID to answer object
  const [showResult, setShowResult] = useState(false);
  const [apiResult, setApiResult] = useState(null);

  const axiosSecure = useAxiosSecure();

  const { mutate: submitQuiz, isPending } = useMutation({
    mutationFn: async (submittedAnswers) => {
      if (!activeQuiz?.id) throw new Error("No quiz ID found");

      const response = await axiosSecure.post(
        `/quizzes/submit/${activeQuiz.id}`,
        null, // No body content as per requirement
        {
          params: { answers: submittedAnswers },
        },
      );
      return response.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast("Submitting quiz...");
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      updateToastSuccess(
        context.toastId,
        data.message || "Quiz submitted successfully!",
      );
      setApiResult(data);
      setShowResult(true);
    },
    onError: (error, variables, context) => {
      const message = error?.response?.data?.message || "Failed to submit quiz";
      updateToastError(context.toastId, message);
    },
  });

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white dark:bg-[#0B1120] shadow-lg p-8 rounded-2xl text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          No Quiz Available
        </h2>
        <p className="text-gray-500 mt-2">
          There is no quiz associated with this lesson yet.
        </p>
      </div>
    );
  }

  const handleNext = () => {
    // Save answer for current question
    const currentQ = questions[currentQuestion];
    const updatedAnswers = {
      ...answers,
      [currentQ.id]: selected,
    };

    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Load existing answer if going back/forward
      const nextQId = questions[currentQuestion + 1].id;
      setSelected(updatedAnswers[nextQId] || "");
    } else {
      // Submit the quiz
      submitQuiz(updatedAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      const prevQId = questions[currentQuestion - 1].id;
      setCurrentQuestion(currentQuestion - 1);
      setSelected(answers[prevQId] || "");
    }
  };

  if (showResult && apiResult) {
    const { results, message } = apiResult;

    // Parse the score from the message if needed, or if API provided a score field.
    // Assuming message format "You scored X out of Y"

    return (
      <div className="bg-white dark:bg-[#0B1120] shadow-lg p-8 rounded-2xl space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Quiz Result
        </h2>
        <p className="text-lg font-semibold">{message}</p>

        <div className="space-y-4">
          {results &&
            results.map((res, index) => {
              const isCorrect = res.status === "correct";

              return (
                <div
                  key={index}
                  className={`p-4 border rounded-lg ${isCorrect ? "border-green-200 bg-green-50 dark:bg-green-900/20" : "border-red-200 bg-red-50 dark:bg-red-900/20"}`}
                >
                  <p className="font-medium mb-2">
                    {index + 1}. {res.question}
                  </p>
                  <p>
                    Your answer:{" "}
                    <span
                      className={`font-semibold ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {res.your_answer}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p>
                      Correct answer:{" "}
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        {res.correct_answer}
                      </span>
                    </p>
                  )}
                </div>
              );
            })}
        </div>

        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-600 transition"
          onClick={() => {
            setShowResult(false);
            setApiResult(null);
            setCurrentQuestion(0);
            setAnswers({});
            setSelected("");
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="space-y-4 ">
      <div className=" bg-white dark:bg-[#0B1120] dark:border rounded-2xl shadow-lg p-6">
        <h2 className="text-lg mb-6">
          Q{currentQuestion + 1}. {currentQ.question}
        </h2>

        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, i) => (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`w-full p-4 border rounded-lg text-left transition ${
                selected === option.id
                  ? "bg-blue-50 border-blue-500 dark:text-black"
                  : "bg-white dark:border   dark:bg-[#0B1120]"
              }`}
            >
              {option.option}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-2 border rounded-lg disabled:opacity-50"
            disabled={currentQuestion === 0 || isPending}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={(activeQuiz && selected === "") || isPending}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
          >
            {isPending && (
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            )}
            {currentQuestion === questions.length - 1
              ? isPending
                ? "Submitting..."
                : "Submit"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
