import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import CommonButton from '../common/CommonButton';

const scheduleData = [
  { day: 'Saturday', time: '8:30 AM - 10:30 AM', lesson: 'Algebra' },
  { day: 'Sunday', time: '10:30 AM - 12:30 PM', lesson: 'Number' },
  { day: 'Monday', time: '12:30 PM - 2:30 PM', lesson: 'Graphs' },
  { day: 'Tuesday', time: '2:30 PM - 4:30 PM', lesson: 'Ratio' },
  { day: 'Wednesday', time: '4:30 PM - 6:30 PM', lesson: 'Geometry' },
  { day: 'Thursday', time: '8:30 AM - 10:30 AM', lesson: 'Pythagoras' },
  { day: 'Friday', time: '10:30 AM - 12:30 PM', lesson: 'Probability' },
];

const lessons = ['Algebra', 'Number', 'Graphs', 'Ratio', 'Geometry', 'Pythagoras', 'Probability'];

export default function ClassScheduleDialog() {
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState(scheduleData);

  const handleLessonChange = (index, newLesson) => {
    const updated = [...schedule];
    updated[index].lesson = newLesson;
    setSchedule(updated);
  };

  const handleSubmit = () => {
    console.log('Schedule submitted:', schedule);
    setOpen(false);
  };

  return (
   
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild>
          <CommonButton className="bg-Primary">
            Create New Schedule +
          </CommonButton>
        </DialogTrigger>

 <DialogContent className="max-w-[900px] w-full bg-[#f5f1e8] rounded-lg border-none shadow-xl p-0">

          <DialogHeader className="flex justify-between items-center px-8 py-4 border-b">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Class Schedule
            </DialogTitle>

          </DialogHeader>

          <div className="px-4 pb-5 pt-4">
            <div className="grid grid-cols-3 gap-4 mb-4 font-semibold text-white text-center">
              <div className="bg-[#2c5271] py-2 rounded">Day</div>
              <div className="bg-[#2c5271] py-2 rounded">Time</div>
              <div className="bg-[#2c5271] py-2 rounded">Lesson</div>
            </div>

            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
              {schedule.map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 text-sm">
                  <div className="bg-white rounded px-4 py-3">{item.day}</div>
                  <div className="bg-white rounded px-4 py-3">{item.time}</div>
                  <div className="bg-white rounded">
                    <Select
                      value={item.lesson}
                      onValueChange={(value) => handleLessonChange(index, value)}
                    >
                      <SelectTrigger className="border-none bg-transparent h-full px-4">
                        <SelectValue placeholder="Select lesson" />
                      </SelectTrigger>
                      <SelectContent >
                        {lessons.map((lesson) => (
                          <SelectItem key={lesson} value={lesson} >
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
