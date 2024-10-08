import React, { useRef, useState } from "react";
import P5Sketch from "./P5Sketch";

const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }}
  >
    <div
      style={{
        border: "16px solid #f3f3f3",
        borderTop: "16px solid #3498db",
        borderRadius: "50%",
        width: "80px",
        height: "80px",
      }}
    />
  </div>
);

const CanvasTrace = ({
  style = { width: "100%", height: "400px" },
  options = {},
  customDrawFunction = null,
  customClickFunction = null,
  customStrokeFunction = null,
  children,
  ...props
}) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleCanvasLoad = () => {
    setIsLoaded(true);
  };

  const isBrowser = typeof window !== "undefined";

  return (
    <div
      ref={containerRef}
      style={{ ...style, position: "relative" }}
      {...props}
    >
      {!isLoaded && <LoadingSpinner />}
      {isBrowser && (
        <P5Sketch
          containerRef={containerRef}
          {...options}
          customDrawFunction={customDrawFunction}
          customClickFunction={customClickFunction}
          customStrokeFunction={customStrokeFunction}
          onLoad={handleCanvasLoad}
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
