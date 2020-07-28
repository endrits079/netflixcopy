import React, { useEffect, useState } from "react";
import "./PreviewContainer.scss";
import axios from "axios";
export default function PreviewContainer(props) {
  const [files, setImage] = useState({ image: "", video: "", name: "", render: false, hideImage: true });
  const [muted, setMuted] = useState(true);
  useEffect(() => {
  
    axios.post("http://localhost/netflix/index.php", props.formData).then((response) => {
      setImage({
        hideImage:true,
        image: response.data.image.split("/")[2],
        video: response.data.video.split("/")[2],
        name: response.data.name,
        render: true,
      });
    });
  }, []);

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
