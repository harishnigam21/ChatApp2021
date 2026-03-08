import { useDispatch, useSelector } from "react-redux";
import { media } from "../../assets/data/media.js";
import { useEffect, useState } from "react";
import useApi from "../../hooks/Api.jsx";
import { addRequest } from "../../redux/slices/UserSlice.js";
import toast from "react-hot-toast";

export default function Contacts() {
  const { sendRequest, loading } = useApi();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.userInfo);
  const contact = useSelector((store) => store.user.otherUsers);
  const requests = useSelector((store) => store.user.request);
  const [status, setStatus] = useState({});
  useEffect(() => {
    if (user) {
      requests.filter((item) => {
        if (item.type == "connection" && item.sender_id == user._id) {
          setStatus((prev) => ({ ...prev, [item.receiver_id]: item.status }));
        }
      });
    }
    console.log(status);
  }, [requests]);
  console.log(requests);
  console.log(contact);
  const handleFollow = async (id) => {
    await sendRequest(`api/interact/follow/${id}`, "POST", {}, {}, false).then(
      (result) => {
        const data = result?.data;
        if (result && result.success) {
          toast.success(data.message);
          dispatch(addRequest({ data: data.data }));
        } else {
          const errMessage = data?.message || "Failed to send Request";
          toast.error(errMessage);
        }
      },
    );
  };
  return (
    <article className="flex flex-col gap-2 py-2">
      {contact && contact.length > 0 ? (
        contact.map((usr, index) => (
          <article
            className="flex flex-col gap-2"
            key={`contact/list/user/${index}`}
          >
            <div className="flex items-center px-4 gap-4">
              <div className="aspect-square rounded-full w-12 h-12 flex items-center justify-center bg-bgprimary border border-border/20 text-text uppercase">
                <strong>{usr.name.slice(0, 2)}</strong>
              </div>
              <strong>{usr.name}</strong>
              <div className="flex items-center justify-end-safe grow">
                {user.following.includes(usr._id) ? (
                  <div className="flex items-center">
                    <button className="px-2 rounded-full bg-blue-500 font-medium">
                      UnFollow
                    </button>
                  </div>
                ) : user.followers.includes(usr._id) ? (
                  <button className="px-2 rounded-full bg-red-500 font-medium">
                    Remove
                  </button>
                ) : (
                  <div className="flex items-center">
                    {status[usr._id] && status[usr._id] == "pending" ? (
                      <button
                        disabled={true}
                        className="px-2 rounded-full bg-blue-500 font-medium"
                      >
                        pending..
                      </button>
                    ) : (
                      <button
                        className="px-2 rounded-full bg-green-500 font-medium text-black"
                        onClick={() => handleFollow(usr._id)}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <hr className="w-full border border-border/5" />
          </article>
        ))
      ) : (
        <p>No Contact</p>
      )}
    </article>
  );
}
