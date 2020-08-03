import axios from "axios";
const onPlayingHandler = (event, props) => {
  clearInterval(props.progressInterval.current);
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
  clearInterval(props.interval.current);
  props.setInterval2(null);
};
const onPlayHandler = (props) => {
  props.setInterval2(
    setInterval(() => {
      props.setCount((prevCount) => prevCount + 1);

      if (props.count.current >= 10) {
        console.log(props.count);
        let formData = new FormData();
        formData.append("updateViews", true);
        formData.append("id", props.id);
        axios.post("http://localhost/netflix/index.php", formData);
        clearInterval(props.interval.current);
        props.setInterval2(null);
      }
    }, 1000)
  );
};
export { onEndedHandler, onPlayingHandler, onPlayHandler, onPauseHandler };
