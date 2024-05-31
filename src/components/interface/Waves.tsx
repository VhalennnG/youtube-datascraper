import React from "react";
import "../style/waves.css";

const Waves: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}>
      <div className='header-waves bg-gradient-to-r from-gray-900 via-neutral-800 to-rose-900'>
        {/* Content before waves */}
        <div className='inner-header flex py-20'></div>
        <div>
          <svg
            className='waves'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            viewBox='0 24 150 28'
            preserveAspectRatio='none'
            shapeRendering='auto'>
            <defs>
              <path
                id='gentle-wave'
                d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
              />
            </defs>
            <g className='parallax'>
              <use
                xlinkHref='#gentle-wave'
                x='48'
                y='0'
                fill='rgba(255, 255, 255, 0.3)'
              />
              <use
                xlinkHref='#gentle-wave'
                x='48'
                y='3'
                fill='rgba(255, 255, 255, 0.2)'
              />
              <use
                xlinkHref='#gentle-wave'
                x='48'
                y='5'
                fill='rgba(255, 255, 255, 0.1)'
              />
              <use
                xlinkHref='#gentle-wave'
                x='48'
                y='5'
                fill='rgba(255, 255, 255, 0.7)'
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Waves;
