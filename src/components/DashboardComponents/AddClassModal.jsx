import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
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
import { useApiMutation } from "@/hooks/apiMutation";

const dayOptions = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const initialSchedule = [
  {
    day: "Saturday",
    lesson: "",
    start_time: "09:00 AM",
    end_time: "12:00 PM",
  },
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
  "6:00 AM",
  "6:30 AM",
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
];

export default function ClassScheduleDialog() {
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState(initialSchedule);

  const handleDayChange = (index, newDay) => {
    const updated = [...schedule];
    updated[index].day = newDay;
    setSchedule(updated);
  };

  const handleAddRow = () => {
    setSchedule([
      ...schedule,
      {
        day: "Saturday",
        lesson: "",
        start_time: "09:00 AM",
        end_time: "12:00 PM",
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    if (schedule.length > 1) {
      const updated = schedule.filter((_, i) => i !== index);
      setSchedule(updated);
    }
  };

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

  const { mutate, isPending } = useApiMutation({
    url: "/class-schedules",
    method: "POST",
    secure: true,
    invalidateKeys: ["class-schedule"],
    successMessage: "Class Schedule created successfully",
  });

  const handleSubmit = () => {
    mutate(schedule);
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
          <div className="grid grid-cols-5 gap-2 sm:gap-4 mb-4 font-semibold text-sm sm:text-base text-white text-center">
            <div className="bg-[#2c5271] py-2 rounded">Day</div>
            <div className="bg-[#2c5271] py-2 rounded">Start Time</div>
            <div className="bg-[#2c5271] py-2 rounded">End Time</div>
            <div className="bg-[#2c5271] py-2 rounded">Lesson</div>
            <div className="bg-[#2c5271] py-2 rounded">Action</div>
          </div>

          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
            {schedule.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-5 gap-2 sm:gap-4 text-xs sm:text-sm items-center"
              >
                {/* Day */}
                <div className="bg-white dark:bg-[#0B1120] dark:border rounded">
                  <Select
                    value={item.day}
                    onValueChange={(value) => handleDayChange(index, value)}
                  >
                    <SelectTrigger className="border-none w-full bg-transparent h-full! px-4 text-xs">
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {dayOptions.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Start Time */}
                <div className="bg-white dark:bg-[#0B1120] dark:border rounded">
                  <Select
                    value={item.start_time}
                    onValueChange={(value) =>
                      handleTimeChange(index, "start_time", value)
                    }
                  >
                    <SelectTrigger className="border-none w-full bg-transparent h-full! px-4 text-xs">
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
                    value={item.end_time}
                    onValueChange={(value) =>
                      handleTimeChange(index, "end_time", value)
                    }
                  >
                    <SelectTrigger className="border-none w-full bg-transparent h-full! px-4 text-xs">
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
                    onValueChange={(value) => handleLessonChange(index, value)}
                  >
                    <SelectTrigger className="border-none w-full bg-transparent h-full! px-4 text-xs">
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

                {/* Remove Row */}
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveRow(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleAddRow}
              className="flex items-center gap-2 text-blue-500 border-blue-500 hover:bg-blue-50 px-4 py-2"
            >
              <Plus className="w-4 h-4" /> Add More
            </Button>
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
