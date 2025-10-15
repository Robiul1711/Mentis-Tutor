import React from "react";
import pdf from "@/assets/2020.pdf";
const pastPapersData = [
  {
    year: "2023",
    papers: [
      { name: "P1", link: pdf },
      { name: "P3", link: pdf },
      { name: "P2", link: pdf },
    ],
  },
  {
    year: "2022",
    papers: [
      { name: "P1", link: pdf },
      { name: "P2", link: pdf },
    ],
  },
  {
    year: "2021",
    papers: [
      { name: "P1", link: pdf },
      { name: "P2", link: pdf },
      { name: "P3", link: pdf },
    ],
  },
];

const PastPaper = () => {
  // Function to open PDF in a new tab
  const handleOpenPdf = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-4">
      {pastPapersData.map((item, index) => (
        <div
          key={index}
          className="p-4 bg-white dark:bg-[#0B1120] dark:text-white rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition"
        >
          {/* Year */}
          <h1 className="text-xl font-semibold">{item.year}</h1>

          {/* Papers */}
          <div className="flex gap-2 items-center flex-wrap">
            {item.papers.map((paper, i) => (
              <button
                key={i}
                onClick={() => handleOpenPdf(paper.link)}
                className="bg-Secondary hover:bg-blue-700 px-3 py-1.5 rounded-md text-white text-sm transition"
              >
                {paper.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PastPaper;
