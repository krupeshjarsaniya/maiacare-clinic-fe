'use client';
import { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import '../style/appointments.css'

interface AppointmentsWeekProps {
  selectedDate?: string | null;
}

export default function AppointmentsWeek({ selectedDate }: AppointmentsWeekProps) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const formatTime = (hour: number, minutes: number) => {
    const period = hour < 12 ? 'AM' : 'PM';
    const h12 = hour % 12 === 0 ? 12 : hour % 12;
    const m = minutes === 0 ? '' : `:${minutes.toString().padStart(2, '0')}`;
    return `${h12}${m} ${period}`;
  };

  const times = Array.from({ length: 24 * 2 }, (_, idx) => {
    const hour = Math.floor(idx / 2);
    const minutes = idx % 2 === 0 ? 0 : 30;
    return formatTime(hour, minutes);
  });

  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [highlightedDay, setHighlightedDay] = useState<string | null>(null);
  const [currentMonthYear, setCurrentMonthYear] = useState<string>('');
  const [weekDateRange, setWeekDateRange] = useState<string>('');

  // Calculate week dates based on selected date
  useEffect(() => {
    const calculateWeekDates = (date: Date) => {
      const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Calculate offset to get Monday
      
      const monday = new Date(date);
      monday.setDate(date.getDate() + mondayOffset);
      
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        weekDates.push(day);
      }
      return weekDates;
    };

    if (selectedDate) {
      const date = new Date(selectedDate);
      const dates = calculateWeekDates(date);
      setWeekDates(dates);
      
      // Set month and year based on selected date
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      setCurrentMonthYear(`${monthNames[date.getMonth()]} ${date.getFullYear()}`);
      
      // Set week date range
      if (dates.length > 0) {
        const startDate = dates[0];
        const endDate = dates[6];
        const startMonth = monthNames[startDate.getMonth()];
        const endMonth = monthNames[endDate.getMonth()];
        
        if (startDate.getMonth() === endDate.getMonth()) {
          setWeekDateRange(`${startDate.getDate()} - ${endDate.getDate()} ${startMonth}`);
        } else {
          setWeekDateRange(`${startDate.getDate()} ${startMonth} - ${endDate.getDate()} ${endMonth}`);
        }
      }
      
      // Find which day of the week the selected date is
      const selectedDayOfWeek = date.getDay();
      const dayIndex = selectedDayOfWeek === 0 ? 6 : selectedDayOfWeek - 1; // Convert to Monday-first index
      setHighlightedDay(days[dayIndex]);
    } else {
      // Default to current week
      const today = new Date();
      const dates = calculateWeekDates(today);
      setWeekDates(dates);
      
      // Set current month and year
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      setCurrentMonthYear(`${monthNames[today.getMonth()]} ${today.getFullYear()}`);
      
      // Set week date range
      if (dates.length > 0) {
        const startDate = dates[0];
        const endDate = dates[6];
        const startMonth = monthNames[startDate.getMonth()];
        const endMonth = monthNames[endDate.getMonth()];
        
        if (startDate.getMonth() === endDate.getMonth()) {
          setWeekDateRange(`${startDate.getDate()} - ${endDate.getDate()} ${startMonth}`);
        } else {
          setWeekDateRange(`${startDate.getDate()} ${startMonth} - ${endDate.getDate()} ${endMonth}`);
        }
      }
      
      setHighlightedDay(null);
    }
  }, [selectedDate]);

  return (
    <div className="container mt-3">
      <div className="border rounded shadow-sm bg-white aw-card">
       
        
        <div className="aw-scroll">
          {/* Header (sticky) */}
          <div className="row border-bottom text-center fw-semibold text-muted small aw-header">
            <div className="col-2 border-end py-1 d-flex align-items-center justify-content-center aw-time-header aw-sticky-col">
              <i className="bi bi-clock me-2"></i> Time
            </div>
            <div className="col p-0">
              <div className="row g-0 flex-nowrap aw-days-row text-center">
                {days.map((day, i) => {
                  const isHighlighted = highlightedDay === day;
                  const currentDate = weekDates[i];
                  const dateNumber = currentDate ? currentDate.getDate() : i + 1;
                  
                  return (
                    <div className="aw-day-col py-3 border-end" key={day}>
                      <div className={isHighlighted ? "day-text-color " : ""}>{day}</div>
                      <div className={`mt-1 mx-auto rounded-circle d-flex align-items-center justify-content-center aw-date-circle ${isHighlighted ? 'aw-date-circle-active' : 'text-secondary'}`}>
                        {dateNumber < 10 ? `0${dateNumber}` : dateNumber}
                        
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Body (scrolls vertically & horizontally together) */}
          <div className="row aw-body">
            {/* Time Column (sticky left) */}
            <div className="col-2 border-end bg-light text-center small text-muted p-0 aw-time-col aw-sticky-col">
              {times.map((time) => (
                <div key={time} className="border-bottom appointments-week-time time-cell">{time}</div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="col p-0">
              <div className="row g-0 flex-nowrap">
                {days.map((day) => (
                  <div className="aw-day-col border-end p-0" key={day}>
                    {times.map((time) => (
                      <OverlayTrigger
                        key={time}
                        placement="top"
                        overlay={
                          selectedSlot?.day === day && selectedSlot?.time === time ? (
                            <Tooltip id={`tooltip-${day}-${time}`} className="appointments-week-tooltip">
                              <div className="text-dark small">
                                <p className="mb-1">
                                  Get started by clicking anywhere on the calendar
                                  to add your first appointment
                                </p>
                                <span className="text-danger fw-semibold ">OK. GOT IT!</span>
                              </div>
                            </Tooltip>
                          ) : (
                            <></>
                          )
                        }
                      >
                        <div
                          className="border-bottom aw-slot"
                          onClick={() => {
                            const key = `${day}|${time}`;
                            setSelectedSlot({ day, time });
                            setBookedSlots((prev) => (prev.includes(key) ? prev : [...prev, key]));
                          }}
                        >
                          {bookedSlots.includes(`${day}|${time}`) && <div className="aw-booked-line"></div>}
                          {selectedSlot?.day === day && selectedSlot?.time === time && <div className="aw-selected-dot"></div>}
                        </div>
                      </OverlayTrigger>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
