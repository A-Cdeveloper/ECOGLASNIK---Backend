"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { srLatn } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

type CalendarPickerProps = {
  dateKey: "startDate" | "endDate"; // Define whether this is for startDate or endDate
};

export default function CalendarPicker({ dateKey }: CalendarPickerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialDate = searchParams.get(dateKey)
    ? new Date(searchParams.get(dateKey) as string)
    : null;

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

  // Update search params when the date changes
  useEffect(() => {
    if (!selectedDate) return;

    const params = new URLSearchParams(searchParams);
    params.set(dateKey, selectedDate.toISOString().split("T")[0]);

    router.push(`?${params.toString()}`, { scroll: false });
  }, [selectedDate, dateKey, searchParams, router]);

  return (
    <DatePicker
      selected={selectedDate}
      onSelect={(date) => setSelectedDate(date)}
      dateFormat="dd.MM.yyyy"
      showYearDropdown
      scrollableMonthYearDropdown
      shouldCloseOnSelect={true}
      placeholderText="Izaberite datum"
      locale={srLatn}
      showPopperArrow={false}
      className="text-winter-900 p-1 bg-transparent border border-secondary-500/30"
    />
  );
}
