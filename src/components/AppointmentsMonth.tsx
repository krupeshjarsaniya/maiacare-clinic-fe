import React, { useState, useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
type AppointmentDay = {
  date: string; // e.g. "2025-10-10"
  names: string[]; // list of names for that date
};

type AppointmentsMonthProps = {
  appointmentsData?: AppointmentDay[]; // optional: if not passed, demo data will be used
  selectedDate?: string | null; // selected date from DateCalendar
};

function AppointmentsMonth({ appointmentsData, selectedDate: externalSelectedDate }: AppointmentsMonthProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const calendarRef = useRef<FullCalendar>(null);

  // Sync external selected date with internal state and navigate to month
  useEffect(() => {
    if (externalSelectedDate) {
      setSelectedDate(externalSelectedDate);

      // Navigate FullCalendar to the selected month
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        const selectedDateObj = new Date(externalSelectedDate);
        calendarApi.gotoDate(selectedDateObj);
      }
    }
  }, [externalSelectedDate]);

  const handleDateClick = (arg: any) => {
    const clickedDate = arg.dateStr;
    setSelectedDate(clickedDate === selectedDate ? null : clickedDate);
  };

  // Demo fallback data if none passed via props
  const fallbackData: AppointmentDay[] = [
    { date: '2025-10-10', names: ['Riya Kapoor', 'Ananya Sharma', 'Riya Kapoor'] },
    { date: '2025-10-12', names: ['Aarav Mehta', 'Sara Khan'] },
  ];

  const source = appointmentsData && appointmentsData.length ? appointmentsData : fallbackData;

  // Transform JSON to FullCalendar events
  const events = source.flatMap((d) =>
    d.names.map((n, idx) => ({
      title: n,
      start: d.date,
      allDay: true,
      // class for styling the pill
      classNames: ['appt-pill'],
      // unique id to avoid key collisions in FC internals
      id: `${d.date}-${idx}`,
      // ensure these show as individual stacked blocks
      display: 'block',
    }))
  );
  return (
    <>

      <div className="custom-month-datepicker">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          dateClick={handleDateClick}
          height="auto"
          contentHeight="auto"
          dayMaxEventRows={4}
          events={events}
          eventContent={(arg) => {
            // Render pill like: <div class="pill">Name</div>
            const title = arg.event.title || '';
            return {
              html: `<div class="pill pill-soft">${title}</div>`,
            };
          }}
          dayCellContent={(arg) => {
            const date = arg.date;
            const day = date.getDate();
            const monthAbbr = date
              .toLocaleString("default", { month: "short" })
              .replace(".", "");

            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, "0");
            const dStr = String(date.getDate()).padStart(2, "0");
            const cellDate = `${y}-${m}-${dStr}`;
            const isSelected = selectedDate === cellDate;


            if (day === 1) {
              return {
                html: `
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <div style="font-size: 0.85rem; color: #6c757d;">
                    ${monthAbbr} ${day}
                  </div>
                  ${isSelected ? '<div class="dot "></div>' : ""}
                </div>
              `,
              };
            }

            return {
              html: `
              <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="font-size: 0.85rem; color: #6c757d;">${day}</div>
                ${isSelected ? '<div class="dot"></div>' : ""}
              </div>
            `,
            };
          }}
        />
      </div>
    </>
  )
}

export default AppointmentsMonth
