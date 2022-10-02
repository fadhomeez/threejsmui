import React, { forwardRef } from "react"

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
        Insert About Text Here
        </p>

        <h1>Our Mission</h1>
        <p>What is our Mission</p>

        <h1>Our Vision</h1>
        <p>What is Our Vision</p>

      </div>
    </div>
    <div style={{ height: "200vh" }}>
      <div class="dot">
        <h1>Something Something</h1>
        <h1>Something else</h1>
      </div>
    </div>
    <div style={{ height: "200vh" }}>
      <div class="dot">
        <h1>Contact us to know more</h1>
        <p>123 456</p>
        contact@helloworld.com
      </div>
    </div>
    <span class="caption" ref={caption}>
      0.00
    </span>
  </div>
  
))

export default Overlay
