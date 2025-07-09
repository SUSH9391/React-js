import { useState } from 'react';
import {
  format, addMonths, subMonths, startOfMonth, endOfMonth,
  startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay
} from 'date-fns';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminders, setReminders] = useState({});
  const [inputValue, setInputValue] = useState('');

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const onDateClick = (day) => {
    setSelectedDate(day);
    setInputValue(reminders[format(day, 'yyyy-MM-dd')] || '');
  };

  const handleReminderChange = (e) => setInputValue(e.target.value);

  const saveReminder = () => {
    if (selectedDate) {
      const key = format(selectedDate, 'yyyy-MM-dd');
      setReminders({ ...reminders, [key]: inputValue });
    }
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-lg font-bold">{format(currentMonth, dateFormat)}</h1>
        <div className="space-x-2">
          <button onClick={prevMonth}>&lt;</button>
          <button onClick={() => setCurrentMonth(new Date())}>Today</button>
          <button onClick={nextMonth}>&gt;</button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "eee";
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="py-2 px-2 font-semibold" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return days;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(day, "d");
        const key = format(day, "yyyy-MM-dd");
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = selectedDate && isSameDay(day, selectedDate);

        days.push(
          <div
            key={key}
            onClick={() => onDateClick(cloneDay)}
            className={`h-28 border p-2 text-left text-sm relative cursor-pointer transition ${
              !isCurrentMonth ? "bg-gray-50 text-gray-400" :
              isSelected ? "bg-indigo-600 text-white" : "bg-white hover:bg-indigo-50"
            } ${isSameDay(cloneDay, new Date()) ? "border-2 border-indigo-600" : ""}`}
          >
            <time className="block font-medium">{formattedDate}</time>

            {/* Reminder Preview */}
            {reminders[key] && (
              <div className="mt-1 text-xs truncate">
                {reminders[key]}
              </div>
            )}

            {/* Reminder Input */}
            {isSelected && (
              <div className="absolute bottom-1 left-1 right-1">
                <input
                  className="w-full rounded border px-1 text-xs text-black"
                  type="text"
                  value={inputValue}
                  onChange={handleReminderChange}
                  onBlur={saveReminder}
                  placeholder="Add reminder"
                />
              </div>
            )}
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-7" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return rows;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {renderHeader()}

      <div className="rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5">
        <div className="grid grid-cols-7 border-b bg-gray-100 text-center text-sm font-semibold text-gray-700">
          {renderDays()}
        </div>

        {/* Dates grid */}
        <div className="text-sm text-center">
          {renderCells()}
        </div>
      </div>
    </div>
  );
}
