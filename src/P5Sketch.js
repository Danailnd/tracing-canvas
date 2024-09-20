import Sketch from "react-p5";
import { useState, useEffect, useRef } from "react";
import {
  drawRoots,
  drawRightAngleLines,
  drawSpiralBranches,
} from "./drawingPatterns";

const P5Sketch = ({
  customFrameRate = 2,
  incFade = 3,
  maxBranchLengthLow = 25,
  maxBranchLengthHigh = 50,
  minRootLength = 10,
  rootCount = 12,
  branchIterations = 3,
  branchStrokeWeight = 0.9,
  containerRef,
  backgroundColor = "#ffffff",
  drawingColor = "#000000",
  customStrokeFunction = null,
  customClickFunction = null,
  customDrawFunction = null,
  rgbInc = [0, 0, 0],
  colorRange = 0,
  mode = 0,
  invertedFade = false,
}) => {
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });

  const strokeColorCurrent = useRef(0);
  const colorDirection = useRef(1);
  const drawingColorCoverted = useRef(0);

  const wrapWithTryCatch = (fn) => {
    return function (...args) {
      try {
        fn(...args);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
  };

  useEffect(() => {
    if (containerRef.current) {
      setContainerDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, [containerRef]);

  const isMouseInsideContainer = (p5, padding = 10) => {
    if (!containerRef.current) return false;

    const mouseX = p5.mouseX;
    const mouseY = p5.mouseY;

    const left = 0;
    const right = containerDimensions.width;
    const top = 0;
    const bottom = containerDimensions.height;

    return (
      mouseX > left - padding &&
      mouseX < right + padding &&
      mouseY > top - padding &&
      mouseY < bottom + padding
    );
  };

  const isHexColor = (color) => {
    return typeof color === "string" && color.startsWith("#");
  };

  const handleColorInput = (p5, colorInput) => {
    if (isHexColor(colorInput)) {
      return p5.color(colorInput);
    }
    return colorInput;
  };

  const setup = wrapWithTryCatch((p5) => {
    if (containerRef.current) {
      p5.createCanvas(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      ).parent(containerRef.current);
      const converted = handleColorInput(p5, drawingColor);

      p5.background(backgroundColor);
      p5.frameRate(customFrameRate);
      p5.strokeWeight(branchStrokeWeight);
      p5.stroke(converted);
      strokeColorCurrent.current = handleColorInput(p5, drawingColor);
      drawingColorCoverted.current = converted;
    }
  });

  const draw = wrapWithTryCatch((p5) => {
    if (!p5) return;
    if (customDrawFunction) {
      customDrawFunction(p5, isMouseInsideContainer(p5, 20));
    } else {
      if (isMouseInsideContainer(p5, 20)) {
        if (invertedFade) {
          p5.background(0, 0, 0, incFade);
        } else {
          p5.background(255, 255, 255, incFade);
        }
      }
    }
  });

  const changeColorStroke = wrapWithTryCatch((p5) => {
    let color = strokeColorCurrent.current;
    let direction = colorDirection.current;

    let r = p5.red(color);
    let g = p5.green(color);
    let b = p5.blue(color);

    r = r + rgbInc[0] * direction;
    g = g + rgbInc[1] * direction;
    b = b + rgbInc[2] * direction;

    r = p5.constrain(r, 0, 255);
    g = p5.constrain(g, 0, 255);
    b = p5.constrain(b, 0, 255);

    let newColor = p5.color(r, g, b);
    p5.stroke(newColor);
    strokeColorCurrent.current = newColor;

    let originalR = p5.red(drawingColorCoverted.current);
    let originalG = p5.green(drawingColorCoverted.current);
    let originalB = p5.blue(drawingColorCoverted.current);

    if (
      (rgbInc[0] !== 0 &&
        (r >= originalR + colorRange ||
          r <= originalR - colorRange ||
          r >= 255 ||
          r <= 0)) ||
      (rgbInc[1] !== 0 &&
        (g >= originalG + colorRange ||
          g <= originalG - colorRange ||
          g >= 255 ||
          g <= 0)) ||
      (rgbInc[2] !== 0 &&
        (b >= originalB + colorRange ||
          b <= originalB - colorRange ||
          b >= 255 ||
          b <= 0))
    ) {
      colorDirection.current *= -1;
    }
  });

  const handleMouseMovement = wrapWithTryCatch((p5, mouseX, mouseY) => {
    if (!p5) {
      console.error("p5 is undefined in handleMouseMovement");
      return;
    }

    if (customStrokeFunction) {
      customStrokeFunction(p5, isMouseInsideContainer(p5, 20), mouseX, mouseY);
    } else {
      try {
        if (mode === 0) {
          drawRoots(
            p5,
            mouseX,
            mouseY,
            rootCount,
            maxBranchLengthLow,
            maxBranchLengthHigh,
            minRootLength,
            branchIterations
          );
        } else if (mode === 1) {
          drawRightAngleLines(
            p5,
            mouseX,
            mouseY,
            rootCount,
            maxBranchLengthLow,
            maxBranchLengthHigh,
            minRootLength,
            branchIterations
          );
        } else if (mode === 2) {
          drawSpiralBranches(
            p5,
            mouseX,
            mouseY,
            rootCount,
            maxBranchLengthLow,
            maxBranchLengthHigh,
            minRootLength,
            branchIterations
          );
        }
      } catch (error) {
        console.error("An error occurred during mouse movement:", error);
      }
    }

    if (!(rgbInc[0] === 0 && rgbInc[1] === 0 && rgbInc[2] === 0)) {
      changeColorStroke(p5);
    }
  });

  const handleMouseClick = wrapWithTryCatch((p5, mouseX, mouseY) => {
    if (!p5) {
      console.error("p5 is undefined in handleMouseClick");
      return;
    }

    if (customClickFunction) {
      customClickFunction(p5, isMouseInsideContainer(p5, 20), mouseX, mouseY);
    } else if (customStrokeFunction) {
      return;
    } else {
      if (mode === 0) {
        drawRoots(
          p5,
          mouseX,
          mouseY,
          rootCount + 5,
          maxBranchLengthLow + 30,
          maxBranchLengthHigh + 30,
          minRootLength + 30,
          branchIterations + 2
        );
      } else if (mode === 1) {
        drawRightAngleLines(
          p5,
          mouseX,
          mouseY,
          rootCount + 5,
          maxBranchLengthLow + 30,
          maxBranchLengthHigh + 30,
          minRootLength + 30,
          branchIterations + 2
        );
      } else if (mode === 2) {
        drawSpiralBranches(
          p5,
          mouseX,
          mouseY,
          rootCount + 5,
          maxBranchLengthLow + 30,
          maxBranchLengthHigh + 30,
          minRootLength + 30,
          branchIterations + 2
        );
      }
    }
  });

  const mouseMoved = wrapWithTryCatch((p5) => {
    if (isMouseInsideContainer(p5, 20)) {
      handleMouseMovement(p5, p5.mouseX, p5.mouseY);
    }
  });

  const mouseDragged = wrapWithTryCatch((p5) => {
    if (isMouseInsideContainer(p5, 20)) {
      handleMouseMovement(p5, p5.mouseX, p5.mouseY);
    }
  });

  const mouseClicked = wrapWithTryCatch((p5) => {
    if (isMouseInsideContainer(p5, 20)) {
      handleMouseClick(p5, p5.mouseX, p5.mouseY);
    }
  });

  const windowResized = wrapWithTryCatch((p5) => {
    if (containerRef.current) {
      p5.resizeCanvas(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      );
      setContainerDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
    p5.background(backgroundColor);
  });

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      mouseMoved={mouseMoved}
      mouseDragged={mouseDragged}
      mouseClicked={mouseClicked}
    />
  );
};

export default P5Sketch;
