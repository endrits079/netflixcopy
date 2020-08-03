import axios from "axios";
const onPlayingHandler = (event, props) => {
  window.clearInterval(props.progressInterval);
  props.setProgressInterval(
    setInterval(() => {
      let formData = new FormData();
      formData.append("updateProgress", true);
      formData.append("time", event.target.currentTime);
      formData.append("user", props.user_id);
      formData.append("video", props.id);
      axios.post("http://localhost/netflix/index.php", formData);
    }, 3000)
  );
};
const onEndedHandler = (props) => {
  window.clearInterval(props.progressInterval);
  let formData = new FormData();
  formData.append("finishedVideo", true);
  formData.append("video", props.id);
  formData.append("user", props.user_id);
  axios.post("http://localhost/netflix/index.php", formData);
  props.setShowNextMovieControls(true);
};
const onPauseHandler = (props) => {
  clearInterval(props.interval);
  props.setInterval2(null);
};
const onPlayHandler = (props) => {
  if (props.count > 10) return;
  props.setInterval2(
    setInterval(() => {
      props.setCount((prevCount) => {
        return prevCount + 1;
      });

      if (props.count >= 10) {
        clearInterval(props.interval);
        props.setInterval2(null);
      }
    }, 1000)
  );
};
export { onEndedHandler, onPlayingHandler, onPlayHandler, onPauseHandler };
