# landing-page
This is the main page of É Collective.

An interactive landing page featuring a real-time, gesture-controlled Three.js background powered by MediaPipe computer vision.


Tech Stack3D Engine: 

  Three.js (WebGL)
  AI/CV: MediaPipe Hands (Landmark tracking)
  UI: HTML5, CSS3 (Glassmorphism & Grid)

  
Core Features

  Gesture Interaction: Tracks index finger (Landmark 8) to deform a 3D wireframe mesh in real-time.
  Procedural Animation: Combines sine-wave math with a manual elevation "decay" system for fluid, tactile ripples.
  Responsive UX: Fully fluid layout with custom "Neural Initialisation" loading states.


Technical Logic

The "Neural Fabric" manipulates the Z attribute of PlaneGeometry vertices using a sum of sine waves and user-input data:
                            pos[z] = \sin(x, y, t) + elevationData
