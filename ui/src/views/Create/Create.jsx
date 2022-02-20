import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from 'react-kiwi-dropdown';
import Divider from '../../assets/lazy.png'
import { createETF } from '../../web3/utils'
import Swal from 'sweetalert2'
import useWallet from 'use-wallet'

export const Create = () => {
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [assets, setAssets] = useState([""])
  const [quantities, setQuantities] = useState([0])
  const { account, connect } = useWallet();


  const adjustAssetsAddress = (e, index) => {
    assets[index] = e.target.value
    setAssets(assets)
  }

  const adjustAssetsQty = (e, index) => {
    quantities[index] = e.target.value
    setQuantities(quantities)
  }

  const newAsset = () => {
    setAssets([...assets, ""])
    setQuantities([...quantities, 0])
  }

  const removeAsset = (i) => {
    console.log(i)
    setAssets([...assets.filter((asset, index) => index !== i)])
    setQuantities([...quantities.filter((asset, index) => index !== i)])
  }

  const submit = () => {
    if (!account) {
      connect('injected')
      return
    }
    if (!name || !symbol) return
    createETF(name, symbol, assets, quantities, (res) => {
      Swal.fire("Successfully Created Fund")
      setName("")
      setSymbol("")
      setAssets([""])
      setQuantities([0])
    })
  }

  return (
    <Container>
      <TradeMaker>
        <TopContainer>
          <Title>Create</Title>
          <ToggleButtonContainer />
        </TopContainer>
        <RRow>
          <HalfInput placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <HalfInput placeholder="Symbol" onChange={(e) => setSymbol(e.target.value)} />
        </RRow>
        <Spacer src={Divider} />
        {assets.map((row, index) =>
          <Row key={index}>
            <FullInput placeholder="Token Address" onChange={(e) => adjustAssetsAddress(e, index)} />
            <QtyInput placeholder="Qty" type="number" onChange={(e) => adjustAssetsQty(e, index)} />
            <X onClick={() => removeAsset(index)}>
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 24 24"
                class="w-4 h-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.707 6.707a1 1 0 00-1.414-1.414L12 10.586 6.707 5.293a1 1 0 00-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 101.414 1.414L12 13.414l5.293 5.293a1 1 0 001.414-1.414L13.414 12l5.293-5.293z"
                ></path>
              </svg>
            </X>
          </Row>
        )}
        <AddAssetButton onClick={newAsset}>
          Add Another Token
        </AddAssetButton>
        <CreateETF onClick={submit}>
          Create Fund
        </CreateETF>
      </TradeMaker>
      <Test>
        test DAI: 0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735
        <br />
        test token2: 0xeD627b44d9E8A4E2c6510Ecb5bA7d4b1B5f02f61
      </Test>
    </Container>
  );
};

const Test = styled.div`
margin-top: 20px;
font-size: 12px;
color: white;
opacity: .2;
`



const CreateETF = styled.div`
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

const X = styled.div`
background-color: #17171c;
border-radius: 20px;
height: 20px;
width: 20px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
color: #757575;
align-self: flex-start;
cursor: pointer;
`

const AddAssetButton = styled.div`
font-size: 18px;
font-weight: bold;
color: #ffeb80;
cursor: pointer;
&:hover {
  opacity: .6;
}
`

const Spacer = styled.img`
width: 80%;
margin-top: 5px;
margin-bottom: 10px;
`

const RRow = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
`

const Row = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
margin-bottom: 20px;
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

const FullInput = styled.input`
background-color: #17171c;
width: 55%;
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

const QtyInput = styled.input`
background-color: #17171c;
width: 7%;
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

const TopContainer = styled.div`
width: 90%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
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
  height: 600px;
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
height: 42px;
`;
const SellContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
text-align:center;
`;

const Container = styled.div`
  width: 60%;
  margin-top: 70px;
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