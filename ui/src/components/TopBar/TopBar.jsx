import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import AccountButton from "./components/AccountButton";
import { Nav } from "./components/Nav";
import { ReactComponent as Monkey } from '../../assets/monkey.svg'

const TopBar = () => {
  return (
    <StyledTopBar>
      <StyledTopBarInner>
        <StyledLink to="/" style={{ textDecoration: "none" }}>
          <MonkeyIcon />
          Dart Monkey
        </StyledLink>
        <Nav />
        <NavRight>
          <AccountButton />
        </NavRight>
      </StyledTopBarInner>
    </StyledTopBar>
  );
};

const MonkeyIcon = styled(Monkey)`
  margin-bottom: 1px;  
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const NavRight = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  width: max-content;
`;

const StyledLink = styled(NavLink)`
width: 200px;
height: 25px;
text-decoration: none;
 font-size: 16px;
  font-weight: bold;
    line-height: 1;
  letter-spacing: 0.5px;
  color: #ffeb80;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledTopBar = styled.div`
width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 90px;
`;

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 40px);
  min-width: 800px;
`;

export default TopBar;
