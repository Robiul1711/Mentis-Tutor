import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import CommonButton from "../common/CommonButton";

const scheduleData = [
  { day: "Saturday", start: "8:30 AM", end: "10:30 AM", lesson: "Algebra" },
  { day: "Sunday", start: "10:30 AM", end: "12:30 PM", lesson: "Number" },
  { day: "Monday", start: "12:30 PM", end: "2:30 PM", lesson: "Graphs" },
  { day: "Tuesday", start: "2:30 PM", end: "4:30 PM", lesson: "Ratio" },
  { day: "Wednesday", start: "4:30 PM", end: "6:30 PM", lesson: "Geometry" },
  { day: "Thursday", start: "8:30 AM", end: "10:30 AM", lesson: "Pythagoras" },
  { day: "Friday", start: "10:30 AM", end: "12:30 PM", lesson: "Probability" },
];

const lessons = [
  "Algebra",
  "Number",
  "Graphs",
  "Ratio",
  "Geometry",
  "Pythagoras",
  "Probability",
];

// Time options for selection
const timeOptions = [
  "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"
];

export default function ClassScheduleDialog() {
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState(scheduleData);

  const handleLessonChange = (index, newLesson) => {
    const updated = [...schedule];
    updated[index].lesson = newLesson;
    setSchedule(updated);
  };

  const handleTimeChange = (index, field, newTime) => {
    const updated = [...schedule];
    updated[index][field] = newTime;
    setSchedule(updated);
  };

  const handleSubmit = () => {
    console.log("Schedule submitted:", schedule);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CommonButton className="bg-Primary">
          Create New Schedule +
        </CommonButton>
      </DialogTrigger>

      <DialogContent className="max-w-[900px] w-full bg-[#f5f1e8] dark:bg-[#0B1120] rounded-lg border-none shadow-xl p-0">
        <DialogHeader className="flex justify-between items-center px-8 py-4 border-b">
          <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-white">
            Class Schedule
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-5 pt-4">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-4 font-semibold text-sm sm:text-base text-white text-center">
            <div className="bg-[#2c5271] py-2 rounded">Day</div>
            <div className="bg-[#2c5271] py-2 rounded">Start Time</div>
            <div className="bg-[#2c5271] py-2 rounded">End Time</div>
            <div className="bg-[#2c5271] py-2 rounded">Lesson</div>
          </div>

          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
            {schedule.map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
                {/* Day */}
                <div className="bg-white dark:bg-[#0B1120] dark:border rounded px-4 py-3">
                  {item.day}
                </div>

                {/* Start Time */}
                <div className="bg-white dark:bg-[#0B1120] dark:border rounded">
                  <Select
                    value={item.start}
                    onValueChange={(value) =>
                      handleTimeChange(index, "start", value)
                    }
                  >
                    <SelectTrigger className="border-none w-full bg-transparent !h-full px-4 text-xs">
                      <SelectValue placeholder="Start" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* End Time */}
                <div className="bg-white dark:bg-[#0B1120] dark:border rounded">
                  <Select
                    value={item.end}
                    onValueChange={(value) =>
                      handleTimeChange(index, "end", value)
                    }
                  >
                    <SelectTrigger className="border-none w-full bg-transparent !h-full px-4 text-xs">
                      <SelectValue placeholder="End" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Lesson */}
                <div className="bg-white dark:bg-[#0B1120] dark:border rounded">
                  <Select
                    value={item.lesson}
                    onValueChange={(value) =>
                      handleLessonChange(index, value)
                    }
                  >
                    <SelectTrigger className="border-none w-full bg-transparent !h-full px-4 text-xs">
                      <SelectValue placeholder="Select lesson" />
                    </SelectTrigger>
                    <SelectContent>
                      {lessons.map((lesson) => (
                        <SelectItem key={lesson} value={lesson}>
                          {lesson}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full"
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
