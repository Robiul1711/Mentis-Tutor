import pdf from "@/assets/2020.pdf";

const AllPastPapers = () => {
  const questions = [
    ["QUESTION 1", "QUESTION 6", "QUESTION 11", "QUESTION 16"],
    ["QUESTION 2", "QUESTION 7", "QUESTION 12", "QUESTION 17"],
    ["QUESTION 3", "QUESTION 8", "QUESTION 13", "QUESTION 18"],
    ["QUESTION 4", "QUESTION 9", "QUESTION 14", "QUESTION 19"],
    ["QUESTION 5", "QUESTION 10", "QUESTION 15", "QUESTION 20"],
  ];

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold dark:text-white">
          Practice with Past Papers
        </h1>
        <p className="text-lg mt-2">
          Revise with real exam papers to strengthen your understanding and
          improve performance.
        </p>
      </div>

      <div className="py-8 px-6">
        <div className="space-y-4">
          {questions.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap gap-6 md:gap-8">
              {row.map((question, colIndex) => (
                <div
                  key={colIndex}
                  onClick={() => window.open(pdf, "_blank")}
                  className="flex-1 min-w-[140px] max-w-[180px] group cursor-pointer transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-4 text-center shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300 group-hover:from-blue-50 group-hover:to-indigo-100">
                    <span className="text-gray-800 font-semibold text-lg tracking-wide">
                      {question}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPastPapers;

