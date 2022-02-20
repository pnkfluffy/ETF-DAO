import React, { useCallback } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";

const AccountButton = (props) => {
  const { account, connect } = useWallet();

  const handleUnlockClick = useCallback(() => {
    connect("injected");
  }, [connect]);


  return (
    <StyledAccountButton onClick={!account && handleUnlockClick}>
      {!account ? (
        <Button
          disabled={false}
          style={{ marginTop: "2px" }}
        >
          Connect Wallet
        </Button>
      ) : (
        <Button
          style={{ marginTop: "2px" }}
        >
          <Oval />
          <StyledA
            href={`https://etherscan.io/address/${account}`}
            target={`_blank`}
          >
            <div>{account.substring(0, 10)}...</div>
          </StyledA>
        </Button>
      )}
    </StyledAccountButton>
  );
};

const Button = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffeb80;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  // font-family: "PlatNomor";
  @media only screen and (max-width: 767px) {
    font-size: 14px;
    font-weight: normal;
    margin-top: 0px;
    padding: 5px 0px 10px 5px;
  }
`;

const StyledAccountButton = styled.div`
  border-radius: 20px;
   width: 182px;
  height: 60px;
    border: solid 1px #ffeb80;
  background-size: contain;
  background-repeat: no-repeat;
  // font-family: "PlatNomor";
  cursor: pointer;
  transition: all 0.1s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
  @media only screen and (max-width: 767px) {
    background-size: 100% 100%;
    width: 100px;
    margin-left: -15px;
  }
`;

const Oval = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: #7dca46;
  margin-right: 10px;
`;

const StyledAccountInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const StyledA = styled.a`
  // font-family: "PlatNomor";
  font-size: 16px;
  color: #ffeb80;
  line-height: 1;
  text-decoration: none !important;
  transition: all 0.1s linear;
  opacity: 0.85;
  margin-top: 2px;
  &:hover {
    opacity: 1;
  }
`;

export default AccountButton;
