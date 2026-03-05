import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import { useState } from "react";
import { media } from "../../../assets/data/media";

export default function DayMessage({ date, messages, selectedUser }) {
  const [show, setShow] = useState(true);

  return (
    <article className="relative w-full flex flex-col gap-4">
      <div
        className=" sticky top-0 flex flex-nowrap items-center justify-center"
        onClick={() => setShow((prev) => !prev)}
      >
        <hr className="grow border border-border/10" />
        <small className="cursor-pointer bg-bgprimary rounded-full py-1 px-3">{date}</small>
        <media.FaCaretDown
          className={`${show ? "rotate-0" : "rotate-180"} cursor-pointer mx-2 transition-all`}
        />
        <hr className="grow border border-border/10" />
      </div>
      {show &&
        messages.map((msg, index) =>
          msg.receiver_id == selectedUser._id ? (
            <SenderMessage
              key={`selectedUser/message/${index}`}
              msg={msg}
              selectedUser={selectedUser}
            />
          ) : (
            <ReceiverMessage key={`selectedUser/message/${index}`} msg={msg} />
          ),
        )}
    </article>
  );
}
