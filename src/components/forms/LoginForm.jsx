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
    email: {
      type: "input",
      configs: {
        type: "email",
        value: "",
        name: "email",
        id: "email",
        placeholder: "email",
        required: true,
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
        required: true,
        onChange: () => {
          handleChange(inputs, setInputs);
        },
      },
      label: "Password",
    },

    submit: {
      type: "input",
      configs: {
        type: "submit",
        value: "Login",
        id: "submit",
      },
    },
  });
  const submitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("email", inputs.email.configs.value);
    formData.append("password", inputs.password.configs.value);
    formData.append("login", true);
    axios.post("http://localhost/netflix/index.php", formData).then((response) => {
        console.log(response);
      !response.data[1] && setShowFeedback({ show: true, message: response.data[0], succeed: false });
      setTimeout(() => {
setShowFeedback({show:false,message:'',succeed:false})
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
