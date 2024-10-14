import React from "react";
import Header from "../../components/Header/Header";

import "./forum.css";

const Forum = () => {

  return (
    <>
      <Header currentPage={"community"} />
      <div className="forum">
        <main className="main">
          <h1>Forum</h1>
        </main>
      </div>
    </>
  );
};

export default Forum;
