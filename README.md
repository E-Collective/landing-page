# Landing Page

Welcome to the main page of É Collective! This interactive landing page features a real-time, gesture-controlled Three.js background powered by MediaPipe computer vision.

## Tech Stack

- **3D Engine:**
  - Three.js (WebGL)
- **AI/CV:**
  - MediaPipe Hands (Landmark tracking)
- **UI:**
  - HTML5, CSS3 (Glassmorphism & Grid)

## Core Features

- **Gesture Interaction:**
  - Tracks index finger (Landmark 8) to deform a 3D wireframe mesh in real-time.
- **Procedural Animation:**
  - Combines sine-wave math with a manual elevation "decay" system for fluid, tactile ripples.
- **Responsive UX:**
  - Fully fluid layout with custom "Neural Initialisation" loading states.

## Technical Logic

The "Neural Fabric" manipulates the Z attribute of PlaneGeometry vertices using a sum of sine waves and user-input data:

```javascript
pos[z] = \sin(x, y, t) + elevationData
```

## Branching Workflow

Our project follows a structured branching workflow to ensure smooth collaboration and deployment:

- **Individual Working Branches:**
  - Each team member works on their own branch to develop and test changes independently.
  - Branch names should follow the convention: `<team-member-name>`.

- **Development Branch (`dev`):**
  - All changes are merged into the `dev` branch after review.
  - This branch serves as the integration point for all team members' work.

- **Main Branch (`main`):**
  - The `main` branch is connected to the CI/CD pipeline for automatic deployment.
  - Only thoroughly tested and approved changes from `dev` are merged into `main`.

### Workflow Summary

1. Create a new branch from `dev` with your name.
2. Commit and push changes to your branch regularly.
3. Open a pull request to merge your branch into `dev`.
4. After review and testing, merge `dev` into `main` for deployment.
