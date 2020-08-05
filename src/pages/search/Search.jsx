import React, { useState } from "react";
import axios from "axios";
import "./Search.scss";
import Input from "../../components/input/Input";
import cloneDeep from "lodash/cloneDeep";
import { handleChange } from "../../utils/inputHandlers";
import SearchResults from "../../components/search-results/SearchResults";
export default function Search() {
  const [searchResult,setSearchResult]=useState([]);
  const [inputs, setInputs] = useState({
    search: {
      type: "input",
      configs: {
        type: "search",
        value: "",
        name: "search",
        id: "search",
        placeholder: "Search for a movie",
        onChange: () => {
          handleChange(inputs, setInputs, cloneDeep);
        },
      },
    },
  });
  const submitHandler = (event) => {
    event.preventDefault();
    let search =cloneDeep(inputs);
    search.search.configs.value='';
    setInputs(search);
    const formData = new FormData();
    formData.append('searchMovie',true);
    formData.append('title',inputs.search.configs.value);
    axios.post('http://localhost/netflix/search.php',formData).then(response=>{
       if(response.data){
           setSearchResult(response.data);
       }
    })
  };
  return (
    <div className="search">
      <form onSubmit={submitHandler}>
        <Input {...inputs.search}></Input>
      </form>

      <SearchResults results={searchResult}></SearchResults>
    </div>
  );
}
