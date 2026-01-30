"use client"

import React from 'react';

export default function FloralBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top left corner flower */}
      <svg
        className="absolute -top-20 -left-20 w-80 h-80 text-forest-green/15"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Large blooming flower */}
        <g className="animate-[bloom_20s_ease-in-out_infinite]">
          {/* Petals */}
          <ellipse cx="100" cy="60" rx="25" ry="40" fill="currentColor" opacity="0.8" />
          <ellipse cx="140" cy="100" rx="25" ry="40" fill="currentColor" opacity="0.7" transform="rotate(72 100 100)" />
          <ellipse cx="125" cy="150" rx="25" ry="40" fill="currentColor" opacity="0.9" transform="rotate(144 100 100)" />
          <ellipse cx="75" cy="150" rx="25" ry="40" fill="currentColor" opacity="0.7" transform="rotate(216 100 100)" />
          <ellipse cx="60" cy="100" rx="25" ry="40" fill="currentColor" opacity="0.8" transform="rotate(288 100 100)" />
          {/* Center */}
          <circle cx="100" cy="100" r="15" className="fill-golden-yellow/40" />
        </g>
      </svg>

      {/* Top right golden accent flower */}
      <svg
        className="absolute top-32 -right-16 w-64 h-64 text-golden-yellow/20"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="animate-[bloom_25s_ease-in-out_infinite_2s]">
          <ellipse cx="100" cy="60" rx="20" ry="35" fill="currentColor" opacity="0.8" />
          <ellipse cx="135" cy="85" rx="20" ry="35" fill="currentColor" opacity="0.7" transform="rotate(60 100 100)" />
          <ellipse cx="135" cy="115" rx="20" ry="35" fill="currentColor" opacity="0.8" transform="rotate(120 100 100)" />
          <ellipse cx="100" cy="140" rx="20" ry="35" fill="currentColor" opacity="0.9" transform="rotate(180 100 100)" />
          <ellipse cx="65" cy="115" rx="20" ry="35" fill="currentColor" opacity="0.7" transform="rotate(240 100 100)" />
          <ellipse cx="65" cy="85" rx="20" ry="35" fill="currentColor" opacity="0.8" transform="rotate(300 100 100)" />
          <circle cx="100" cy="100" r="12" className="fill-forest-green/30" />
        </g>
      </svg>

      {/* Middle left decorative flower */}
      <svg
        className="absolute top-1/2 -left-24 w-96 h-96 text-forest-green/12"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="animate-[bloom_30s_ease-in-out_infinite_4s]">
          {/* Large elegant petals */}
          <path
            d="M100,50 Q90,30 100,20 Q110,30 100,50"
            fill="currentColor"
            opacity="0.8"
          />
          <path
            d="M100,50 Q90,30 100,20 Q110,30 100,50"
            fill="currentColor"
            opacity="0.7"
            transform="rotate(45 100 100)"
          />
          <path
            d="M100,50 Q90,30 100,20 Q110,30 100,50"
            fill="currentColor"
            opacity="0.9"
            transform="rotate(90 100 100)"
          />
          <path
            d="M100,50 Q90,30 100,20 Q110,30 100,50"
            fill="currentColor"
            opacity="0.7"
            transform="rotate(135 100 100)"
          />
          <path
            d="M100,50 Q90,30 100,20 Q110,30 100,50"
            fill="currentColor"
            opacity="0.8"
            transform="rotate(180 100 100)"
          />
          <path
            d="M100,50 Q90,30 100,20 Q110,30 100,50"
            fill="currentColor"
            opacity="0.9"
            transform="rotate(225 100 100)"
          />
          <path
            d="M100,50 Q90,30 100,20 Q110,30 100,50"
            fill="currentColor"
            opacity="0.7"
            transform="rotate(270 100 100)"
          />
          <path
            d="M100,50 Q90,30 100,20 Q110,30 100,50"
            fill="currentColor"
            opacity="0.8"
            transform="rotate(315 100 100)"
          />
          <circle cx="100" cy="100" r="18" className="fill-golden-yellow/30" />
        </g>
      </svg>

      {/* Bottom right corner flower cluster */}
      <svg
        className="absolute -bottom-24 -right-24 w-[500px] h-[500px] text-forest-green/15"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="animate-[bloom_22s_ease-in-out_infinite_1s]">
          {/* Main flower */}
          <ellipse cx="100" cy="65" rx="22" ry="38" fill="currentColor" opacity="0.9" />
          <ellipse cx="133" cy="80" rx="22" ry="38" fill="currentColor" opacity="0.7" transform="rotate(51 100 100)" />
          <ellipse cx="145" cy="110" rx="22" ry="38" fill="currentColor" opacity="0.8" transform="rotate(102 100 100)" />
          <ellipse cx="133" cy="140" rx="22" ry="38" fill="currentColor" opacity="0.9" transform="rotate(153 100 100)" />
          <ellipse cx="100" cy="155" rx="22" ry="38" fill="currentColor" opacity="0.7" transform="rotate(204 100 100)" />
          <ellipse cx="67" cy="140" rx="22" ry="38" fill="currentColor" opacity="0.8" transform="rotate(255 100 100)" />
          <ellipse cx="55" cy="110" rx="22" ry="38" fill="currentColor" opacity="0.9" transform="rotate(306 100 100)" />
          <ellipse cx="67" cy="80" rx="22" ry="38" fill="currentColor" opacity="0.7" transform="rotate(357 100 100)" />
          <circle cx="100" cy="100" r="16" className="fill-golden-yellow/35" />
        </g>
      </svg>

      {/* Smaller accent flowers scattered */}
      <svg
        className="absolute top-1/4 right-1/4 w-40 h-40 text-golden-yellow/18"
        viewBox="0 0 100 100"
        fill="none"
      >
        <g className="animate-[bloom_18s_ease-in-out_infinite_3s]">
          <circle cx="50" cy="30" r="8" fill="currentColor" opacity="0.8" />
          <circle cx="70" cy="50" r="8" fill="currentColor" opacity="0.7" />
          <circle cx="50" cy="70" r="8" fill="currentColor" opacity="0.9" />
          <circle cx="30" cy="50" r="8" fill="currentColor" opacity="0.8" />
          <circle cx="50" cy="50" r="6" className="fill-forest-green/35" />
        </g>
      </svg>

      <svg
        className="absolute bottom-1/3 left-1/3 w-48 h-48 text-forest-green/15"
        viewBox="0 0 100 100"
        fill="none"
      >
        <g className="animate-[bloom_24s_ease-in-out_infinite_5s]">
          <ellipse cx="50" cy="25" rx="10" ry="18" fill="currentColor" opacity="0.8" />
          <ellipse cx="70" cy="35" rx="10" ry="18" fill="currentColor" opacity="0.7" transform="rotate(60 50 50)" />
          <ellipse cx="70" cy="65" rx="10" ry="18" fill="currentColor" opacity="0.9" transform="rotate(120 50 50)" />
          <ellipse cx="50" cy="75" rx="10" ry="18" fill="currentColor" opacity="0.8" transform="rotate(180 50 50)" />
          <ellipse cx="30" cy="65" rx="10" ry="18" fill="currentColor" opacity="0.7" transform="rotate(240 50 50)" />
          <ellipse cx="30" cy="35" rx="10" ry="18" fill="currentColor" opacity="0.9" transform="rotate(300 50 50)" />
          <circle cx="50" cy="50" r="7" className="fill-golden-yellow/40" />
        </g>
      </svg>

      {/* Delicate leaves */}
      <svg
        className="absolute top-1/3 left-1/4 w-32 h-32 text-forest-green/20"
        viewBox="0 0 100 100"
        fill="none"
      >
        <g className="animate-[sway_15s_ease-in-out_infinite]">
          <path
            d="M50,20 Q30,40 50,60"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
          <ellipse cx="40" cy="35" rx="8" ry="15" fill="currentColor" opacity="0.6" transform="rotate(-30 40 35)" />
          <ellipse cx="40" cy="50" rx="8" ry="15" fill="currentColor" opacity="0.7" transform="rotate(-20 40 50)" />
        </g>
      </svg>

      <svg
        className="absolute bottom-1/4 right-1/3 w-36 h-36 text-golden-yellow/18"
        viewBox="0 0 100 100"
        fill="none"
      >
        <g className="animate-[sway_20s_ease-in-out_infinite_2s]">
          <path
            d="M50,80 Q70,60 50,40"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
          <ellipse cx="60" cy="65" rx="8" ry="15" fill="currentColor" opacity="0.7" transform="rotate(30 60 65)" />
          <ellipse cx="60" cy="50" rx="8" ry="15" fill="currentColor" opacity="0.6" transform="rotate(20 60 50)" />
        </g>
      </svg>

      <style jsx>{`
        @keyframes bloom {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes sway {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
}