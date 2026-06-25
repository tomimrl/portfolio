# Personal Web Portfolio

A high-performance, responsive single-page application (SPA) built to showcase my software engineering projects and technical profile.

## 🚀 Live Demo
[tomimrl.vercel.app](https://tomimrl.vercel.app/)

---

## 🛠️ Stack

- **Framework:** Next.js & React
- **Language:** TypeScript
- **Styles:** Tailwind CSS
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, React Three Fiber (`@react-three/fiber`) & React Three Drei (`@react-three/drei`)
- **Modeling:** Blender & 3ds Max

---

## ⚡ Features

### 1. Cinematic Hero and 3D Logo
- **Splash Screen:** Loading screen with classic terminal aesthetics (`./tomimrl`) synchronized with the browser's cookie state to avoid repeating the introduction in the same session.
- **Interactive Rendering:** A custom three-dimensional model loaded in an optimized lighting environment.
- **Scroll Physics:** The model rotates exactly according to the scroll position, using smooth interpolation to achieve a friction-free organic transition.

### 2. "About Me" Section with Advanced Scroll-Spy
- **3D Cinematics:** Text blocks enter tilted backward with reduced opacity, straightening as they cross the center of the *viewport*.
- **Blur Lens:** A fixed element with *glassmorphism* effect (`backdrop-blur`) and a CSS gradient mask that smoothly transitions the text output.

### 3. Stackable Project Cards
- **Case Studies:** Designed to house complex software developments, such as the 3D interactive web simulator, integrating three-dimensional game environments exported from Blender.
- **Clean Encapsulation:** Cards built with rounded corners and overflow isolation.

### 4. Bento Box Skills Grid
- **Organic Structure:** Matrix of skills organized in rows that calculate their expansion size randomly during the first render using dynamic flexbox.
- **Interactivity:** Advanced hover effect with hardware acceleration that generates an internal gradient glow in accent color and expands the card size smoothly.

---

## To test the portfolio in an environment that perfectly simulates production conditions:

### 1. Clone the repository and install dependencies:
`npm install`

### 2. Run the development environment:
`npm run dev`

### 3. Compile the project:
`npm run build`

### 4. Start the local production server:
`npm run start`
