import React from "react";
import "./Profile.scss";
import ProfileForm from "../../components/forms/ProfileForm";
import UpdatePasswordForm from "../../components/forms/UpdatePasswordForm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
function Profile(props) {
  !props.user && props.history.push("login");

  return (
    <div className="profile">
      <div className="update-profile">
        <h3>Update Profile</h3>
        <ProfileForm></ProfileForm>
      </div>
      <div className="update-profile">
        <h3>Update Password</h3>
        <UpdatePasswordForm></UpdatePasswordForm>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.login.username,
  };
};

export default connect(mapStateToProps)(withRouter(Profile));
