import React, { useState, useEffect, useRef,createRef } from "react";
import "./Watch.scss";
import * as actionTypes from "../../store/actions/actionTypes";
import { withRouter, Link } from "react-router-dom";
import BackButton from "../../components/back-button/BackButton";
import { connect } from "react-redux";
import axios from "axios";
function Watch(props) {
  const [count, setCount] = useState(0);
  const [interval, setInterval2] = useState(null);
  const [video, setVideo] = useState(null);
  const [showBack, setShowBack] = useState(true);
  const [progressInterval, setProgressInterval] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const[nextMovie,setNextMovie] = useState(null);
  const [showNextMovieControls,setShowNextMovieControls] = useState(false);
  let countRef = useRef();
  let videoRef = createRef();
  countRef.current = count;
  useEffect(() => {
    return () => {
      if (countRef.current >= 10) {
        let formData = new FormData();
        formData.append("updateViews", true);
        formData.append("id", props.match.params.id);
        axios.post("http://localhost/netflix/index.php", formData);
      }
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!props.username) {
      props.changeUrl(props.history.location.pathname);
      props.history.push("/login");
    } else {
      let formData = new FormData();
      formData.append("getVideo", true);
      formData.append("id", props.match.params.id);
      axios.post("http://localhost/netflix/index.php", formData).then((response) => {
        if (response.data) {
          let file = response.data.filePath.split("/")[2];
          let fetchedMovie= response.data;
          fetchedMovie.file=file;
          setVideo(fetchedMovie);
          let nextMovieForm = new FormData();
          nextMovieForm.append('getNextVideo',true);
          nextMovieForm.append('title',response.data.title);
          nextMovieForm.append('season',response.data.season);
          nextMovieForm.append('episode',response.data.episode);
          nextMovieForm.append('entity',response.data.entityId);
          nextMovieForm.append('id',response.data.id);
          axios.post('http://localhost/netflix/index.php',nextMovieForm).then(response=>{
            setNextMovie(response.data);
          })
        } else {
          props.history.push("/404");
        }
      });
      let formData2 = new FormData();
      formData2.append("getProgress", true);
      formData2.append("user", props.user_id);
      formData2.append("video", props.match.params.id);
      axios.post("http://localhost/netflix/index.php", formData2).then((response) => {
        if (response.data) {
          setStartTime(response.data.startTime);
        }
      });
    }
  }, [props.match.params.id]);

  const onPauseHandler = () => {
    clearInterval(interval);
    setInterval2(null);
  };
  const onPlayHandler = () => {
    if (count > 10) return;
    setInterval2(
      setInterval(() => {
        setCount((prevCount) => {
          return prevCount + 1;
        });

        if (count >= 10) {
          clearInterval(interval);
          setInterval2(null);
        }
      }, 1000)
    );
  };
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
      {video? (
        <>
          {showBack ? <BackButton>{video.title}</BackButton> : null}
          {showNextMovieControls? <div className="video-controls">
             <button onClick={()=>{
               videoRef.current.play();
             }} title='replay'><i className="fas fa-redo"></i></button>
             <div className="next-video">
               <h3>Next video:</h3>
               <h4>{nextMovie.title}</h4>
               <h5>Season {nextMovie.season},episode {nextMovie.episode}</h5>
               <Link to={`/watch/${nextMovie.id}`}><i className="fas fa-play"></i>Play</Link>
             </div>
           </div>:null}
          
          <video ref={videoRef}
            controls
            onPlay={() => {
              onPlayHandler();
            }}
            onPause={() => {
              onPauseHandler();
            }}
            onPlaying={(event) => {
              event.persist();
              window.clearInterval(progressInterval);
              setProgressInterval(
                setInterval(() => {
                  let formData = new FormData();
                  formData.append("updateProgress", true);
                  formData.append("time", event.target.currentTime);
                  formData.append("user", props.user_id);
                  formData.append("video", props.match.params.id);
                  axios.post("http://localhost/netflix/index.php", formData);
                }, 3000)
              );
            }}
            onEnded={() => {
              window.clearInterval(progressInterval);
              let formData = new FormData();
              formData.append("finishedVideo", true);
              formData.append("video", props.match.params.id);
              formData.append("user", props.user_id);
              axios.post("http://localhost/netflix/index.php", formData);
              setShowNextMovieControls(true);
            }}
            onLoadedMetadata={(event) => {
              event.target.currentTime = Math.floor(startTime);
            }}
          >
            <source src={require(`../../assets/entities/videos/${video.file}`)} type="video/mp4" />
          </video>
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
