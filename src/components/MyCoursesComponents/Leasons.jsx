"use client";
import React from "react";
import Title from "../common/Title";
import { BsDownload } from "react-icons/bs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfidentIcon, NeedWoekIcon, OKIcon } from "../DashboardIcons/DashIcons";

const Leasons = () => {
  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop(); // optional: set custom filename
    link.click();
  };

  const handleSelectChange = (value) => {
    switch (value) {
      case "practice":
        handleDownload("/pdfs/practice-questions.pdf");
        break;
      case "extra":
        handleDownload("/pdfs/extra-questions.pdf");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col">
      <Title level="title32">Leasons</Title>
      <div className="flex justify-between items-center py-6">
        <div className="flex gap-4">
          <button className="py-3 px-8 rounded-xl border transition duration-300 bg-[#008000]/10 text-[#008000] font-semibold">
            Tutorial
          </button>
          <button className="py-3 px-8 rounded-xl border transition duration-300 border-[#008000]/10 text-[#008000] font-semibold">
         Quiz
          </button>
        </div>
        <div className="flex gap-4">
          <button className="py-3 px-8 rounded-xl border transition duration-300 border-Secondary flex items-center gap-2 font-semibold">
            <BsDownload />
            Template Notes Set
          </button>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px] bg-Secondary !py-3 !text-white border-Secondary outline-none ">
              <SelectValue placeholder="Question Packs" />
            </SelectTrigger>
            <SelectContent className="bg-Secondary text-white">
              <SelectGroup>
                <SelectItem value="practice" className="flex items-center gap-2">
                  <BsDownload />
                  Practice Questions Set
                </SelectItem>
                <SelectItem value="extra" className="flex items-center gap-2">
                  <BsDownload />
                  Extra Question Pack
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full h-[600px] rounded-2xl bg-gray-400"></div>
      <div className="flex gap-10 items-center">
        <Title level="title24" className="py-6">
        How do you feel about this lesson?
        </Title>
        <div className="flex gap-6">
          <div className="flex items-center gap-2"><input type="radio" /> Confident <ConfidentIcon /></div>
          <div className="flex items-center gap-2"> <input type="radio" />Okay <OKIcon /></div>
          <div className="flex items-center gap-2"> <input type="radio" />Needs Work <NeedWoekIcon /></div>
        </div>
      </div>
    </div>
  );
};

export default Leasons;
