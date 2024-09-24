## Tracing Canvas
A reusable React component that allows you to create interactive p5.js sketches. The Tracing Canvas will enable you to dynamically trace patterns based on mouse movements and click interactions and customize how the drawing behaves. This package can create interactive and visually engaging canvases for web apps running on React (Next.js integration coming soon).
### Summary
The Tracing Canvas is a React component built on top of p5.js and react-p5. It provides an easy way to integrate custom sketching and drawing patterns into a React/Next.js project.

### NPM link
https://www.npmjs.com/package/tracing-canvas

### Features
- **Dynamic Drawing Patterns:** The module includes prebuilt patterns such as roots, right-angle lines, and spiral branches drawn as the mouse moves.
- **Customizable Behavior:** You can define custom click, draw, and drag (on mouse movement) functions
- **Customizable Drawing Parameters:** You can control frame rates, stroke weights, colors, and branch lengths.
- **Overlay Support** - Any other React components can be layered on top of the canvas using the `children` prop.
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

`children` (optional)
- **Type:** ReactNode
- **Description:** Any child elements rendered on top of the canvas.

### Options
The `options` object allows you to fine-tune the sketch's behavior. Below is a list of supported parameters and their descriptions.

| Parameter              | Type          | Default   | Description                                                                                 |
|------------------------|---------------|-----------|---------------------------------------------------------------------------------------------|
| `customFrameRate`       | `number`      | `2`       | Sets the frame rate for the sketch. Frame rate is the amount of times the draw function is called per second |
| `incFade`              | `number`      | `3`       | Controls the increment fade effect on the canvas background. The higher the value the higher the fade you get per frame  |
| `maxBranchLengthLow`    | `number`      | `25`      | Minimum value for the random range used for calculating the maximum branch length.                                   |
| `maxBranchLengthHigh`   | `number`      | `50`      | Maximum value for the random range used for calculating the maximum branch length.                                   |
| `minRootLength`         | `number`      | `10`      | Minimum possible length for the roots drawn on the canvas.                                            |
| `rootCount`             | `number`      | `12`      | Number of root lines generated during a draw.                                                |
| `branchIterations`      | `number`      | `3`       | Number of iterations for drawing branches off of the roots.                                  |
| `branchStrokeWeight`    | `number`      | `0.9`     | Stroke weight used when drawing (line width).                                                     |
| `backgroundColor` | `string` | `#ffffff` | The background color of the canvas (supports hex, RGB, or named color formats like "blue").     |
| `drawingColor`          | `string`      | `#000000` | The color of the drawing.                                                            |
| `rgbInc`                | `array`       | `[0, 0, 0]` | An array that specifies the RGB increments for changing the stroke color. For each frame, the stroke color's RGB values will adjust based on `rgbInc`. For example, `[1, 0, 0]` increases the red value by 1 per frame.|
| `colorRange`            | `number`      | `0`       | The threshold for color change. When the color has changed by this amount from the original drawing color, the `rgbInc` direction will reverse, gradually reducing the color until it reaches `drawingColor` - `colorRange`                                             |
| `mode`                  | `number`      | `0`       | Selects between preset drawing functions: `0` for roots, `1` for right angles, `2` for spirals.            |
| `invertedFade`          | `boolean`     | `false`   | If `true`, inverts the fade effect by using black instead of white for the fade color. Useful for dark backgrounds       |

You can pass these options into the component as shown below:

```jsx
<CanvasTrace
  options={{
    customFrameRate: 4,
    maxFade: 5,
    drawingColor: '#FF5733',
    mode: 1
  }}
/>
```
### Demonstration
![BrancingCanvas 2](https://github.com/user-attachments/assets/ae582f3b-347f-4b8a-8823-922e437ddc77)



### Related Dependencies
- **p5.js** - A library for creating interactive visuals with code.
- **react-p5** - A React wrapper for p5.js.
- **react** - Peer dependency required to run the module.
- **react-dom** - Peer dependency required to run the module.

### Peer Dependencies
You need to ensure that the following peer dependencies are installed in your project:
- `react >= 17.0.1`
- `react-dom >= 17.0.1`

### License
This project is licensed under the MIT License -  see the [LICENSE](https://github.com/Danailnd/tracing-canvas/blob/main/LICENSE) file for details.

### Author
Danail Dimitrov
