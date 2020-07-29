import React, { useEffect, useState } from "react";
import "./PreviewContainer.scss";
import axios from "axios";
import { withRouter } from "react-router-dom";
function PreviewContainer(props) {
  const [files, setImage] = useState({ image: "", video: "", name: "", render: false, hideImage: true });
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    axios.post("http://localhost/netflix/index.php", props.formData).then((response) => {
      if (response.data) {
        let movie;
        if(props.insideMovie){
         movie = JSON.parse(response.data.movie);
        }
        else  movie=response.data;
        setImage({
          hideImage: true,
          image: movie.image.split("/")[2],
          video: movie.video.split("/")[2],
          name: movie.name,
          render: true,
        });
      } else {
       props.history.push('/404');
      }
    });
  }, [props.formData]);

  const muteToggle = () => {
    setMuted(!muted);
  };
  const showImage = () => {
    setImage({ ...files, hideImage: false });
  };
  return (
    <div className="preview-container">
      {files.render ? (
        <img
          className="preview-image"
          alt={files.name}
          src={require(`../../assets/entities/thumbnails/${files.image}`)}
          hidden={files.hideImage}
        ></img>
      ) : null}

      {files.render ? (
        <video onEnded={showImage} className="preview-video" muted={muted} autoPlay hidden={!files.hideImage}>
          <source src={require(`../../assets/entities/previews/${files.video}`)} type="video/mp4"></source>
        </video>
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

export default withRouter(PreviewContainer);
