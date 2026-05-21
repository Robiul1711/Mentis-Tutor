import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useApiQuery } from "@/hooks/apiQuery";

const FaqSection = () => {
  // 1. Fetch Categories
  const { data: catResponse, isLoading: catsLoading } = useApiQuery({
    queryKey: ["faq-categories"],
    url: "/faq-categories",
  });

  // 2. Fetch All FAQs
  const { data: faqResponse, isLoading: faqsLoading } = useApiQuery({
    queryKey: ["faq-data"],
    url: "/faqs",
  });

  const [activeCategoryId, setActiveCategoryId] = useState(null);

  // 3. Set default category once data loads
  useEffect(() => {
    if (catResponse?.data?.length > 0 && !activeCategoryId) {
      setActiveCategoryId(catResponse.data[0].id);
    }
  }, [catResponse, activeCategoryId]);

  if (catsLoading || faqsLoading) {
    return <div className="text-center py-10">Loading FAQs...</div>;
  }

  // 4. Filter FAQs based on active category ID
  const filteredFaqs = faqResponse?.data?.filter(
    (faq) => faq.category_id === activeCategoryId
  ) || [];

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Category Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        {catResponse?.data?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategoryId(cat.id)}
            className={`md:py-3 md:px-8 py-2 px-5 rounded-full border transition duration-300 
              ${
                activeCategoryId === cat.id
                  ? "bg-Secondary text-white border-Secondary"
                  : "bg-white border-gray-300 text-slate-700 hover:bg-slate-100"
              }`}
          >
            {cat.title || cat.category}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <Accordion
        className="space-y-3 md:space-y-4"
        type="single"
        collapsible
      >
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="text-white border border-gray-200 dark:border-slate-800 bg-Secondary dark:bg-slate-800 rounded-xl px-4 py-2 shadow-sm"
            >
              <AccordionItem value={`item-${faq.id}`} className="border-none">
                <AccordionTrigger className="font-semibold text-lg text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed">
                  {/* Using dangerouslySetInnerHTML because your API returns <p> tags */}
                  <div 
                    dangerouslySetInnerHTML={{ __html: faq.answer }} 
                    className="prose-invert"
                  />
                </AccordionContent>
              </AccordionItem>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No questions found for this category.</p>
        )}
      </Accordion>
    </div>
  );
};

export default FaqSection;