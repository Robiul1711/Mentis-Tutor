import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const AllTopics = [
  {
    topic: "Section One - Number System",
    numberOfchapter: "3/11",
    chapters: [
      {
        id: 1,
        question: "What is a prime number and how do you identify it?",
        confidence: 85
      },
      {
        id: 2,
        question: "Explain the difference between even and odd numbers.",
        confidence: 70
      },
      {
        id: 3,
        question: "What are rational and irrational numbers?",
        confidence: 60
      }
    ]
  },
  {
    topic: "Section Two - Algebra",
    numberOfchapter: "2/9",
    chapters: [
      {
        id: 1,
        question: "What is a linear equation with one variable?",
        confidence: 78
      },
      {
        id: 2,
        question: "Explain the concept of algebraic expressions.",
        confidence: 65
      }
    ]
  },
  {
    topic: "Section Three - Geometry",
    numberOfchapter: "4/12",
    chapters: [
      {
        id: 1,
        question: "Define different types of angles with examples.",
        confidence: 90
      },
      {
        id: 2,
        question: "What is the Pythagorean theorem?",
        confidence: 95
      },
      {
        id: 3,
        question: "Explain types of triangles based on sides.",
        confidence: 80
      },
      {
        id: 4,
        question: "What is the area of a circle formula?",
        confidence: 88
      }
    ]
  }
];

const Topic = () => {
  return (
    <div className='flex w-full'>
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
                  <span
                    className="text-xs px-2 py-1 rounded bg-green-100 text-green-700"
                  >
                    {chapter.confidence}%
                  </span>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Topic;
