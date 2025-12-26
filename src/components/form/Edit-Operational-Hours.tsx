import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TimePickerFieldGroup } from "../ui/CustomTimePicker";
import { Col, Form, Row } from "react-bootstrap";
import ContentContainer from "../ui/ContentContainer";

import { clinicData } from "@/utlis/types/interfaces";
import { OperationalHour } from "@/utlis/types/interfaces";
type OperationalHoursPayload =
  | {
      useCustomHours: true;
      groupOperationalHours: {
        weekdayOpen: string;
        weekdayClose: string;
        weekendOpen: string;
        weekendClose: string;
      };
      emergencyDoctorsAvailable_24_7: boolean;
    }
  | {
      useCustomHours: true;
      operationalHours: OperationalHour[];
      emergencyDoctorsAvailable_24_7: boolean;
    };
export default function EditOperationalHours({
  onNext,
  onPrevious,
  data,
  onChange,
}: {
  onNext: () => void;
  onPrevious: () => void;
  onChange: (data: OperationalHoursPayload) => void;
  data: OperationalHour[];
}) {
  type FormData = {
    MF: string; // Monday-Friday start time
    MF_end: string; // Monday-Friday end time

    SS: string; // Saturday-Sunday start time
    SS_end: string; // Saturday-Sunday end time

    // per-day start
    M: string;
    T: string;
    W: string;
    Th: string;
    F: string;
    S: string;
    Sun: string;

    // per-day end
    M_end: string;
    T_end: string;
    W_end: string;
    Th_end: string;
    F_end: string;
    S_end: string;
    Sun_end: string;
  };
  const initialFormData: FormData = {
    MF: "",
    MF_end: "",

    SS: "",
    SS_end: "",

    M: "",
    T: "",
    W: "",
    Th: "",
    F: "",
    S: "",
    Sun: "",

    M_end: "",
    T_end: "",
    W_end: "",
    Th_end: "",
    F_end: "",
    S_end: "",
    Sun_end: "",
  };

  const days = [
    { key: "M", label: "Monday" },
    { key: "T", label: "Tuesday" },
    { key: "W", label: "Wednesday" },
    { key: "Th", label: "Thursday" },
    { key: "F", label: "Friday" },
    { key: "S", label: "Saturday" },
    { key: "Sun", label: "Sunday" },
  ];
  const [formData, setFormData] = useState<FormData>(initialFormData);
  type DayKey = "M" | "T" | "W" | "Th" | "F" | "S" | "Sun";

  type SelectedDays = Record<DayKey, boolean>;
  const [selectedDays, setSelectedDays] = useState<SelectedDays>({
    M: true,
    T: true,
    W: true,
    Th: true,
    F: true,
    S: true,
    Sun: true,
  });
  const toggleDay = (day: keyof typeof selectedDays) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };
  const [custome, setCustome] = useState(0);
  const handleSelect = () => {
    setCustome(custome === 0 ? 1 : 0);
  };
  const [isOpen247, setIsOpen247] = useState(false);
  const handle247Change = () => {
    setIsOpen247((prev) => !prev);

    // optional: auto-select all days when 24/7 is enabled
    setSelectedDays({
      M: true,
      T: true,
      W: true,
      Th: true,
      F: true,
      S: true,
      Sun: true,
    });
  };
  useEffect(() => {
    if (!data?.length) return;

    const keyMap: Record<string, DayKey> = {
      Monday: "M",
      Tuesday: "T",
      Wednesday: "W",
      Thursday: "Th",
      Friday: "F",
      Saturday: "S",
      Sunday: "Sun",
    };

    const weekday = data.filter((d) =>
      ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(d.day)
    );

    const weekend = data.filter((d) => ["Saturday", "Sunday"].includes(d.day));

    const sameWeekday =
      weekday.length &&
      weekday.every(
        (d) =>
          d.openTime === weekday[0].openTime &&
          d.closeTime === weekday[0].closeTime
      );

    const sameWeekend =
      weekend.length &&
      weekend.every(
        (d) =>
          d.openTime === weekend[0].openTime &&
          d.closeTime === weekend[0].closeTime
      );

    if (sameWeekday && sameWeekend) {
      setCustome(0);

      setFormData((prev) => ({
        ...prev,
        MF: weekday[0]?.openTime || "",
        SS: weekend[0]?.openTime || "",
      }));
      return;
    }
    setCustome(1);

    const daysState: SelectedDays = {
      M: false,
      T: false,
      W: false,
      Th: false,
      F: false,
      S: false,
      Sun: false,
    };

    const fd = { ...initialFormData };

    data.forEach((d) => {
      const key = keyMap[d.day];
      if (!key) return;

      daysState[key] = true;
      fd[key] = d.openTime;
      fd[`${key}_end` as keyof FormData] = d.closeTime;
    });

    setSelectedDays(daysState);
    setFormData(fd);
  }, [data]);

  useEffect(() => {
    const is247 = data?.every(
      (d) => d.openTime === "00:00" && d.closeTime === "23:59"
    );

    if (is247) {
      setIsOpen247(true);
      setCustome(0);
    }
  }, [data]);
  const dayMap: Record<DayKey, string> = {
    M: "Monday",
    T: "Tuesday",
    W: "Wednesday",
    Th: "Thursday",
    F: "Friday",
    S: "Saturday",
    Sun: "Sunday",
  };
  const handleSaveAndNext = () => {
    let payload: OperationalHoursPayload;
    if (isOpen247) {
      // 24/7 mode - treated as custom hours where all days are 00:00 - 23:59
      const allDays = Object.values(dayMap).map((day) => ({
        day,
        openTime: "00:00",
        closeTime: "23:59",
      }));

      payload = {
        useCustomHours: true,
        operationalHours: allDays,
        emergencyDoctorsAvailable_24_7: isOpen247,
      };
    } else if (custome === 0) {
      // grouped operational hours mode - send groupOperationalHours object
      payload = {
        useCustomHours: true,
        groupOperationalHours: {
          weekdayOpen: formData.MF,
          weekdayClose: formData.MF_end,
          weekendOpen: formData.SS,
          weekendClose: formData.SS_end,
        },
        emergencyDoctorsAvailable_24_7: isOpen247,
      };
    } else {
      // custom operational hours mode

      const hours: OperationalHour[] = Object.keys(dayMap)
        .map((key) => {
          const dayKey = key as DayKey;
          if (!selectedDays[dayKey]) return null;

          return {
            day: dayMap[dayKey],
            openTime: formData[dayKey],
            closeTime: formData[`${dayKey}_end` as keyof FormData],
          } as OperationalHour;
        })
        .filter((v): v is OperationalHour => v !== null);

      payload = {
        useCustomHours: true,
        operationalHours: hours,
        emergencyDoctorsAvailable_24_7: isOpen247,
      };
    }

    console.log("Sending payload to parent:", payload);

    onChange(payload);
    onNext();
  };

  return (
    <div>
      <ContentContainer className="mt-4">
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center text-center text-md-start mb-3">
          <h5 className="profile-card-main-titile mb-2 mb-md-0">
            Operational hours & Days
          </h5>
          <div className="d-flex gap-3">
            <Form.Check
              type="checkbox"
              label="Select custom Hours and Days?"
              checked={custome === 1}
              onChange={() => setCustome(custome === 0 ? 1 : 0)}
              // onClick={handleSelect}
              className="text-nowrap check-box input"
            />
            <Form.Check
              type="checkbox"
              label="Open 24/7"
              checked={isOpen247}
              onChange={handle247Change}
              className="text-nowrap check-box input"
            />
          </div>
        </div>
        {custome === 0 ? (
          <>
            {/* monday-friday */}
            <Row className="mb-3">
              <Col md={6}>
                <TimePickerFieldGroup
                  label="Monday–Friday"
                  name="MF"
                  value={formData.MF}
                  disabled={isOpen247}
                  onChange={(e) => {
                    setFormData({ ...formData, MF: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Time"
                  value={formData.MF_end}
                  disabled={isOpen247}
                  onChange={(e) => {
                    setFormData({ ...formData, MF_end: e.target.value });
                  }}
                />
              </Col>
            </Row>
            {/* saturday-sunday */}
            <Row className="mb-3">
              <Col md={6}>
                <TimePickerFieldGroup
                  label="Saturday–Sunday"
                  name="SS"
                  value={formData.SS}
                  disabled={isOpen247}
                  onChange={(e) => {
                    setFormData({ ...formData, SS: e.target.value });
                  }}
                />
              </Col>

              <Col md={6} className="mt-2">
                <TimePickerFieldGroup
                  name="Timer"
                  value={formData.SS_end}
                  disabled={isOpen247}
                  onChange={(e) => {
                    setFormData({ ...formData, SS_end: e.target.value });
                  }}
                />
              </Col>
            </Row>
          </>
        ) : (
          <>
            {days.map((day) => (
              <div key={day.key} className="mb-3">
                {/* Checkbox + Day Name */}
                <div className="d-flex align-items-center gap-2 ">
                  <Form.Check
                    type="checkbox"
                    checked={selectedDays[day.key as keyof typeof selectedDays]}
                    disabled={isOpen247}
                    onChange={() =>
                      toggleDay(day.key as keyof typeof selectedDays)
                    }
                  />
                  <div className="maiacare-input-field-label">{day.label}</div>
                </div>

                {/* Time fields */}
                <Row>
                  <Col md={6}>
                    <TimePickerFieldGroup
                      placeholder="Start Time"
                      value={formData[day.key as keyof FormData]}
                      disabled={
                        isOpen247 ||
                        !selectedDays[day.key as keyof typeof selectedDays]
                      }
                      onChange={(e: { target: { value: string } }) =>
                        setFormData({
                          ...formData,
                          [day.key]: e.target.value,
                        })
                      }
                    />
                  </Col>

                  <Col md={6}>
                    <TimePickerFieldGroup
                      placeholder="End Time"
                      value={formData[`${day.key}_end` as keyof FormData]}
                      disabled={!selectedDays[day.key as DayKey] || isOpen247}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [`${day.key}_end`]: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>
              </div>
            ))}
          </>
        )}

        <div>
          <Form.Check
            type="checkbox"
            label="Emergency Doctors Available 24/7"
            className="text-nowrap check-box input"
          />
        </div>
      </ContentContainer>

      {/* Next Button */}
      <div className="d-flex justify-content-end mt-4 gap-3">
        <Button
          variant="dark"
          className="maiacare-button edit-profile-btn"
          onClick={onPrevious}
        >
          <ArrowLeft size={16} /> Previous
        </Button>
        <Button
          variant="dark"
          className="maiacare-button common-btn-blue"
          onClick={handleSaveAndNext}
        >
          Next <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
