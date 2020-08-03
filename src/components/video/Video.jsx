import React, { useState, useRef } from "react";
import "./Video.scss";

import * as videoHandlers from "../../utils/videoHandlers";
const { onPlayingHandler, onEndedHandler, onPlayHandler, onPauseHandler } = videoHandlers;
export default function Video(props) {
  const [count, setCount] = useState(0);
  const [interval, setInterval2] = useState(null);
  const [progressInterval, setProgressInterval] = useState(false);
  let countRef = useRef();
  countRef.current = count;
  let intervalRef = useRef();
  intervalRef.current = interval;
  let progressIntervalRef = useRef();
  progressIntervalRef.current = progressInterval;
  let states = {
    count: countRef,
    setCount,
    interval: intervalRef,
    setInterval2,
    progressInterval: progressIntervalRef,
    setProgressInterval,
    setShowNextMovieControls: props.setShowNextMovieControls,
    id: props.id,
    user_id: props.user_id,
  };
  return (
    <video
      key={props.file}
      ref={props.giveRef}
      controls
      onPlay={() => {
        onPlayHandler(states);
      }}
      onPause={() => {
        onPauseHandler(states);
      }}
      onPlaying={(e) => {
        e.persist();
        onPlayingHandler(e, states);
      }}
      onEnded={() => {
        onEndedHandler(states);
      }}
      onLoadedMetadata={(event) => {
        event.target.currentTime = Math.floor(props.startTime);
      }}
    >
      <source src={require(`../../assets/entities/videos/${props.file}`)} type="video/mp4" />
    </video>
  );
}
