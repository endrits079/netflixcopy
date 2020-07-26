import React, { useState } from "react";
import "./Form.scss";
import cloneDeep from "lodash/cloneDeep";
import Input from "../input/Input";
import axios from "axios";
import Feedback from "../feedback/Feedback";
const handleChange = (inputs, setInputs) => {
  let event = window.event;
  const clonedInput = cloneDeep(inputs[event.target.name]);
  clonedInput.configs.value = event.target.value;
  setInputs((prevInputs) => {
    return {
      ...prevInputs,
      [event.target.name]: clonedInput,
    };
  });
};
export default function RegisterForm() {
  const [showFeedback, setShowFeedback] = useState({ show: false, message: "", succeed: false });
  const [inputs, setInputs] = useState({
    first_name: {
      type: "input",
      configs: {
        type: "text",
        value: "",
        name: "first_name",
        id: "first_name",
        placeholder: "first name",
        onChange: () => {
          handleChange(inputs, setInputs);
        },
      },
      label: "First Name",
    },
    last_name: {
      type: "input",
      configs: {
        type: "text",
        value: "",
        name: "last_name",
        id: "last_name",
        placeholder: "last name",
        onChange: () => {
          handleChange(inputs, setInputs);
        },
      },
      label: "Last Name",
    },
    username: {
      type: "input",
      configs: {
        type: "text",
        value: "",
        name: "username",
        id: "username",
        placeholder: "username",
        onChange: () => {
          handleChange(inputs, setInputs);
        },
      },
      label: "Username",
    },
    email: {
      type: "input",
      configs: {
        type: "email",
        value: "",
        name: "email",
        id: "email",
        placeholder: "email",
        onChange: () => {
          handleChange(inputs, setInputs);
        },
      },
      label: "E-mail",
    },
    password: {
      type: "input",
      configs: {
        type: "password",
        value: "",
        name: "password",
        id: "password",
        placeholder: "password",
        onChange: () => {
          handleChange(inputs, setInputs);
        },
      },
      label: "Password",
    },
    confirm_password: {
      type: "input",
      configs: {
        type: "password",
        value: "",
        name: "confirm_password",
        id: "confirm_password",
        placeholder: "confirm password",
        onChange: () => {
          handleChange(inputs, setInputs);
        },
      },
      label: "Confirm Password",
    },
    submit: {
      type: "input",
      configs: {
        type: "submit",
        value: "Register",
        id: "submit",
      },
    },
  });
  const submitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("first_name", inputs.first_name.configs.value);
    formData.append("last_name", inputs.last_name.configs.value);
    formData.append("username", inputs.username.configs.value);
    formData.append("email", inputs.email.configs.value);
    formData.append("password", inputs.password.configs.value);
    formData.append("confirm_password", inputs.confirm_password.configs.value);
    formData.append("register", true);

    axios.post("http://localhost/netflix/index.php", formData).then((data) => {
      console.log(data.data);
      setShowFeedback({
        show: true,
        message: data.data[0],
        succeed: data.data[1],
      });
      setTimeout(() => {
        setShowFeedback({
          show: false,
          message: "",
          succeed: "",
        });
      }, 5000);
    });
  };
  const elements = [];
  for (let key in inputs) {
    elements.push(<Input key={key} type={inputs[key].type} label={inputs[key].label} configs={inputs[key].configs}></Input>);
  }
  return (
    <>
      {showFeedback.show ? <Feedback succeed={showFeedback.succeed}>{showFeedback.message}</Feedback> : null}
      <form onSubmit={submitHandler} className="form" method="POST">
        {elements}
      </form>
    </>
  );
}
