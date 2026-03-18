import { FiSidebar, FiPlus, FiLock, FiShare2, FiMoreHorizontal } from "react-icons/fi";

export default function Topbar() {
  return (
    <div className="topbar">

      {/* LEFT ICONS */}
      <div className="topbar-left">

        <button className="icon-btn">
          <FiSidebar size={18} />
        </button>

        <button className="icon-btn">
          <FiPlus size={18} />
        </button>

        <button className="icon-btn">
          <FiLock size={18} />
        </button>

      </div>

      {/* RIGHT SIDE */}
      <div className="topbar-right">

        <button className="share-btn">
          <FiShare2 size={18}/>
          <span>Share</span>
        </button>

        <button className="icon-btn">
          <FiMoreHorizontal size={20}/>
        </button>

      </div>

    </div>
  );
}