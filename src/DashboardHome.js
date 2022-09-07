import "./style.css";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const DashboardHome = () => {
  const history = useHistory();
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [userOcid, setUserOcid] = useState("");

  async function checkUserExists(email) {
    console.log("Checking New user: " + email);
    const formData = new FormData();
    //formData.append("sid", sid);
    formData.append("email", email);

    await axios({
      url: `http://144.24.132.94:8088/checkuser/`,
      method: "POST",
      data: formData,
      headers: {
        contentType: "multipart/form-data",
      },
    })
      .then(function (response) {
        let uocid = response.data.message;

        if (response.data.statuscode === "success") {
          if (uocid !== "") {
            console.log("user exists");
            console.log(uocid);
            setUserExists(true);
            setUserOcid(uocid);
            history.push({
              pathname: "/home",
              state: { userocid: uocid, loginUser: email },
            });
          } else {
            setMsg(
              "Sorry! User not found. Please contact your tenancy administrator."
            );
          }
        } else if (response.data.statuscode === "error") {
          setMsg(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleUserLogin = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    checkUserExists(email);
  };
  const handleUserEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  return (
    <div className="dbcontainer">
      <div className="forms-dbcontainer">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleUserLogin}>
            <h2 className="title">Kalari -- A51</h2>
            <br />
            <br />
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Email"
                onChange={handleUserEmail}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="dbbtn solid" />
            <br />
            <p>
              <i>
                Not a registered user? Click{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Kalaripayattu"
                  target="_blank"
                >
                  here
                </a>{" "}
                to learn more.
              </i>
            </p>
            <br />
            {msg}
          </form>
          <br />
          <br />
        </div>
      </div>

      <div className="panels-dbcontainer">
        <div className="panel left-panel">
          <div id="image-star">
            <img width="600" src="images/graph.png" alt="Our Locations" />
            <div className="corner corner-1">
              <a data-tip data-for="corner1" className="corner-tag">
                {""}
                <div style={{ widht: "25px", height: "25px" }}></div>
              </a>
              <ReactTooltip id="corner1" type="light">
                <span>Show happy face</span>
              </ReactTooltip>
            </div>
            <div className=" corner corner-2">
              <a data-tip data-for="corner2" className="corner-tag">
                <div style={{ widht: "25px", height: "25px" }}></div>
              </a>
              <ReactTooltip id="corner2" type="light">
                <span>Show happy face</span>
              </ReactTooltip>
            </div>

            <div className=" corner corner-3">
              <a data-tip data-for="corner-3" className="corner-tag">
                <div style={{ widht: "25px", height: "25px" }}></div>
              </a>
              <ReactTooltip id="corner-3" type="light">
                <span>Show happy facedsa</span>
              </ReactTooltip>
            </div>

            <div className=" corner corner-4">
              <a data-tip data-for="corner-4" className="corner-tag">
                <div style={{ widht: "25px", height: "25px" }}></div>
              </a>
              <ReactTooltip id="corner-4" type="light">
                <span>Show happy facdase</span>
              </ReactTooltip>
            </div>

            <div className="corner corner-5">
              <a data-tip data-for="corner-5" className="corner-tag">
                <div style={{ widht: "25px", height: "25px" }}></div>
              </a>
              <ReactTooltip id="corner-5" type="light">
                <span>Show happy fdace</span>
              </ReactTooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
