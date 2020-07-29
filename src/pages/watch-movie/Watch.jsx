import React, { useState, useEffect,useRef } from "react";
import "./Watch.scss";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
function Watch(props) {
  const [count, setCount] = useState(0);
  const [interval, setInterval2] = useState(null);
  let countRef = useRef();
  countRef.current=count;
  useEffect(() => {
    return () => {
      if (countRef.current >= 10) {
        let formData = new FormData();
        formData.append('updateViews',true);
        formData.append('id',props.match.params.id);
       axios.post('http://localhost/netflix/index.php',formData)
      } else {
        console.log("task failed ");
      }
      clearInterval(interval);
    };
  }, []);
  const onPauseHandler = () => {
    if (count > 10) {
      console.log("Video watched for 10 seconds");
    }
    clearInterval(interval);
    setInterval2(null);
  };
  const onPlayHandler = () => {
    console.log("video played");
    if (count > 10) return;
    setInterval2(
      setInterval(() => {
        setCount((prevCount) => {
          return prevCount + 1;
        });

        if (count >= 10) {
          console.log("Video was played for 10 seconds");
          clearInterval(interval);
          setInterval2(null);
        }
      }, 1000)
    );
  };
  return (
    <div className="watch">
      <video
        width={500}
        controls
        onPlay={() => {
          onPlayHandler();
        }}
        onPause={() => {
          console.log("video paused");
          onPauseHandler();
        }}
      >
        <source src={require("../../assets/entities/videos/1.mp4")} type="video/mp4" />
      </video>
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default withRouter(Watch);
