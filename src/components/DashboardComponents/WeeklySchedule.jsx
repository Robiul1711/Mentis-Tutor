export default function WeeklySchedule() {
  const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const schedule = [
    {
      time: '8:30 AM - 4:00 PM',
      activities: ['Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson'],
   
    },
    {
      time: '8:30 AM - 4:00 PM',
      activities: ['School', 'School', 'School', 'School', 'School', 'School', 'Avoid Creedit'],
      color: 'bg-purple-50'
    },
    {
      time: '8:30 AM - 4:00 PM',
      activities: ['Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson'],
      color: 'bg-pink-50'
    },
    {
      time: '8:30 AM - 4:00 PM',
      activities: ['Quiz', 'Quiz', 'Quiz', 'Quiz', 'Quiz', 'Quiz', 'Quiz'],
      color: 'bg-yellow-50'
    },
    {
      time: '8:30 AM - 4:00 PM',
      activities: ['Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson'],
      color: 'bg-orange-50'
    },
    {
      time: '8:30 AM - 4:00 PM',
      activities: ['Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson'],
      color: 'bg-green-50'
    },
    {
      time: '8:30 AM - 4:00 PM',
      activities: ['Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson'],
      color: 'bg-blue-50'
    }
  ];

  return (
        <div className=" rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-8 bg-gradient-to-r from-slate-700 to-slate-800">
            <div className="p-4 font-semibold text-white border-r border-slate-600 text-center">Time</div>
            {days.map((day, idx) => (
              <div key={idx} className="p-3 font-semibold text-white text-center border-r border-slate-600 last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Schedule Rows */}
          {schedule.map((row, rowIdx) => (
            <div key={rowIdx} className={`grid grid-cols-8  border-b border-slate-200 last:border-b-0`}>
              <div className="p-3 font-medium text-xs text-slate-700 border-r border-slate-200 flex items-center">
                {row.time}
              </div>
              {row.activities.map((activity, colIdx) => (
                <div 
                  key={colIdx} 
                  className="p-4 text-center border-r text-xs border-slate-200 last:border-r-0 flex items-center justify-center text-slate-700 hover:bg-white/50 transition-colors"
                >
                  {activity}
                </div>
              ))}
            </div>
          ))}
        </div>
  );
}