import React from "react";
import "../style/button.css";

export const Button = ({
  text,
  addStyles,
}: {
  text: string;
  addStyles: string;
}) => {
  return (
    <div className='frame'>
      <button
        className={`${addStyles} custom-btn btn font-medium md:text-base text-sm`}>
        {text}
        <div className='dot'></div>
      </button>
    </div>
  );
};
