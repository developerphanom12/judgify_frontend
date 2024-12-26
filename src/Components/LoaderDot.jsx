import React, { useEffect } from "react";
import Loader from "react-js-loader";
// import { useLoading } from "./LoadingContext";
import styled from "styled-components";
import { useLoading } from "./LoadingContext";

const LoaderDot = () => {
  const { loading } = useLoading();

  useEffect(() => {
    if (loading) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [loading]);

  return loading ? (
    <Root>
      <div className="loader-container">
        <Loader
          type="spinner-circle"
          bgColor={"#000000"}
          color={"#000000"}
          size={80}
        />
      </div>
    </Root>
  ) : null;
};

export default LoaderDot;
const Root = styled.section`
  backdrop-filter: blur (4px);

  .sl-bubble1 {
    width: 100vw;
    height: 100vh;
  }
  .loader-container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    backdrop-filter: blur(2px);
    overflow: hidden !important;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    background: rgba(
      255,
      255,
      255,
      0.8
    ); /* Optional: add a semi-transparent background */
  }
`;
