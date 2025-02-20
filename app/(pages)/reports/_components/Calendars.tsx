import CalendarDatePicker from "@/app/_components/ui/DatePicker/CalendarDatePicker";

const Calendars = () => {
  return (
    <>
      <span>
        od:&nbsp;
        <CalendarDatePicker dateKey="startDate" />
      </span>

      <span>
        do:&nbsp;
        <CalendarDatePicker dateKey="endDate" />
      </span>
    </>
  );
};

export default Calendars;
