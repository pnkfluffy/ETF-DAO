import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Dropdown from 'react-kiwi-dropdown';
import Divider from '../../assets/lazy.png'
import { ReactComponent as Arrow } from '../../assets/arrowdownsorted.svg'
import { readFunds, buyFund, sellFund } from '../../web3/utils'
import useWallet from 'use-wallet'

export const Trade = () => {
  const [funds, setFunds] = useState([])
  const [fundNames, setFundNames] = useState([])
  const [qty, setQty] = useState(0)
  const [buying, setBuying] = useState(true)
  const [selectedOption, setSelectedOption] = useState('');
  const { account, connect } = useWallet();


  useEffect(() => {
    if (!funds.length && account) {
      readFunds((res) => {
        if (res !== 'error') {
          setFunds(res[0])
          setFundNames(res[1])
        } else {
          console.log('fundserror')
        }
      })
    }
  }, [account])


  const submit = () => {
    if (!account) {
      connect('injected')
      return
    }
    if (!selectedOption || !qty) return
    if (buying) {
      buyFund(funds[selectedOption], qty, async (res) => {
        console.log(res)
        try {
          const wasAdded = await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20', // Initially only supports ERC20, but eventually more!
              options: {
                address: funds[selectedOption], // The address that the token is at.
                symbol: fundNames[selectedOption], // A ticker symbol or shorthand, up to 5 chars.
                decimals: 0, // The number of decimals in the token
              },
            },
          });

          if (wasAdded) {
            console.log('Thanks for your interest!');
          } else {
            console.log('Your loss!');
          }
        } catch (error) {
          console.log(error);
        }
      })
    } else if (!buying) {
      sellFund(funds[selectedOption], qty, (res) => {
        console.log(res)
      })
    }
  }

  return (
    <Container>
      <TradeMaker>
        <TopContainer>
          <Title>Trade</Title>
          <ToggleButtonContainer>
            <BuyButton selected={buying} onClick={() => setBuying(true)}>Buy</BuyButton>
            <SellButton selected={!buying} onClick={() => setBuying(false)}>Sell</SellButton>
          </ToggleButtonContainer>
        </TopContainer>
        <RRow>
          <Wrapper>
            <FullDropdown placeholder="Fund" onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="">Choose a Fund </option>
              {fundNames.map((fund, index) =>
                <option value={index}>{fund}</option>
              )}
            </FullDropdown>
            <ArrowIcon />
          </Wrapper>
        </RRow>
        <Spacer src={Divider} />
        <RRow>
          <HalfInput type="number" placeholder="Quantity" onChange={(e) => setQty(e.target.value)} />
        </RRow>
        <Buy onClick={submit}>
          {buying ? 'Buy Fund' : 'Sell Fund'}
        </Buy>
      </TradeMaker>
    </Container>
  );
};

const Buy = styled.div`
position: absolute;
bottom: 20px;
border-radius: 20px;
background-color: #ffeb80;
width: 92%;
height: 60px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
font-size: 20px;
font-weight: bold;
color: #24242c;
user-select: none;
cursor: pointer;
&:hover {
  opacity: .6;
}
`

const Wrapper = styled.div`
position: relative;
width: 55%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`

const ArrowIcon = styled(Arrow)`
position: absolute;
right: 5px;
  margin-top: 5px;  
  width: 25px;
  height: 25px;
  margin-right: 10px;
  pointer-events: none;
`;

const Spacer = styled.img`
width: 80%;
margin-top: 5px;
margin-bottom: 10px;
`

const FullDropdown = styled.select`
background-color: #17171c;
  appearance: none;
width: 100%;
padding-left: 20px;
padding-right: 20px;
height: 50px;
border-radius: 20px;
border: solid 1px #17171c;
outline: none;
font-size: 18px;
font-weight: bold;
color: #cdd5e3;
cursor: pointer;
&:focus {
  border: solid 1px #ffeb80;
}
`

const HalfInput = styled.input`
background-color: #17171c;
width: 35%;
padding-left: 20px;
padding-right: 20px;
height: 50px;
border-radius: 20px;
border: solid 1px #17171c;
outline: none;
font-size: 18px;
font-weight: bold;
color: #cdd5e3;
&:focus {
  border: solid 1px #ffeb80;
}
`


const RRow = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
`

const TopContainer = styled.div`
width: 90%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-bottom: 30px;
`

const Title = styled.div`
font-size: 20px;
font-weight: bold;
color: #cdd5e3;
`

const DropdownContent = styled.div`
    background: background:rgba(256, 256, 256, 0.2);
    display:flex;
    align-items:center;
    justify-content:center;
    
    `;

const TradeMaker = styled.div`
position: relative;
width: 480px;
  height: 374px;
   border-radius: 30px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.29);
  background-color: #24242c;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BuyContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
text-align:center;

`;

const BuyButton = styled.div`
display:flex;
align-items:center;
justify-content:center;
height:40px;
width:100px;
font-weight: bold;
border-radius 18px;
cursor: pointer;
color: #cdd5e3;
 ${props => props.selected && `background-color: #24242c;`}
`;
const SellButton = styled.div`
display:flex;
align-items:center;
justify-content:center;
height:40px;
width:100px;
font-weight: bold;
border-radius 18px;
cursor: pointer;
color: #cdd5e3;
 ${props => props.selected && `background-color: #24242c;`}

`;
const ToggleButtonContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
text-align:center;
color:#eee;
margin:10px 0;
border-radius: 20px;
background-color: #17171c;
width: max-content;
padding: 2px;
`;
const SellContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
text-align:center;
`;

const Container = styled.div`
  width: 60%;
  height: 60vh;

  color: black;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  @media only screen and (max-width: 991px) {
    width: 90%;
  }
`;

const Image = styled.img`
  width: 100%;
`;
const StyledDropdown = styled(Dropdown)`
  .KIWI-button {
    color:white;
    background:rgba(256, 256, 256, .1);
  }
  .KIWI-button-indicator {
    color:white;
    width:50px;
    height:50px;
    background:rgba(256, 256, 256, 0.2);
    display:flex;
    justify-content:center;
    align-items:center;
 
    &.selected {
      width:50px;
      height:50px;
    }
  }
 
  .KIWI-option-list {
    background:rgba(256, 256, 256, 0.2);

    padding: 5px;
  }
 
  .KIWI-option {
    background:rgba(256, 256, 256, 0.2);
 
    &.selected {
      color:red;
      background:rgba(256, 256, 256, 0.2);
    }
  }
`