import React, { useState } from "react";
import "./Form.scss";
import Input from "../input/Input";
import cloneDeep from "lodash/cloneDeep";
import { handleChange } from "../../utils/inputHandlers";
import { connect } from "react-redux";
import Axios from "axios";

function ProfileForm(props) {
  const [inputs, setInputs] = useState({
    first_name: {
      type: "input",
      configs: {
        type: "text",
        value: props.user.name || "",
        name: "first_name",
        id: "first_name",
        placeholder: "first name",
        onChange: () => {
          handleChange(inputs, setInputs, cloneDeep);
        },
      },
      label: "First Name",
    },
    last_name: {
      type: "input",
      configs: {
        type: "text",
        value: props.user.last_name || "",
        name: "last_name",
        id: "last_name",
        placeholder: "last name",
        onChange: () => {
          handleChange(inputs, setInputs, cloneDeep);
        },
      },
      label: "Last Name",
    },
    username: {
      type: "input",
      configs: {
        type: "text",
        value: props.user.username || "",
        name: "username",
        id: "username",
        placeholder: "username",
        onChange: () => {
          handleChange(inputs, setInputs, cloneDeep);
        },
      },
      label: "Username",
    },
    email: {
      type: "input",
      configs: {
        type: "email",
        value: props.user.email || "",
        name: "email",
        id: "email",
        placeholder: "email",
        onChange: () => {
          handleChange(inputs, setInputs, cloneDeep);
        },
      },
      label: "E-mail",
    },

    submit: {
      type: "input",
      configs: {
        type: "submit",
        value: "Update",
        id: "submit_profile",
      },
    },
  });

  const submitHandler = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("updateProfile", true);
    formData.append("first_name", inputs.first_name.configs.value);
    formData.append("last_name", inputs.last_name.configs.value);
    formData.append("username", inputs.username.configs.value);
    formData.append("email", inputs.email.configs.value);
    formData.append('user_id',props.user.id);
    Axios.post("http://localhost/netflix/update.php", formData).then(response=>{
        console.log(response.data);
    });
  };
  return (
    <form onSubmit={submitHandler} className="form">
      <Input type={inputs.first_name.type} label={inputs.first_name.label} configs={inputs.first_name.configs}></Input>
      <Input type={inputs.last_name.type} label={inputs.last_name.label} configs={inputs.last_name.configs}></Input>
      <Input type={inputs.username.type} label={inputs.username.label} configs={inputs.username.configs}></Input>
      <Input type={inputs.email.type} label={inputs.email.label} configs={inputs.email.configs}></Input>
      <Input type={inputs.submit.type} configs={inputs.submit.configs}></Input>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.login,
  };
};

export default connect(mapStateToProps)(ProfileForm);
