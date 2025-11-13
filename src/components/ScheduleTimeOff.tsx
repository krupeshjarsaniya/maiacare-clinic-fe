"use client";

import ScheduleTimeOffForm from "./form/ScheduleTimeOffForm";

function ScheduleTimeOff({
    setBlockCalendarModal,
}: {
    setBlockCalendarModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <>
            <ScheduleTimeOffForm setBlockCalendarModal={setBlockCalendarModal} />
        </>
    );
}

export default ScheduleTimeOff;
