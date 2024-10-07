import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import Logo from "../components/Logo";

function Landing() {
  const { user } = useAppContext();
  return (
    <>
      {user && <Navigate to="/" />}

      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>
              Job <span></span> App
            </h1>
            <h4> Manage and track all your job applications in one place.</h4>
            <p>
              Are you also feeling lost as a job seeker? this website to ease
              the process of applying. To give you that organization and
              certainty fraught with a time where there is little to none. Keep
              sending out applications. Are you overwhelmed with job
              applications, deadlines, and interviews? Say goodbye to the chaos
              and hello to streamlined job management with JobTrack! Whether
              you're a job seeker looking for your next career move or a
              recruiter managing multiple candidates, our system is designed to
              make your life easier.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>

          <img src={main} alt="job hunt" className="img main-img"></img>
        </div>
      </Wrapper>
    </>
  );
}

export default Landing;
