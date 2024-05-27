import { FC, useState } from "react";
import Chevron from "./Icons/Chevron";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  FaAngleDown,
  FaAngleUp,
  FaGavel,
  FaHashtag,
  FaHome,
} from "react-icons/fa";
import Button from "./Button";

import { useNavigate } from "react-router-dom";
import Divider from "./Divider";

type SidebarProps = {
  currentPage: string;
};

const Sidebar: FC<SidebarProps> = ({ currentPage }) => {
  const [isHover, setIsHover] = useState<boolean>();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isConjugationOpen, setIsConjugationOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsHover(false);
  };

  const navigate = useNavigate();

  const extendConjugation = () => {
    setIsConjugationOpen(!isConjugationOpen);
  };

  return (
    <div className={`flex bg-slate-100 dark:bg-neutral-900 ${isSidebarOpen ? "" : "w-0"}`}>
      <div
        className={`${
          isSidebarOpen ? "left-0" : "-left-80"
        } h-screen sm:flex order-1 relative flex-col bg-slate-200 dark:bg-neutral-850 p-1 transition-all `}
      >
        <h1 className="mb-7 px-2 text-2xl text-neutral-500 dark:text-slate-300 whitespace-pre-wrap mt-5 bg-slate-100 dark:bg-neutral-900 p-1 rounded-md">
          <b>Japanese</b> Tools
        </h1>

        <Divider height={1} />

        <div className="flex flex-col gap-2 w-full mt-2">
          <Button
            type={currentPage == "Home" ? "sidebar-current" : "sidebar"}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-bold"
          >
            <FaHome className="text-sm" />
            Home
          </Button>

          <Button
            type={currentPage == "About" ? "sidebar-current" : "sidebar"}
            onClick={() => navigate("/about")}
            className="flex items-center gap-2 font-bold"
          >
            <FaGavel className="text-sm" />
            About
          </Button>

          <Divider height={1} />

          <Button
            type={currentPage == "Kanji" ? "sidebar-current" : "sidebar"}
            onClick={() => navigate("/kanji")}
            className="flex items-center gap-2 font-bold"
          >
            <FaMagnifyingGlass className="text-sm" />
            Kanji Lookup
          </Button>

          <Button
            type={currentPage == "Particles" ? "sidebar-current" : "sidebar"}
            onClick={() => navigate("/particles")}
            className="flex items-center gap-2 font-bold"
          >
            <b>は</b>
            Particles
          </Button>

          <Button
            type={currentPage == "Conjugation" ? "sidebar-current" : "sidebar"}
            onClick={extendConjugation}
            className="flex items-center gap-2 font-bold"
          >
            <FaHashtag className="text-sm" />
            Conjugation { isConjugationOpen ? <FaAngleUp /> : <FaAngleDown />}
          </Button>

            {/* Conjugation section */}
          <div className={`${isConjugationOpen ? 'flex' : 'hidden' } flex-col gap-1 text-sm ml-3`}>
            <Button
              type={currentPage == "Verb-Conjugation" ? "sidebar-current" : "sidebar"}
              onClick={() => navigate("/conjugation/verb")}
              className="flex items-center gap-2 font-bold"
            >
              Verbs
            </Button>
            <Button
              type={currentPage == "Adjective-Conjugation" ? "sidebar-current" : "sidebar"}
              onClick={() => navigate("/conjugation/adjectives")}
              className="flex items-center gap-2 font-bold"
            >
              Adjectives
            </Button>
          </div>
        </div>

        <div className="flex-grow"/>
        <div className="opacity-50 text-slate-100 text-sm">made by ethan | github.com/hamtsu</div>
      </div>

      <div className={`h-screen ${isSidebarOpen ? 'order-2' : ''} flex items-center bg-transparent text-neutral-500/50 dark:text-slate-300/50`}>
        {isSidebarOpen ? (
          <span
            onClick={toggleSidebar}
            className={`px-2 absolute z-10 transition-opacity ${
              isHover ? "opacity-100" : "opacity-50"
            }`}
            onMouseLeave={() => setIsHover(false)}
            onMouseEnter={() => setIsHover(true)}
          >
            {isHover ? (
              <Chevron color="#e2e8f0" />
            ) : (
              <div className="h-5 rounded-md w-1 bg-neutral-500/50 dark:bg-slate-300/50"></div>
            )}
          </span>
        ) : (
          <span
            onClick={toggleSidebar}
            className={`px-2 rotate-180 transition-opacity ${
              isHover ? "opacity-100" : "dark:opacity-50"
            }`}
            onMouseLeave={() => setIsHover(false)}
            onMouseEnter={() => setIsHover(true)}
          >
            <Chevron color="#e2e8f0" />
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
