export const drawRoots = (
  p5,
  x,
  y,
  rootCount,
  maxBranchLengthLow,
  maxBranchLengthHigh,
  minRootLength,
  branchIterations
) => {
  let numRoots = rootCount;
  let maxLength = p5.random(maxBranchLengthLow, maxBranchLengthHigh);

  for (let i = 0; i < numRoots; i++) {
    let angle = p5.random(p5.TWO_PI);
    let length = p5.random(minRootLength, maxLength);

    let xEnd = x + p5.cos(angle) * length;
    let yEnd = y + p5.sin(angle) * length;

    xEnd = p5.constrain(xEnd, 0, p5.width);
    yEnd = p5.constrain(yEnd, 0, p5.height);

    p5.line(x, y, xEnd, yEnd);

    // Call the drawBranch function from this file
    drawBranch(p5, xEnd, yEnd, angle, length, branchIterations);
  }
};

export const drawBranch = (p5, x, y, angle, length, depth) => {
  if (depth <= 0) return;

  let numBranches = p5.floor(p5.random(2, 4));
  let branchLength = length * p5.random(0.5, 0.8);

  for (let i = 0; i < numBranches; i++) {
    let branchAngle = angle + p5.random(-p5.PI / 6, p5.PI / 6);
    let xEnd = x + p5.cos(branchAngle) * branchLength;
    let yEnd = y + p5.sin(branchAngle) * branchLength;

    xEnd = p5.constrain(xEnd, 0, p5.width);
    yEnd = p5.constrain(yEnd, 0, p5.height);

    p5.line(x, y, xEnd, yEnd);

    // Recursively call drawBranch to create the tree-like structure
    drawBranch(p5, xEnd, yEnd, branchAngle, branchLength, depth - 1);
  }
};

export const drawRightAngleLines = (
  p5,
  x,
  y,
  lineCount,
  maxLineLengthLow,
  maxLineLengthHigh,
  minLineLength,
  iterations
) => {
  let numLines = lineCount;
  let maxLength = p5.random(maxLineLengthLow, maxLineLengthHigh);

  for (let i = 0; i < numLines; i++) {
    let length = p5.random(minLineLength, maxLength);
    let angle = p5.random([p5.HALF_PI, -p5.HALF_PI]);

    let xEnd = x + p5.cos(angle) * length;
    let yEnd = y + p5.sin(angle) * length;

    xEnd = p5.constrain(xEnd, 0, p5.width);
    yEnd = p5.constrain(yEnd, 0, p5.height);

    p5.line(x, y, xEnd, yEnd);

    drawRightAngleBranch(p5, xEnd, yEnd, angle, length, iterations);
  }
};

export const drawRightAngleBranch = (p5, x, y, angle, length, depth) => {
  if (depth <= 0) return;

  let numBranches = p5.floor(p5.random(2, 3));
  let branchLength = length * p5.random(0.5, 0.8);

  for (let i = 0; i < numBranches; i++) {
    let branchAngle = angle + p5.random([p5.HALF_PI, -p5.HALF_PI]);

    let xEnd = x + p5.cos(branchAngle) * branchLength;
    let yEnd = y + p5.sin(branchAngle) * branchLength;

    xEnd = p5.constrain(xEnd, 0, p5.width);
    yEnd = p5.constrain(yEnd, 0, p5.height);

    p5.line(x, y, xEnd, yEnd);

    drawRightAngleBranch(p5, xEnd, yEnd, branchAngle, branchLength, depth - 1);
  }
};

export const drawSpiralBranches = (
  p5,
  x,
  y,
  spiralCount,
  maxBranchLengthLow,
  maxBranchLengthHigh,
  minBranchLength,
  iterations
) => {
  let numSpirals = spiralCount;
  let maxLength = p5.random(maxBranchLengthLow, maxBranchLengthHigh);

  for (let i = 0; i < numSpirals; i++) {
    let angle = p5.random(p5.TWO_PI);
    let length = p5.random(minBranchLength, maxLength);

    let xEnd = x + p5.cos(angle) * length;
    let yEnd = y + p5.sin(angle) * length;

    xEnd = p5.constrain(xEnd, 0, p5.width);
    yEnd = p5.constrain(yEnd, 0, p5.height);

    p5.line(x, y, xEnd, yEnd);

    drawSpiralBranch(p5, xEnd, yEnd, angle, length, iterations);
  }
};

export const drawSpiralBranch = (p5, x, y, angle, length, depth) => {
  if (depth <= 0) return;

  let branchLength = length * p5.random(0.6, 0.9);
  let spiralFactor = p5.random(0.2, 0.5);

  let numBranches = p5.floor(p5.random(2, 4));

  for (let i = 0; i < numBranches; i++) {
    let branchAngle = angle + (spiralFactor * p5.PI) / 2;

    let xEnd = x + p5.cos(branchAngle) * branchLength;
    let yEnd = y + p5.sin(branchAngle) * branchLength;

    xEnd = p5.constrain(xEnd, 0, p5.width);
    yEnd = p5.constrain(yEnd, 0, p5.height);

    p5.line(x, y, xEnd, yEnd);

    drawSpiralBranch(p5, xEnd, yEnd, branchAngle, branchLength, depth - 1);
  }
};
