import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const AllTopics = [
  {
    topic: "Section One — Number",
    numberOfchapter: "11",
    chapters: [
      { id: 1, question: "Types of Number and BODMAS" },
      { id: 2, question: "Multiples, Factors and Prime Factors" },
      { id: 3, question: "LCM and HCF" },
      { id: 4, question: "Fractions" },
      { id: 5, question: "Fractions, Decimals and Percentages" },
      { id: 6, question: "Fractions and Recurring Decimals" },
      { id: 7, question: "Rounding Numbers" },
      { id: 8, question: "Estimating" },
      { id: 9, question: "Bounds" },
      { id: 10, question: "Standard Form" },
      { id: 11, question: "Revision Questions for Section One" }
    ]
  },
  {
    topic: "Section Two — Algebra",
    numberOfchapter: "19",
    chapters: [
      { id: 1, question: "Algebra Basics" },
      { id: 2, question: "Powers and Roots" },
      { id: 3, question: "Multiplying Out Brackets" },
      { id: 4, question: "Factors" },
      { id: 5, question: "Manipulating Surds" },
      { id: 6, question: "Solving Equations" },
      { id: 7, question: "Rearranging Formulas" },
      { id: 8, question: "Factorising Quadratics" },
      { id: 9, question: "The Quadratic Formula" },
      { id: 10, question: "Completing the Square" },
      { id: 11, question: "Algebraic Fractions" },
      { id: 12, question: "Sequences" },
      { id: 13, question: "Inequalities" },
      { id: 14, question: "Graphical Inequalities" },
      { id: 15, question: "Iterative Methods" },
      { id: 16, question: "Simultaneous Equations" },
      { id: 17, question: "Proof" },
      { id: 18, question: "Functions" },
      { id: 19, question: "Revision Questions for Section Two" }
    ]
  },
  {
    topic: "Section Three — Graphs",
    numberOfchapter: "14",
    chapters: [
      { id: 1, question: "Straight Lines and Gradients" },
      { id: 2, question: "y = mx + c" },
      { id: 3, question: "Drawing Straight Line Graphs" },
      { id: 4, question: "Coordinates and Ratio" },
      { id: 5, question: "Parallel and Perpendicular Lines" },
      { id: 6, question: "Quadratic Graphs" },
      { id: 7, question: "Harder Graphs" },
      { id: 8, question: "Solving Equations Using Graphs" },
      { id: 9, question: "Graph Transformations" },
      { id: 10, question: "Real-Life Graphs" },
      { id: 11, question: "Distance-Time Graphs" },
      { id: 12, question: "Velocity-Time Graphs" },
      { id: 13, question: "Gradients of Real-Life Graphs" },
      { id: 14, question: "Revision Questions for Section Three" }
    ]
  },
  {
    topic: "Section Four — Ratio, Proportion and Rates of Change",
    numberOfchapter: "7",
    chapters: [
      { id: 1, question: "Ratios" },
      { id: 2, question: "Direct and Inverse Proportion" },
      { id: 3, question: "Percentages" },
      { id: 4, question: "Compound Growth and Decay" },
      { id: 5, question: "Unit Conversions" },
      { id: 6, question: "Speed, Density and Pressure" },
      { id: 7, question: "Revision Questions for Section Four" }
    ]
  },
  {
    topic: "Section Five — Geometry and Measures",
    numberOfchapter: "19",
    chapters: [
      { id: 1, question: "Geometry" },
      { id: 2, question: "Parallel Lines" },
      { id: 3, question: "Geometry Problems" },
      { id: 4, question: "Polygons" },
      { id: 5, question: "Triangles and Quadrilaterals" },
      { id: 6, question: "Circle Geometry" },
      { id: 7, question: "Congruent Shapes" },
      { id: 8, question: "Similar Shapes" },
      { id: 9, question: "The Four Transformations" },
      { id: 10, question: "Area – Triangles and Quadrilaterals" },
      { id: 11, question: "Area – Circles" },
      { id: 12, question: "3D Shapes – Surface Area" },
      { id: 13, question: "3D Shapes – Volume" },
      { id: 14, question: "More Enlargements and Projections" },
      { id: 15, question: "Triangle Construction" },
      { id: 16, question: "Loci and Construction" },
      { id: 17, question: "Loci and Construction – Worked Examples" },
      { id: 18, question: "Bearings" },
      { id: 19, question: "Revision Questions for Section Five" }
    ]
  },
  {
    topic: "Section Six — Pythagoras and Trigonometry",
    numberOfchapter: "9",
    chapters: [
      { id: 1, question: "Pythagoras' Theorem" },
      { id: 2, question: "Trigonometry – Sin, Cos, Tan" },
      { id: 3, question: "Trigonometry – Examples" },
      { id: 4, question: "Trigonometry – Common Values" },
      { id: 5, question: "The Sine and Cosine Rules" },
      { id: 6, question: "3D Pythagoras" },
      { id: 7, question: "3D Trigonometry" },
      { id: 8, question: "Vectors" },
      { id: 9, question: "Revision Questions for Section Six" }
    ]
  },
  {
    topic: "Section Seven — Probability and Statistics",
    numberOfchapter: "18",
    chapters: [
      { id: 1, question: "Probability Basics" },
      { id: 2, question: "Counting Outcomes" },
      { id: 3, question: "Probability Experiments" },
      { id: 4, question: "The AND / OR Rules" },
      { id: 5, question: "Tree Diagrams" },
      { id: 6, question: "Conditional Probability" },
      { id: 7, question: "Sets and Venn Diagrams" },
      { id: 8, question: "Sampling and Data Collection" },
      { id: 9, question: "Mean, Median, Mode and Range" },
      { id: 10, question: "Frequency Tables – Finding Averages" },
      { id: 11, question: "Grouped Frequency Tables" },
      { id: 12, question: "Box Plots" },
      { id: 13, question: "Cumulative Frequency" },
      { id: 14, question: "Histograms and Frequency Density" },
      { id: 15, question: "Scatter Graphs" },
      { id: 16, question: "Other Graphs and Charts" },
      { id: 17, question: "Comparing Data Sets" },
      { id: 18, question: "Revision Questions for Section Seven" }
    ]
  },
 
];

const Topic = () => {
  return (
    <div className="flex w-full">
      <Accordion className="space-y-2 w-full" type="single" collapsible>
        {AllTopics.map((topics, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border rounded-lg md:rounded-2xl px-4 bg-white dark:bg-[#0B1120] dark:text-white"
          >
            <AccordionTrigger className="font-medium md:text-lg lg:text-xl flex items-center gap-5 no-underline hover:no-underline">
              <span>{topics.topic}</span>
              <span className="ml-auto  bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                {topics.numberOfchapter}
              </span>
            </AccordionTrigger>

            <AccordionContent className="sm:text-base space-y-3">
              {topics.chapters.map((chapter, i) => (
                <div key={chapter.id} className="flex items-start gap-3">
                  <span className="font-semibold">{i + 1}.</span>
                  <span className="flex-1">{chapter.question}</span>
                  <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                   0 {chapter.confidence}%
                  </span>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Topic;
