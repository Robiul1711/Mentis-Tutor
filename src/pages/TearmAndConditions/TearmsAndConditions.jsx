import Title from "@/components/common/Title";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Data = [
  {
    id: 1,
    question: " Acceptance of Terms",
    answer: (
      <>
        Your use of our website is governed by the following terms and conditions
        (“Terms of Use”), as well as the CARDONE CAPITAL Privacy Policy and other
        operating rules...
      </>
    ),
  },
  {
    id: 2,
    question: "How much does it cost to live here?",
    answer: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Clean, well-maintained spaces</li>
        <li>Essential utilities</li>
        <li>Laundry access</li>
        <li>Easy online payment options</li>
      </ul>
    ),
  },
  {
    id: 3,
    question: "Services Provided",
    answer: (
      <>
        Mentis provides access to GCSE Maths learning resources, including:
        <br />
        <br />• Video lessons
        <br />• Practice quizzes
        <br />• Progress tracking tools
        <br />• 1-to-1 tutor support and live sessions (where applicable)
        <br />
        <br />
        Services may be updated or modified at any time to improve your learning
        experience.
      </>
    ),
  },
  {
    id: 4,
    question: " Communication",
    answer: (
      <>
        CARDONE CAPITAL is not a broker-dealer or placement agent...
      </>
    ),
  },
  {
    id: 5,
    question: "How can I make payments?",
    answer:
      "We accept a wide range of payment methods, including credit cards, debit cards, and PayPal. You can also make payments online through our secure payment gateway.",
  },
  {
    id: 6,
    question: " Is the facility safe?",
    answer:
      "We understand that circumstances may change. If you need to cancel, please contact our support team to discuss your options.",
  },
  {
    id: 7,
    question: "Where are you located?",
    answer:
      "We understand that circumstances may change. If you need to cancel, please contact our support team to discuss your options.",
  },
];

const TearmsAndConditions = () => {
  return (
    <div className="section-padding-x py-16">
      {/* Top Title */}
      <div className="flex flex-col gap-4 max-w-[1200px] mx-auto text-center">
        <Title level="title48">Terms and Conditions – Mentis</Title>
        <Title level="title20">
          Welcome to Mentis, an online learning platform designed to help
          students prepare for their GCSE Maths exams. By using our website,
          resources, and services, you agree to the following Terms and
          Conditions. Please read them carefully.
        </Title>
      </div>

      {/* Accordion */}
      <div className="max-w-6xl mx-auto mt-14">
        <Accordion type="single" collapsible className="space-y-6">
          {Data.map((item) => (
            <AccordionItem
              key={item.id}
              value={`item-${item.id}`}
              className="rounded-lg bg-[#fff] dark:bg-[#111827] px-4 text-black dark:text-white border-l-4 border-Primary"
            >
              <AccordionTrigger className="text-sm sm:text-base md:text-xl lg:text-2xl">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default TearmsAndConditions;
