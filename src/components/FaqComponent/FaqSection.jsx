import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CategoryFaqs = [
  {
    id: 1,
    category: "Pricing & Free Trial ",
    faqs: [
      {
        question: "Do I need an account to browse listings?",
        answer:
          "No, you can browse freely. An account is only required to post ads or contact sellers.",
      },
      {
        question: "Are the listings verified?",
        answer:
          "Yes, we encourage verified sellers and professional dealers, but private users can also post.",
      },
      {
        question: "Can I compare vehicles?",
        answer:
          "Yes, you can select up to 2 listings and compare their details side by side.",
      },
      {
        question: "What kind of vehicles can I list?",
        answer: "You can list cars, bikes, vans, and more.",
      },
      {
        question: "Can I edit my ad after publishing?",
        answer: "Yes, you can update or modify your ad at any time.",
      },
    ],
  },
  {
    id: 2,
    category: "Support",
    faqs: [
      {
        question: "How can I make payments?",
        answer:
          "We accept credit cards, debit cards, PayPal, and other secure online payment methods.",
      },
      {
        question: "Is the payment facility safe?",
        answer:
          "Absolutely. All payments are encrypted and securely processed through trusted gateways.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "Refunds depend on the service type. Contact support to check eligibility.",
      },
    ],
  },
  {
    id: 3,
    category: "Grade Levels",
    faqs: [
      {
        question: "How do I track my order?",
        answer:
          "You can track your order from your dashboard under the Orders section.",
      },
      {
        question: "Can I cancel my order?",
        answer:
          "Yes, cancellations are allowed before the order is marked as shipped.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Delivery typically takes 3–7 business days depending on your location.",
      },
    ],
  },
    {
    id: 4,
    category: "Parents",
    faqs: [
      {
        question: "How do I track my order?",
        answer:
          "You can track your order from your dashboard under the Orders section.",
      },
      {
        question: "Can I cancel my order?",
        answer:
          "Yes, cancellations are allowed before the order is marked as shipped.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Delivery typically takes 3–7 business days depending on your location.",
      },
    ],
  },
  {
    id: 5,
    category: "Commitment ",
    faqs: [
      {
        question: "What if I forget my password?",
        answer:
          "You can reset your password using the 'Forgot Password' link on the login page.",
      },
      {
        question: "How do I report a bug?",
        answer:
          "Please contact our support team with details of the issue you encountered.",
      },
        {question: "Why am I experiencing slow loading times?",
        answer:
          "Slow loading times can be due to various factors including internet speed, server load, or browser issues. Try clearing your cache or using a different browser.",
    },
    ],
  }
];

const FaqSection = () => {
  const [activeCategory, setActiveCategory] = useState(CategoryFaqs[0]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Category Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        {CategoryFaqs.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat)}
            className={`md:py-3 md:px-8 py-2 px-5 rounded-full border transition duration-300 
              ${
                activeCategory.id === cat.id
                  ? "bg-Secondary text-white border-Secondary"
                  : "bg-white border-gray-300 text-slate-700 hover:bg-slate-100"
              }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <Accordion
        className="space-y-3 md:space-y-4"
        type="single"
        collapsible
      >
        {activeCategory.faqs.map((faq, index) => (
          <div
            key={index}
            className="text-white border border-gray-200 bg-Secondary  rounded-xl px-4 py-2 shadow-sm"
          >
            <AccordionItem value={`item-${index}`} className="border-none">
              <AccordionTrigger className="font-semibold text-lg ">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className=" text-[15px] leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqSection;
