import { useState } from "react";
import { media } from "../../../assets/data/media";
import DayMessage from "./DayMessage";

export default function YearMessage({ year, dates, selectedUser }) {
  const [show, setShow] = useState(true);
  return (
    <article className="w-full flex flex-col gap-4">
      <div
        className="relative flex flex-nowrap items-center justify-center"
        onClick={() => setShow((prev) => !prev)}
      >
        <hr className="grow border border-border/10" />
        <small className=" cursor-pointer">{year}</small>
        <media.FaCaretDown
          className={`${show ? "rotate-0" : "rotate-180"} cursor-pointer mx-2 transition-all`}
        />
        <hr className="grow border border-border/10" />
      </div>
      {show &&
        Object.entries(dates).map(([date, messages], index) => (
          <DayMessage
            date={date}
            messages={messages}
            key={`selectedUser/date/message/${index}`}
            selectedUser={selectedUser}
          />
        ))}
    </article>
  );
}
