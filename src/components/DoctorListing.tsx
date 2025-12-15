import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import ContentContainer from './ui/ContentContainer';
import CustomTabs from './ui/CustomTabs';
import { Badge, Card, Col, Form, Nav, Row, Stack, Tab } from 'react-bootstrap';
import Button from './ui/Button'; 
import Modal from './ui/Modal';
import Image from 'next/image';
import PriyaGupta from '../assets/images/Priya Gupta.png';
import { AppointmentRequestCancelModel } from './TempAppoRequstCancelModel';
import { BsClock } from 'react-icons/bs';
import { Appointments, AppointmentsMonthData, AppointmentsMonthType, AppointmentsType, AppointmentsWeekData, doctorlistingModalData, tempAppointmentProfileData } from '../utlis/StaticData';
import { InputFieldGroup } from './ui/InputField';
import { InputSelect } from './ui/InputSelect';
import { BookAppointment, SuccessModalBookAppointment } from './form/BookAppointment';
import ScheduleTimeOff from './ScheduleTimeOff';
import { AppointmentsMonth } from './AppointmentsMonth';

import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Box from '@mui/material/Box';
import AppointmentsWeek from './AppointmentsWeek';
import { SlArrowDown } from "react-icons/sl";

import ListViews from '@/components/ListViews';

import localeData from "dayjs/plugin/localeData";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(localeData);
dayjs.extend(updateLocale);

// Monday = 1, Sunday = 0
dayjs.updateLocale("en", { weekStart: 1 });

import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";


type DayProps = React.ComponentProps<typeof PickersDay>;
interface CustomDayProps extends PickersDayProps<dayjs.Dayjs> {
  selectedDay?: dayjs.Dayjs | null;
}


// Multi-Select DatePicker Component
const MultiSelectDatePicker: React.FC = () => {

  const [currentDate, setCurrentDate] = useState<Date>(new Date(2024, 10)); // November 2024
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const [lastSelectedDate, setLastSelectedDate] = useState<Date | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);


  // Navigation functions
  const navigateMonth = (direction: number): void => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };
  return (
    <div className=" card border-0 shadow-sm">
      {/* Calendar Header */}
      <div className="card-header bg-light border-0">
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigateMonth(-1)}
          >
            ◀
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigateMonth(1)}
          >
            ▶
          </button>
        </div>
      </div>

    </div>
  );
};


export function WeekHighlightDay(props: CustomDayProps) {
  const { day, selectedDay, ...other } = props;

  const base = selectedDay ? dayjs(selectedDay) : null;

  const start = base ? base.startOf("week") : null;
  const end = base ? base.endOf("week") : null;

  const isInWeek =
    !!base &&
    (day.isSame(start, "day") ||
      (day.isAfter(start, "day") && day.isBefore(end, "day")) ||
      day.isSame(end, "day"));

  const isStart = base && day.isSame(start, "day");
  const isEnd = base && day.isSame(end, "day");

  const isSelected = base && day.isSame(base, "day");

  return (
    <PickersDay
      {...other}
      day={day}
      sx={{
        mx: 0,
        px: 0.5,
        height: 30,
        margin: "2px 0",
        borderRadius: 0,

        ...(isInWeek && {
          backgroundColor: "var(--badge-background-color-rejected)",
          color: "var(--color-heading)",
        }),

        ...(isStart && {
          borderTopLeftRadius: "16px",
          borderBottomLeftRadius: "16px",
        }),

        ...(isEnd && {
          borderTopRightRadius: "16px",
          borderBottomRightRadius: "16px",
        }),

        ...(isSelected && {

          color: "white !important",
          position: "relative",
          zIndex: 2,
          backgroundColor: "var(--badge-background-color-rejected) !important",

          "&::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "25px",
            height: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--color-modal-heading)",
            borderRadius: "50%",
            fontSize: "12px",
            zIndex: -1,      // behind the number but above strip
          },
        }),

        /** DISABLE HOVER */
        "&:hover": {
          backgroundColor: isSelected
            ? "var(--badge-background-color-rejected) !important"
            : isInWeek
              ? "var(--badge-background-color-rejected) !important"
              : "transparent !important",
        },

        "&.Mui-selected:hover": { background: "transparent" },
        "&.MuiPickersDay-today": { border: "none" },
      }}
    />
  );
}



export default function DoctorListing() {
  const [activeTab, setActiveTab] = useState<string>("calander");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // const tabOptions = [
  //   {
  //     key: "calander",
  //     label: `${(
  //       <div className='d-flex gap-2'>
  //         <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  //           <path d="M14.25 2.1875H12.6875V1.875C12.6875 1.62636 12.5887 1.3879 12.4129 1.21209C12.2371 1.03627 11.9986 0.9375 11.75 0.9375C11.5014 0.9375 11.2629 1.03627 11.0871 1.21209C10.9113 1.3879 10.8125 1.62636 10.8125 1.875V2.1875H5.1875V1.875C5.1875 1.62636 5.08873 1.3879 4.91291 1.21209C4.7371 1.03627 4.49864 0.9375 4.25 0.9375C4.00136 0.9375 3.7629 1.03627 3.58709 1.21209C3.41127 1.3879 3.3125 1.62636 3.3125 1.875V2.1875H1.75C1.3356 2.1875 0.938171 2.35212 0.645146 2.64515C0.35212 2.93817 0.1875 3.3356 0.1875 3.75V16.25C0.1875 16.6644 0.35212 17.0618 0.645146 17.3549C0.938171 17.6479 1.3356 17.8125 1.75 17.8125H14.25C14.6644 17.8125 15.0618 17.6479 15.3549 17.3549C15.6479 17.0618 15.8125 16.6644 15.8125 16.25V3.75C15.8125 3.3356 15.6479 2.93817 15.3549 2.64515C15.0618 2.35212 14.6644 2.1875 14.25 2.1875ZM3.3125 4.0625C3.3125 4.31114 3.41127 4.5496 3.58709 4.72541C3.7629 4.90123 4.00136 5 4.25 5C4.49864 5 4.7371 4.90123 4.91291 4.72541C5.08873 4.5496 5.1875 4.31114 5.1875 4.0625H10.8125C10.8125 4.31114 10.9113 4.5496 11.0871 4.72541C11.2629 4.90123 11.5014 5 11.75 5C11.9986 5 12.2371 4.90123 12.4129 4.72541C12.5887 4.5496 12.6875 4.31114 12.6875 4.0625H13.9375V5.9375H2.0625V4.0625H3.3125ZM2.0625 15.9375V7.8125H13.9375V15.9375H2.0625Z" fill="#2B4360" />
  //         </svg>

  //         <p className='m-0'>Calendar View</p>
  //       </div>
  //     )}`,
  //     content: (
  //       <div>
  //         <CalendarView />
  //       </div>
  //     ),
  //   },
  //   {
  //     key: "list",
  //     label: `${(
  //       <div className='d-flex gap-2'>

  //         <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  //           <path d="M17.5 10C17.5 10.1658 17.4342 10.3247 17.3169 10.4419C17.1997 10.5592 17.0408 10.625 16.875 10.625H3.125C2.95924 10.625 2.80027 10.5592 2.68306 10.4419C2.56585 10.3247 2.5 10.1658 2.5 10C2.5 9.83424 2.56585 9.67527 2.68306 9.55806C2.80027 9.44085 2.95924 9.375 3.125 9.375H16.875C17.0408 9.375 17.1997 9.44085 17.3169 9.55806C17.4342 9.67527 17.5 9.83424 17.5 10ZM3.125 5.625H16.875C17.0408 5.625 17.1997 5.55915 17.3169 5.44194C17.4342 5.32473 17.5 5.16576 17.5 5C17.5 4.83424 17.4342 4.67527 17.3169 4.55806C17.1997 4.44085 17.0408 4.375 16.875 4.375H3.125C2.95924 4.375 2.80027 4.44085 2.68306 4.55806C2.56585 4.67527 2.5 4.83424 2.5 5C2.5 5.16576 2.56585 5.32473 2.68306 5.44194C2.80027 5.55915 2.95924 5.625 3.125 5.625ZM16.875 14.375H3.125C2.95924 14.375 2.80027 14.4408 2.68306 14.5581C2.56585 14.6753 2.5 14.8342 2.5 15C2.5 15.1658 2.56585 15.3247 2.68306 15.4419C2.80027 15.5592 2.95924 15.625 3.125 15.625H16.875C17.0408 15.625 17.1997 15.5592 17.3169 15.4419C17.4342 15.3247 17.5 15.1658 17.5 15C17.5 14.8342 17.4342 14.6753 17.3169 14.5581C17.1997 14.4408 17.0408 14.375 16.875 14.375Z" fill="#3E4A57" />
  //         </svg>
  //         <p className='m-0'>List View</p>
  //       </div>
  //     )}`,
  //     content: (
  //       <div>
  //         <ListView />
  //       </div>
  //     ),
  //   },
  // ];

  const tabOptions = [
    {
      key: "calander",
      label: "Calendar View",
      content: (
        <div>
          <CalendarView />
        </div>
      ),
    },
    {
      key: "list",
      label: "List View",
      content: (
        <div>
          <ListView />
        </div>
      ),
    },

  ];

  return (
    <>
      <CustomTabs
        activeKey={activeTab}
        setActiveKey={setActiveTab}
        tabOptions={tabOptions}
      />
    </>
  )
}

export function CalendarView() {
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedView, setSelectedView] = useState<string>("day");
  const [doctorListingModal, setDoctorListingModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<tempAppointmentProfileData | null>(null);
  const [RescheduleModal, setRescheduleModal] = useState(false);
  const [CancelModal, setCancelModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [BookAppointmentModal, setBookAppointmentModal] = useState(false);
  const [showSuccessModalBook, setShowSuccessModalBook] = useState(false);
  const [blockCalendarModal, setBlockCalendarModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const [CalnderAppointments, setCalnderAppointments] = useState<AppointmentsType[]>(Appointments);
  const [CalnderAppointmentsWeek, setCalnderAppointmentsWeek] = useState<AppointmentsType[]>(AppointmentsWeekData);
  const [AppointmentsMonthShow, setAppointmentsMonthShow] = useState<AppointmentsMonthType[]>(AppointmentsMonthData);

  // const [events, setEvents] = useState<Event[] | any>([]);
  const [clickTime, setClickTime] = useState<string>("");
  const [clickDate, setClickDate] = useState<string>("");

  const [showTooltip, setShowTooltip] = useState(true);

  const [multiPatientShow, setMultiPatientShow] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setMultiPatientShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  interface Event {
    id: number;
    top: number;
    time: string;
  }
  const options = [
    "Upcoming",
    "Scheduled",
    "Re-scheduled",
    "Cancelled",
    "Re - Assigned",
  ];


  const handleChange = (option: string) => {
    setFilters((prev) =>
      prev.includes(option) ? prev.filter((f) => f !== option) : [...prev, option]
    );
  };

  const clearAll = () => {
    setFilters([]);
  };

  // Refs for the scrollable areas
  const scheduleRef = useRef<HTMLDivElement>(null);
  const timeColumnRef = useRef<HTMLDivElement>(null);

  // // Helper function to generate time slots
  // const generateTimeSlots = () => {
  //   const slots = [];
  //   // Extended hours to better fill the view
  //   for (let i = 9; i < 19; i++) {
  //     slots.push(`${i}:00`);
  //     slots.push(`${i}:30`);
  //   }
  //   return slots;
  // };

  // const timeSlots = generateTimeSlots();

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i < 19; i++) {
      const hour12 = i > 12 ? i - 12 : i;
      const ampm = i < 12 ? "AM" : "PM";
      slots.push({ time: `${hour12}:00 ${ampm}` });
      slots.push({ time: `${hour12}:30 ${ampm}` });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Helper: convert 12-hour string (e.g., "1:30 PM") to minutes since midnight
  const toMinutes = (timeStr: string) => {
    const [time, modifier] = timeStr.split(" ");
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr || "0", 10);

    if (modifier === "PM" && hour !== 12) hour += 12;
    if (modifier === "AM" && hour === 12) hour = 0;

    return hour * 60 + minute;
  };

  // Helper: convert JSON 12-hour-like time (e.g. "12:30", "1:00") to minutes
  const toMinutesFromJson = (timeStr: string) => {
    const [hourStr, minuteStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr || "0", 10);

    // heuristic: assume JSON "12:xx" is noon or later
    if (hour < 9) hour += 12; // treat times after 12 as PM (1–6)
    return hour * 60 + minute;
  };

  const toNextTime = (timeStr: string) => {
    const [hour, minute] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hour, minute);
    date.setMinutes(date.getMinutes() + 30);

    const nextHour = date.getHours();
    const nextMinute = date.getMinutes();
    return `${nextHour}:${nextMinute.toString().padStart(2, '0')}`;
  };

  const formatTime = (hour: number, minutes: number) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinutes} ${ampm}`;
  };

  const formatTime24 = (hour: number, minutes: number) => {
    return `${hour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {

    if (scheduleRef.current && CalnderAppointments.length == 0) {
      setShowTooltip(false);
      const rect = scheduleRef.current.getBoundingClientRect();
      const scrollTop = scheduleRef.current.scrollTop;
      const clickY = e.clientY - rect.top + scrollTop;

      const totalHours = (18 - 9);
      const totalMinutes =
        (clickY / scheduleRef.current.scrollHeight) * totalHours * 60;

      const hour = Math.floor(totalMinutes / 60) + 9;
      const minutes = Math.floor(totalMinutes % 60);
      const roundedMinutes = Math.round(minutes / 15) * 15;

      const date = new Date();
      date.setHours(hour, roundedMinutes, 0, 0);

      setClickTime(formatTime24(date.getHours(), date.getMinutes()));
      setClickDate(value ? value?.format('YYYY-MM-DD') : '');

      setBookAppointmentModal(true);
    }
  };

  // Effect to synchronize scrolling between the two columns

  // const handleClick = (e: MouseEvent<HTMLDivElement>) => {

  //   if (scheduleRef.current && CalnderAppointments.length == 0) {
  //     setShowTooltip(false);
  //     const rect = scheduleRef.current.getBoundingClientRect();
  //     const scrollTop = scheduleRef.current.scrollTop;
  //     const clickY = e.clientY - rect.top + scrollTop;

  //     const totalHours = 18 - 9;
  //     const totalMinutes =
  //       (clickY / scheduleRef.current.scrollHeight) * totalHours * 60;

  //     const hour = Math.floor(totalMinutes / 60) + 9;
  //     const minutes = Math.floor(totalMinutes % 60);
  //     const roundedMinutes = Math.round(minutes / 15) * 15;

  //     let baseDate: Date;

  //     if (selectedDate) {

  //       if (typeof selectedDate === "string") {
  //         baseDate = new Date(selectedDate + "T00:00:00");
  //       } else {

  //         baseDate = new Date(selectedDate);
  //       }
  //     } else {

  //       baseDate = new Date();
  //     }

  //     baseDate.setHours(hour, roundedMinutes, 0, 0);

  //     const formattedDate = baseDate.toISOString().split("T")[0];
  //     const formattedTime = formatTime24(baseDate.getHours(), baseDate.getMinutes());

  //     setClickTime(formattedTime);
  //     setClickDate(formattedDate);

  //     setBookAppointmentModal(true);
  //   }
  // };

  useEffect(() => {
    const timeEl = timeColumnRef.current;
    const scheduleEl = scheduleRef.current;
    if (!timeEl || !scheduleEl) return;

    let activeScroller: 'time' | 'schedule' | null = null;
    let timer: number;

    const clearActiveScroller = () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        activeScroller = null;
      }, 100); // Reset after 100ms of inactivity
    };

    const handleTimeScroll = () => {
      if (activeScroller === 'schedule') return;
      activeScroller = 'time';
      scheduleEl.scrollTop = timeEl.scrollTop;
      clearActiveScroller();
    };

    const handleScheduleScroll = () => {
      if (activeScroller === 'time') return;
      activeScroller = 'schedule';
      timeEl.scrollTop = scheduleEl.scrollTop;
      clearActiveScroller();
    };

    timeEl.addEventListener('scroll', handleTimeScroll);
    scheduleEl.addEventListener('scroll', handleScheduleScroll);

    // Cleanup function to remove event listeners
    return () => {
      timeEl.removeEventListener('scroll', handleTimeScroll);
      scheduleEl.removeEventListener('scroll', handleScheduleScroll);
    };
  }, []); // Empty dependency array ensures this runs only once on mount


  // CSS datasforcss that will be applied inline
  const datasforcss = {
    eventLine: { left: '5px', right: '0', height: '1px' },
    tooltipDot: { width: '12px', height: '12px', top: '-4px', left: '-4px' },
    pingAnimation: { animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' }
  };

  // Calculate the position for the static 12:30 PM line
  // 12:30 PM is 3.5 hours after 9:00 AM. Each hour is 2 * 48px.
  // Add 24px (half the slot height) to center it.

  // const staticLineTop = ((12.5 - 9) * 2 * 48) + 24;
  // const staticLineTop = getTopPositionForTime(12, 30);

  const [staticLineTop, setStaticLineTop] = useState(0);

  useEffect(() => {
    if (!scheduleRef.current) return;

    const updateCurrentTimePosition = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      const startHour = 9;       // Start time of calendar
      const slotHeight = 106;    // Your actual slot height
      const pxPerHour = slotHeight * 2; // 220px per hour

      const timeInHours = hour + minute / 60;
      const diff = timeInHours - startHour;

      // Center inside current slot
      const yPos = diff * pxPerHour + slotHeight / 2;

      setStaticLineTop(yPos);
    };

    updateCurrentTimePosition();         // Initial run
    const interval = setInterval(updateCurrentTimePosition, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);


  const [selectedCard, setSelectedCard] = useState<"Upcoming" | "Waiting" | "Engaged" | "Done" | null>(null);
  const displayLimits: Record<"Upcoming" | "Waiting" | "Engaged" | "Done", number> = {
    Upcoming: 5,
    Waiting: 3,
    Engaged: 2,
    Done: 4,
  };

  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  // console.log("Value",value);

  // Format: "October 2025"
  const monthYearFormat = value ? value.format('MMMM YYYY') : '';

  // Format: "Monday 13"
  const dayDateFormat = value ? value.format('dddd ') : '';
  const dateDateFormat = value ? value.format('DD') : '';


  const monthYearWithWeekRange = value
    ? (() => {
      // Ensure week starts on Monday
      const startOfWeek = value.startOf('week').add(1, 'day');
      const endOfWeek = startOfWeek.add(6, 'day');
      const monthYear = value.format('MMMM YYYY');
      const startDay = startOfWeek.format('ddd DD');
      const endDay = endOfWeek.format('ddd DD');
      return `${monthYear} (${startDay} - ${endDay})`;
    })()
    : '';

  return (
    <>

      <div className="d-md-flex d-sm-none justify-content-between  my-4">
        <div className='appointments-total-box d-flex align-items-center gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none">
            <g clipPath="url(#clip0_2202_83537)">
              <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#FFEDCB" />
              <path d="M31.0969 14.2754V29.6598C31.0969 29.9208 30.9932 30.1712 30.8086 30.3558C30.624 30.5404 30.3736 30.6441 30.1125 30.6441H8.48437C8.2233 30.6441 7.97292 30.5404 7.78832 30.3558C7.60371 30.1712 7.5 29.9208 7.5 29.6598V14.2754H31.0969Z" fill="white" />
              <path d="M27.5969 7.95312H26.4844C26.2134 7.95312 25.9938 8.17279 25.9938 8.44375V11.55C25.9938 11.821 26.2134 12.0406 26.4844 12.0406H27.5969C27.8679 12.0406 28.0875 11.821 28.0875 11.55V8.44375C28.0875 8.17279 27.8679 7.95312 27.5969 7.95312Z" fill="#292929" />
              <path d="M12.3562 7.95312H11.2437C10.9728 7.95312 10.7531 8.17279 10.7531 8.44375V11.55C10.7531 11.821 10.9728 12.0406 11.2437 12.0406H12.3562C12.6272 12.0406 12.8469 11.821 12.8469 11.55V8.44375C12.8469 8.17279 12.6272 7.95312 12.3562 7.95312Z" fill="#292929" />
              <path d="M11.9481 16.8252H10.2831C10.018 16.8252 9.8031 17.0401 9.8031 17.3052V18.9702C9.8031 19.2353 10.018 19.4502 10.2831 19.4502H11.9481C12.2132 19.4502 12.4281 19.2353 12.4281 18.9702V17.3052C12.4281 17.0401 12.2132 16.8252 11.9481 16.8252Z" fill="#FFD1A4" />
              <path d="M17.4044 16.8252H15.7394C15.4743 16.8252 15.2594 17.0401 15.2594 17.3052V18.9702C15.2594 19.2353 15.4743 19.4502 15.7394 19.4502H17.4044C17.6695 19.4502 17.8844 19.2353 17.8844 18.9702V17.3052C17.8844 17.0401 17.6695 16.8252 17.4044 16.8252Z" fill="#FFD1A4" />
              <path d="M22.8575 16.8252H21.1925C20.9274 16.8252 20.7125 17.0401 20.7125 17.3052V18.9702C20.7125 19.2353 20.9274 19.4502 21.1925 19.4502H22.8575C23.1226 19.4502 23.3375 19.2353 23.3375 18.9702V17.3052C23.3375 17.0401 23.1226 16.8252 22.8575 16.8252Z" fill="#FFD1A4" />
              <path d="M28.3138 16.8252H26.6488C26.3837 16.8252 26.1688 17.0401 26.1688 17.3052V18.9702C26.1688 19.2353 26.3837 19.4502 26.6488 19.4502H28.3138C28.5789 19.4502 28.7938 19.2353 28.7938 18.9702V17.3052C28.7938 17.0401 28.5789 16.8252 28.3138 16.8252Z" fill="#FFD1A4" />
              <path d="M11.9481 21.3848H10.2831C10.018 21.3848 9.8031 21.5997 9.8031 21.8648V23.5298C9.8031 23.7949 10.018 24.0098 10.2831 24.0098H11.9481C12.2132 24.0098 12.4281 23.7949 12.4281 23.5298V21.8648C12.4281 21.5997 12.2132 21.3848 11.9481 21.3848Z" fill="#FFD1A4" />
              <path d="M17.4044 21.3848H15.7394C15.4743 21.3848 15.2594 21.5997 15.2594 21.8648V23.5298C15.2594 23.7949 15.4743 24.0098 15.7394 24.0098H17.4044C17.6695 24.0098 17.8844 23.7949 17.8844 23.5298V21.8648C17.8844 21.5997 17.6695 21.3848 17.4044 21.3848Z" fill="#FFD1A4" />
              <path d="M22.8575 21.3848H21.1925C20.9274 21.3848 20.7125 21.5997 20.7125 21.8648V23.5298C20.7125 23.7949 20.9274 24.0098 21.1925 24.0098H22.8575C23.1226 24.0098 23.3375 23.7949 23.3375 23.5298V21.8648C23.3375 21.5997 23.1226 21.3848 22.8575 21.3848Z" fill="#FFD1A4" />
              <path d="M28.3138 21.3848H26.6488C26.3837 21.3848 26.1688 21.5997 26.1688 21.8648V23.5298C26.1688 23.7949 26.3837 24.0098 26.6488 24.0098H28.3138C28.5789 24.0098 28.7938 23.7949 28.7938 23.5298V21.8648C28.7938 21.5997 28.5789 21.3848 28.3138 21.3848Z" fill="#FFD1A4" />
              <path d="M11.9481 25.9404H10.2831C10.018 25.9404 9.8031 26.1553 9.8031 26.4204V28.0854C9.8031 28.3505 10.018 28.5654 10.2831 28.5654H11.9481C12.2132 28.5654 12.4281 28.3505 12.4281 28.0854V26.4204C12.4281 26.1553 12.2132 25.9404 11.9481 25.9404Z" fill="#FFD1A4" />
              <path d="M17.4044 25.9404H15.7394C15.4743 25.9404 15.2594 26.1553 15.2594 26.4204V28.0854C15.2594 28.3505 15.4743 28.5654 15.7394 28.5654H17.4044C17.6695 28.5654 17.8844 28.3505 17.8844 28.0854V26.4204C17.8844 26.1553 17.6695 25.9404 17.4044 25.9404Z" fill="#FFD1A4" />
              <path d="M22.8575 25.9404H21.1925C20.9274 25.9404 20.7125 26.1553 20.7125 26.4204V28.0854C20.7125 28.3505 20.9274 28.5654 21.1925 28.5654H22.8575C23.1226 28.5654 23.3375 28.3505 23.3375 28.0854V26.4204C23.3375 26.1553 23.1226 25.9404 22.8575 25.9404Z" fill="#FFD1A4" />
              <path d="M32.5 28.8404C32.5012 29.4742 32.3144 30.0941 31.9632 30.6217C31.612 31.1493 31.1122 31.5608 30.527 31.8042C29.9418 32.0476 29.2976 32.1119 28.6758 31.989C28.0541 31.8661 27.4827 31.5616 27.0341 31.1138C26.5855 30.6661 26.2799 30.0954 26.1558 29.4739C26.0317 28.8524 26.0947 28.208 26.337 27.6223C26.5792 27.0367 26.9898 26.5361 27.5167 26.1838C28.0435 25.8316 28.6631 25.6436 29.2969 25.6436C30.1451 25.6444 30.9584 25.9813 31.5587 26.5804C32.159 27.1796 32.4975 27.9922 32.5 28.8404Z" fill="#E85966" />
              <path d="M28.5219 30.3691L27.45 29.2941L27.8688 28.8754L28.5219 29.5285L30.7281 27.3223L31.1469 27.741L28.5219 30.3691Z" fill="#EEEFEE" />
            </g>
            <defs>
              <clipPath id="clip0_2202_83537">
                <rect width="40" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p className='appointments-total-box-item m-0'>98 Appointments</p>

        </div>

        <div className="d-flex flex-sm-row align-items-center gap-sm-3 gap-2 flex-column flex-column-revserse mt-sm-0 mt-2">
          <div className="d-flex align-items-center gap-2">

            <span className="sort-by-lable">Sort by:</span>
            <InputSelect
              label=""
              name="tests"
              // value={formData.tests}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e.target.value);
              }}
              onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
              required={true}
              disabled={false}
              placeholder="All Time"
              className="patient-header-select-filter"
              // error={formError.tests}
              options={[
                { id: "1", value: "Today", label: "Today" },
                { id: "2", value: "Yesterday", label: "Yesterday" },
                { id: "3", value: "tomorrow", label: "tomorrow" },
              ]}
            />
            <div className="patient-header-filter-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M6.30166 10.6484V4.55469C6.30166 4.35578 6.22264 4.16501 6.08199 4.02436C5.94134 3.88371 5.75057 3.80469 5.55166 3.80469C5.35275 3.80469 5.16198 3.88371 5.02133 4.02436C4.88068 4.16501 4.80166 4.35578 4.80166 4.55469V10.6484C4.15635 10.8137 3.58438 11.189 3.17593 11.7152C2.76748 12.2414 2.54578 12.8886 2.54578 13.5547C2.54578 14.2208 2.76748 14.868 3.17593 15.3942C3.58438 15.9204 4.15635 16.2957 4.80166 16.4609V21.0547C4.80166 21.2536 4.88068 21.4444 5.02133 21.585C5.16198 21.7257 5.35275 21.8047 5.55166 21.8047C5.75057 21.8047 5.94134 21.7257 6.08199 21.585C6.22264 21.4444 6.30166 21.2536 6.30166 21.0547V16.4609C6.94697 16.2957 7.51894 15.9204 7.92739 15.3942C8.33584 14.868 8.55754 14.2208 8.55754 13.5547C8.55754 12.8886 8.33584 12.2414 7.92739 11.7152C7.51894 11.189 6.94697 10.8137 6.30166 10.6484ZM5.55166 15.0547C5.25499 15.0547 4.96498 14.9667 4.7183 14.8019C4.47163 14.6371 4.27937 14.4028 4.16584 14.1287C4.05231 13.8546 4.0226 13.553 4.08048 13.2621C4.13836 12.9711 4.28122 12.7038 4.491 12.494C4.70078 12.2842 4.96805 12.1414 5.25902 12.0835C5.54999 12.0256 5.8516 12.0553 6.12568 12.1689C6.39977 12.2824 6.63404 12.4747 6.79886 12.7213C6.96369 12.968 7.05166 13.258 7.05166 13.5547C7.05166 13.9525 6.89362 14.334 6.61232 14.6153C6.33101 14.8967 5.94948 15.0547 5.55166 15.0547ZM13.0517 6.14844V4.55469C13.0517 4.35578 12.9726 4.16501 12.832 4.02436C12.6913 3.88371 12.5006 3.80469 12.3017 3.80469C12.1027 3.80469 11.912 3.88371 11.7713 4.02436C11.6307 4.16501 11.5517 4.35578 11.5517 4.55469V6.14844C10.9063 6.31366 10.3344 6.68896 9.92593 7.21517C9.51748 7.74138 9.29578 8.38856 9.29578 9.05469C9.29578 9.72082 9.51748 10.368 9.92593 10.8942C10.3344 11.4204 10.9063 11.7957 11.5517 11.9609V21.0547C11.5517 21.2536 11.6307 21.4444 11.7713 21.585C11.912 21.7257 12.1027 21.8047 12.3017 21.8047C12.5006 21.8047 12.6913 21.7257 12.832 21.585C12.9726 21.4444 13.0517 21.2536 13.0517 21.0547V11.9609C13.697 11.7957 14.2689 11.4204 14.6774 10.8942C15.0858 10.368 15.3075 9.72082 15.3075 9.05469C15.3075 8.38856 15.0858 7.74138 14.6774 7.21517C14.2689 6.68896 13.697 6.31366 13.0517 6.14844ZM12.3017 10.5547C12.005 10.5547 11.715 10.4667 11.4683 10.3019C11.2216 10.1371 11.0294 9.9028 10.9158 9.62871C10.8023 9.35462 10.7726 9.05302 10.8305 8.76205C10.8884 8.47108 11.0312 8.20381 11.241 7.99403C11.4508 7.78425 11.7181 7.64139 12.009 7.58351C12.3 7.52563 12.6016 7.55534 12.8757 7.66887C13.1498 7.7824 13.384 7.97466 13.5489 8.22133C13.7137 8.46801 13.8017 8.75802 13.8017 9.05469C13.8017 9.45251 13.6436 9.83404 13.3623 10.1153C13.081 10.3967 12.6995 10.5547 12.3017 10.5547ZM22.0517 16.5547C22.051 15.8896 21.8298 15.2435 21.4227 14.7176C21.0155 14.1917 20.4454 13.8156 19.8017 13.6484V4.55469C19.8017 4.35578 19.7226 4.16501 19.582 4.02436C19.4413 3.88371 19.2506 3.80469 19.0517 3.80469C18.8527 3.80469 18.662 3.88371 18.5213 4.02436C18.3807 4.16501 18.3017 4.35578 18.3017 4.55469V13.6484C17.6563 13.8137 17.0844 14.189 16.6759 14.7152C16.2675 15.2414 16.0458 15.8886 16.0458 16.5547C16.0458 17.2208 16.2675 17.868 16.6759 18.3942C17.0844 18.9204 17.6563 19.2957 18.3017 19.4609V21.0547C18.3017 21.2536 18.3807 21.4444 18.5213 21.585C18.662 21.7257 18.8527 21.8047 19.0517 21.8047C19.2506 21.8047 19.4413 21.7257 19.582 21.585C19.7226 21.4444 19.8017 21.2536 19.8017 21.0547V19.4609C20.4454 19.2937 21.0155 18.9177 21.4227 18.3918C21.8298 17.8659 22.051 17.2198 22.0517 16.5547ZM19.0517 18.0547C18.755 18.0547 18.465 17.9667 18.2183 17.8019C17.9716 17.6371 17.7794 17.4028 17.6658 17.1287C17.5523 16.8546 17.5226 16.553 17.5805 16.2621C17.6384 15.9711 17.7812 15.7038 17.991 15.494C18.2008 15.2842 18.4681 15.1414 18.759 15.0835C19.05 15.0256 19.3516 15.0553 19.6257 15.1689C19.8998 15.2824 20.134 15.4747 20.2989 15.7213C20.4637 15.968 20.5517 16.258 20.5517 16.5547C20.5517 16.9525 20.3936 17.334 20.1123 17.6153C19.831 17.8967 19.4495 18.0547 19.0517 18.0547Z" fill="#2B4360" />
              </svg>
            </div>
          </div>

          <Button variant="default" onClick={() => { setBookAppointmentModal(true) }}>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M19.8016 3.42969H17.9266V3.05469C17.9266 2.75632 17.8081 2.47017 17.5971 2.25919C17.3862 2.04821 17.1 1.92969 16.8016 1.92969C16.5033 1.92969 16.2171 2.04821 16.0061 2.25919C15.7952 2.47017 15.6766 2.75632 15.6766 3.05469V3.42969H8.92664V3.05469C8.92664 2.75632 8.80811 2.47017 8.59713 2.25919C8.38615 2.04821 8.1 1.92969 7.80164 1.92969C7.50327 1.92969 7.21712 2.04821 7.00614 2.25919C6.79516 2.47017 6.67664 2.75632 6.67664 3.05469V3.42969H4.80164C4.30435 3.42969 3.82744 3.62723 3.47581 3.97886C3.12418 4.33049 2.92664 4.80741 2.92664 5.30469V20.3047C2.92664 20.802 3.12418 21.2789 3.47581 21.6305C3.82744 21.9821 4.30435 22.1797 4.80164 22.1797H19.8016C20.2989 22.1797 20.7758 21.9821 21.1275 21.6305C21.4791 21.2789 21.6766 20.802 21.6766 20.3047V5.30469C21.6766 4.80741 21.4791 4.33049 21.1275 3.97886C20.7758 3.62723 20.2989 3.42969 19.8016 3.42969ZM6.67664 5.67969C6.67664 5.97806 6.79516 6.2642 7.00614 6.47518C7.21712 6.68616 7.50327 6.80469 7.80164 6.80469C8.1 6.80469 8.38615 6.68616 8.59713 6.47518C8.80811 6.2642 8.92664 5.97806 8.92664 5.67969H15.6766C15.6766 5.97806 15.7952 6.2642 16.0061 6.47518C16.2171 6.68616 16.5033 6.80469 16.8016 6.80469C17.1 6.80469 17.3862 6.68616 17.5971 6.47518C17.8081 6.2642 17.9266 5.97806 17.9266 5.67969H19.4266V7.92969H5.17664V5.67969H6.67664ZM5.17664 19.9297V10.1797H19.4266V19.9297H5.17664Z" fill="white" />
              </svg>
              Book Appointment
            </div>

          </Button>
        </div>
      </div>

      <div className="d-md-none d-sm-flex d-none flex-column align-items-sm-start align-items-center gap-3 my-3">
        <div className="d-flex align-items-center justify-content-sm-start justify-content-center flex-wrap gap-3 w-100">
          <div className="patient-header-search-width">
            <div className='appointments-total-box d-flex align-items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none">
                <g clipPath="url(#clip0_2202_83537)">
                  <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#FFEDCB" />
                  <path d="M31.0969 14.2754V29.6598C31.0969 29.9208 30.9932 30.1712 30.8086 30.3558C30.624 30.5404 30.3736 30.6441 30.1125 30.6441H8.48437C8.2233 30.6441 7.97292 30.5404 7.78832 30.3558C7.60371 30.1712 7.5 29.9208 7.5 29.6598V14.2754H31.0969Z" fill="white" />
                  <path d="M27.5969 7.95312H26.4844C26.2134 7.95312 25.9938 8.17279 25.9938 8.44375V11.55C25.9938 11.821 26.2134 12.0406 26.4844 12.0406H27.5969C27.8679 12.0406 28.0875 11.821 28.0875 11.55V8.44375C28.0875 8.17279 27.8679 7.95312 27.5969 7.95312Z" fill="#292929" />
                  <path d="M12.3562 7.95312H11.2437C10.9728 7.95312 10.7531 8.17279 10.7531 8.44375V11.55C10.7531 11.821 10.9728 12.0406 11.2437 12.0406H12.3562C12.6272 12.0406 12.8469 11.821 12.8469 11.55V8.44375C12.8469 8.17279 12.6272 7.95312 12.3562 7.95312Z" fill="#292929" />
                  <path d="M11.9481 16.8252H10.2831C10.018 16.8252 9.8031 17.0401 9.8031 17.3052V18.9702C9.8031 19.2353 10.018 19.4502 10.2831 19.4502H11.9481C12.2132 19.4502 12.4281 19.2353 12.4281 18.9702V17.3052C12.4281 17.0401 12.2132 16.8252 11.9481 16.8252Z" fill="#FFD1A4" />
                  <path d="M17.4044 16.8252H15.7394C15.4743 16.8252 15.2594 17.0401 15.2594 17.3052V18.9702C15.2594 19.2353 15.4743 19.4502 15.7394 19.4502H17.4044C17.6695 19.4502 17.8844 19.2353 17.8844 18.9702V17.3052C17.8844 17.0401 17.6695 16.8252 17.4044 16.8252Z" fill="#FFD1A4" />
                  <path d="M22.8575 16.8252H21.1925C20.9274 16.8252 20.7125 17.0401 20.7125 17.3052V18.9702C20.7125 19.2353 20.9274 19.4502 21.1925 19.4502H22.8575C23.1226 19.4502 23.3375 19.2353 23.3375 18.9702V17.3052C23.3375 17.0401 23.1226 16.8252 22.8575 16.8252Z" fill="#FFD1A4" />
                  <path d="M28.3138 16.8252H26.6488C26.3837 16.8252 26.1688 17.0401 26.1688 17.3052V18.9702C26.1688 19.2353 26.3837 19.4502 26.6488 19.4502H28.3138C28.5789 19.4502 28.7938 19.2353 28.7938 18.9702V17.3052C28.7938 17.0401 28.5789 16.8252 28.3138 16.8252Z" fill="#FFD1A4" />
                  <path d="M11.9481 21.3848H10.2831C10.018 21.3848 9.8031 21.5997 9.8031 21.8648V23.5298C9.8031 23.7949 10.018 24.0098 10.2831 24.0098H11.9481C12.2132 24.0098 12.4281 23.7949 12.4281 23.5298V21.8648C12.4281 21.5997 12.2132 21.3848 11.9481 21.3848Z" fill="#FFD1A4" />
                  <path d="M17.4044 21.3848H15.7394C15.4743 21.3848 15.2594 21.5997 15.2594 21.8648V23.5298C15.2594 23.7949 15.4743 24.0098 15.7394 24.0098H17.4044C17.6695 24.0098 17.8844 23.7949 17.8844 23.5298V21.8648C17.8844 21.5997 17.6695 21.3848 17.4044 21.3848Z" fill="#FFD1A4" />
                  <path d="M22.8575 21.3848H21.1925C20.9274 21.3848 20.7125 21.5997 20.7125 21.8648V23.5298C20.7125 23.7949 20.9274 24.0098 21.1925 24.0098H22.8575C23.1226 24.0098 23.3375 23.7949 23.3375 23.5298V21.8648C23.3375 21.5997 23.1226 21.3848 22.8575 21.3848Z" fill="#FFD1A4" />
                  <path d="M28.3138 21.3848H26.6488C26.3837 21.3848 26.1688 21.5997 26.1688 21.8648V23.5298C26.1688 23.7949 26.3837 24.0098 26.6488 24.0098H28.3138C28.5789 24.0098 28.7938 23.7949 28.7938 23.5298V21.8648C28.7938 21.5997 28.5789 21.3848 28.3138 21.3848Z" fill="#FFD1A4" />
                  <path d="M11.9481 25.9404H10.2831C10.018 25.9404 9.8031 26.1553 9.8031 26.4204V28.0854C9.8031 28.3505 10.018 28.5654 10.2831 28.5654H11.9481C12.2132 28.5654 12.4281 28.3505 12.4281 28.0854V26.4204C12.4281 26.1553 12.2132 25.9404 11.9481 25.9404Z" fill="#FFD1A4" />
                  <path d="M17.4044 25.9404H15.7394C15.4743 25.9404 15.2594 26.1553 15.2594 26.4204V28.0854C15.2594 28.3505 15.4743 28.5654 15.7394 28.5654H17.4044C17.6695 28.5654 17.8844 28.3505 17.8844 28.0854V26.4204C17.8844 26.1553 17.6695 25.9404 17.4044 25.9404Z" fill="#FFD1A4" />
                  <path d="M22.8575 25.9404H21.1925C20.9274 25.9404 20.7125 26.1553 20.7125 26.4204V28.0854C20.7125 28.3505 20.9274 28.5654 21.1925 28.5654H22.8575C23.1226 28.5654 23.3375 28.3505 23.3375 28.0854V26.4204C23.3375 26.1553 23.1226 25.9404 22.8575 25.9404Z" fill="#FFD1A4" />
                  <path d="M32.5 28.8404C32.5012 29.4742 32.3144 30.0941 31.9632 30.6217C31.612 31.1493 31.1122 31.5608 30.527 31.8042C29.9418 32.0476 29.2976 32.1119 28.6758 31.989C28.0541 31.8661 27.4827 31.5616 27.0341 31.1138C26.5855 30.6661 26.2799 30.0954 26.1558 29.4739C26.0317 28.8524 26.0947 28.208 26.337 27.6223C26.5792 27.0367 26.9898 26.5361 27.5167 26.1838C28.0435 25.8316 28.6631 25.6436 29.2969 25.6436C30.1451 25.6444 30.9584 25.9813 31.5587 26.5804C32.159 27.1796 32.4975 27.9922 32.5 28.8404Z" fill="#E85966" />
                  <path d="M28.5219 30.3691L27.45 29.2941L27.8688 28.8754L28.5219 29.5285L30.7281 27.3223L31.1469 27.741L28.5219 30.3691Z" fill="#EEEFEE" />
                </g>
                <defs>
                  <clipPath id="clip0_2202_83537">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className='appointments-total-box-item m-0'>98 Appointments</p>

            </div>
          </div>
          <Button variant="default" onClick={() => { setBookAppointmentModal(true) }} >
            <div className="d-flex justify-content-center align-items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M19.8016 3.42969H17.9266V3.05469C17.9266 2.75632 17.8081 2.47017 17.5971 2.25919C17.3862 2.04821 17.1 1.92969 16.8016 1.92969C16.5033 1.92969 16.2171 2.04821 16.0061 2.25919C15.7952 2.47017 15.6766 2.75632 15.6766 3.05469V3.42969H8.92664V3.05469C8.92664 2.75632 8.80811 2.47017 8.59713 2.25919C8.38615 2.04821 8.1 1.92969 7.80164 1.92969C7.50327 1.92969 7.21712 2.04821 7.00614 2.25919C6.79516 2.47017 6.67664 2.75632 6.67664 3.05469V3.42969H4.80164C4.30435 3.42969 3.82744 3.62723 3.47581 3.97886C3.12418 4.33049 2.92664 4.80741 2.92664 5.30469V20.3047C2.92664 20.802 3.12418 21.2789 3.47581 21.6305C3.82744 21.9821 4.30435 22.1797 4.80164 22.1797H19.8016C20.2989 22.1797 20.7758 21.9821 21.1275 21.6305C21.4791 21.2789 21.6766 20.802 21.6766 20.3047V5.30469C21.6766 4.80741 21.4791 4.33049 21.1275 3.97886C20.7758 3.62723 20.2989 3.42969 19.8016 3.42969ZM6.67664 5.67969C6.67664 5.97806 6.79516 6.2642 7.00614 6.47518C7.21712 6.68616 7.50327 6.80469 7.80164 6.80469C8.1 6.80469 8.38615 6.68616 8.59713 6.47518C8.80811 6.2642 8.92664 5.97806 8.92664 5.67969H15.6766C15.6766 5.97806 15.7952 6.2642 16.0061 6.47518C16.2171 6.68616 16.5033 6.80469 16.8016 6.80469C17.1 6.80469 17.3862 6.68616 17.5971 6.47518C17.8081 6.2642 17.9266 5.97806 17.9266 5.67969H19.4266V7.92969H5.17664V5.67969H6.67664ZM5.17664 19.9297V10.1797H19.4266V19.9297H5.17664Z" fill="white" />
              </svg>
              Book Appointment
            </div>
          </Button>

        </div>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <span className="sort-by-lable">Sort by:</span>
          <InputSelect
            label=""
            name="tests"
            // value={formData.tests}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleChange(e.target.value);
            }}
            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
            required={true}
            disabled={false}
            placeholder="All Time"
            className="patient-header-select-filter"
            // error={formError.tests}
            options={[
              { id: "1", value: "Today", label: "Today" },
              { id: "2", value: "Yesterday", label: "Yesterday" },
              { id: "3", value: "tomorrow", label: "tomorrow" },
            ]}
          />

          <div className="patient-header-filter-icon-box ">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M6.30166 10.6484V4.55469C6.30166 4.35578 6.22264 4.16501 6.08199 4.02436C5.94134 3.88371 5.75057 3.80469 5.55166 3.80469C5.35275 3.80469 5.16198 3.88371 5.02133 4.02436C4.88068 4.16501 4.80166 4.35578 4.80166 4.55469V10.6484C4.15635 10.8137 3.58438 11.189 3.17593 11.7152C2.76748 12.2414 2.54578 12.8886 2.54578 13.5547C2.54578 14.2208 2.76748 14.868 3.17593 15.3942C3.58438 15.9204 4.15635 16.2957 4.80166 16.4609V21.0547C4.80166 21.2536 4.88068 21.4444 5.02133 21.585C5.16198 21.7257 5.35275 21.8047 5.55166 21.8047C5.75057 21.8047 5.94134 21.7257 6.08199 21.585C6.22264 21.4444 6.30166 21.2536 6.30166 21.0547V16.4609C6.94697 16.2957 7.51894 15.9204 7.92739 15.3942C8.33584 14.868 8.55754 14.2208 8.55754 13.5547C8.55754 12.8886 8.33584 12.2414 7.92739 11.7152C7.51894 11.189 6.94697 10.8137 6.30166 10.6484ZM5.55166 15.0547C5.25499 15.0547 4.96498 14.9667 4.7183 14.8019C4.47163 14.6371 4.27937 14.4028 4.16584 14.1287C4.05231 13.8546 4.0226 13.553 4.08048 13.2621C4.13836 12.9711 4.28122 12.7038 4.491 12.494C4.70078 12.2842 4.96805 12.1414 5.25902 12.0835C5.54999 12.0256 5.8516 12.0553 6.12568 12.1689C6.39977 12.2824 6.63404 12.4747 6.79886 12.7213C6.96369 12.968 7.05166 13.258 7.05166 13.5547C7.05166 13.9525 6.89362 14.334 6.61232 14.6153C6.33101 14.8967 5.94948 15.0547 5.55166 15.0547ZM13.0517 6.14844V4.55469C13.0517 4.35578 12.9726 4.16501 12.832 4.02436C12.6913 3.88371 12.5006 3.80469 12.3017 3.80469C12.1027 3.80469 11.912 3.88371 11.7713 4.02436C11.6307 4.16501 11.5517 4.35578 11.5517 4.55469V6.14844C10.9063 6.31366 10.3344 6.68896 9.92593 7.21517C9.51748 7.74138 9.29578 8.38856 9.29578 9.05469C9.29578 9.72082 9.51748 10.368 9.92593 10.8942C10.3344 11.4204 10.9063 11.7957 11.5517 11.9609V21.0547C11.5517 21.2536 11.6307 21.4444 11.7713 21.585C11.912 21.7257 12.1027 21.8047 12.3017 21.8047C12.5006 21.8047 12.6913 21.7257 12.832 21.585C12.9726 21.4444 13.0517 21.2536 13.0517 21.0547V11.9609C13.697 11.7957 14.2689 11.4204 14.6774 10.8942C15.0858 10.368 15.3075 9.72082 15.3075 9.05469C15.3075 8.38856 15.0858 7.74138 14.6774 7.21517C14.2689 6.68896 13.697 6.31366 13.0517 6.14844ZM12.3017 10.5547C12.005 10.5547 11.715 10.4667 11.4683 10.3019C11.2216 10.1371 11.0294 9.9028 10.9158 9.62871C10.8023 9.35462 10.7726 9.05302 10.8305 8.76205C10.8884 8.47108 11.0312 8.20381 11.241 7.99403C11.4508 7.78425 11.7181 7.64139 12.009 7.58351C12.3 7.52563 12.6016 7.55534 12.8757 7.66887C13.1498 7.7824 13.384 7.97466 13.5489 8.22133C13.7137 8.46801 13.8017 8.75802 13.8017 9.05469C13.8017 9.45251 13.6436 9.83404 13.3623 10.1153C13.081 10.3967 12.6995 10.5547 12.3017 10.5547ZM22.0517 16.5547C22.051 15.8896 21.8298 15.2435 21.4227 14.7176C21.0155 14.1917 20.4454 13.8156 19.8017 13.6484V4.55469C19.8017 4.35578 19.7226 4.16501 19.582 4.02436C19.4413 3.88371 19.2506 3.80469 19.0517 3.80469C18.8527 3.80469 18.662 3.88371 18.5213 4.02436C18.3807 4.16501 18.3017 4.35578 18.3017 4.55469V13.6484C17.6563 13.8137 17.0844 14.189 16.6759 14.7152C16.2675 15.2414 16.0458 15.8886 16.0458 16.5547C16.0458 17.2208 16.2675 17.868 16.6759 18.3942C17.0844 18.9204 17.6563 19.2957 18.3017 19.4609V21.0547C18.3017 21.2536 18.3807 21.4444 18.5213 21.585C18.662 21.7257 18.8527 21.8047 19.0517 21.8047C19.2506 21.8047 19.4413 21.7257 19.582 21.585C19.7226 21.4444 19.8017 21.2536 19.8017 21.0547V19.4609C20.4454 19.2937 21.0155 18.9177 21.4227 18.3918C21.8298 17.8659 22.051 17.2198 22.0517 16.5547ZM19.0517 18.0547C18.755 18.0547 18.465 17.9667 18.2183 17.8019C17.9716 17.6371 17.7794 17.4028 17.6658 17.1287C17.5523 16.8546 17.5226 16.553 17.5805 16.2621C17.6384 15.9711 17.7812 15.7038 17.991 15.494C18.2008 15.2842 18.4681 15.1414 18.759 15.0835C19.05 15.0256 19.3516 15.0553 19.6257 15.1689C19.8998 15.2824 20.134 15.4747 20.2989 15.7213C20.4637 15.968 20.5517 16.258 20.5517 16.5547C20.5517 16.9525 20.3936 17.334 20.1123 17.6153C19.831 17.8967 19.4495 18.0547 19.0517 18.0547Z" fill="#2B4360" />
            </svg>
          </div>
        </div>

      </div>

      <Row className='mt-3'>
        <Col xl={3}>
          <div className='custom-date-calendar calendar-box' >
            <div className='d-flex align-item-center justify-content-center '>
              <Button variant="outline" disabled={false} onClick={() => { setBlockCalendarModal(true); }}>
                <div className='d-flex gap-2 align-items-center'>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.25 2.5H14.375V1.875C14.375 1.70924 14.3092 1.55027 14.1919 1.43306C14.0747 1.31585 13.9158 1.25 13.75 1.25C13.5842 1.25 13.4253 1.31585 13.3081 1.43306C13.1908 1.55027 13.125 1.70924 13.125 1.875V2.5H6.875V1.875C6.875 1.70924 6.80915 1.55027 6.69194 1.43306C6.57473 1.31585 6.41576 1.25 6.25 1.25C6.08424 1.25 5.92527 1.31585 5.80806 1.43306C5.69085 1.55027 5.625 1.70924 5.625 1.875V2.5H3.75C3.41848 2.5 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41848 2.5 3.75V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H16.25C16.5815 17.5 16.8995 17.3683 17.1339 17.1339C17.3683 16.8995 17.5 16.5815 17.5 16.25V3.75C17.5 3.41848 17.3683 3.10054 17.1339 2.86612C16.8995 2.6317 16.5815 2.5 16.25 2.5ZM5.625 3.75V4.375C5.625 4.54076 5.69085 4.69973 5.80806 4.81694C5.92527 4.93415 6.08424 5 6.25 5C6.41576 5 6.57473 4.93415 6.69194 4.81694C6.80915 4.69973 6.875 4.54076 6.875 4.375V3.75H13.125V4.375C13.125 4.54076 13.1908 4.69973 13.3081 4.81694C13.4253 4.93415 13.5842 5 13.75 5C13.9158 5 14.0747 4.93415 14.1919 4.81694C14.3092 4.69973 14.375 4.54076 14.375 4.375V3.75H16.25V6.25H3.75V3.75H5.625ZM16.25 16.25H3.75V7.5H16.25V16.25ZM12.3172 10.4422L10.8836 11.875L12.3172 13.3078C12.3753 13.3659 12.4213 13.4348 12.4527 13.5107C12.4842 13.5866 12.5003 13.6679 12.5003 13.75C12.5003 13.8321 12.4842 13.9134 12.4527 13.9893C12.4213 14.0652 12.3753 14.1341 12.3172 14.1922C12.2591 14.2503 12.1902 14.2963 12.1143 14.3277C12.0384 14.3592 11.9571 14.3753 11.875 14.3753C11.7929 14.3753 11.7116 14.3592 11.6357 14.3277C11.5598 14.2963 11.4909 14.2503 11.4328 14.1922L10 12.7586L8.56719 14.1922C8.50912 14.2503 8.44018 14.2963 8.36431 14.3277C8.28844 14.3592 8.20712 14.3753 8.125 14.3753C8.04288 14.3753 7.96156 14.3592 7.88569 14.3277C7.80982 14.2963 7.74088 14.2503 7.68281 14.1922C7.62474 14.1341 7.57868 14.0652 7.54725 13.9893C7.51583 13.9134 7.49965 13.8321 7.49965 13.75C7.49965 13.6679 7.51583 13.5866 7.54725 13.5107C7.57868 13.4348 7.62474 13.3659 7.68281 13.3078L9.11641 11.875L7.68281 10.4422C7.56554 10.3249 7.49965 10.1659 7.49965 10C7.49965 9.83415 7.56554 9.67509 7.68281 9.55781C7.80009 9.44054 7.95915 9.37465 8.125 9.37465C8.29085 9.37465 8.44991 9.44054 8.56719 9.55781L10 10.9914L11.4328 9.55781C11.4909 9.49974 11.5598 9.45368 11.6357 9.42225C11.7116 9.39083 11.7929 9.37465 11.875 9.37465C11.9571 9.37465 12.0384 9.39083 12.1143 9.42225C12.1902 9.45368 12.2591 9.49974 12.3172 9.55781C12.3753 9.61588 12.4213 9.68482 12.4527 9.76069C12.4842 9.83656 12.5003 9.91788 12.5003 10C12.5003 10.0821 12.4842 10.1634 12.4527 10.2393C12.4213 10.3152 12.3753 10.3841 12.3172 10.4422Z" fill="#2B4360" />
                  </svg>
                  <span>
                    Block Calendar
                  </span>
                </div>
              </Button>
            </div>

            {/* Multi-Select DatePicker Component */}
            <div className="mt-3">

              <div className="d-flex align-items-center justify-content-center ">
                <div className=" w-100 calender-card-main" >
                  <Stack direction="horizontal" className="mb-0 p-3 ">
                    <h2 className="calendar-header m-0">Calendar</h2>
                    <div
                      className={`ms-auto d-flex align-items-center dropdown-toggle-icon ${isOpen ? "open" : ""}`}
                      role="button"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <SlArrowDown size={18} />
                    </div>
                  </Stack>

                  {/* Collapsible Calendar Section */}
                  {isOpen && (
                    <Box
                      sx={{
                        overflow: 'hidden',
                        transition: 'max-height 0.4s ease',
                        '.MuiDateCalendar-root': {
                          overflow: 'hidden',
                        },
                      }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                          value={value}
                          onChange={(newValue) => setValue(newValue)}
                          views={['year', 'month', 'day']}
                          showDaysOutsideCurrentMonth
                          disableHighlightToday
                          sx={{
                            '&::-webkit-scrollbar': { display: 'none' },
                            overflow: 'hidden',

                          }}

                          // slots={{ day: WeekHighlightDay }}
                          // slotProps={{
                          //   day: (ownerState) => ({
                          //     ...ownerState,
                          //     selectedDay: value,   // <-- now allowed
                          //   })
                          // }}

                          {...(selectedView === "week" && {
                            slots: { day: WeekHighlightDay }
                          })}

                          slotProps={
                            selectedView === "week"
                              ? {
                                day: (ownerState) => ({
                                  ...ownerState,
                                  selectedDay: value,
                                }),
                              }
                              : undefined
                          }

                        />
                      </LocalizationProvider>
                    </Box>
                  )}
                </div>

              </div>
            </div>

            <div className='border-bottom p-0'></div>

            <div className="p-3 " >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0 doctor-listing-calender-heading">Filter</h6>
                <p className="mb-0 doctor-listing-calender-filter " onClick={clearAll}>Clear all</p>

              </div>

              <Form>
                {options.map((option, idx) => (
                  <div className='doctor-listing-filter' key={idx}>
                    <Form.Check
                      key={idx}
                      type="checkbox"
                      label={option}
                      checked={filters.includes(option)}
                      onChange={() => handleChange(option)}
                      className="mb-2  settings-accordion-subtitle cursor-pointer"
                    />
                  </div>
                ))}
              </Form>
            </div>

          </div>

        </Col>
        <Col xl={9}>
          <Row>
            <div className="d-flex justify-content-between ">

              <div className="mt-3">
                {selectedView === "day" && (
                  <div>
                    <p className="doctor-listing-date-heading m-0">
                      {monthYearFormat}
                    </p>
                    <p className="doctor-listing-date-subtitle">{CalnderAppointments.length} Appointments</p>
                  </div>
                )}

                {selectedView === "week" && (
                  <div>
                    {selectedDate && (
                      <p className="doctor-listing-date-heading m-0">
                        {monthYearWithWeekRange}
                      </p>
                    )}
                    <p className="doctor-listing-date-subtitle">{CalnderAppointmentsWeek.length} Appointments</p>
                  </div>
                )}

                {selectedView === "month" && (
                  <div>
                    {selectedDate && (
                      <p className="doctor-listing-date-heading m-0">
                        {monthYearFormat}
                      </p>
                    )}
                    <p className="doctor-listing-date-subtitle">{AppointmentsMonthShow.length} Appointments</p>
                  </div>
                )}
              </div>

              <div className='doctor-listing-day-week-month-main'>

                <Nav
                  variant="pills"
                  activeKey={selectedView}
                  onSelect={(selectedKey) => {
                    if (selectedKey) setSelectedView(selectedKey);
                  }}
                >
                  <Nav.Item>
                    <Nav.Link eventKey="day" className={(selectedView === 'day' ? 'doctor-listing-day-week-month' : '') || 'doctor-listing-day-custom-active111 '}>Day</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="week" className={(selectedView === 'week' ? 'doctor-listing-day-week-month' : '') || 'doctor-listing-day-custom-active111'}>Week</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="month" className={(selectedView === 'month' ? 'doctor-listing-day-week-month' : '') || 'doctor-listing-day-custom-active111'}>Month</Nav.Link>
                  </Nav.Item>
                </Nav>

              </div>
            </div>

            <Modal
              show={doctorListingModal}
              onHide={() => setDoctorListingModal(false)}
              header={

                <>
                  <div className='d-flex gap-3'>
                    <p className="doctor-listing-modal-label"># Appointment Id <span className='doctor-listing-modal-id'>{selectedPatient?.appointment_id}</span></p>
                    <p className='doctor-listing-modal-main-title'> <svg className='me-1' width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M6.42856 15.7212C6.28105 15.5679 6.04545 15.2241 6.04545 15.2241C6.04545 15.2241 5.62252 14.4667 3.89792 14.3681C3.80386 14.3577 3.70956 14.3519 3.61534 14.3461C3.46694 14.3369 3.3187 14.3277 3.17186 14.3008C2.68087 14.2109 2.22093 14.0485 1.83573 13.7044C1.57094 13.4678 1.39545 13.1675 1.26153 12.8386C1.18595 12.653 0.647948 10.9523 1.04762 11.1046C1.1389 11.1394 1.21436 11.1991 1.27726 11.2761C1.37625 11.3972 1.44393 11.5376 1.5116 11.6779L1.53005 11.7161C1.55691 11.7715 1.58293 11.8275 1.60895 11.8834C1.6897 12.0569 1.77045 12.2304 1.87651 12.39C1.98348 12.551 1.98325 12.5513 1.85246 12.6989C1.65002 12.9275 1.69189 13.2283 1.95067 13.3857C2.0492 13.4456 2.1561 13.4851 2.26853 13.5101C2.67757 13.601 3.09106 13.6634 3.50646 13.71C3.53341 13.7131 3.56046 13.7168 3.58786 13.7207C3.69481 13.7356 3.80745 13.7513 3.9412 13.7265C3.91451 13.7164 3.89181 13.7076 3.87162 13.6997C3.83435 13.6851 3.80559 13.6739 3.77626 13.6649C3.41362 13.5534 3.04272 13.4798 2.67128 13.4091C2.6328 13.4018 2.59423 13.3948 2.55566 13.3879C2.37028 13.3546 2.18493 13.3214 2.01003 13.2437C1.90306 13.1961 1.8347 13.1154 1.83821 12.9903C1.84171 12.8656 1.89908 12.7776 2.01622 12.7285C2.12869 12.6814 2.24648 12.6664 2.36397 12.6514L2.36424 12.6513C2.38439 12.6488 2.40454 12.6462 2.42465 12.6435C2.88269 12.5812 3.34337 12.5775 3.80428 12.5737C3.84971 12.5734 3.89519 12.573 3.94062 12.5726C4.813 12.5644 5.60371 12.8247 6.32057 13.333C6.58031 13.5172 6.78397 13.7199 6.97498 13.9101C7.34794 14.2813 7.67267 14.6046 8.27244 14.648C8.84386 14.6893 9.16485 14.5743 9.5724 14.1571C10.8403 12.7824 11.1904 12.2357 11.8692 11.1756C11.9868 10.9919 12.1143 10.7928 12.2581 10.5713C12.1453 10.7143 12.0317 10.8496 11.9193 10.9836C11.7518 11.1831 11.587 11.3796 11.4311 11.5934C11.2003 11.9099 10.9695 12.2265 10.7072 12.5082C10.1367 13.2073 9.88957 13.4848 9.20999 14.1571C8.98346 14.4452 8.47569 14.4251 8.32448 14.3705C8.09277 14.2869 8.01827 14.2241 7.89094 14.1167C7.84512 14.078 7.79245 14.0336 7.72315 13.9804C7.62031 13.9014 7.51811 13.8214 7.4159 13.7415C7.04659 13.4527 6.67717 13.1638 6.27814 12.9186C5.74465 12.5908 5.17281 12.3664 4.55568 12.2957C3.87376 12.2175 3.19322 12.2716 2.51679 12.38C2.42583 12.3945 2.36558 12.3713 2.31372 12.2885C2.1208 11.9807 2.03284 11.648 2.06887 11.2812C2.14307 10.5257 2.49685 9.96507 3.15867 9.63079C3.72896 9.34274 4.39198 9.4334 4.71623 9.97879C4.78394 10.0927 4.89657 10.1602 5.02786 10.1713C5.06997 10.1749 5.11275 10.1686 5.15565 10.1623C5.18216 10.1584 5.20875 10.1545 5.23522 10.1529C5.32733 10.1474 5.38399 10.1896 5.38568 10.2904C5.38668 10.3503 5.40539 10.393 5.46482 10.411C5.5719 10.4434 5.62705 10.5236 5.64629 10.6329C5.65524 10.6836 5.68111 10.7244 5.7072 10.7655C5.71123 10.7718 5.7153 10.7782 5.71928 10.7846C5.84123 10.9809 5.84001 11.1351 5.70691 11.322C5.5886 11.4882 5.52806 11.6783 5.48127 11.8746L5.48029 11.8787C5.47177 11.9142 5.46164 11.9564 5.49467 11.9893C5.49681 11.9882 5.49889 11.9872 5.50087 11.9863C5.5024 11.9856 5.50388 11.985 5.50528 11.9844C5.51116 11.9819 5.51572 11.9799 5.51788 11.9764C5.72195 11.6432 6.02797 11.4862 6.39318 11.4303C6.87852 11.3559 7.23799 11.118 7.38629 10.6066C7.39161 10.5882 7.39806 10.5701 7.40451 10.5521C7.41339 10.5273 7.42227 10.5025 7.42817 10.4769C7.47632 10.2682 7.45533 10.0768 7.29567 9.92026C7.25582 9.88121 7.21932 9.83826 7.1834 9.7952C7.15931 9.76632 7.13559 9.73456 7.15961 9.69295C7.18378 9.65109 7.22251 9.65259 7.26196 9.65411L7.26691 9.6543C7.28718 9.65505 7.30558 9.66389 7.32392 9.67269C7.34854 9.68452 7.37305 9.69629 7.40179 9.68832C7.42414 9.66193 7.41719 9.63588 7.41032 9.61015C7.40747 9.59951 7.40464 9.5889 7.40391 9.57837C7.402 9.55081 7.39704 9.52342 7.39207 9.49604C7.3821 9.44106 7.37214 9.38613 7.38694 9.32998C7.389 9.32213 7.39059 9.31361 7.3922 9.30495C7.39908 9.26797 7.40645 9.22831 7.45415 9.22631C7.49569 9.22456 7.50564 9.2585 7.51518 9.29108C7.5177 9.29967 7.5202 9.30821 7.52324 9.31593C7.53105 9.3358 7.53751 9.3564 7.54401 9.37717C7.5628 9.43712 7.58198 9.49836 7.63544 9.54681C7.6674 9.47521 7.67816 9.40272 7.68868 9.33181C7.69498 9.28936 7.70119 9.24747 7.71183 9.20668C7.72393 9.16022 7.74343 9.11555 7.79789 9.1203C7.84385 9.12431 7.84913 9.16151 7.8545 9.19928L7.85551 9.20632C7.85594 9.20923 7.85638 9.21214 7.85686 9.21502C7.86036 9.2361 7.86152 9.25772 7.86271 9.27998C7.86551 9.33198 7.86849 9.38753 7.90178 9.44788C7.9093 9.42728 7.91594 9.40855 7.92211 9.39114C7.93509 9.35455 7.94601 9.32376 7.95859 9.29376L7.96145 9.28686C7.97495 9.25407 7.99012 9.21721 8.03484 9.22835C8.0746 9.23825 8.07554 9.27775 8.07588 9.31238C8.07639 9.36467 8.07629 9.41697 8.07619 9.47229V9.47268L8.07618 9.4741C8.07614 9.4969 8.0761 9.52021 8.0761 9.54424C8.11495 9.53129 8.13149 9.50646 8.14683 9.48344C8.15214 9.47547 8.15731 9.46771 8.16321 9.46074C8.16695 9.45632 8.17066 9.45153 8.17441 9.44669C8.19445 9.42082 8.21584 9.3932 8.25142 9.40983C8.29522 9.4303 8.29111 9.47784 8.28387 9.5202C8.27094 9.59576 8.24349 9.6661 8.21043 9.7344C8.09136 9.98031 8.03796 10.2428 8.03473 10.5161C8.0267 11.1942 7.79166 11.7368 7.18626 12.0626C7.18049 12.0657 7.17409 12.0683 7.16753 12.071C7.14131 12.0819 7.11252 12.0938 7.11102 12.1403L7.14712 12.1403H7.14756H7.14859C7.17315 12.1402 7.19704 12.1402 7.22094 12.1403C7.62218 12.1419 7.80861 12.2938 7.86771 12.6545C7.91656 12.9526 8.06531 13.2089 8.27244 13.4247C8.27798 13.4304 8.28342 13.4365 8.2889 13.4426C8.31704 13.4739 8.34628 13.5065 8.39441 13.5064C8.40671 13.4712 8.3903 13.4504 8.37523 13.4313C8.37226 13.4275 8.36934 13.4238 8.36669 13.42C8.14861 13.111 8.00861 12.7685 7.94125 12.3917C7.88461 12.0749 7.99035 11.8084 8.25254 11.6371C8.39025 11.5472 8.54165 11.4893 8.69506 11.4364C8.79043 11.4034 8.88587 11.3707 8.98132 11.338L8.98248 11.3376C9.22095 11.2558 9.45947 11.174 9.69681 11.0888C9.86243 11.0294 9.9118 10.9484 9.86191 10.7863C9.82099 10.6533 9.81213 10.5174 9.80328 10.3817C9.7981 10.3022 9.79292 10.2227 9.78129 10.1439C9.76666 10.0447 9.81021 10.0049 9.90138 10.0391C9.95221 10.0582 10.0049 10.0645 10.058 10.071C10.1006 10.0761 10.1434 10.0813 10.1858 10.0931C10.1942 10.0955 10.2024 10.0977 10.2103 10.0999L10.2183 10.102C10.3442 10.1363 10.3971 10.1506 10.4218 10.2979C10.4345 10.3737 10.4486 10.4492 10.4626 10.5248L10.4626 10.5251C10.4956 10.703 10.5285 10.8809 10.545 11.0617C10.5648 11.2779 10.5124 11.3966 10.3192 11.4612C10.1088 11.5315 9.9442 11.6589 9.78935 11.8149C9.61785 11.9876 9.42541 12.1343 9.20831 12.2421C9.1992 12.2466 9.18921 12.25 9.17925 12.2535C9.15011 12.2635 9.12122 12.2735 9.11538 12.3101C9.10784 12.3573 9.14182 12.3775 9.17401 12.3966C9.17855 12.3993 9.18305 12.402 9.1874 12.4047C9.18933 12.4059 9.19123 12.4071 9.19309 12.4084C9.19742 12.4113 9.20163 12.4146 9.20586 12.4181C9.20719 12.4192 9.20853 12.4203 9.20987 12.4215C9.22901 12.4375 9.24903 12.4542 9.28054 12.4415C9.27915 12.4374 9.27809 12.4332 9.27708 12.4293C9.275 12.4212 9.27311 12.4138 9.26898 12.4082L9.26698 12.4055L9.26283 12.3999C9.23492 12.3625 9.20545 12.323 9.23536 12.2755C9.26241 12.2325 9.30424 12.2421 9.34296 12.251C9.35139 12.2529 9.35968 12.2548 9.36763 12.2562C9.53772 12.2844 9.67547 12.374 9.78844 12.5065C9.83418 12.5601 9.8752 12.5867 9.92578 12.5082C10.1491 12.1619 10.4124 11.8513 10.7072 11.5682C10.8214 11.4585 10.8853 11.3155 10.9016 11.1561C10.9489 10.6934 10.857 10.2698 10.55 9.91517C10.4741 9.82749 10.4762 9.75956 10.546 9.66727C10.8308 9.29087 11.0638 8.88223 11.2163 8.42891C11.374 7.95986 11.398 7.49508 11.1194 7.06141C10.9222 6.75438 10.6503 6.53009 10.332 6.36645C10.1755 6.28594 10.0087 6.27389 9.83791 6.29008C9.8177 6.292 9.79806 6.2978 9.77809 6.3037C9.74515 6.31344 9.71133 6.32343 9.67265 6.31663C9.6688 6.25148 9.68879 6.19317 9.7086 6.13536C9.71788 6.1083 9.72712 6.08134 9.73386 6.05384C9.74487 6.00891 9.7575 5.96439 9.77013 5.91989C9.78129 5.88055 9.79246 5.8412 9.80251 5.80156C9.82486 5.71338 9.84558 5.62468 9.8644 5.53562L9.86689 5.52393L9.86698 5.52347C9.88422 5.4424 9.90176 5.35991 9.88353 5.25539C9.87863 5.26833 9.87462 5.27829 9.87134 5.28644C9.8659 5.29996 9.86246 5.30852 9.8603 5.31738C9.7106 5.93205 9.45088 6.49635 9.12856 7.03175C9.03123 7.19342 8.92442 7.34834 8.79221 7.48189C8.69857 7.57647 8.59265 7.65035 8.45607 7.65813C8.22383 7.67135 8.06231 7.55451 7.95738 7.35087C7.88075 7.20216 7.77387 7.13097 7.60939 7.15336C7.5405 7.16273 7.47035 7.16044 7.40437 7.12759C7.30353 7.0774 7.29194 7.02786 7.35419 6.93176C7.36238 6.91912 7.37286 6.90739 7.38341 6.89557C7.41112 6.86454 7.45189 6.8182 7.44081 6.76777C7.40687 6.75628 7.3641 6.77716 7.3429 6.79118C7.33639 6.79549 7.32997 6.79974 7.32331 6.80316C7.06526 6.93575 6.96959 6.90349 6.86457 6.62821C6.82617 6.52755 6.75585 6.47912 6.65011 6.48793C6.59429 6.49258 6.54135 6.50916 6.48845 6.52573C6.45716 6.53553 6.42588 6.54533 6.39402 6.55266C6.12725 6.61398 5.98114 6.46675 6.02591 6.1875C6.06945 5.91591 6.08867 5.64434 6.01687 5.37325C5.99345 5.28482 5.95275 5.24673 5.85904 5.26596C5.77341 5.28352 5.74249 5.26256 5.66967 5.21318C5.66517 5.21013 5.6605 5.20697 5.65566 5.2037C5.6757 5.19561 5.68175 5.19321 5.6876 5.19037C5.69245 5.18801 5.69716 5.18535 5.70962 5.17889C5.88697 5.12391 6.06225 5.06957 6.22071 4.9713C6.41498 4.85083 6.57199 4.69409 6.65928 4.45051C6.59103 4.46182 6.54564 4.49164 6.51839 4.52695C6.51408 4.53253 6.50977 4.53811 6.50544 4.54351C6.34242 4.74672 6.15346 4.89486 5.93077 5.01559C5.87729 5.04458 5.83673 5.0612 5.80591 4.99881C5.71077 4.80627 5.55392 4.67505 5.39276 4.54768C4.92429 4.17742 4.56674 3.7191 4.35401 3.14504C4.35199 3.13958 4.35041 3.13362 4.34877 3.12747C4.34259 3.10424 4.33567 3.0782 4.30155 3.06545C4.36873 3.6759 4.66351 4.13936 5.13222 4.4893C5.09477 4.53471 5.06394 4.5287 5.03658 4.52337L5.03587 4.52323C4.7745 4.47233 4.51765 4.40169 4.29904 4.23854C3.60817 3.72292 3.41489 2.99229 3.49394 2.1588C3.53899 1.68374 3.73646 1.26248 3.98287 0.864562L3.98956 0.853778C4.02642 0.794318 4.06355 0.734412 4.09177 0.670688C5.0395 0.239372 6.08686 0 7.18812 0C11.448 0 14.9014 3.58172 14.9014 8C14.9014 12.4183 11.448 16 7.18812 16C7.01733 16 6.84784 15.9942 6.67982 15.9829C6.59617 15.8956 6.51243 15.8083 6.42856 15.7212ZM13.2756 6.60108C13.2072 6.5791 13.0821 6.52468 12.9276 6.44524C13.0814 6.52944 13.208 6.58183 13.2756 6.60108ZM12.9276 6.44524C12.5667 6.24784 12.0556 5.87562 11.8003 5.34601C12.3363 5.65693 12.4352 5.62976 12.4352 5.62976C12.4352 5.62976 11.9261 5.45514 11.6699 4.95656C11.5744 4.4632 11.6398 4.18462 11.6973 3.94002C11.7609 3.66947 11.8147 3.4405 11.6301 3.00844C11.3489 2.35029 9.46865 1.33153 8.56367 0.904423C9.38872 1.41149 10.9122 2.47822 11.2163 3.12747C11.3968 3.51285 11.5245 3.95958 11.4516 4.28715C11.3711 4.64941 11.2931 5.00012 11.566 5.39191C11.8699 5.82829 12.5073 6.22924 12.9276 6.44524ZM4.63062 2.63144C4.29641 2.20872 4.40306 1.59577 4.49816 1.34214C4.41665 2.51519 4.79365 2.49405 4.79365 2.49405C4.79365 2.49405 4.62043 2.0502 4.79365 1.8494C4.75289 2.0819 4.85886 2.59762 5.20122 2.8428C5.54358 3.08798 6.36958 3.34654 6.73979 3.44518C6.17599 3.35006 4.96483 3.05416 4.63062 2.63144ZM5.31352 1.57893C7.88673 2.43467 9.09366 2.40275 9.26903 2.23607C9.18003 2.21013 9.08838 2.18619 8.99642 2.16216C8.45902 2.02173 7.91066 1.87845 7.81346 1.31758C7.77921 1.11995 7.81862 0.916029 7.81862 0.916029C7.81862 0.916029 7.78217 1.0587 7.7829 1.31716C7.78467 1.94784 8.42305 2.16216 8.42305 2.16216C8.42305 2.16216 8.15201 2.18695 7.22376 2.00697C6.67985 1.90151 5.31352 1.57893 5.31352 1.57893Z" fill="#2B4360" />
                    </svg>
                      Maia Care Patient</p>
                  </div>
                </>

              }
              closeButton={true}
              size="lg"
            >
              <>
                <div>
                  <div className='doctor-listing-modal-profile'>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex gap-2' >
                        <Image src={selectedPatient?.patient_profile || ""} alt="doctor" className='doctor-listing-modal-profile-img' width={46} height={46} />
                        <div className='d-flex flex-column gap-2'>
                          <div className='d-flex gap-4'>
                            <p className='doctor-listing-modal-profile-title m-0'>{selectedPatient?.patient_name}</p>
                            <p className='doctor-listing-modal-profile-subtitle m-0'>{selectedPatient?.patient_status}</p>
                          </div>
                          <div className='d-flex gap-4'>
                            <p className='m-0 doctor-listing-modal-label'>  <svg width="14" height="13" className='me-1' viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.9668 0.569336C4.16741 0.544917 4.37051 0.586093 4.5459 0.686523C4.72135 0.787025 4.85999 0.941443 4.94043 1.12695V1.12793L6.25781 4.06348V4.07227L6.26367 4.08398C6.32443 4.22598 6.34845 4.38129 6.33496 4.53516C6.32142 4.68891 6.27004 4.83665 6.18555 4.96582C6.176 4.98012 6.1667 4.99447 6.15527 5.00879L4.85645 6.55273L4.83008 6.58398L4.84766 6.62012C5.32198 7.58396 6.32757 8.58152 7.30371 9.05566L7.33984 9.07422L7.37109 9.04785L8.89258 7.75098C8.90563 7.74001 8.91937 7.72912 8.93359 7.71973C9.06311 7.63338 9.21219 7.58078 9.36719 7.56641C9.52158 7.55216 9.67762 7.57612 9.82031 7.63672V7.6377L9.8291 7.64062V7.6416L12.7744 8.96094C12.9599 9.04146 13.1144 9.17997 13.2148 9.35547C13.2901 9.48706 13.332 9.63416 13.3379 9.78418L13.332 9.93457C13.2225 10.7662 12.8138 11.5295 12.1826 12.082C11.5513 12.6347 10.7404 12.939 9.90137 12.9375C4.97343 12.9375 0.963936 8.92792 0.963867 4C0.962363 3.16099 1.26668 2.35003 1.81934 1.71875C2.30283 1.16651 2.94739 0.784208 3.6582 0.624023L3.9668 0.569336ZM4.07227 1.4375C3.45236 1.52045 2.88365 1.82642 2.47266 2.29785C2.06165 2.76932 1.83649 3.37454 1.83887 4L1.84961 4.39941C1.95044 6.39146 2.78606 8.28118 4.20312 9.69824C5.71461 11.2097 7.76382 12.0602 9.90137 12.0625C10.5274 12.0646 11.133 11.8386 11.6045 11.4268C12.0761 11.0147 12.381 10.4441 12.4629 9.82324L12.4727 9.75293H12.4072L9.48242 8.44238L9.44629 8.42676L9.41602 8.45215L7.89746 9.74805C7.88445 9.75907 7.87059 9.76977 7.85645 9.7793C7.72165 9.86917 7.56588 9.92284 7.4043 9.93457C7.24254 9.94628 7.08006 9.91534 6.93359 9.8457H6.93457C5.84885 9.3211 4.76368 8.27996 4.1709 7.20801L4.05957 6.99316C3.9893 6.84779 3.95751 6.68653 3.96777 6.52539C3.97807 6.3643 4.03003 6.20848 4.11816 6.07324L4.11914 6.07227C4.12794 6.05823 4.13757 6.04474 4.14844 6.03223L4.14941 6.03125L5.44141 4.48535L5.46582 4.45508L5.4502 4.41895L4.14355 1.49414L4.15039 1.42773L4.07227 1.4375Z" fill="#8A8D93" stroke="#8A8D93" strokeWidth="0.125" />
                            </svg>
                              +91 {selectedPatient?.patient_contactnumber}</p>
                            <p className='m-0 doctor-listing-modal-label'> <svg width="14" height="10" className='me-1' viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.40137 0.0625H13.4014C13.5174 0.0625 13.6289 0.108383 13.7109 0.19043C13.793 0.272477 13.8389 0.383968 13.8389 0.5V9C13.8389 9.24864 13.7403 9.48727 13.5645 9.66309C13.3886 9.8389 13.15 9.9375 12.9014 9.9375H1.90137C1.65273 9.9375 1.4141 9.8389 1.23828 9.66309C1.06247 9.48727 0.963867 9.24864 0.963867 9V0.5C0.963867 0.383968 1.00975 0.272477 1.0918 0.19043C1.17384 0.108383 1.28534 0.0625 1.40137 0.0625ZM12.8594 1.59082L7.69727 6.32227C7.61655 6.39636 7.51093 6.4375 7.40137 6.4375C7.2918 6.4375 7.18618 6.39636 7.10547 6.32227L1.94336 1.59082L1.83887 1.49512V9.0625H12.9639V1.49512L12.8594 1.59082ZM2.64453 1.0459L7.35938 5.36816L7.40137 5.40625L7.44336 5.36816L12.1582 1.0459L12.2764 0.9375H2.52637L2.64453 1.0459Z" fill="#8A8D93" stroke="#8A8D93" strokeWidth="0.125" />
                            </svg>
                              {selectedPatient?.patient_email}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <AppointmentRequestCancelModel opcationShowDot={"appointmentsList"} setDoctorListingModal={setDoctorListingModal} RescheduleModal={RescheduleModal} setRescheduleModal={setRescheduleModal} setCancelModal={setCancelModal} CancelModal={CancelModal} />
                      </div>

                    </div>

                  </div>

                  <div className='mt-3'>
                    <p className='mb-2 doctor-listing-modal-label '><svg width="14" className='me-1' height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.499 6.55664C11.2136 6.43845 10.8997 6.40752 10.5967 6.46777C10.2936 6.52806 10.0154 6.67699 9.79688 6.89551C9.57836 7.11403 9.42943 7.39222 9.36914 7.69531C9.30889 7.99832 9.33982 8.31222 9.45801 8.59766C9.57624 8.88308 9.77636 9.12715 10.0332 9.29883C10.2902 9.47052 10.5923 9.5625 10.9014 9.5625C11.3158 9.5625 11.7128 9.39752 12.0059 9.10449C12.2989 8.81147 12.4639 8.4144 12.4639 8C12.4639 7.69097 12.3719 7.38879 12.2002 7.13184C12.0285 6.87499 11.7845 6.67487 11.499 6.55664ZM10.9014 7.3125C11.0837 7.3125 11.2588 7.38474 11.3877 7.51367C11.5166 7.6426 11.5889 7.81766 11.5889 8C11.5889 8.13597 11.5482 8.26878 11.4727 8.38184C11.3971 8.49486 11.2897 8.58274 11.1641 8.63477C11.0386 8.6867 10.9008 8.70028 10.7676 8.67383C10.6342 8.6473 10.5112 8.58248 10.415 8.48633C10.3189 8.39018 10.2541 8.26715 10.2275 8.13379C10.2011 8.00057 10.2147 7.8628 10.2666 7.7373C10.3186 7.61171 10.4065 7.50425 10.5195 7.42871C10.6326 7.35317 10.7654 7.3125 10.9014 7.3125ZM3.96387 7.41309L3.90918 7.40625C2.9578 7.28639 2.08257 6.82359 1.44824 6.10449C0.813904 5.38531 0.463989 4.45896 0.463867 3.5V0.5C0.463867 0.383968 0.50975 0.272477 0.591797 0.19043C0.653274 0.128952 0.731426 0.0881293 0.81543 0.0712891L0.901367 0.0625H2.40137C2.5174 0.0625 2.62889 0.108383 2.71094 0.19043C2.79298 0.272477 2.83887 0.383968 2.83887 0.5C2.83887 0.616032 2.79298 0.727523 2.71094 0.80957C2.62889 0.891617 2.5174 0.9375 2.40137 0.9375H1.33887V3.5L1.34277 3.65234C1.36035 4.00591 1.43934 4.35432 1.57617 4.68164C1.73256 5.05565 1.9615 5.3949 2.25 5.67969C2.53871 5.9646 2.88154 6.18934 3.25781 6.34082C3.6341 6.4923 4.03679 6.56791 4.44238 6.5625C6.10935 6.54068 7.4638 5.14254 7.46387 3.44824V0.9375H6.40137C6.28533 0.9375 6.17384 0.891617 6.0918 0.80957C6.00975 0.727523 5.96387 0.616032 5.96387 0.5C5.96387 0.383968 6.00975 0.272477 6.0918 0.19043C6.17384 0.108383 6.28533 0.0625 6.40137 0.0625H7.90137C8.0174 0.0625 8.12889 0.108383 8.21094 0.19043C8.29298 0.272477 8.33887 0.383968 8.33887 0.5V3.44824C8.33881 5.46936 6.82895 7.15798 4.89355 7.40527L4.83887 7.41211V10C4.83887 10.547 5.05657 11.0712 5.44336 11.458C5.83015 11.8448 6.35436 12.0625 6.90137 12.0625H8.40137C8.86963 12.0617 9.32391 11.902 9.68945 11.6094C10.055 11.3166 10.3109 10.908 10.4141 10.4512L10.4277 10.3906L10.3662 10.377C9.77746 10.2447 9.25857 9.89795 8.91016 9.40527C8.56192 8.91266 8.40897 8.30801 8.48047 7.70898C8.55207 7.10998 8.84338 6.55885 9.29785 6.16211C9.75241 5.76535 10.3381 5.55149 10.9414 5.56152C11.5446 5.57164 12.1224 5.80514 12.5635 6.2168C13.0045 6.62852 13.2776 7.18887 13.3291 7.79004C13.3806 8.39116 13.2073 8.98992 12.8428 9.4707C12.4782 9.95147 11.9482 10.2799 11.3555 10.3926L11.3047 10.4023V10.4502C11.1964 11.1419 10.8449 11.7726 10.3135 12.2285C9.78106 12.6852 9.10285 12.9366 8.40137 12.9375H6.90137C6.12255 12.9367 5.3759 12.6269 4.8252 12.0762C4.27449 11.5255 3.96469 10.7788 3.96387 10V7.41309Z" fill="#8A8D93" stroke="#8A8D93" strokeWidth="0.125" />
                    </svg>
                      Appointment</p>
                    <div className='d-flex justify-content-between'>



                      <p className='m-0 doctor-listing-modal-subtext '>  <svg width="14" className='me-1' height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.2764 0.1875C10.409 0.1875 10.5361 0.240216 10.6299 0.333984C10.7237 0.427753 10.7764 0.554892 10.7764 0.6875V1.3125H12.5264C12.8082 1.3125 13.0781 1.42477 13.2773 1.62402C13.4766 1.82328 13.5889 2.09321 13.5889 2.375V13.625C13.5889 13.9068 13.4766 14.1767 13.2773 14.376C13.0781 14.5752 12.8082 14.6875 12.5264 14.6875H1.27637C0.994575 14.6875 0.724648 14.5752 0.525391 14.376C0.326133 14.1767 0.213867 13.9068 0.213867 13.625V2.375C0.213867 2.09321 0.326133 1.82328 0.525391 1.62402C0.724648 1.42477 0.994575 1.3125 1.27637 1.3125H3.02637V0.6875C3.02637 0.554892 3.07908 0.427753 3.17285 0.333984C3.26662 0.240216 3.39376 0.1875 3.52637 0.1875C3.65898 0.1875 3.78611 0.240216 3.87988 0.333984C3.97365 0.427753 4.02637 0.554892 4.02637 0.6875V1.3125H9.77637V0.6875C9.77637 0.554892 9.82908 0.427753 9.92285 0.333984C10.0166 0.240216 10.1438 0.1875 10.2764 0.1875ZM1.21387 13.6875H12.5889V5.6875H1.21387V13.6875ZM1.21387 4.6875H12.5889V2.3125H10.7764V2.9375C10.7764 3.07011 10.7237 3.19725 10.6299 3.29102C10.5361 3.38478 10.409 3.4375 10.2764 3.4375C10.1438 3.4375 10.0166 3.38478 9.92285 3.29102C9.82908 3.19725 9.77637 3.07011 9.77637 2.9375V2.3125H4.02637V2.9375C4.02637 3.07011 3.97365 3.19725 3.87988 3.29102C3.78611 3.38478 3.65898 3.4375 3.52637 3.4375C3.39376 3.4375 3.26662 3.38478 3.17285 3.29102C3.07908 3.19725 3.02637 3.07011 3.02637 2.9375V2.3125H1.21387V4.6875Z" fill="#3E4A57" stroke="#3E4A57" strokeWidth="0.125" />
                      </svg>

                        {selectedPatient?.patient_appointment_date}</p>




                      <p className='m-0 doctor-listing-modal-subtext pe-3'> <svg width="16" className='me-1' height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.90137 0.75C9.82356 0.752046 11.6662 1.51678 13.0254 2.87598C14.3846 4.23517 15.1493 6.07781 15.1514 8C15.1514 9.43391 14.7263 10.8361 13.9297 12.0283C13.1331 13.2205 12.0005 14.1495 10.6758 14.6982C9.35112 15.2469 7.89356 15.39 6.4873 15.1104C5.08094 14.8306 3.78834 14.1409 2.77441 13.127C1.76048 12.113 1.07076 10.8204 0.791016 9.41406C0.511349 8.00781 0.65445 6.55025 1.20312 5.22559C1.75183 3.90091 2.6809 2.76831 3.87305 1.97168C4.99075 1.22485 6.29298 0.804535 7.63281 0.754883L7.90137 0.75ZM10.293 2.22559C9.15099 1.75261 7.89395 1.62897 6.68164 1.87012C5.46942 2.11133 4.3564 2.70707 3.48242 3.58105C2.60844 4.45504 2.01269 5.56805 1.77148 6.78027C1.53034 7.99258 1.65398 9.24962 2.12695 10.3916C2.59994 11.5335 3.40111 12.5095 4.42871 13.1963C5.39227 13.8401 6.51487 14.2033 7.66992 14.2461L7.90137 14.25C9.55837 14.2481 11.1467 13.5887 12.3184 12.417C13.49 11.2453 14.1495 9.65701 14.1514 8C14.1514 6.76387 13.7844 5.55515 13.0977 4.52734C12.4109 3.49974 11.4349 2.69857 10.293 2.22559ZM7.90137 3.5625C8.03397 3.5625 8.16111 3.61522 8.25488 3.70898C8.34865 3.80275 8.40137 3.92989 8.40137 4.0625V7.5H11.8389C11.9715 7.5 12.0986 7.55272 12.1924 7.64648C12.2862 7.74025 12.3389 7.86739 12.3389 8C12.3389 8.13261 12.2862 8.25975 12.1924 8.35352C12.0986 8.44728 11.9715 8.5 11.8389 8.5H7.90137C7.76876 8.5 7.64162 8.44728 7.54785 8.35352C7.45408 8.25975 7.40137 8.13261 7.40137 8V4.0625C7.40137 3.92989 7.45408 3.80275 7.54785 3.70898C7.64162 3.61522 7.76876 3.5625 7.90137 3.5625Z" fill="#3E4A57" stroke="#3E4A57" strokeWidth="0.125" />
                      </svg>

                        {selectedPatient?.patient_appointment_time}</p>


                    </div>
                    <hr></hr>
                    <div>
                      <p className='mb-2 doctor-listing-modal-label '><svg width="14" className='me-1' height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.499 6.55664C11.2136 6.43845 10.8997 6.40752 10.5967 6.46777C10.2936 6.52806 10.0154 6.67699 9.79688 6.89551C9.57836 7.11403 9.42943 7.39222 9.36914 7.69531C9.30889 7.99832 9.33982 8.31222 9.45801 8.59766C9.57624 8.88308 9.77636 9.12715 10.0332 9.29883C10.2902 9.47052 10.5923 9.5625 10.9014 9.5625C11.3158 9.5625 11.7128 9.39752 12.0059 9.10449C12.2989 8.81147 12.4639 8.4144 12.4639 8C12.4639 7.69097 12.3719 7.38879 12.2002 7.13184C12.0285 6.87499 11.7845 6.67487 11.499 6.55664ZM10.9014 7.3125C11.0837 7.3125 11.2588 7.38474 11.3877 7.51367C11.5166 7.6426 11.5889 7.81766 11.5889 8C11.5889 8.13597 11.5482 8.26878 11.4727 8.38184C11.3971 8.49486 11.2897 8.58274 11.1641 8.63477C11.0386 8.6867 10.9008 8.70028 10.7676 8.67383C10.6342 8.6473 10.5112 8.58248 10.415 8.48633C10.3189 8.39018 10.2541 8.26715 10.2275 8.13379C10.2011 8.00057 10.2147 7.8628 10.2666 7.7373C10.3186 7.61171 10.4065 7.50425 10.5195 7.42871C10.6326 7.35317 10.7654 7.3125 10.9014 7.3125ZM3.96387 7.41309L3.90918 7.40625C2.9578 7.28639 2.08257 6.82359 1.44824 6.10449C0.813904 5.38531 0.463989 4.45896 0.463867 3.5V0.5C0.463867 0.383968 0.50975 0.272477 0.591797 0.19043C0.653274 0.128952 0.731426 0.0881293 0.81543 0.0712891L0.901367 0.0625H2.40137C2.5174 0.0625 2.62889 0.108383 2.71094 0.19043C2.79298 0.272477 2.83887 0.383968 2.83887 0.5C2.83887 0.616032 2.79298 0.727523 2.71094 0.80957C2.62889 0.891617 2.5174 0.9375 2.40137 0.9375H1.33887V3.5L1.34277 3.65234C1.36035 4.00591 1.43934 4.35432 1.57617 4.68164C1.73256 5.05565 1.9615 5.3949 2.25 5.67969C2.53871 5.9646 2.88154 6.18934 3.25781 6.34082C3.6341 6.4923 4.03679 6.56791 4.44238 6.5625C6.10935 6.54068 7.4638 5.14254 7.46387 3.44824V0.9375H6.40137C6.28533 0.9375 6.17384 0.891617 6.0918 0.80957C6.00975 0.727523 5.96387 0.616032 5.96387 0.5C5.96387 0.383968 6.00975 0.272477 6.0918 0.19043C6.17384 0.108383 6.28533 0.0625 6.40137 0.0625H7.90137C8.0174 0.0625 8.12889 0.108383 8.21094 0.19043C8.29298 0.272477 8.33887 0.383968 8.33887 0.5V3.44824C8.33881 5.46936 6.82895 7.15798 4.89355 7.40527L4.83887 7.41211V10C4.83887 10.547 5.05657 11.0712 5.44336 11.458C5.83015 11.8448 6.35436 12.0625 6.90137 12.0625H8.40137C8.86963 12.0617 9.32391 11.902 9.68945 11.6094C10.055 11.3166 10.3109 10.908 10.4141 10.4512L10.4277 10.3906L10.3662 10.377C9.77746 10.2447 9.25857 9.89795 8.91016 9.40527C8.56192 8.91266 8.40897 8.30801 8.48047 7.70898C8.55207 7.10998 8.84338 6.55885 9.29785 6.16211C9.75241 5.76535 10.3381 5.55149 10.9414 5.56152C11.5446 5.57164 12.1224 5.80514 12.5635 6.2168C13.0045 6.62852 13.2776 7.18887 13.3291 7.79004C13.3806 8.39116 13.2073 8.98992 12.8428 9.4707C12.4782 9.95147 11.9482 10.2799 11.3555 10.3926L11.3047 10.4023V10.4502C11.1964 11.1419 10.8449 11.7726 10.3135 12.2285C9.78106 12.6852 9.10285 12.9366 8.40137 12.9375H6.90137C6.12255 12.9367 5.3759 12.6269 4.8252 12.0762C4.27449 11.5255 3.96469 10.7788 3.96387 10V7.41309Z" fill="#8A8D93" stroke="#8A8D93" strokeWidth="0.125" />
                      </svg>
                        Concern / Treatment</p>
                      <div className='d-flex gap-1'>
                        <p className='m-0 doctor-listing-modal-orange-box'>Fertility Support </p>
                        <p className='m-0 doctor-listing-modal-orange-box'>IVF</p>
                        <p className='m-0 doctor-listing-modal-orange-box'>IUI</p>
                      </div>
                    </div>
                    <hr></hr>

                    <div className='d-flex gap-3'>
                      <p className='mb-2 doctor-listing-modal-label m-0 '><svg width="16" height="10" className='me-1' viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.712891 0.931641C3.73291 -0.542859 5.91511 0.153032 8.03809 0.833008C9.04968 1.15699 10.0427 1.47551 11.1191 1.54688C12.1977 1.61832 13.358 1.44111 14.709 0.780273C14.7756 0.747708 14.8498 0.733541 14.9238 0.737305C14.9979 0.741126 15.0699 0.763532 15.1328 0.802734C15.1957 0.842546 15.2476 0.897555 15.2832 0.962891C15.3187 1.02818 15.3366 1.10146 15.3359 1.17578V8.67188C15.3358 8.75374 15.3129 8.83391 15.2695 8.90332C15.2261 8.97271 15.1643 9.02853 15.0908 9.06445C13.7754 9.70666 12.6198 9.93748 11.5615 9.9375C10.1877 9.9375 8.97118 9.54879 7.76758 9.16406C6.75453 8.84011 5.7613 8.52159 4.68457 8.4502C3.60562 8.37869 2.44482 8.555 1.09375 9.21582C1.02714 9.24834 0.952929 9.26357 0.878906 9.25977C0.804788 9.2559 0.73287 9.23267 0.669922 9.19336C0.607008 9.15406 0.554539 9.10002 0.518555 9.03516C0.482567 8.97023 0.463857 8.8965 0.463867 8.82227V1.32715C0.463796 1.24462 0.487317 1.16362 0.53125 1.09375C0.575109 1.02405 0.637701 0.968299 0.711914 0.932617L0.712891 0.931641ZM7.77051 1.66797C5.81276 1.04206 3.93864 0.441879 1.37793 1.58789L1.3418 1.60449V8.15039L1.42773 8.11523C2.32137 7.75157 3.27642 7.56236 4.24121 7.55762C5.61503 7.55762 6.83156 7.94633 8.03516 8.33105C9.99275 8.95691 11.8663 9.55699 14.4268 8.41113L14.4639 8.39453V1.85059L14.3789 1.88477C11.7224 2.93286 9.72682 2.29341 7.77051 1.66797ZM12.9014 3.5625C13.0174 3.5625 13.1289 3.60838 13.2109 3.69043C13.2929 3.77246 13.3389 3.88406 13.3389 4V7C13.3388 7.11575 13.2927 7.22667 13.2109 7.30859C13.1289 7.39064 13.0174 7.4375 12.9014 7.4375C12.7853 7.4375 12.6738 7.39064 12.5918 7.30859C12.51 7.22667 12.464 7.11575 12.4639 7V4C12.4639 3.88406 12.5099 3.77246 12.5918 3.69043C12.6738 3.60838 12.7853 3.5625 12.9014 3.5625ZM7.90137 3.0625C8.41522 3.0625 8.90813 3.26653 9.27148 3.62988C9.63471 3.99321 9.83887 4.48624 9.83887 5C9.83879 5.38304 9.72549 5.75768 9.5127 6.07617C9.2998 6.39479 8.99661 6.64339 8.64258 6.79004C8.28864 6.93656 7.89915 6.97415 7.52344 6.89941C7.14761 6.82465 6.80221 6.6401 6.53125 6.36914C6.26052 6.0983 6.07575 5.75351 6.00098 5.37793C5.92622 5.00209 5.96468 4.61184 6.11133 4.25781C6.25799 3.9039 6.50666 3.60151 6.8252 3.38867C7.14378 3.17584 7.51822 3.0625 7.90137 3.0625ZM2.90137 2.5625C3.0174 2.5625 3.12889 2.60838 3.21094 2.69043C3.29286 2.77246 3.33887 2.88406 3.33887 3V6C3.33876 6.11575 3.29271 6.22667 3.21094 6.30859C3.12889 6.39064 3.0174 6.4375 2.90137 6.4375C2.78534 6.4375 2.67384 6.39064 2.5918 6.30859C2.51002 6.22667 2.46398 6.11575 2.46387 6V3C2.46387 2.88406 2.50988 2.77246 2.5918 2.69043C2.67384 2.60838 2.78534 2.5625 2.90137 2.5625ZM7.69434 3.95703C7.48836 3.998 7.29894 4.09961 7.15039 4.24805C7.00187 4.39656 6.90041 4.58601 6.85938 4.79199C6.81838 4.9981 6.8395 5.2121 6.91992 5.40625C7.00035 5.60035 7.13683 5.76609 7.31152 5.88281C7.4862 5.99947 7.69131 6.0625 7.90137 6.0625C8.18306 6.0625 8.45311 5.95011 8.65234 5.75098C8.8515 5.55182 8.96376 5.28164 8.96387 5C8.96387 4.78989 8.90187 4.58389 8.78516 4.40918C8.66841 4.23445 8.50176 4.098 8.30762 4.01758C8.11369 3.93735 7.90018 3.91615 7.69434 3.95703Z" fill="#8A8D93" stroke="#8A8D93" strokeWidth="0.125" />
                      </svg>
                        Payment</p>
                      <p className=' m-0 doctor-listing-payment-unpaid'>{selectedPatient?.patient_payment}</p>
                    </div>


                    <hr></hr>

                    <div>
                      <p className='mb-2 doctor-listing-modal-label m-0 '><svg width="14" height="13" className='me-1' viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.90137 1.0625H6.90137C7.0174 1.0625 7.12889 1.10936 7.21094 1.19141C7.29271 1.27333 7.33876 1.38425 7.33887 1.5C7.33887 1.61594 7.29286 1.72754 7.21094 1.80957C7.12889 1.89162 7.0174 1.9375 6.90137 1.9375H1.83887V12.0625H11.9639V7C11.964 6.88425 12.01 6.77333 12.0918 6.69141C12.1738 6.60936 12.2853 6.5625 12.4014 6.5625C12.5174 6.5625 12.6289 6.60936 12.7109 6.69141C12.7927 6.77333 12.8388 6.88425 12.8389 7V12C12.8389 12.2485 12.7401 12.4873 12.5645 12.6631C12.3886 12.8389 12.15 12.9375 11.9014 12.9375H1.90137C1.65273 12.9375 1.4141 12.8389 1.23828 12.6631C1.06259 12.4873 0.963867 12.2485 0.963867 12V2C0.963971 1.75164 1.06274 1.51359 1.23828 1.33789C1.4141 1.16208 1.65273 1.0625 1.90137 1.0625ZM10.9014 0.5625C10.9589 0.5625 11.0162 0.573686 11.0693 0.595703C11.1222 0.617686 11.1704 0.649915 11.2109 0.69043L13.2109 2.69043C13.2516 2.73106 13.2836 2.7799 13.3057 2.83301C13.3276 2.88599 13.3388 2.94265 13.3389 3C13.3389 3.05749 13.3277 3.11486 13.3057 3.16797C13.2947 3.19433 13.2814 3.21953 13.2656 3.24316L13.2109 3.30957L7.21094 9.30957C7.17041 9.35006 7.12225 9.38234 7.06934 9.4043C7.01623 9.42625 6.95884 9.43755 6.90137 9.4375H4.90137C4.78533 9.4375 4.67384 9.39162 4.5918 9.30957C4.50987 9.22754 4.46387 9.11594 4.46387 9V7L4.47266 6.91504C4.47821 6.88704 4.48612 6.85952 4.49707 6.83301C4.51903 6.7799 4.55118 6.73109 4.5918 6.69043L10.5918 0.69043C10.6323 0.649915 10.6805 0.617686 10.7334 0.595703C10.7865 0.573686 10.8439 0.5625 10.9014 0.5625ZM5.33887 7.18164V8.5625H6.7207L10.7832 4.5L10.7383 4.45605L9.40137 3.11914L5.33887 7.18164ZM10.0645 2.45605L10.0195 2.5L11.4014 3.88184L12.2832 3L12.2383 2.95605L10.9014 1.61914L10.0645 2.45605Z" fill="#8A8D93" stroke="#8A8D93" strokeWidth="0.125" />
                      </svg>

                        Additional Comment</p>
                      <p className='doctor-listing-aditional-commit'>{selectedPatient?.patient_additional_commet}</p>
                    </div>


                    <div className='doctor-listing-modal-buttons d-flex gap-2 '>
                      <Button variant="outline" disabled={false} onClick={() => setDoctorListingModal(false)} className="w-100">
                        No Show
                      </Button>
                      <Button variant="default" disabled={false} onClick={() => setDoctorListingModal(false)} className="w-100">
                        Check In
                      </Button>
                    </div>
                  </div>
                </div>

              </>
            </Modal>

            <AppointmentRequestCancelModel
              setDoctorListingModal={setDoctorListingModal}
              RescheduleModal={RescheduleModal}
              setRescheduleModal={setRescheduleModal}
              setCancelModal={setCancelModal}
              CancelModal={CancelModal}
            />
           
            <Col md={8}>
              {selectedView === 'day'
                &&
                <>
                  <div className="min-vh-100 d-flex align-items-center justify-content-center day-formate-wrapper">
                    <div className="w-100 bg-white shadow-lg d-flex day-calender-mian-card" >
                      {/* Time Column with Icon and Times */}
                      <div className={`border-end d-flex flex-column timeColumn-days-colum`}>
                        {/* Header with Icon */}
                        <div className="d-flex align-items-center justify-content-center border-bottom header-icon-day">
                          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24" xmlns="http://www.w3.org/2000/svg" className='header-icon-day-color'><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>

                        {/* Scrollable Time Slots */}
                        <div
                          className="text-center flex-grow-1 overflow-auto time-scroll"
                          ref={timeColumnRef}
                        >
                          {/* {timeSlots.map((time, index) => {
                            const [hour, minute] = time.split(':');
                            // console.log('hour-minute',hour,"---",minute)
                            const displayTime = parseInt(hour, 10);
                            const ampm = displayTime < 12 ? 'AM' : 'PM';
                            const formattedHour = displayTime > 12 ? displayTime - 12 : (displayTime === 0 ? 12 : displayTime);
                            // console.log('formattedHour', formattedHour)
                            return (
                              <div key={index} className="d-flex align-items-center justify-content-center border-top time-slot-day">
                                <span className="small text-secondary">
                                  {`${formattedHour}${minute == "00" ? '' : `:${minute}`} ${ampm}`}
                                </span>
                              </div>
                            )
                          })} */}

                          {timeSlots.map((slot, index) => {
                            const [hour, minute] = slot.time.split(':');
                            const displayTime = parseInt(hour, 10);
                            const ampm = displayTime < 12 ? 'AM' : 'PM';
                            const formattedHour =
                              displayTime > 12 ? displayTime - 12 : displayTime === 0 ? 12 : displayTime;

                            return (
                              <div
                                key={index}
                                className="d-flex align-items-center justify-content-center border-top time-slot-day"
                              >
                                <span className="small text-secondary">
                                  {/* {`${formattedHour}${minute === '00' ? '' : `:${minute}`} ${ampm}`} */}
                                  {`${formattedHour}${minute === '00' ? '' : `:${minute}`}`}
                                </span>
                              </div>
                            );
                          })}

                        </div>
                      </div>

                      {/* Main Content Area */}
                      <div className="flex-grow-1 d-flex flex-column">
                        {/* Header with Day and Date */}
                        <div className="d-flex align-items-center border-bottom p-3 day-date-header" >
                          <div className="d-flex flex-column ">
                            <p className=" mb-0 me-2 day-formate-text" >{dayDateFormat}</p>
                            {selectedDate && (
                              <div className="dateCircle-days-colum">
                                {dateDateFormat}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Schedule Clickable Area */}
                        <div
                          className="flex-grow-1 position-relative overflow-auto"
                          ref={scheduleRef}
                          onClick={handleClick}
                        >
                          {/* Grid Lines Container */}
                          <div className="position-relative" style={{ height: `${timeSlots.length * 48}px` }}>
                            {timeSlots.map((slot, slotIndex) => {
                              const slotAppointments = CalnderAppointments.filter((appt: AppointmentsType) => {
                                const currentSlotMinutes = toMinutes(slot.time);
                                const nextSlot = timeSlots[slotIndex + 1];
                                const nextSlotMinutes = nextSlot ? toMinutes(nextSlot.time) : currentSlotMinutes + 30;

                                const apptMinutes = toMinutesFromJson(appt.time);
                                return apptMinutes >= currentSlotMinutes && apptMinutes < nextSlotMinutes;
                              });

                              return (
                                <div
                                  key={slotIndex}
                                  className="border-top grid-line-calendar position-relative d-flex flex-wrap"
                                >

                                  {slotAppointments.slice(0, 4).map((appt: AppointmentsType, i: number) => {
                                    // If 5 or more appointments, replace the 4th box (index 3) with "+N"
                                    // console.log('appt', appt)

                                    if (slotAppointments.length > 4 && i >= 3) {
                                      const extradata = slotAppointments.slice(3)
                                      // console.log("extradata : ", extradata);
                                      // console.log("extradata : ", appt.patient.profileImage);

                                      return (
                                        <div className="p-1 w-50" key={`extra-${i}`}>
                                          <div className="appointment-box d-flex align-items-center gap-3" >
                                            <div className='position-relative'    >
                                              <div className='d-flex position-relative cursor-pointer-custom'
                                                onClick={() => setMultiPatientShow(true)}
                                              >
                                                <Image
                                                  src={extradata[0].patient.profileImage}
                                                  alt={extradata[0].patient.name}
                                                  width={20}
                                                  height={20}
                                                  className="rounded-circle"
                                                />
                                                <Image
                                                  src={extradata[1]?.patient.profileImage}
                                                  alt={extradata[1]?.patient.name}
                                                  width={20}
                                                  height={20}
                                                  className="rounded-circle position-absolute start-50"
                                                />
                                                {multiPatientShow && (
                                                  <div ref={boxRef} className='position-absolute multi-patient-show-box'>
                                                    <div className='d-flex flex-wrap'>
                                                      {extradata.map((appt: AppointmentsType, i: number) => {
                                                        const isLastOdd =
                                                          extradata.length % 2 !== 0 && i === extradata.length - 1;
                                                        return (

                                                          <div className={`${isLastOdd ? "col-12" : "col-6"} p-1`} key={i}>
                                                            <div className="appointment-box ">
                                                              <div className="d-flex align-items-center text-nowrap">
                                                                <Image
                                                                  src={appt.patient.profileImage}
                                                                  alt={appt.patient.name}
                                                                  width={20}
                                                                  height={20}
                                                                  className="rounded-1 me-2"
                                                                />
                                                                <div className='d-flex flex-column'>
                                                                  <span className="patient-calendar-modal-subtitle">{appt.patient.name}</span>
                                                                  <div className='d-flex align-items-center gap-1'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                                      <path d="M8.875 1.5C7.58942 1.5 6.33272 1.88122 5.2638 2.59545C4.19488 3.30968 3.36176 4.32484 2.86979 5.51256C2.37782 6.70028 2.24909 8.00721 2.4999 9.26809C2.7507 10.529 3.36977 11.6872 4.27881 12.5962C5.18785 13.5052 6.34604 14.1243 7.60692 14.3751C8.86779 14.6259 10.1747 14.4972 11.3624 14.0052C12.5502 13.5132 13.5653 12.6801 14.2796 11.6112C14.9938 10.5423 15.375 9.28558 15.375 8C15.3732 6.27665 14.6878 4.62441 13.4692 3.40582C12.2506 2.18722 10.5984 1.50182 8.875 1.5ZM8.875 13.5C7.78721 13.5 6.72384 13.1774 5.81937 12.5731C4.9149 11.9687 4.20995 11.1098 3.79367 10.1048C3.37738 9.09977 3.26847 7.9939 3.48068 6.927C3.6929 5.86011 4.21673 4.8801 4.98592 4.11091C5.7551 3.34172 6.73511 2.8179 7.80201 2.60568C8.8689 2.39346 9.97477 2.50238 10.9798 2.91866C11.9848 3.33494 12.8437 4.03989 13.4481 4.94436C14.0524 5.84883 14.375 6.9122 14.375 8C14.3733 9.45818 13.7934 10.8562 12.7623 11.8873C11.7312 12.9184 10.3332 13.4983 8.875 13.5ZM12.875 8C12.875 8.13261 12.8223 8.25979 12.7286 8.35355C12.6348 8.44732 12.5076 8.5 12.375 8.5H8.875C8.74239 8.5 8.61522 8.44732 8.52145 8.35355C8.42768 8.25979 8.375 8.13261 8.375 8V4.5C8.375 4.36739 8.42768 4.24021 8.52145 4.14645C8.61522 4.05268 8.74239 4 8.875 4C9.00761 4 9.13479 4.05268 9.22856 4.14645C9.32232 4.24021 9.375 4.36739 9.375 4.5V7.5H12.375C12.5076 7.5 12.6348 7.55268 12.7286 7.64645C12.8223 7.74021 12.875 7.86739 12.875 8Z" fill="#8A8D93" />
                                                                    </svg>

                                                                    <span className="appointment-reschedule-profile-schedule-detail">
                                                                      {`${slot.time} - ${timeSlots[slotIndex + 1] ? timeSlots[slotIndex + 1].time : toNextTime(slot.time)}`}
                                                                    </span>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="d-flex align-items-center gap-1 mt-3">
                                                                {appt.reason.slice(0, 1).map((item: string, index: number) => (
                                                                  <span
                                                                    key={index}
                                                                    className="appointment-reason-vist-box appointment-reason-vist-box-content"
                                                                  >
                                                                    {item}
                                                                  </span>
                                                                ))}
                                                                {appt.reason.length > 1 && (
                                                                  <span className="patient-calendar-modal-subtitle">
                                                                    +{appt.reason.length - 1}
                                                                  </span>
                                                                )}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )
                                                      })}
                                                    </div>
                                                  </div>

                                                )}
                                              </div>

                                            </div>

                                            <span className="patient-calendar-modal-subtitle">
                                              +{slotAppointments.length - 3}
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    }
                                    else {
                                      return (
                                        <div
                                          className={`p-1 ${(slotAppointments.length >= 4 && i >= 2) ? 'w-50' : 'w-100'}`}
                                          key={i}
                                        >
                                          <div className="appointment-box">
                                            <div className="d-flex align-items-center">
                                              <Image
                                                src={appt.patient.profileImage}
                                                alt={appt.patient.name}
                                                width={20}
                                                height={20}
                                                className="rounded-1 me-2"
                                              />
                                              <div className='d-flex flex-column'>
                                                <span className="patient-calendar-modal-subtitle">{appt.patient.name}</span>

                                                {slotAppointments.length == 1 && (
                                                  <div className='d-flex align-items-center gap-1'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                      <path d="M8.875 1.5C7.58942 1.5 6.33272 1.88122 5.2638 2.59545C4.19488 3.30968 3.36176 4.32484 2.86979 5.51256C2.37782 6.70028 2.24909 8.00721 2.4999 9.26809C2.7507 10.529 3.36977 11.6872 4.27881 12.5962C5.18785 13.5052 6.34604 14.1243 7.60692 14.3751C8.86779 14.6259 10.1747 14.4972 11.3624 14.0052C12.5502 13.5132 13.5653 12.6801 14.2796 11.6112C14.9938 10.5423 15.375 9.28558 15.375 8C15.3732 6.27665 14.6878 4.62441 13.4692 3.40582C12.2506 2.18722 10.5984 1.50182 8.875 1.5ZM8.875 13.5C7.78721 13.5 6.72384 13.1774 5.81937 12.5731C4.9149 11.9687 4.20995 11.1098 3.79367 10.1048C3.37738 9.09977 3.26847 7.9939 3.48068 6.927C3.6929 5.86011 4.21673 4.8801 4.98592 4.11091C5.7551 3.34172 6.73511 2.8179 7.80201 2.60568C8.8689 2.39346 9.97477 2.50238 10.9798 2.91866C11.9848 3.33494 12.8437 4.03989 13.4481 4.94436C14.0524 5.84883 14.375 6.9122 14.375 8C14.3733 9.45818 13.7934 10.8562 12.7623 11.8873C11.7312 12.9184 10.3332 13.4983 8.875 13.5ZM12.875 8C12.875 8.13261 12.8223 8.25979 12.7286 8.35355C12.6348 8.44732 12.5076 8.5 12.375 8.5H8.875C8.74239 8.5 8.61522 8.44732 8.52145 8.35355C8.42768 8.25979 8.375 8.13261 8.375 8V4.5C8.375 4.36739 8.42768 4.24021 8.52145 4.14645C8.61522 4.05268 8.74239 4 8.875 4C9.00761 4 9.13479 4.05268 9.22856 4.14645C9.32232 4.24021 9.375 4.36739 9.375 4.5V7.5H12.375C12.5076 7.5 12.6348 7.55268 12.7286 7.64645C12.8223 7.74021 12.875 7.86739 12.875 8Z" fill="#8A8D93" />
                                                    </svg>

                                                    <span className="appointment-reschedule-profile-schedule-detail">
                                                      {`${slot.time} - ${timeSlots[slotIndex + 1] ? timeSlots[slotIndex + 1].time : toNextTime(slot.time)}`}
                                                    </span>
                                                  </div>
                                                )}
                                              </div>
                                            </div>

                                            {slotAppointments.length == 1 && (
                                              <div className="d-flex align-items-center gap-1 mt-1">
                                                {appt.reason.slice(0, 4).map((item: string, index: number) => (
                                                  <span
                                                    key={index}
                                                    className="appointment-reason-vist-box appointment-reason-vist-box-content"
                                                  >
                                                    {item}
                                                  </span>
                                                ))}
                                                {appt.reason.length > 4 && (
                                                  <span className="patient-calendar-modal-subtitle">
                                                    +{appt.reason.length - 4}
                                                  </span>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    }
                                    // Normal appointment display

                                  })}

                                </div>
                              );
                            })}

                            {/* Static 12:30 PM Line */}
                            {/* <div
                              className="position-absolute bg-warning"
                              style={{ ...datasforcss.eventLine, top: `${staticLineTop}px` }}
                            >
                              <div className="bg-warning rounded-circle position-absolute eventDot-days-colum"></div>
                            </div>   */}
                            {(showTooltip && CalnderAppointments.length == 0) && (
                              <div
                                className="position-absolute get-started-dot-bg-color"
                                style={{ ...datasforcss.eventLine, top: `${staticLineTop}px` }}
                              >
                                <div className="get-started-dot-bg-color rounded-circle position-absolute eventDot-days-colum"></div>
                              </div>

                            )}
                            {/* Dynamic Event Lines */}
                            {/* {events.map((event: any) => (
                                  <div
                                    key={event.id}
                                    className="position-absolute bg-warning"
                                    style={{ ...datasforcss.eventLine, top: `${event.top}px` }}
                                  >
                                    <div className="bg-warning rounded-circle position-absolute eventDot-days-colum"></div>
                                  </div>
                                ))} */}
                          </div>

                          {/* Initial Tooltip */}
                          {(showTooltip && CalnderAppointments.length) == 0 && (
                            <div className="position-absolute tooltipCustom" >
                              <div className="position-absolute get-started-dot-bg-color rounded-circle" style={{ ...datasforcss.tooltipDot, ...datasforcss.pingAnimation }}></div>
                              <div className="position-absolute get-started-dot-bg-color rounded-circle tooltipDot" ></div>
                              <div className=' get-started-box position-absolute'>
                                <p className="appointments-total-box-item">Get started by clicking anywhere<br />on the calendar to add your first<br />appointment</p>
                                <span onClick={() => setShowTooltip(false)} className="appointments-day-ok cursor-pointer-custom">OK, GOT IT!</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }

              {selectedView === 'week'
                &&
                <> 
                  <AppointmentsWeek
                    CalnderAppointmentsWeek={CalnderAppointmentsWeek}
                    setBookAppointmentModal={setBookAppointmentModal}
                    selectedDate={value ? value.format('YYYY-MM-DD') : null}
                    setClickDate={setClickDate}
                    setClickTime={setClickTime}
                  />
                </>
              }

              {selectedView === 'month'
                &&
                <AppointmentsMonth
                  selectedDate={value ? value.format('YYYY-MM-DD') : null}
                  AppointmentsMonthShow={AppointmentsMonthShow}
                  setBookAppointmentModal={setBookAppointmentModal}
                  setClickDate={setClickDate}

                />
              }

              {/* <h1>{selectedView.charAt(0).toUpperCase() + selectedView.slice(1)} View</h1> */}

            </Col>
            <Col md={4}>

              <div className='todays-schedule-main mt-3  '>
                <div className='today-schedule'>
                  <p className='doctor-listing-heading mb-0 '>Today’s Schedule</p>
                </div>
                <div className='today-schedule-box-section '>
                  <div className='d-flex justify-content-between align-items-center gap-2 p-0'>
                    <div
                      className={`doctor-listing-today-schedule-box d-flex flex-column align-items-center ${selectedCard === 'Upcoming' ? 'today-schedule-box-color' : ''
                        }`}
                      onClick={() => setSelectedCard('Upcoming')}
                    >
                      <p className='doctor-listing-today-schedule-boxs text-center'>Upcoming</p>
                      <div
                        className={`upcoming-box doctor-listing-all-box ${selectedCard === 'Upcoming' ? 'today-shedule-color' : ''}`}

                      >
                        4
                      </div>
                    </div>

                    <div
                      className={`doctor-listing-today-schedule-box d-flex flex-column  align-items-center ${selectedCard === 'Waiting' ? 'today-schedule-box-color' : ''}`}
                      onClick={() => setSelectedCard('Waiting')}
                    >
                      <p className='doctor-listing-today-schedule-boxs text-center'>Waiting</p>
                      <div
                        className='waiting-box doctor-listing-all-box'
                        style={selectedCard === 'Waiting' ? { color: '#fff' } : {}}
                      >
                        3
                      </div>
                    </div>

                    <div
                      className={`doctor-listing-today-schedule-box d-flex flex-column  align-items-center ${selectedCard === 'Engaged' ? 'today-schedule-box-color' : ''}`}
                      onClick={() => setSelectedCard('Engaged')}

                    >
                      <p className='doctor-listing-today-schedule-boxs text-center'>Engaged</p>
                      <div
                        className={`engaged-box doctor-listing-all-box ${selectedCard === 'Engaged' ? 'today-shedule-color' : ''}`}

                      >
                        2
                      </div>
                    </div>

                    <div
                      className={`doctor-listing-today-schedule-box d-flex flex-column  align-items-center ${selectedCard === 'Done' ? 'today-schedule-box-color' : ''}`}
                      onClick={() => setSelectedCard('Done')}
                    >
                      <p className='doctor-listing-today-schedule-boxs text-center'>Done</p>
                      <div
                        className={`done-box doctor-listing-all-box ${selectedCard === 'Done' ? 'today-shedule-color' : ''}`}

                      >
                        4
                      </div>
                    </div>
                  </div>

                  {/* Use the selectedCard to limit how many items to display */}
                  {(selectedCard
                    ? doctorlistingModalData.slice(0, displayLimits[selectedCard])
                    : doctorlistingModalData
                  ).map((item: tempAppointmentProfileData, index: number) => (
                    <div key={index}>
                      <div className='docotor-listing-today-schedule-datas'>
                        <Card className="d-flex flex-row align-items-center p-2 shadow-sm rounded-3 border-0 selected-calender-data" >
                          <Image src={item.patient_profile} alt="Profile" width={50} height={50} className="me-2 rounded-3" />
                          <div className="flex-grow-1">
                            <p className="doctor-listing-modal-patient-name m-0">{item.patient_name}</p>
                            <div className="d-flex align-items-center doctor-listing-modal-label ">
                              <BsClock className=" me-1 " /> {item.patient_time}
                            </div>
                          </div>
                          <Button
                            variant="default"
                            className="doctor-listing-modal-button check_in_btn"
                            onClick={() => { setDoctorListingModal(true); setSelectedPatient(item); }}
                          >
                            Check-In
                          </Button>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </Col>
            
          </Row>
        </Col>
      </Row >

      <>
        <Modal
          show={BookAppointmentModal}
          onHide={() => { setBookAppointmentModal(false); setShowTooltip(true); setClickTime(''); setClickDate(''); }}
          header="Book Appointment"
          closeButton={true}
        >
          <BookAppointment
            appointmentTime={clickTime}
            appointmentDate={clickDate}
            setBookAppointmentModal={setBookAppointmentModal}
            setShowSuccessModalBook={setShowSuccessModalBook}
          />
        </Modal>

        <SuccessModalBookAppointment
          showSuccessModalBook={showSuccessModalBook}
          setShowSuccessModalBook={setShowSuccessModalBook}
        />

        <Modal
          show={blockCalendarModal}
          onHide={() => setBlockCalendarModal(false)}
          header="Schedule time off"
          closeButton={true}
        >
          <ScheduleTimeOff setBlockCalendarModal={setBlockCalendarModal} />
        </Modal>
      </>

    </>
  )
}

export function ListView() {

  const [BookAppointmentModal, setBookAppointmentModal] = useState(false);
  const [showSuccessModalBook, setShowSuccessModalBook] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // setFormData((prev) => ({
    //     ...prev,
    //     [name]: value,
    // }));
    // setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <>
      <div className=" d-xl-flex d-sm-none justify-content-between my-4">
        <div className='d-flex align-items-center flex-sm-row flex-column gap-2 '>

          {/* this show on table */}

          {/* <InputFieldGroup
            name="search"
            type="text"
            // value={formData.name}
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //     setSearchTerm(e.target.value); /
            // }}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
            placeholder="search"
            required={false}
            disabled={false}
            readOnly={false}
            // error={formError.name}
            className="position-relative blood-test-search patient-header-search patient-header-search-width-doctor-list"
          >
            <div className="blood-test-search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M18.5677 16.8364L14.8576 13.1246C15.97 11.675 16.4893 9.85652 16.3103 8.03804C16.1312 6.21956 15.2672 4.53728 13.8934 3.33245C12.5196 2.12762 10.7389 1.49047 8.91264 1.55024C7.08635 1.61001 5.35117 2.36223 4.05909 3.65431C2.76702 4.94638 2.0148 6.68156 1.95503 8.50785C1.89526 10.3341 2.53241 12.1148 3.73724 13.4886C4.94207 14.8624 6.62435 15.7264 8.44283 15.9055C10.2613 16.0846 12.0798 15.5652 13.5294 14.4528L17.2427 18.1668C17.3299 18.254 17.4335 18.3232 17.5474 18.3704C17.6613 18.4176 17.7835 18.4419 17.9068 18.4419C18.0301 18.4419 18.1522 18.4176 18.2662 18.3704C18.3801 18.3232 18.4836 18.254 18.5708 18.1668C18.658 18.0796 18.7272 17.9761 18.7744 17.8622C18.8216 17.7482 18.8459 17.6261 18.8459 17.5028C18.8459 17.3794 18.8216 17.2573 18.7744 17.1434C18.7272 17.0294 18.658 16.9259 18.5708 16.8387L18.5677 16.8364ZM3.84193 8.74965C3.84193 7.69894 4.15351 6.67182 4.73725 5.79818C5.321 4.92455 6.1507 4.24363 7.12143 3.84154C8.09216 3.43945 9.16033 3.33424 10.1909 3.53923C11.2214 3.74421 12.168 4.25018 12.9109 4.99314C13.6539 5.73611 14.1599 6.68271 14.3649 7.71323C14.5698 8.74376 14.4646 9.81192 14.0625 10.7827C13.6605 11.7534 12.9795 12.5831 12.1059 13.1668C11.2323 13.7506 10.2051 14.0621 9.15444 14.0621C7.74592 14.0607 6.3955 13.5005 5.39953 12.5046C4.40356 11.5086 3.84338 10.1582 3.84193 8.74965Z" fill="#B0B4C1" />
              </svg>
            </div>
          </InputFieldGroup> */}

          {/* <div className='appointments-total-box d-flex align-items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none">
              <g clipPath="url(#clip0_2202_83537)">
                <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#FFEDCB" />
                <path d="M31.0969 14.2754V29.6598C31.0969 29.9208 30.9932 30.1712 30.8086 30.3558C30.624 30.5404 30.3736 30.6441 30.1125 30.6441H8.48437C8.2233 30.6441 7.97292 30.5404 7.78832 30.3558C7.60371 30.1712 7.5 29.9208 7.5 29.6598V14.2754H31.0969Z" fill="white" />
                <path d="M27.5969 7.95312H26.4844C26.2134 7.95312 25.9938 8.17279 25.9938 8.44375V11.55C25.9938 11.821 26.2134 12.0406 26.4844 12.0406H27.5969C27.8679 12.0406 28.0875 11.821 28.0875 11.55V8.44375C28.0875 8.17279 27.8679 7.95312 27.5969 7.95312Z" fill="#292929" />
                <path d="M12.3562 7.95312H11.2437C10.9728 7.95312 10.7531 8.17279 10.7531 8.44375V11.55C10.7531 11.821 10.9728 12.0406 11.2437 12.0406H12.3562C12.6272 12.0406 12.8469 11.821 12.8469 11.55V8.44375C12.8469 8.17279 12.6272 7.95312 12.3562 7.95312Z" fill="#292929" />
                <path d="M11.9481 16.8252H10.2831C10.018 16.8252 9.8031 17.0401 9.8031 17.3052V18.9702C9.8031 19.2353 10.018 19.4502 10.2831 19.4502H11.9481C12.2132 19.4502 12.4281 19.2353 12.4281 18.9702V17.3052C12.4281 17.0401 12.2132 16.8252 11.9481 16.8252Z" fill="#FFD1A4" />
                <path d="M17.4044 16.8252H15.7394C15.4743 16.8252 15.2594 17.0401 15.2594 17.3052V18.9702C15.2594 19.2353 15.4743 19.4502 15.7394 19.4502H17.4044C17.6695 19.4502 17.8844 19.2353 17.8844 18.9702V17.3052C17.8844 17.0401 17.6695 16.8252 17.4044 16.8252Z" fill="#FFD1A4" />
                <path d="M22.8575 16.8252H21.1925C20.9274 16.8252 20.7125 17.0401 20.7125 17.3052V18.9702C20.7125 19.2353 20.9274 19.4502 21.1925 19.4502H22.8575C23.1226 19.4502 23.3375 19.2353 23.3375 18.9702V17.3052C23.3375 17.0401 23.1226 16.8252 22.8575 16.8252Z" fill="#FFD1A4" />
                <path d="M28.3138 16.8252H26.6488C26.3837 16.8252 26.1688 17.0401 26.1688 17.3052V18.9702C26.1688 19.2353 26.3837 19.4502 26.6488 19.4502H28.3138C28.5789 19.4502 28.7938 19.2353 28.7938 18.9702V17.3052C28.7938 17.0401 28.5789 16.8252 28.3138 16.8252Z" fill="#FFD1A4" />
                <path d="M11.9481 21.3848H10.2831C10.018 21.3848 9.8031 21.5997 9.8031 21.8648V23.5298C9.8031 23.7949 10.018 24.0098 10.2831 24.0098H11.9481C12.2132 24.0098 12.4281 23.7949 12.4281 23.5298V21.8648C12.4281 21.5997 12.2132 21.3848 11.9481 21.3848Z" fill="#FFD1A4" />
                <path d="M17.4044 21.3848H15.7394C15.4743 21.3848 15.2594 21.5997 15.2594 21.8648V23.5298C15.2594 23.7949 15.4743 24.0098 15.7394 24.0098H17.4044C17.6695 24.0098 17.8844 23.7949 17.8844 23.5298V21.8648C17.8844 21.5997 17.6695 21.3848 17.4044 21.3848Z" fill="#FFD1A4" />
                <path d="M22.8575 21.3848H21.1925C20.9274 21.3848 20.7125 21.5997 20.7125 21.8648V23.5298C20.7125 23.7949 20.9274 24.0098 21.1925 24.0098H22.8575C23.1226 24.0098 23.3375 23.7949 23.3375 23.5298V21.8648C23.3375 21.5997 23.1226 21.3848 22.8575 21.3848Z" fill="#FFD1A4" />
                <path d="M28.3138 21.3848H26.6488C26.3837 21.3848 26.1688 21.5997 26.1688 21.8648V23.5298C26.1688 23.7949 26.3837 24.0098 26.6488 24.0098H28.3138C28.5789 24.0098 28.7938 23.7949 28.7938 23.5298V21.8648C28.7938 21.5997 28.5789 21.3848 28.3138 21.3848Z" fill="#FFD1A4" />
                <path d="M11.9481 25.9404H10.2831C10.018 25.9404 9.8031 26.1553 9.8031 26.4204V28.0854C9.8031 28.3505 10.018 28.5654 10.2831 28.5654H11.9481C12.2132 28.5654 12.4281 28.3505 12.4281 28.0854V26.4204C12.4281 26.1553 12.2132 25.9404 11.9481 25.9404Z" fill="#FFD1A4" />
                <path d="M17.4044 25.9404H15.7394C15.4743 25.9404 15.2594 26.1553 15.2594 26.4204V28.0854C15.2594 28.3505 15.4743 28.5654 15.7394 28.5654H17.4044C17.6695 28.5654 17.8844 28.3505 17.8844 28.0854V26.4204C17.8844 26.1553 17.6695 25.9404 17.4044 25.9404Z" fill="#FFD1A4" />
                <path d="M22.8575 25.9404H21.1925C20.9274 25.9404 20.7125 26.1553 20.7125 26.4204V28.0854C20.7125 28.3505 20.9274 28.5654 21.1925 28.5654H22.8575C23.1226 28.5654 23.3375 28.3505 23.3375 28.0854V26.4204C23.3375 26.1553 23.1226 25.9404 22.8575 25.9404Z" fill="#FFD1A4" />
                <path d="M32.5 28.8404C32.5012 29.4742 32.3144 30.0941 31.9632 30.6217C31.612 31.1493 31.1122 31.5608 30.527 31.8042C29.9418 32.0476 29.2976 32.1119 28.6758 31.989C28.0541 31.8661 27.4827 31.5616 27.0341 31.1138C26.5855 30.6661 26.2799 30.0954 26.1558 29.4739C26.0317 28.8524 26.0947 28.208 26.337 27.6223C26.5792 27.0367 26.9898 26.5361 27.5167 26.1838C28.0435 25.8316 28.6631 25.6436 29.2969 25.6436C30.1451 25.6444 30.9584 25.9813 31.5587 26.5804C32.159 27.1796 32.4975 27.9922 32.5 28.8404Z" fill="#E85966" />
                <path d="M28.5219 30.3691L27.45 29.2941L27.8688 28.8754L28.5219 29.5285L30.7281 27.3223L31.1469 27.741L28.5219 30.3691Z" fill="#EEEFEE" />
              </g>
              <defs>
                <clipPath id="clip0_2202_83537">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className='appointments-total-box-item m-0'>98 Appointments</p>

          </div> */}
        </div>

        {/* <div className="d-flex flex-sm-row align-items-center gap-sm-3 gap-2 flex-column flex-column-revserse mt-sm-0 mt-2">
          <div className="d-flex align-items-center gap-2">

            <span className="sort-by-lable">Sort by:</span>
            <InputSelect
              label=""
              name="tests"
              // value={formData.tests}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
              required={true}
              disabled={false}
              placeholder="All Time"
              className="patient-header-select-filter"
              // error={formError.tests}
              options={[
                { id: "1", value: "Today", label: "Today" },
                { id: "2", value: "Yesterday", label: "Yesterday" },
                { id: "3", value: "tomorrow", label: "tomorrow" },
              ]}
            />
            <div className="patient-header-filter-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M6.30166 10.6484V4.55469C6.30166 4.35578 6.22264 4.16501 6.08199 4.02436C5.94134 3.88371 5.75057 3.80469 5.55166 3.80469C5.35275 3.80469 5.16198 3.88371 5.02133 4.02436C4.88068 4.16501 4.80166 4.35578 4.80166 4.55469V10.6484C4.15635 10.8137 3.58438 11.189 3.17593 11.7152C2.76748 12.2414 2.54578 12.8886 2.54578 13.5547C2.54578 14.2208 2.76748 14.868 3.17593 15.3942C3.58438 15.9204 4.15635 16.2957 4.80166 16.4609V21.0547C4.80166 21.2536 4.88068 21.4444 5.02133 21.585C5.16198 21.7257 5.35275 21.8047 5.55166 21.8047C5.75057 21.8047 5.94134 21.7257 6.08199 21.585C6.22264 21.4444 6.30166 21.2536 6.30166 21.0547V16.4609C6.94697 16.2957 7.51894 15.9204 7.92739 15.3942C8.33584 14.868 8.55754 14.2208 8.55754 13.5547C8.55754 12.8886 8.33584 12.2414 7.92739 11.7152C7.51894 11.189 6.94697 10.8137 6.30166 10.6484ZM5.55166 15.0547C5.25499 15.0547 4.96498 14.9667 4.7183 14.8019C4.47163 14.6371 4.27937 14.4028 4.16584 14.1287C4.05231 13.8546 4.0226 13.553 4.08048 13.2621C4.13836 12.9711 4.28122 12.7038 4.491 12.494C4.70078 12.2842 4.96805 12.1414 5.25902 12.0835C5.54999 12.0256 5.8516 12.0553 6.12568 12.1689C6.39977 12.2824 6.63404 12.4747 6.79886 12.7213C6.96369 12.968 7.05166 13.258 7.05166 13.5547C7.05166 13.9525 6.89362 14.334 6.61232 14.6153C6.33101 14.8967 5.94948 15.0547 5.55166 15.0547ZM13.0517 6.14844V4.55469C13.0517 4.35578 12.9726 4.16501 12.832 4.02436C12.6913 3.88371 12.5006 3.80469 12.3017 3.80469C12.1027 3.80469 11.912 3.88371 11.7713 4.02436C11.6307 4.16501 11.5517 4.35578 11.5517 4.55469V6.14844C10.9063 6.31366 10.3344 6.68896 9.92593 7.21517C9.51748 7.74138 9.29578 8.38856 9.29578 9.05469C9.29578 9.72082 9.51748 10.368 9.92593 10.8942C10.3344 11.4204 10.9063 11.7957 11.5517 11.9609V21.0547C11.5517 21.2536 11.6307 21.4444 11.7713 21.585C11.912 21.7257 12.1027 21.8047 12.3017 21.8047C12.5006 21.8047 12.6913 21.7257 12.832 21.585C12.9726 21.4444 13.0517 21.2536 13.0517 21.0547V11.9609C13.697 11.7957 14.2689 11.4204 14.6774 10.8942C15.0858 10.368 15.3075 9.72082 15.3075 9.05469C15.3075 8.38856 15.0858 7.74138 14.6774 7.21517C14.2689 6.68896 13.697 6.31366 13.0517 6.14844ZM12.3017 10.5547C12.005 10.5547 11.715 10.4667 11.4683 10.3019C11.2216 10.1371 11.0294 9.9028 10.9158 9.62871C10.8023 9.35462 10.7726 9.05302 10.8305 8.76205C10.8884 8.47108 11.0312 8.20381 11.241 7.99403C11.4508 7.78425 11.7181 7.64139 12.009 7.58351C12.3 7.52563 12.6016 7.55534 12.8757 7.66887C13.1498 7.7824 13.384 7.97466 13.5489 8.22133C13.7137 8.46801 13.8017 8.75802 13.8017 9.05469C13.8017 9.45251 13.6436 9.83404 13.3623 10.1153C13.081 10.3967 12.6995 10.5547 12.3017 10.5547ZM22.0517 16.5547C22.051 15.8896 21.8298 15.2435 21.4227 14.7176C21.0155 14.1917 20.4454 13.8156 19.8017 13.6484V4.55469C19.8017 4.35578 19.7226 4.16501 19.582 4.02436C19.4413 3.88371 19.2506 3.80469 19.0517 3.80469C18.8527 3.80469 18.662 3.88371 18.5213 4.02436C18.3807 4.16501 18.3017 4.35578 18.3017 4.55469V13.6484C17.6563 13.8137 17.0844 14.189 16.6759 14.7152C16.2675 15.2414 16.0458 15.8886 16.0458 16.5547C16.0458 17.2208 16.2675 17.868 16.6759 18.3942C17.0844 18.9204 17.6563 19.2957 18.3017 19.4609V21.0547C18.3017 21.2536 18.3807 21.4444 18.5213 21.585C18.662 21.7257 18.8527 21.8047 19.0517 21.8047C19.2506 21.8047 19.4413 21.7257 19.582 21.585C19.7226 21.4444 19.8017 21.2536 19.8017 21.0547V19.4609C20.4454 19.2937 21.0155 18.9177 21.4227 18.3918C21.8298 17.8659 22.051 17.2198 22.0517 16.5547ZM19.0517 18.0547C18.755 18.0547 18.465 17.9667 18.2183 17.8019C17.9716 17.6371 17.7794 17.4028 17.6658 17.1287C17.5523 16.8546 17.5226 16.553 17.5805 16.2621C17.6384 15.9711 17.7812 15.7038 17.991 15.494C18.2008 15.2842 18.4681 15.1414 18.759 15.0835C19.05 15.0256 19.3516 15.0553 19.6257 15.1689C19.8998 15.2824 20.134 15.4747 20.2989 15.7213C20.4637 15.968 20.5517 16.258 20.5517 16.5547C20.5517 16.9525 20.3936 17.334 20.1123 17.6153C19.831 17.8967 19.4495 18.0547 19.0517 18.0547Z" fill="#2B4360" />
              </svg>
            </div>
          </div>

          <Button variant="default" type="submit" onClick={() => { setBookAppointmentModal(true) }}>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M19.8016 3.42969H17.9266V3.05469C17.9266 2.75632 17.8081 2.47017 17.5971 2.25919C17.3862 2.04821 17.1 1.92969 16.8016 1.92969C16.5033 1.92969 16.2171 2.04821 16.0061 2.25919C15.7952 2.47017 15.6766 2.75632 15.6766 3.05469V3.42969H8.92664V3.05469C8.92664 2.75632 8.80811 2.47017 8.59713 2.25919C8.38615 2.04821 8.1 1.92969 7.80164 1.92969C7.50327 1.92969 7.21712 2.04821 7.00614 2.25919C6.79516 2.47017 6.67664 2.75632 6.67664 3.05469V3.42969H4.80164C4.30435 3.42969 3.82744 3.62723 3.47581 3.97886C3.12418 4.33049 2.92664 4.80741 2.92664 5.30469V20.3047C2.92664 20.802 3.12418 21.2789 3.47581 21.6305C3.82744 21.9821 4.30435 22.1797 4.80164 22.1797H19.8016C20.2989 22.1797 20.7758 21.9821 21.1275 21.6305C21.4791 21.2789 21.6766 20.802 21.6766 20.3047V5.30469C21.6766 4.80741 21.4791 4.33049 21.1275 3.97886C20.7758 3.62723 20.2989 3.42969 19.8016 3.42969ZM6.67664 5.67969C6.67664 5.97806 6.79516 6.2642 7.00614 6.47518C7.21712 6.68616 7.50327 6.80469 7.80164 6.80469C8.1 6.80469 8.38615 6.68616 8.59713 6.47518C8.80811 6.2642 8.92664 5.97806 8.92664 5.67969H15.6766C15.6766 5.97806 15.7952 6.2642 16.0061 6.47518C16.2171 6.68616 16.5033 6.80469 16.8016 6.80469C17.1 6.80469 17.3862 6.68616 17.5971 6.47518C17.8081 6.2642 17.9266 5.97806 17.9266 5.67969H19.4266V7.92969H5.17664V5.67969H6.67664ZM5.17664 19.9297V10.1797H19.4266V19.9297H5.17664Z" fill="white" />
              </svg>
              Book Appointment
            </div>

          </Button> 
        
        </div> */}

      </div>
      <ListViews />
      <div className="d-sm-flex flex-column d-xl-none d-none gap-2 my-4">
        <div className='d-flex align-items-center justify-content-between'>

          <InputFieldGroup
            name="search"
            type="text"
            // value={formData.name}
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //     setSearchTerm(e.target.value); /
            // }}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
            placeholder="search"
            required={false}
            disabled={false}
            readOnly={false}
            // error={formError.name}
            className="position-relative blood-test-search patient-header-search patient-header-search-width "
          >
            <div className="blood-test-search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M18.5677 16.8364L14.8576 13.1246C15.97 11.675 16.4893 9.85652 16.3103 8.03804C16.1312 6.21956 15.2672 4.53728 13.8934 3.33245C12.5196 2.12762 10.7389 1.49047 8.91264 1.55024C7.08635 1.61001 5.35117 2.36223 4.05909 3.65431C2.76702 4.94638 2.0148 6.68156 1.95503 8.50785C1.89526 10.3341 2.53241 12.1148 3.73724 13.4886C4.94207 14.8624 6.62435 15.7264 8.44283 15.9055C10.2613 16.0846 12.0798 15.5652 13.5294 14.4528L17.2427 18.1668C17.3299 18.254 17.4335 18.3232 17.5474 18.3704C17.6613 18.4176 17.7835 18.4419 17.9068 18.4419C18.0301 18.4419 18.1522 18.4176 18.2662 18.3704C18.3801 18.3232 18.4836 18.254 18.5708 18.1668C18.658 18.0796 18.7272 17.9761 18.7744 17.8622C18.8216 17.7482 18.8459 17.6261 18.8459 17.5028C18.8459 17.3794 18.8216 17.2573 18.7744 17.1434C18.7272 17.0294 18.658 16.9259 18.5708 16.8387L18.5677 16.8364ZM3.84193 8.74965C3.84193 7.69894 4.15351 6.67182 4.73725 5.79818C5.321 4.92455 6.1507 4.24363 7.12143 3.84154C8.09216 3.43945 9.16033 3.33424 10.1909 3.53923C11.2214 3.74421 12.168 4.25018 12.9109 4.99314C13.6539 5.73611 14.1599 6.68271 14.3649 7.71323C14.5698 8.74376 14.4646 9.81192 14.0625 10.7827C13.6605 11.7534 12.9795 12.5831 12.1059 13.1668C11.2323 13.7506 10.2051 14.0621 9.15444 14.0621C7.74592 14.0607 6.3955 13.5005 5.39953 12.5046C4.40356 11.5086 3.84338 10.1582 3.84193 8.74965Z" fill="#B0B4C1" />
              </svg>
            </div>
          </InputFieldGroup>

          <Button variant="default" onClick={() => { setBookAppointmentModal(true) }}>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M19.8016 3.42969H17.9266V3.05469C17.9266 2.75632 17.8081 2.47017 17.5971 2.25919C17.3862 2.04821 17.1 1.92969 16.8016 1.92969C16.5033 1.92969 16.2171 2.04821 16.0061 2.25919C15.7952 2.47017 15.6766 2.75632 15.6766 3.05469V3.42969H8.92664V3.05469C8.92664 2.75632 8.80811 2.47017 8.59713 2.25919C8.38615 2.04821 8.1 1.92969 7.80164 1.92969C7.50327 1.92969 7.21712 2.04821 7.00614 2.25919C6.79516 2.47017 6.67664 2.75632 6.67664 3.05469V3.42969H4.80164C4.30435 3.42969 3.82744 3.62723 3.47581 3.97886C3.12418 4.33049 2.92664 4.80741 2.92664 5.30469V20.3047C2.92664 20.802 3.12418 21.2789 3.47581 21.6305C3.82744 21.9821 4.30435 22.1797 4.80164 22.1797H19.8016C20.2989 22.1797 20.7758 21.9821 21.1275 21.6305C21.4791 21.2789 21.6766 20.802 21.6766 20.3047V5.30469C21.6766 4.80741 21.4791 4.33049 21.1275 3.97886C20.7758 3.62723 20.2989 3.42969 19.8016 3.42969ZM6.67664 5.67969C6.67664 5.97806 6.79516 6.2642 7.00614 6.47518C7.21712 6.68616 7.50327 6.80469 7.80164 6.80469C8.1 6.80469 8.38615 6.68616 8.59713 6.47518C8.80811 6.2642 8.92664 5.97806 8.92664 5.67969H15.6766C15.6766 5.97806 15.7952 6.2642 16.0061 6.47518C16.2171 6.68616 16.5033 6.80469 16.8016 6.80469C17.1 6.80469 17.3862 6.68616 17.5971 6.47518C17.8081 6.2642 17.9266 5.97806 17.9266 5.67969H19.4266V7.92969H5.17664V5.67969H6.67664ZM5.17664 19.9297V10.1797H19.4266V19.9297H5.17664Z" fill="white" />
              </svg>
              Book Appointment
            </div>

          </Button>

        </div>
        <div className='d-flex gap-3 align-items-center'>
          <div className='appointments-total-box d-flex align-items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none">
              <g clipPath="url(#clip0_2202_83537)">
                <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#FFEDCB" />
                <path d="M31.0969 14.2754V29.6598C31.0969 29.9208 30.9932 30.1712 30.8086 30.3558C30.624 30.5404 30.3736 30.6441 30.1125 30.6441H8.48437C8.2233 30.6441 7.97292 30.5404 7.78832 30.3558C7.60371 30.1712 7.5 29.9208 7.5 29.6598V14.2754H31.0969Z" fill="white" />
                <path d="M27.5969 7.95312H26.4844C26.2134 7.95312 25.9938 8.17279 25.9938 8.44375V11.55C25.9938 11.821 26.2134 12.0406 26.4844 12.0406H27.5969C27.8679 12.0406 28.0875 11.821 28.0875 11.55V8.44375C28.0875 8.17279 27.8679 7.95312 27.5969 7.95312Z" fill="#292929" />
                <path d="M12.3562 7.95312H11.2437C10.9728 7.95312 10.7531 8.17279 10.7531 8.44375V11.55C10.7531 11.821 10.9728 12.0406 11.2437 12.0406H12.3562C12.6272 12.0406 12.8469 11.821 12.8469 11.55V8.44375C12.8469 8.17279 12.6272 7.95312 12.3562 7.95312Z" fill="#292929" />
                <path d="M11.9481 16.8252H10.2831C10.018 16.8252 9.8031 17.0401 9.8031 17.3052V18.9702C9.8031 19.2353 10.018 19.4502 10.2831 19.4502H11.9481C12.2132 19.4502 12.4281 19.2353 12.4281 18.9702V17.3052C12.4281 17.0401 12.2132 16.8252 11.9481 16.8252Z" fill="#FFD1A4" />
                <path d="M17.4044 16.8252H15.7394C15.4743 16.8252 15.2594 17.0401 15.2594 17.3052V18.9702C15.2594 19.2353 15.4743 19.4502 15.7394 19.4502H17.4044C17.6695 19.4502 17.8844 19.2353 17.8844 18.9702V17.3052C17.8844 17.0401 17.6695 16.8252 17.4044 16.8252Z" fill="#FFD1A4" />
                <path d="M22.8575 16.8252H21.1925C20.9274 16.8252 20.7125 17.0401 20.7125 17.3052V18.9702C20.7125 19.2353 20.9274 19.4502 21.1925 19.4502H22.8575C23.1226 19.4502 23.3375 19.2353 23.3375 18.9702V17.3052C23.3375 17.0401 23.1226 16.8252 22.8575 16.8252Z" fill="#FFD1A4" />
                <path d="M28.3138 16.8252H26.6488C26.3837 16.8252 26.1688 17.0401 26.1688 17.3052V18.9702C26.1688 19.2353 26.3837 19.4502 26.6488 19.4502H28.3138C28.5789 19.4502 28.7938 19.2353 28.7938 18.9702V17.3052C28.7938 17.0401 28.5789 16.8252 28.3138 16.8252Z" fill="#FFD1A4" />
                <path d="M11.9481 21.3848H10.2831C10.018 21.3848 9.8031 21.5997 9.8031 21.8648V23.5298C9.8031 23.7949 10.018 24.0098 10.2831 24.0098H11.9481C12.2132 24.0098 12.4281 23.7949 12.4281 23.5298V21.8648C12.4281 21.5997 12.2132 21.3848 11.9481 21.3848Z" fill="#FFD1A4" />
                <path d="M17.4044 21.3848H15.7394C15.4743 21.3848 15.2594 21.5997 15.2594 21.8648V23.5298C15.2594 23.7949 15.4743 24.0098 15.7394 24.0098H17.4044C17.6695 24.0098 17.8844 23.7949 17.8844 23.5298V21.8648C17.8844 21.5997 17.6695 21.3848 17.4044 21.3848Z" fill="#FFD1A4" />
                <path d="M22.8575 21.3848H21.1925C20.9274 21.3848 20.7125 21.5997 20.7125 21.8648V23.5298C20.7125 23.7949 20.9274 24.0098 21.1925 24.0098H22.8575C23.1226 24.0098 23.3375 23.7949 23.3375 23.5298V21.8648C23.3375 21.5997 23.1226 21.3848 22.8575 21.3848Z" fill="#FFD1A4" />
                <path d="M28.3138 21.3848H26.6488C26.3837 21.3848 26.1688 21.5997 26.1688 21.8648V23.5298C26.1688 23.7949 26.3837 24.0098 26.6488 24.0098H28.3138C28.5789 24.0098 28.7938 23.7949 28.7938 23.5298V21.8648C28.7938 21.5997 28.5789 21.3848 28.3138 21.3848Z" fill="#FFD1A4" />
                <path d="M11.9481 25.9404H10.2831C10.018 25.9404 9.8031 26.1553 9.8031 26.4204V28.0854C9.8031 28.3505 10.018 28.5654 10.2831 28.5654H11.9481C12.2132 28.5654 12.4281 28.3505 12.4281 28.0854V26.4204C12.4281 26.1553 12.2132 25.9404 11.9481 25.9404Z" fill="#FFD1A4" />
                <path d="M17.4044 25.9404H15.7394C15.4743 25.9404 15.2594 26.1553 15.2594 26.4204V28.0854C15.2594 28.3505 15.4743 28.5654 15.7394 28.5654H17.4044C17.6695 28.5654 17.8844 28.3505 17.8844 28.0854V26.4204C17.8844 26.1553 17.6695 25.9404 17.4044 25.9404Z" fill="#FFD1A4" />
                <path d="M22.8575 25.9404H21.1925C20.9274 25.9404 20.7125 26.1553 20.7125 26.4204V28.0854C20.7125 28.3505 20.9274 28.5654 21.1925 28.5654H22.8575C23.1226 28.5654 23.3375 28.3505 23.3375 28.0854V26.4204C23.3375 26.1553 23.1226 25.9404 22.8575 25.9404Z" fill="#FFD1A4" />
                <path d="M32.5 28.8404C32.5012 29.4742 32.3144 30.0941 31.9632 30.6217C31.612 31.1493 31.1122 31.5608 30.527 31.8042C29.9418 32.0476 29.2976 32.1119 28.6758 31.989C28.0541 31.8661 27.4827 31.5616 27.0341 31.1138C26.5855 30.6661 26.2799 30.0954 26.1558 29.4739C26.0317 28.8524 26.0947 28.208 26.337 27.6223C26.5792 27.0367 26.9898 26.5361 27.5167 26.1838C28.0435 25.8316 28.6631 25.6436 29.2969 25.6436C30.1451 25.6444 30.9584 25.9813 31.5587 26.5804C32.159 27.1796 32.4975 27.9922 32.5 28.8404Z" fill="#E85966" />
                <path d="M28.5219 30.3691L27.45 29.2941L27.8688 28.8754L28.5219 29.5285L30.7281 27.3223L31.1469 27.741L28.5219 30.3691Z" fill="#EEEFEE" />
              </g>
              <defs>
                <clipPath id="clip0_2202_83537">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className='appointments-total-box-item m-0'>98 Appointments</p>

          </div>

          <span className="sort-by-lable">Sort by:</span>
          <InputSelect
            label=""
            name="tests"
            // value={formData.tests}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
            }}
            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
            required={true}
            disabled={false}
            placeholder="All Time"
            className="patient-header-select-filter"
            // error={formError.tests}
            options={[
              { id: "1", value: "Today", label: "Today" },
              { id: "2", value: "Yesterday", label: "Yesterday" },
              { id: "3", value: "tomorrow", label: "tomorrow" },
            ]}
          />
          <div className="patient-header-filter-icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M6.30166 10.6484V4.55469C6.30166 4.35578 6.22264 4.16501 6.08199 4.02436C5.94134 3.88371 5.75057 3.80469 5.55166 3.80469C5.35275 3.80469 5.16198 3.88371 5.02133 4.02436C4.88068 4.16501 4.80166 4.35578 4.80166 4.55469V10.6484C4.15635 10.8137 3.58438 11.189 3.17593 11.7152C2.76748 12.2414 2.54578 12.8886 2.54578 13.5547C2.54578 14.2208 2.76748 14.868 3.17593 15.3942C3.58438 15.9204 4.15635 16.2957 4.80166 16.4609V21.0547C4.80166 21.2536 4.88068 21.4444 5.02133 21.585C5.16198 21.7257 5.35275 21.8047 5.55166 21.8047C5.75057 21.8047 5.94134 21.7257 6.08199 21.585C6.22264 21.4444 6.30166 21.2536 6.30166 21.0547V16.4609C6.94697 16.2957 7.51894 15.9204 7.92739 15.3942C8.33584 14.868 8.55754 14.2208 8.55754 13.5547C8.55754 12.8886 8.33584 12.2414 7.92739 11.7152C7.51894 11.189 6.94697 10.8137 6.30166 10.6484ZM5.55166 15.0547C5.25499 15.0547 4.96498 14.9667 4.7183 14.8019C4.47163 14.6371 4.27937 14.4028 4.16584 14.1287C4.05231 13.8546 4.0226 13.553 4.08048 13.2621C4.13836 12.9711 4.28122 12.7038 4.491 12.494C4.70078 12.2842 4.96805 12.1414 5.25902 12.0835C5.54999 12.0256 5.8516 12.0553 6.12568 12.1689C6.39977 12.2824 6.63404 12.4747 6.79886 12.7213C6.96369 12.968 7.05166 13.258 7.05166 13.5547C7.05166 13.9525 6.89362 14.334 6.61232 14.6153C6.33101 14.8967 5.94948 15.0547 5.55166 15.0547ZM13.0517 6.14844V4.55469C13.0517 4.35578 12.9726 4.16501 12.832 4.02436C12.6913 3.88371 12.5006 3.80469 12.3017 3.80469C12.1027 3.80469 11.912 3.88371 11.7713 4.02436C11.6307 4.16501 11.5517 4.35578 11.5517 4.55469V6.14844C10.9063 6.31366 10.3344 6.68896 9.92593 7.21517C9.51748 7.74138 9.29578 8.38856 9.29578 9.05469C9.29578 9.72082 9.51748 10.368 9.92593 10.8942C10.3344 11.4204 10.9063 11.7957 11.5517 11.9609V21.0547C11.5517 21.2536 11.6307 21.4444 11.7713 21.585C11.912 21.7257 12.1027 21.8047 12.3017 21.8047C12.5006 21.8047 12.6913 21.7257 12.832 21.585C12.9726 21.4444 13.0517 21.2536 13.0517 21.0547V11.9609C13.697 11.7957 14.2689 11.4204 14.6774 10.8942C15.0858 10.368 15.3075 9.72082 15.3075 9.05469C15.3075 8.38856 15.0858 7.74138 14.6774 7.21517C14.2689 6.68896 13.697 6.31366 13.0517 6.14844ZM12.3017 10.5547C12.005 10.5547 11.715 10.4667 11.4683 10.3019C11.2216 10.1371 11.0294 9.9028 10.9158 9.62871C10.8023 9.35462 10.7726 9.05302 10.8305 8.76205C10.8884 8.47108 11.0312 8.20381 11.241 7.99403C11.4508 7.78425 11.7181 7.64139 12.009 7.58351C12.3 7.52563 12.6016 7.55534 12.8757 7.66887C13.1498 7.7824 13.384 7.97466 13.5489 8.22133C13.7137 8.46801 13.8017 8.75802 13.8017 9.05469C13.8017 9.45251 13.6436 9.83404 13.3623 10.1153C13.081 10.3967 12.6995 10.5547 12.3017 10.5547ZM22.0517 16.5547C22.051 15.8896 21.8298 15.2435 21.4227 14.7176C21.0155 14.1917 20.4454 13.8156 19.8017 13.6484V4.55469C19.8017 4.35578 19.7226 4.16501 19.582 4.02436C19.4413 3.88371 19.2506 3.80469 19.0517 3.80469C18.8527 3.80469 18.662 3.88371 18.5213 4.02436C18.3807 4.16501 18.3017 4.35578 18.3017 4.55469V13.6484C17.6563 13.8137 17.0844 14.189 16.6759 14.7152C16.2675 15.2414 16.0458 15.8886 16.0458 16.5547C16.0458 17.2208 16.2675 17.868 16.6759 18.3942C17.0844 18.9204 17.6563 19.2957 18.3017 19.4609V21.0547C18.3017 21.2536 18.3807 21.4444 18.5213 21.585C18.662 21.7257 18.8527 21.8047 19.0517 21.8047C19.2506 21.8047 19.4413 21.7257 19.582 21.585C19.7226 21.4444 19.8017 21.2536 19.8017 21.0547V19.4609C20.4454 19.2937 21.0155 18.9177 21.4227 18.3918C21.8298 17.8659 22.051 17.2198 22.0517 16.5547ZM19.0517 18.0547C18.755 18.0547 18.465 17.9667 18.2183 17.8019C17.9716 17.6371 17.7794 17.4028 17.6658 17.1287C17.5523 16.8546 17.5226 16.553 17.5805 16.2621C17.6384 15.9711 17.7812 15.7038 17.991 15.494C18.2008 15.2842 18.4681 15.1414 18.759 15.0835C19.05 15.0256 19.3516 15.0553 19.6257 15.1689C19.8998 15.2824 20.134 15.4747 20.2989 15.7213C20.4637 15.968 20.5517 16.258 20.5517 16.5547C20.5517 16.9525 20.3936 17.334 20.1123 17.6153C19.831 17.8967 19.4495 18.0547 19.0517 18.0547Z" fill="#2B4360" />
            </svg>
          </div>

        </div>
      </div>

      <>
        <Modal
          show={BookAppointmentModal}
          onHide={() => setBookAppointmentModal(false)}
          header="Book Appointment"
          closeButton={true}
        >
          <BookAppointment
            setBookAppointmentModal={setBookAppointmentModal}
            setShowSuccessModalBook={setShowSuccessModalBook}
          />
        </Modal>

        <SuccessModalBookAppointment
          showSuccessModalBook={showSuccessModalBook}
          setShowSuccessModalBook={setShowSuccessModalBook}
        />
      </>

    </>
  );

}