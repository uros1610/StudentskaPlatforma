// src/Calendar.js
import React, { useState } from 'react';
import '../styles/kalendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <main className='calendar-body'>
        <div className="header-cal">
          <div className="col-start">
            <div className="icon" onClick={prevMonth}>
              ←
            </div>
          </div>
          <div className="col-center">
            <span>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="col-end">
            <div className="icon" onClick={nextMonth}>
              →
            </div>
          </div>
        </div>
      </main>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "ddd";
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col" key={i}>
          {daysOfWeek[i]}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    const endDate = new Date(monthEnd);
    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = new Date(startDate);

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        days.push(
          <div className={`col cell ${day.getMonth() !== currentDate.getMonth() ? "disabled" : ""}`} key={day}>
            <span className="number">{day.getDate()}</span>
          </div>
        );
        day.setDate(day.getDate() + 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
