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
    <CanvasTrace/>
  );
};

export default MySketch;
```

### Props
`style` (optional)
- **Type:** object
- **Default:** { width: '100%', height: '400px' }
- **Description:** Defines the inline styles for the canvas container

`options` (optional)
- **Type:** object
- **Description:** A set of options to customize the drawing behavior. The full list of parameters is detailed below.

`customDrawFunction` (optional)
- **Type:** `function(p5, isMouseInside)`
- **Description:** A function to define custom drawing behavior - the behavior that affects the entire canvas on every frame (same as the p5.draw() function). It receives the p5 instance and a boolean indicating if the mouse is inside the canvas.

`customClickFunction` (optional)
- **Type:** `function(p5, isMouseInside, mouseX, mouseY)`
- **Description:** A function to define custom clicking behavior - the behavior that occurs after the mouse pointer is clicked. It receives the p5 instance, a boolean indicating if the mouse is inside the canvas, the x position of the mouse (relative to the canvas), and the y position of the mouse (also relative).

`CustomStrokeFunction` (optional)
- **Type:** `function(p5, isMouseInside, mouseX, mouseY)`
- **Description:** A function to define custom hovering behavior - the behavior that occurs after the mouse pointer is hovered or dragged. It receives the p5 instance, a boolean indicating if the mouse is inside the canvas, the x position of the mouse (relative to the canvas), and the y position of the mouse (also relative).


