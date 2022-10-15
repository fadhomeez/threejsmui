import { useState, useEffect, useRef } from "react";

//css stuff
import "./SideUI.css";

//mui stuff
import { Grid } from "@mui/material";

//React Parallax Tilt npm
import Tilt from "react-parallax-tilt";

//framer-motion
import { motion, useScroll, useSpring } from "framer-motion";

//pngs
import jiji from "../png/jiji.png";
import eye from "../png/eye.png";

const SideUI = () => {
  const [rotate, setRotate] = useState(false);
  const [move, setMove] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  //element 11: reactive scrollbar on top, see SideUI.css
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  //functions that control state, not by sequence
  const handleAnimations = () => {
    setRotate(!rotate);
    setMove(!move);
  };

  console.log(mousePosition);
  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
    },
  };
  return (
    <>
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
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
        </div>

        <div className="flip-container">
          <div className="flip-this">
            <img
              width="100"
              alt="Godot icon"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Godot_icon.svg/512px-Godot_icon.svg.png"
            />
          </div>
        </div>

        <h3>Framer Motion Below</h3>

        {""}

        <motion.div
          className="box4"
          animate={{ rotate: rotate ? 180 : 0, x: move ? 200 : -200 }}
          onClick={handleAnimations}
        >
          Framer Motion Rotate & Move
        </motion.div>

        <motion.div
          className="box5"
          animate={{ rotate: rotate ? 180 : 0, x: move ? 200 : -200 }}
          transition={{ type: "tween", duration: 1 }}
          onClick={handleAnimations}
        >
          Framer Motion Tweening
        </motion.div>

        <motion.div
          className="box6"
          animate={{ x: move ? 200 : -200 }}
          transition={{ type: "spring", bounce: 0.6 }}
          onClick={handleAnimations}
        >
          Framer Motion Transition Spring Type with Bounce
        </motion.div>

        <motion.div
          className="box8"
          animate={{
            rotate: [0, 0, 270, 270, 0],
            scale: [1, 2, 2, 1, 1],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{ repeat: Infinity, duration: 3, delay: 1 }}
        >
          Framer Motion KeyFrames
        </motion.div>

        <motion.div
          className="box7"
          drag
          whileDrag={{ scale: 1.1 }}
          dragConstraints={{ left: 50, right: 50, top: 50, bottom: 50 }}
        >
          Framer Motion Drag property / WhileDrag
        </motion.div>

        <motion.div className="cursor" variants={variants} animate="default" />
      </Grid>
    </>
  );
};

export default SideUI;
