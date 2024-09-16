import React, { useRef } from "react";
import P5Sketch from "./P5Sketch";

const CanvasTrace = ({
  style = { width: "100%", height: "400px" },
  options = {},
  customDrawFunction = null,
  customClickFunction = null,
  children,
  ...props
}) => {
  const containerRef = useRef(null);

  const isBrowser = typeof window !== "undefined";

  return (
    <div
      ref={containerRef}
      style={{ ...style, position: "relative" }}
      {...props}
    >
      {isBrowser && (
        <P5Sketch
          containerRef={containerRef}
          {...options}
          customDrawFunction={customDrawFunction}
          customClickFunction={customClickFunction}
        />
      )}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CanvasTrace;
