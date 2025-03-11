"use client";

import { useState } from "react";

export const SwapTranslate = () => {
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const handleSwapLanguage = () => {
    if (isEnglish) {
      setIsEnglish(false);
    } else {
      setIsEnglish(true);
    }
  };
  return (
    <div
      className="w-full flex pb-3 gap-2 items-center"
      onClick={handleSwapLanguage}
    >
      <div className="badge badge-soft badge-accent badge-lg min-w-28">
        {isEnglish ? "English" : "Chinese"}
      </div>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-6"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M6 19L3 16M3 16L6 13M3 16H11C12.6569 16 14 14.6569 14 13V12M10 12V11C10 9.34315 11.3431 8 13 8H21M21 8L18 11M21 8L18 5"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
      <div className="badge badge-soft badge-accent badge-lg min-w-28">
        {isEnglish ? "Chinese" : "English"}
      </div>
    </div>
  );
};
