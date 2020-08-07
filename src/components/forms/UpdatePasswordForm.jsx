import React, { useState } from "react";
import "./Form.scss";
import Input from "../input/Input";
import cloneDeep from "lodash/cloneDeep";
import { handleChange } from "../../utils/inputHandlers";
import { connect } from "react-redux";

function ProfileForm(props) {
  const [inputs, setInputs] = useState({
    password: {
      type: "input",
      configs: {
        type: "password",
        value: "",
        name: "password",
        id: "password",
        placeholder: "password",
        onChange: () => {
          handleChange(inputs, setInputs, cloneDeep);
        },
      },
      label: "Password",
    },
    new_password: {
      type: "input",
      configs: {
        type: "password",
        value: "",
        name: "new_password",
        id: "new_password",
        placeholder: "new password",
        onChange: () => {
          handleChange(inputs, setInputs, cloneDeep);
        },
      },
      label: "New Password",
    },
    confirm_new_password: {
      type: "input",
      configs: {
        type: "password",
        value: "",
        name: "confirm_password",
        id: "confirm_password",
        placeholder: "confirm password",
        onChange: () => {
          handleChange(inputs, setInputs, cloneDeep);
        },
      },
      label: "Confirm Password",
    },
    submit: {
      type: "input",
      configs: {
        type: "submit",
        value: "Update",
        id: "submit",
      },
    },
  });
  return (
    <form action="" className="form">
      <Input type={inputs.password.type} label={inputs.password.label} configs={inputs.password.configs}></Input>
      <Input type={inputs.new_password.type} label={inputs.new_password.label} configs={inputs.new_password.configs}></Input>
      <Input type={inputs.confirm_new_password.type} label={inputs.confirm_new_password.label} configs={inputs.confirm_new_password.configs}></Input>
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
