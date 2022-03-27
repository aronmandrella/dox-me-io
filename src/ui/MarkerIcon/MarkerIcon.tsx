import React from "react";

interface MarkerIconProps {
  className?: string;
  size?: number;
  color?: React.CSSProperties["color"];
  label?: string;
}

export const MarkerIcon: React.VFC<MarkerIconProps> = React.memo((props) => {
  const { className, size = 32, color = "black" } = props;

  const width = size * 0.75;
  const height = size;

  return (
    <svg
      className={className}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <rect
        x="95"
        y="90"
        width="192"
        height="211"
        fill="#fff"
        stroke="#000"
        strokeMiterlimit="10"
      />
      <path
        fill={color}
        d="M172.27,501.67C27,291,0,269.41,0,192,0,86,86,0,192,0S384,86,384,192c0,77.41-27,99-172.27,309.67a24,24,0,0,1-39.46,0ZM192,272a80,80,0,1,0-80-80A80,80,0,0,0,192,272Z"
      />
    </svg>
  );
});
