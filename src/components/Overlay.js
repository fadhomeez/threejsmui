import React, { forwardRef } from "react"
// import SimpleMap from "./SimpleMap"

const Overlay = forwardRef(({ caption, scroll }, ref) => (
  <div
    ref={ref}
    onScroll={(e) => {
      scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
      caption.current.innerText = scroll.current.toFixed(2)
    }}
    class="scroll">
    <div style={{ height: "400vh" }}>
      <div class="dot">
        <h1>About Us</h1>
        <p>
        Tech company incubated by
        NTUitive and supported by ESG Singapore.

        We focus on creating virtualization tools,
        to accelerate the process of bringing products
        and services into the virtual space
        </p>

        <h1>Our Mission</h1>
        <p>Create conventional 3D virtualization tools for the masses</p>

        <h1>Our Vision</h1>
        <p>To Pave the way for a massively virtualized world</p>

      </div>
    </div>
    <div style={{ height: "200vh" }}>
      <div class="dot">
        <h1>Investing in the future</h1>
        <h1>Democratizing Virtualization</h1>
      </div>
    </div>
    <div style={{ height: "200vh" }}>
      <div class="dot">
        <h1>Contact us to know more</h1>
        <p>105 Cecil Street 22-00, Suite 2226 The Octagon, 069534</p>
        contact@paratlas.sg
        {/* <div class="map">
        <SimpleMap />
        </div> */}
      </div>
    </div>
    <span class="caption" ref={caption}>
      0.00
    </span>
  </div>
  
))

export default Overlay
