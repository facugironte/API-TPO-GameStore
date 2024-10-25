import React from "react";
import Header from "../../components/Header/Header";

import "./profile.css";

const Profile = () => {

  return (
    <>
      <Header currentPage={"profile"} />
      <div className="profile">
        <main className="main">
          <h1>Tu perfil</h1>
        </main>
      </div>
    </>
  );
};

export default Profile;
