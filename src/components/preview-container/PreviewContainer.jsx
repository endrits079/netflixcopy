import React, { useEffect, useState,memo } from "react";
import "./PreviewContainer.scss";
import axios from "axios";
import { withRouter } from "react-router-dom";
function PreviewContainer(props) {
  const [files, setFiles] = useState({ image: "", video: "", name: "", render: false, hideImage: true });
  const [muted, setMuted] = useState(true);
  let history = props.history;
  let insideMovie = props.insideMovie;
  let formData = props.formData;
  useEffect(() => {
    axios.post("http://localhost/netflix/index.php", formData).then((response) => {
      if (response.data) {
        let movie;
        if (insideMovie) {
          movie = JSON.parse(response.data.movie);
        } else movie = response.data;
        setFiles({
          hideImage: true,
          image: movie.image.split("/")[2],
          video: movie.video.split("/")[2],
          name: movie.name,
          render: true,
        });
      } else {
        history.push("/404");
      }
    });
  }, [formData, insideMovie, history]);

  const muteToggle = () => {
    setMuted(oldMuted=>!oldMuted);
  };
  const showImage = () => {
    setFiles(prevFiles=>{return { ...prevFiles, hideImage: false }});
  };
  return (
    <div className="preview-container">
      {files.render ? (
        <>
          <img
            className="preview-image"
            alt={files.name}
            src={require(`../../assets/entities/thumbnails/${files.image}`)}
            hidden={files.hideImage}
          ></img>

          <video onEnded={showImage} className="preview-video" muted={muted} autoPlay hidden={!files.hideImage}>
            <source src={require(`../../assets/entities/previews/${files.video}`)} type="video/mp4"></source>
          </video>
        </>
      ) : null}

      <div className="preview-overlay">
        <div className="mainDetails">
          <h3>{files.name}</h3>

          <div className="video-controls">
            <button>
              <i className="fas fa-play"></i> Play
            </button>
            <button onClick={muteToggle}>{muted ? <i className="fas fa-volume-mute"></i> : <i className="fas fa-volume-up"></i>}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(withRouter(PreviewContainer));
