import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Nav = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        Trade
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/create">
        Create
      </StyledLink>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
`;

const StyledLink = styled(NavLink)`
  height: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  padding-left: 5px;
  width: 80px;
  line-height: 1;
  letter-spacing: 0.5px;
  color: #ffeb80;
  text-decoration: none;
  transition: all 0.1s linear;
  &:hover {
    color: #ffcb46;
    &:after {
      background-color: rgba(256, 256, 256, 0.05);
    }
  }
  &.active {
    color: #ffeb80;
    opacity: .2;
  }
`;
