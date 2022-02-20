import {
  Contract,
  utils,
  providers,
  constants,
  BigNumber,
  getDefaultProvider,
} from "ethers";
import axios from "axios";
import Swal from "sweetalert2";
import { ethers } from 'ethers'
import addresses from "./constants";
import FundAbi from "./abi/Fund.abi";
import FundFactoryAbi from "./abi/FundFactory.abi";
const {
  FundFactoryAddress,
  network,
} = addresses;

export const require = async (statement, error) => {
  let provider;
  let walletAddress;
  provider = new providers.Web3Provider(window.ethereum);
  walletAddress = window.ethereum.selectedAddress;
  console.log("provider:\n", provider);
  if (!statement && error) {
    console.log(error);
    throw error;
  }
  if (!provider) {
    console.log("provider not found");
    console.log(provider);
    throw "provider not found";
  }
  if (!walletAddress) {
    console.log("userWallet not found");
    console.log(walletAddress);
    throw "userWallet not found";
  }
  return { provider, walletAddress };
};

export const createETF = async (name, symbol, tokens, amounts, callback) => {
  const { provider, walletAddress } = await require();
  const signer = provider.getSigner();
  amounts = amounts.map(amount => ethers.utils.parseEther(amount))
  const factory = new Contract(FundFactoryAddress, FundFactoryAbi, signer);
  let res = factory.createFund(name, symbol, tokens, amounts).then((r) => r.wait())
  Promise.all([res]).then((res) => {
    callback(res);
  });
};

export const readFunds = async (callback) => {
  const { provider, walletAddress } = await require();
  const signer = provider.getSigner();
  const factory = new Contract(FundFactoryAddress, FundFactoryAbi, signer);
  let res = await factory.getAllFunds()
  let ress = await factory.getAllFundNames()
  Promise.all([res, ress]).then((res) => {
    callback(res);
  }).catch(err => {
    callback('error')
  })
}

export const buyFund = async (fundAddress, qty, callback) => {
  const { provider, walletAddress } = await require();
  const signer = provider.getSigner();
  console.log(fundAddress)
  const fund = new Contract(fundAddress, FundAbi, signer);
  let res = fund.join(qty, { from: walletAddress, value: ethers.utils.parseEther(".1") }).then((r) => r.wait())
  Promise.all([res]).then((res) => {
    callback(res);
  }).catch(err => {
    callback('error')
  })
}

export const sellFund = async (fundAddress, qty, callback) => {
  const { provider, walletAddress } = await require();
  const signer = provider.getSigner();
  const fund = new Contract(fundAddress, FundAbi, signer);
  let res = fund.exit(qty).then((r) => r.wait())
  Promise.all([res]).then((res) => {
    callback(res);
  }).catch(err => {
    callback('error')
  })
}




// rinkeby DAI: 0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735
// rinkeby WETH: 0xc778417E063141139Fce010982780140Aa0cD5Ab

//0x2F42E5678d51Ad12bB418d43904Cd9B9FF8b4d4c