import React from "react";

//css stuff
import "./SideUI.css";

//mui stuff
import { Grid } from "@mui/material";

//React Parallax Tilt npm
import Tilt from "react-parallax-tilt";

const SideUI = () => {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <div className="container">
          <div className="box two">
            <p>ease-in</p>
          </div>
        </div>

        <div className="element">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non aut,
          quisquam iusto eaque nobis perferendis ad quos, laudantium laboriosam
          nostrum quibusdam, illo ea inventore quidem!
        </div>

        <Tilt>
          <div className="box2">
            <h1>React Parallax Tilt 👀</h1>
          </div>
        </Tilt>

        <div className="box3">
          <h1>Panasonic UI inspired???</h1>
          <div className="box3">hello</div>
        </div>

        <div class="flip-container">
          <div class="flip-this">
            <img
              width="100"
              alt="Godot icon"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Godot_icon.svg/512px-Godot_icon.svg.png"
            />
          </div>
        </div>
      </Grid>
    </>
  );
};

export default SideUI;
