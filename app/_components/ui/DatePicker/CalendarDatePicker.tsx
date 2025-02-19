"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { srLatn } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

type CalendarPickerProps = {
  dateKey: "startDate" | "endDate";
};

export default function CalendarPicker({ dateKey }: CalendarPickerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialDate = searchParams.get(dateKey)
    ? new Date(searchParams.get(dateKey) as string)
    : null;

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString()); // ✅ Create a new instance

    if (selectedDate) {
      params.set(dateKey, selectedDate.toISOString().split("T")[0]);
    } else {
      params.delete(dateKey); // ✅ Remove param when date is cleared
    }

    router.replace(`?${params.toString()}`, { scroll: false }); // ✅ Use replace to prevent history spam
  }, [selectedDate, dateKey, router, searchParams]);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="dd.MM.yyyy"
      showYearDropdown
      scrollableMonthYearDropdown
      shouldCloseOnSelect={true} // ✅ Close calendar on select
      placeholderText="Izaberite datum"
      locale={srLatn}
      isClearable // ✅ Allow clearing selection
      showPopperArrow={false}
      className="text-winter-900 p-1 bg-transparent border border-secondary-500/30"
    />
  );
}
