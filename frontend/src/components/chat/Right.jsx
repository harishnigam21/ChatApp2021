import { media } from "../../assets/data/media";

export default function Right({ selectedUser, setInfo }) {
  return (
    <section
      className={`absolute top-0 right-0 z-10 flex flex-col gap-2 py-2 items-center h-full overflow-hidden text-text backdrop-blur-xl`}
      onMouseLeave={() => setInfo(false)}
    >
      {selectedUser.pic ? (
        <img
          src={selectedUser.pic}
          alt="user pic"
          className="aspect-square rounded-full w-30 h-30 object-cover object-center"
        />
      ) : (
        <div className="aspect-square rounded-full w-30 h-30 flex items-center justify-center bg-bgprimary text-text uppercase">
          <strong>{selectedUser?.name.slice(0, 2)}</strong>
        </div>
      )}
      <h3 className="text-xl">{selectedUser.name}</h3>
      <small>{selectedUser.about}</small>
      <div
        className="absolute flex items-center top-2 left-2 cursor-pointer"
        onClick={() => setInfo(false)}
      >
        <media.FaArrowLeft className="text-base" />
      </div>
      <hr className="w-full border border-border/20" />
      <div className="flex grow items-end px-4">
        <button className="px-18 py-2 rounded-full bg-linear-to-r from-primary to-secondary text-black font-medium">
          Logout
        </button>
      </div>
    </section>
  );
}
