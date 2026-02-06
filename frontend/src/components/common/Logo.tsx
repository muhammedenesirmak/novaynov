const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left circle */}
      <circle
        cx="38"
        cy="50"
        r="28"
        stroke="url(#gradient)"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Right circle */}
      <circle
        cx="62"
        cy="50"
        r="28"
        stroke="url(#gradient)"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Four-pointed star in the intersection */}
      <g transform="translate(50, 50)">
        <path
          d="M 0 -12 L 3 -3 L 12 0 L 3 3 L 0 12 L -3 3 L -12 0 L -3 -3 Z"
          fill="url(#gradient)"
        />
      </g>
      
      {/* Gradient definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Logo
