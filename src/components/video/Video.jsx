import React from "react";
import "./Video.scss";

import * as videoHandlers from "../../utils/videoHandlers";
const { onPlayingHandler, onEndedHandler,onPlayHandler,onPauseHandler } = videoHandlers;
export default function Video(props) {
  return (
    <video key={props.file}
      ref={props.giveRef}
      controls
      onPlay={() => {
        onPlayHandler(props);
      }}
      onPause={() => {
        onPauseHandler(props);
      }}
      onPlaying={(e) => {
        e.persist();
        onPlayingHandler(e, props);
      }}
      onEnded={() => {
        onEndedHandler(props);
      }}
      onLoadedMetadata={(event) => {
        event.target.currentTime = Math.floor(props.startTime);
      }}
    >
      <source src={require(`../../assets/entities/videos/${props.file}`)} type="video/mp4" />
    </video>
  );
}
