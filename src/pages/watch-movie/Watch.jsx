import React, { useState, useEffect, createRef } from "react";
import "./Watch.scss";
import * as actionTypes from "../../store/actions/actionTypes";
import { withRouter} from "react-router-dom";
import BackButton from "../../components/back-button/BackButton";
import { connect } from "react-redux";
import Video from "../../components/video/Video";
import axios from "axios";
function Watch(props) {
  console.log('Inside Watch');
  const [showBack, setShowBack] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [nextMovie, setNextMovie] = useState(null);
  const [showNextMovieControls, setShowNextMovieControls] = useState(false);
  const [video, setVideo] = useState(null);

  let videoRef = createRef();
  let id = props.match.params.id;
  let user_id = props.user_id;
  let history=props.history;
  let username = props.username;
  let changeUrl = props.changeUrl;
  useEffect(() => {
    if (!username) {
     changeUrl(history.location.pathname);
      history.push("/login");
    } else {
      let formData = new FormData();
      formData.append("getVideo", true);
      formData.append("id", id);
      axios.post("http://localhost/netflix/index.php", formData).then((response) => {
        if (response.data) {
          let file = response.data.filePath.split("/")[2];
          let fetchedMovie = response.data;
          fetchedMovie.file = file;
          setVideo(fetchedMovie);
          let nextMovieForm = new FormData();
          nextMovieForm.append("getNextVideo", true);
          nextMovieForm.append("title", response.data.title);
          nextMovieForm.append("season", response.data.season);
          nextMovieForm.append("episode", response.data.episode);
          nextMovieForm.append("entity", response.data.entityId);
          nextMovieForm.append("id", response.data.id);
          axios.post("http://localhost/netflix/index.php", nextMovieForm).then((response) => {
            setNextMovie(response.data);
          });
        } else {
          history.push("/404");
        }
      });
      let formData2 = new FormData();
      formData2.append("getProgress", true);
      formData2.append("user", user_id);
      formData2.append("video",id);
      axios.post("http://localhost/netflix/index.php", formData2).then((response) => {
        if (response.data) {
          setStartTime(response.data.startTime);
        }
      });
    }
  }, [id,history,user_id,username,changeUrl]);

  let timeout = null;
  return (
    <div
      className="watch"
      onMouseMove={() => {
        setShowBack(true);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setShowBack(false);
        }, 2000);
      }}
    >
      {video ? (
        <>
          {showBack ? <BackButton>{video.title}</BackButton> : null}
          {showNextMovieControls ? (
            <div className="video-controls">
              <button
                onClick={() => {
                  videoRef.current.play();
                }}
                title="replay"
              >
                <i className="fas fa-redo"></i>
              </button>
              <div className="next-video">
                <h3>Next video:</h3>
                <h4>{nextMovie.title}</h4>
                <h5>
                  Season {nextMovie.season},episode {nextMovie.episode}
                </h5>
                <button
                  onClick={() => {
                    props.history.push(`/watch/${nextMovie.id}`);
                    setShowNextMovieControls(false);
                  }}
                >
                  <i className="fas fa-play"></i>Play
                </button>
              </div>
            </div>
          ) : null}

          <Video
            giveRef={videoRef}
            startTime={startTime}
            id={props.match.params.id}
            setShowNextMovieControls={setShowNextMovieControls}
            user_id={props.user_id}
            file={video.file}
          ></Video>
        </>
      ) : null}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    user_id: state.login.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeUrl: (url) => dispatch({ type: actionTypes.CHANGE_URL, location: url }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Watch));
