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
    },
    {
      time: '8:30 AM - 4:00 PM',
      activities: ['Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson'],
    },
    {
      time: '8:30 AM - 4:00 PM',
      activities: ['Quiz', 'Quiz', 'Quiz', 'Quiz', 'Quiz', 'Quiz', 'Quiz'],
    },
    {
      time: '8:30 AM - 4:00 PM',
      activities: ['Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson'],
    },
    {
      time: '8:30 AM - 4:00 PM',
      activities: ['Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson'],
    },
    {
      time: '8:30 AM - 4:00 PM',
      activities: ['Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson', 'Lesson'],
    }
  ];

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden  rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="grid grid-cols-8 bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900">
          <div className="p-3 lg:p-4 font-semibold text-white border-r border-slate-600 text-center text-sm lg:text-base">
            Time
          </div>
          {days.map((day, idx) => (
            <div 
              key={idx} 
              className="p-2 lg:p-3 font-semibold text-white text-center border-r border-slate-600 last:border-r-0 text-xs lg:text-sm"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Schedule Rows */}
        {schedule.map((row, rowIdx) => (
          <div 
            key={rowIdx} 
            className={`grid grid-cols-8 border-b border-slate-200 dark:border-slate-700 last:border-b-0 ${
              rowIdx % 2 === 0 
                ? 'bg-white dark:bg-slate-900' 
                : 'bg-slate-50 dark:bg-slate-800'
            }`}
          >
            <div className="p-3 font-medium text-xs  text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700 flex items-center justify-center lg:justify-start">
              {row.time}
            </div>
            {row.activities.map((activity, colIdx) => (
              <div 
                key={colIdx} 
                className="p-2 lg:p-3 text-center border-r border-slate-200 dark:border-slate-700 last:border-r-0 flex items-center justify-center text-xs lg:text-sm text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors duration-200"
              >
                <span className="truncate">{activity}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4">
        {schedule.map((row, rowIdx) => (
          <div 
            key={rowIdx} 
            className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            {/* Time Header */}
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 p-3">
              <div className="font-semibold text-white text-sm text-center">
                {row.time}
              </div>
            </div>
            
            {/* Activities Grid */}
            <div className="grid grid-cols-4 gap-2 p-3">
              {row.activities.map((activity, colIdx) => (
                <div 
                  key={colIdx} 
                  className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-200"
                >
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {days[colIdx].substring(0, 3)}
                  </div>
                  <div className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                    {activity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tablet View */}
      <div className="hidden md:block lg:hidden">
        <div className="rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Compact Header */}
          <div className="grid grid-cols-8 bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900">
            <div className="p-2 font-semibold text-white border-r border-slate-600 text-center text-xs">
              Time
            </div>
            {days.map((day, idx) => (
              <div 
                key={idx} 
                className="p-2 font-semibold text-white text-center border-r border-slate-600 last:border-r-0 text-xs"
              >
                {day.substring(0, 3)}
              </div>
            ))}
          </div>

          {/* Compact Rows */}
          {schedule.map((row, rowIdx) => (
            <div 
              key={rowIdx} 
              className={`grid grid-cols-8 border-b border-slate-200 dark:border-slate-700 last:border-b-0 ${
                rowIdx % 2 === 0 
                  ? 'bg-white dark:bg-slate-900' 
                  : 'bg-slate-50 dark:bg-slate-800'
              }`}
            >
              <div className="p-2 font-medium text-xs text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <span className="truncate">{row.time.split(' - ')[0]}</span>
              </div>
              {row.activities.map((activity, colIdx) => (
                <div 
                  key={colIdx} 
                  className="p-2 text-center border-r border-slate-200 dark:border-slate-700 last:border-r-0 flex items-center justify-center text-xs text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <span className="truncate text-xs">{activity}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}