import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Extruder from "./components/Model";
import Overlay from "./components/Overlay";
import "./App.css";
import Navbar from "./ui-components/Navbar";
import Footer from "./ui-components/Footer";
export default function App() {
  const overlay = useRef();
  const caption = useRef();
  const scroll = useRef(0);
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Navbar />
        <Canvas
          shadows
          onCreated={(state) => state.events.connect(overlay.current)}
          raycaster={{
            computeOffsets: ({ clientX, clientY }) => ({
              offsetX: clientX,
              offsetY: clientY,
            }),
          }}
        >
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <Extruder scroll={scroll} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
        {/* <Footer /> */}
        <Overlay ref={overlay} caption={caption} scroll={scroll} />
      </div>
    </>
  );
}
