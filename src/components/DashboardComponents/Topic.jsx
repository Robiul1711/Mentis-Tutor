import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Topic = ({ data, onVideoSelect }) => {
  console.log(data);
  return (
    <div className="flex w-full">
      <Accordion className="space-y-2 w-full" type="single" collapsible>
        {data?.map((section, index) => (
          <div
            key={index}
            className="border rounded-lg md:rounded-xl overflow-hidden  "
          >
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-none px-4 bg-white dark:bg-[#0B1120] dark:text-white "
            >
              <AccordionTrigger className="font-medium md:text-lg xl:text-xl flex items-center gap-5 ">
                <span>{section.title}</span>
                <span className="ml-auto text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                  {section.videos?.length || 0} Lessons
                </span>
              </AccordionTrigger>

              <AccordionContent className="sm:text-base space-y-3">
                {section.videos?.map((video, i) => (
                  <div
                    key={video.id}
                    onClick={() => onVideoSelect && onVideoSelect(video)}
                    className="flex items-start gap-3 py-1 cursor-pointer hover:underline"
                  >
                    <span className="font-semibold text-secondaryColor">
                      {i + 1}.
                    </span>
                    <span className="flex-1 text-gray-700 dark:text-gray-300">
                      {video.title}
                    </span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default Topic;
