import { useState, useRef, useEffect, MutableRefObject } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";

const SideNavbar = () => {
  const [showVideosDropdown, setShowVideosDropdown] = useState(false);
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);
  const [showDietDropdown, setShowDietDropdown] = useState(false);
  const [showQuestionDropdown, setShowQuestionDropdown] = useState(false);

  const videosDropdownRef: MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const usersDropdownRef: MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const dietDropdownRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const questionDropdownRef: MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        videosDropdownRef.current &&
        !videosDropdownRef.current.contains(event.target)
      ) {
        setShowVideosDropdown(false);
      }
      if (
        usersDropdownRef.current &&
        !usersDropdownRef.current.contains(event.target)
      ) {
        setShowUsersDropdown(false);
      }
      if (
        dietDropdownRef.current &&
        !dietDropdownRef.current.contains(event.target)
      ) {
        setShowDietDropdown(false);
      }
      if (
        questionDropdownRef.current &&
        !questionDropdownRef.current.contains(event.target)
      ) {
        setShowQuestionDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-full max-h-screen flex-col gap-2 relative">
      <div className="flex h-[60px] items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" to="#">
          <Package2Icon className="h-6 w-6" />
          <span className="">GSB Dashboard</span>
        </Link>
        <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
          <BellIcon className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid relative items-start px-4 text-sm font-medium">
          {/* Other links */}
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            to="/product"
          >
            <PackageIcon className="h-4 w-4" />
            Products
          </Link>
          <div className="relative" ref={usersDropdownRef}>
            <button
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              onClick={() => setShowUsersDropdown(!showUsersDropdown)}
            >
              <UsersIcon className="h-4 w-4" />
              Users
            </button>
            {showUsersDropdown && (
              <div className="absolute top-0 left-0 mt-10 bg-white shadow-lg rounded-lg w-40 py-2 z-10">
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  to="/userUpdates"
                >
                  User Updates
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  to="/user"
                >
                  User Details
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  to="/userStories"
                >
                  User Stories
                </Link>
              </div>
            )}
          </div>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            to="/order"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            Orders
          </Link>
          <div className="relative" ref={videosDropdownRef}>
            <button
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              onClick={() => setShowVideosDropdown(!showVideosDropdown)}
            >
              <FaCirclePlay className="h-4 w-4" />
              Videos
            </button>
            {showVideosDropdown && (
              <div className="absolute top-0 right-0 mt-10 bg-white shadow-lg rounded-lg w-40 py-2 z-10">
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  to="/content-videos"
                >
                  General Videos
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  to="/yt-content-videos"
                >
                  Youtube Videos
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  to="/subscriber-videos"
                >
                  Subscriber Videos
                </Link>
              </div>
            )}
          </div>
          <div className="relative" ref={dietDropdownRef}>
            <button
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              onClick={() => setShowDietDropdown(!showDietDropdown)}
            >
              <FaFilePdf className="h-4 w-4" />
              Diet Pdf
            </button>
            {showDietDropdown && (
              <div className="absolute top-0 left-0 mt-10 bg-white shadow-lg rounded-lg w-40 py-2 z-10">
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  to="/general-diet"
                >
                  General Diet
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  to="/subscriber-diet"
                >
                  Subscriber Diet
                </Link>
              </div>
            )}
          </div>
          {/* Remaining links */}
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            to="/consultation"
          >
            <MailIcon className="h-4 w-4" />
            Consultation
          </Link>

          <div className="relative" ref={questionDropdownRef}>
            <button
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              onClick={() => setShowQuestionDropdown(!showQuestionDropdown)}
            >
              <FaFilePdf className="h-4 w-4" />
              Questions
            </button>
            {showQuestionDropdown && (
              <div className="absolute top-0 left-0 mt-10 bg-white shadow-lg rounded-lg w-40 py-2 z-10">
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  to="/IBS-questions"
                >
                  IBS Colitis & Crohn's Questions
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  to="/diabetes-questions"
                >
                  Diabetes Questions
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  to="/depression-questions"
                >
                  Mental Depression Questions
                </Link>
              </div>
            )}
          </div>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            to="/chat"
          >
            <IoChatbubbleOutline className="h-4 w-4" />
            Chat
          </Link>
        </nav>
      </div>
    </div>
  );
};

// Icons and other functions

function BellIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function MailIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function Package2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default SideNavbar;
