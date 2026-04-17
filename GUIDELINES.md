# Development Guidelines

## Naming Conventions

This document outlines the naming conventions used across the É Collective landing page project to ensure consistency, readability, and maintainability.

## JavaScript/TypeScript Conventions

### Variables and Functions

- **camelCase**: Use camelCase for all variable names and function declarations
  ```javascript
  const fingerPos = { x: 0, y: 0, active: false };
  let currentVariationIndex = 0;
  function initThree() { ... }
  ```

### Constants

- **UPPER_SNAKE_CASE**: Use uppercase with underscores for constants that should not be reassigned
  ```javascript
  const CONFIG = {
    segmentsX: 60,
    segmentsY: 40,
    color: 0xe0e6ed,
  };
  ```

### DOM Elements

- **kebab-case for IDs**: Use kebab-case for HTML element IDs
  ```html
  <div id="loading">Initialising Neural Fabric...</div>
  <canvas id="mesh-canvas"></canvas>
  <video id="webcam" autoplay playsinline></video>
  ```
- **camelCase for references**: Use camelCase when referencing DOM elements in JavaScript
  ```javascript
  const canvas = document.getElementById("mesh-canvas");
  const videoElement = document.getElementById("webcam");
  ```

### Event Handlers

- **onAction**: Prefix event handler functions with "on"
  ```javascript
  function onResults(results) { ... }
  ```

### Initialization Functions

- **init + Feature**: Prefix initialization functions with "init" followed by feature name
  ```javascript
  function initThree() { ... }
  function initMediaPipe() { ... }
  ```

## HTML/CSS Conventions

### CSS Classes

- **kebab-case**: Use kebab-case for all CSS class names
  ```css
  .nav-links { ... }
  .content-grid { ... }
  .donate-btn { ... }
  ```

### CSS Custom Properties (CSS Variables)

- **kebab-case**: Use kebab-case for CSS custom properties
  ```css
  --white: #ffffff;
  --accent-white: #e0e6ed;
  --global-font: "Atkinson Hyperlegible", sans-serif;
  ```

### File Naming

- **kebab-case**: Use kebab-case for all file names
  - `index.html`
  - `styles.css`
  - `scripts.js`

### IDs vs Classes

- **IDs**: Use for unique elements that are targeted by JavaScript
  ```html
  <div id="logo-text">É Collective</div>
  <span id="philosophy">...</span>
  ```
- **Classes**: Use for reusable styling and behavioral patterns
  ```html
  <div class="card">...</div>
  <nav class="nav-links">...</nav>
  ```

## Configuration and Data Structures

### Configuration Objects

- **CONFIG**: Use uppercase for main configuration objects
  ```javascript
  const CONFIG = {
    segmentsX: 60,
    segmentsY: 40,
    waveSpeed: 1.0,
    waveHeight: 0.5,
  };
  ```

### Arrays and Collections

- **plural nouns**: Use plural nouns for arrays
  ```javascript
  const logoVariations = ["É Collective", "É Studios", "É Space"];
  elevationData = new Float32Array(geometry.attributes.position.count).fill(0);
  ```

## Animation and Interaction

### Animation State Variables

- **descriptive boolean names**: Use descriptive names for boolean state variables
  ```javascript
  let isDeleting = false;
  fingerPos.active = true;
  ```

### Timing Variables

- **descriptive suffixes**: Use descriptive suffixes for timing-related variables
  ```javascript
  let charIndex = 0;
  const speed = isDeleting ? 30 : 40;
  ```

## Three.js Specific Conventions

### Three.js Objects

- **camelCase**: Use camelCase for Three.js objects
  ```javascript
  let scene, camera, renderer, mesh;
  let worldWidth, worldHeight;
  ```

### Geometry and Material Properties

- **camelCase**: Use camelCase for geometry and material properties
  ```javascript
  const geometry = new THREE.PlaneGeometry(worldWidth, worldHeight);
  const material = new THREE.MeshBasicMaterial({
    color: CONFIG.color,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  ```

## Code Organization

### Comments

- **section headers**: Use section comments with descriptive headers and separators
  ```javascript
  /* --- THREE.JS & MEDIAPIPE LOGIC --- */
  /* --- TYPEWRITER ANIMATION FOR LOGO --- */
  /* --- MOBILE MENU NAVIGATION LOGIC --- */
  ```

### Function Grouping

- Group related functions together with clear section headers
- Keep initialization functions together
- Separate animation logic from setup code

## Date Format Conventions

- **DD MMM YYYY**: Use day, 3-letter month abbreviation, and year format for all dates
  - Examples: `11 Feb 2026`, `25 Dec 2024`, `01 Jan 2025`
  - Use in comments, commit messages, and documentation where dates are needed
  - Format: `DD [Month] YYYY` where Month is one of: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec

## Best Practices

1. **Be descriptive**: Use names that clearly describe what the variable or function does
2. **Be consistent**: Stick to the established patterns throughout the codebase
3. **Avoid abbreviations**: Use full words unless abbreviations are universally understood
4. **Use meaningful prefixes**: Use prefixes like `is`, `has`, `can` for boolean variables
5. **Keep it simple**: Don't over-engineer names - clarity over cleverness
6. **Follow date standards**: Always use DD MMM YYYY format for consistency

## Examples

✅ **Good:**

```javascript
const brushRadius = 7.0;
const fingerPos = { x: 0, y: 0, active: false };
function initThree() { ... }
```

❌ **Avoid:**

```javascript
const br = 7.0;
const fp = { x: 0, y: 0, a: false };
function threeInit() { ... }
```

Following these conventions will ensure the codebase remains readable, maintainable, and consistent across all contributors.
