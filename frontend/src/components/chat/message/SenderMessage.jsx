import { useSelector } from "react-redux";
import { media } from "../../../assets/data/media";
import { separateTime } from "../../../utils/getDate";
import ImageLoading from "./ImageLoading";

export default function SenderMessage({ msg,selectedUser }) {
  const onlineUsers = useSelector((store) => store.user.onlineUsers);
  return (
    <section className=" rounded-[0px_10px_10px_10px] flex flex-col bg-secondary/80 text-black min-w-30 max-w-[50%] wrap-anywhere you self-start overflow-hidden">
     {msg.image && <ImageLoading msg={msg}/>}
      <div className="relative pb-3 flex gap-2">
        <p className="wrap-anywhere p-1 pl-2">{msg.message}</p>
        <small className="absolute bottom-0 right-0 text-[10px] grow text-right flex flex-nowrap items-end justify-end gap-1 whitespace-nowrap">
          {separateTime(msg.createdAt)}
          {msg.seen ? (
            <media.BiCheckDouble className="text-base text-blue-700" />
          ) : onlineUsers?.includes(selectedUser._id) ? (
            <media.BiCheckDouble className="text-base" />
          ) : (
            <media.BiCheck className="text-base" />
          )}
        </small>
      </div>
    </section>
  );
}
