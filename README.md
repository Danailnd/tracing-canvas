## Tracing Canvas
A reusable React component that allows you to create interactive p5.js sketches. The Tracing Canvas will enable you to dynamically trace patterns based on mouse movements and click interactions and customize how the drawing behaves. This package can create interactive and visually engaging canvases for web apps running on React (Next.js integration coming soon).
### Summary
The Tracing Canvas is a React component built on top of p5.js and react-p5. It provides an easy way to integrate custom sketching and drawing patterns into a React/Next.js project.

### Features
- **Dynamic Drawing Patterns:** The module includes prebuilt patterns such as roots, right-angle lines, and spiral branches drawn as the mouse moves.
- **Customizable Behavior:** You can define custom click, draw, and drag (on mouse movement) functions
- **Customizable Drawing Parameters:** You can control frame rates, stroke weights, colors, and branch lengths.
- **Embedding Support** - Any other components can be embedded on top of the canvas.
- **Responsive Canvas:** The canvas resizes dynamically with the browser window.

### How To Use

#### Installation
First, add the tracing-canvas module to your project:

```bash
npm install tracing-canvas
```

You also need React installed:
```bash
npm install react react-dom
```
#### Basic Usage
```jsx


import React from "react";
import CanvasTrace from "tracing-canvas";

const MySketch = () => {
  return (
    <CanvasTrace
      style={{ width: "100%", height: "500px" }}
      options={{ rootCount: 15, branchIterations: 5, mode: 2 }}
    />
  );
};

export default MySketch;

