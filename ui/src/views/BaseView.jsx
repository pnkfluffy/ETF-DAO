import React from "react";
import styled from "styled-components";
//import { Footer } from "../components/Footer/Footer";
import TopBar from "../components/TopBar/TopBar";
import BackgroundImg from '../assets/background.png'
import Maticc from '../assets/polygon-matic-logo.png'


export const BaseView = (props) => {
  return (
    <StyledCanvas>
      <Background />
      <ContentContainer>
        <StyledPage>
          <TopBar />

          <StyledMain>{props.children}</StyledMain>
          <Matic src={Maticc} />
          <Footer>created for ETH Denver 2022, for demo purposes only</Footer>
        </StyledPage>
      </ContentContainer>
    </StyledCanvas>
  );
};

const Matic = styled.img`
position: absolute;
width: 30px;
height: 30px;
bottom: 20px;
left: 20px;
`

const Footer = styled.div`
position: absolute;
bottom: 20px;
right: 20px;
font-size: 12px;
color: white;
opacity: .2;
`

const Background = styled.div`
position: absolute;
width: 100vw;
height: 100vh;
background-image: url(${BackgroundImg});
background-size: cover;
`

const StyledPage = styled.div`
position: relative;
  height: 100vh;
  margin: 0;
`;

const StyledMain = styled.div`
  align-items: center;
  color: black;
  display: flex;
  flex-direction: column;
  min-height: 83vh;
`;

const StyledCanvas = styled.div`
  position: absolute;
  width: 100%;
`;

const ContentContainer = styled.div`
  position: absolute;
  width: 100%;
`;

export default BaseView;
