import React, { useState } from "react";
import "./Form.scss";
import cloneDeep from "lodash/cloneDeep";
import Input from "../input/Input";
import { connect } from "react-redux";
import Feedback from "../feedback/Feedback";
import { login } from "../../store/actions/actions";
import Spinner from "../spinner/Spinner";
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
function LoginForm(props) {
  const [showFeedback, setShowFeedback] = useState({ show: false, message: "", succeed: false });
  const [inputs, setInputs] = useState({
    email: {
      type: "input",
      configs: {
        type: "text",
        value: "",
        name: "email",
        id: "email",
        placeholder: "email or username",
        required: true,
        onChange: () => {
          handleChange(inputs, setInputs);
        },
      },
      label: "E-mail or Username",
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
    //     let formData = new FormData();
    //     formData.append("email", inputs.email.configs.value);
    //     formData.append("password", inputs.password.configs.value);
    //     formData.append("login", true);
    //     axios.post("http://localhost/netflix/index.php", formData).then((response) => {
    //         console.log(response);
    //       !response.data[1] && setShowFeedback({ show: true, message: response.data[0], succeed: false });
    //       setTimeout(() => {
    // setShowFeedback({show:false,message:'',succeed:false})
    //       }, 5000);
    //     });
    props.login(inputs.email.configs.value, inputs.password.configs.value);
  };
  const elements = [];
  for (let key in inputs) {
    elements.push(<Input key={key} type={inputs[key].type} label={inputs[key].label} configs={inputs[key].configs}></Input>);
  }
  return (
    <>
      {props.message ? <Feedback succeed={false}>{props.message}</Feedback> : null}
      {props.showSpinner ? <Spinner></Spinner> : null}
      <form onSubmit={submitHandler} className="form" method="POST">
        {elements}
      </form>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    showSpinner: state.login.show_spinner,
    message: state.login.message,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
