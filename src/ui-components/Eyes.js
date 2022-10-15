import { useState, useEffect, useRef } from "react";

//css stuff
import "./Eyes.css";

const Eyes = () => {
  const container = document.querySelector(".ufo");
  const eyeball = document.querySelector(".eyes");

  function moveEyeball(e) {
    const x_cursor = e.pageX;
    const y_cursor = e.pageY;
    const rect = eyeball.getBoundingClientRect(); //the rectangle perimeter that bounds the eyes
    const x_eyeball = rect.left + rect.width / 2;
    const y_eyeball = rect.top + rect.height / 2; //get the center coordinates
    const angle =
      -Math.atan2(x_cursor - x_eyeball, y_cursor - y_eyeball) *
        (180 / Math.PI) -
      180; //trigo to get the angle from eyeball to cursor
    eyeball.style.transform = `rotate(${angle}deg)`;
  }
  container.addEventListener("mousemove", moveEyeball);

  return (
    <div className="ufo">
      <div className="monster" style={{ color: "gray" }}>
        <div className="body">
          <div className="ear"></div>
          <div className="ear"></div>
          <div className="vampi-mouth">
            <div className="vampi-tooth"></div>
          </div>
        </div>
        <div className="eye-lid">
          <div className="eyes">
            <div className="eye"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eyes;
