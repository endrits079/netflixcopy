import React, { useState } from "react";
import "./Form.scss";
import cloneDeep from "lodash/cloneDeep";
import Input from "../input/Input";
import { connect } from "react-redux";
import Feedback from "../feedback/Feedback";
import { login } from "../../store/actions/actions";
import Spinner from "../spinner/Spinner";
import { withRouter } from "react-router-dom";
import { handleChange } from "../../utils/inputHandlers";
function LoginForm(props) {
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
          handleChange(inputs, setInputs, cloneDeep);
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
          handleChange(inputs, setInputs, cloneDeep);
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
  const redirect = (url) => {
    props.history.push(url);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    props.login(inputs.email.configs.value, inputs.password.configs.value, redirect, props.url);
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
    login: (email, password, redirect, url) => dispatch(login(email, password, redirect, url)),
  };
};

const mapStateToProps = (state) => {
  return {
    showSpinner: state.login.show_spinner,
    message: state.login.message,
    url: state.location.location,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));
