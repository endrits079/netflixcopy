import React, { useState, useEffect } from "react";
// import "./CategoryContainer.scss";
import axios from "axios";
import SingleSeasonContainer from "./single-season-container/SingleSeasonContainer";
import { withRouter } from "react-router-dom";
function SeasonContainer(props) {
  const [seasons, setSeasons] = useState([]);
  useEffect(() => {
    let formData = new FormData();
    formData.append("getMovie", true);
    formData.append("id", props.match.params.id);
    axios.post("http://localhost/netflix/index.php", formData).then((response) => {
      setSeasons(JSON.parse(response.data.seasons));
    });
  }, []);
  return (
    <div className="category-container">
      {seasons.length > 0
        ? seasons.map((season) => {
            return <SingleSeasonContainer key={season.season} season={season.season} data={season.data}></SingleSeasonContainer>;
          })
        : null}
    </div>
  );
}

export default withRouter(SeasonContainer);
