import Web3 from "web3";
import TokenABI from "../contractAbi/dogecoin.json";
import * as c from "./const";

const TokenContractAddress = c.CONTRACT_ADDRESS;

const loadWeb3 = async () => {
  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // window.alert('Non-Ethereum browser detected. you should consider trying MetaMask')
    }
  } catch (err) {
    console.log("error", err);
  }
};

////////// GET METAMASK ACCOUNT AND CREATE CONTRACT INSTANCES ////////////////

const loadBlockChainData = async (
  formData,
  setFormData,
  notifyError,
  setAccount
) => {
  try {
    const web3 = window.web3;

    // listen the Network ID
    const networkId = await web3.eth.net.getId();

    if (networkId === 56) {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      const tokenContract = await new web3.eth.Contract(
        TokenABI,
        TokenContractAddress
      );

      const tokenBalance = await tokenContract.methods
        .balanceOf(account)
        .call();
      const temp = tokenBalance / 1000000000;

      localStorage.account = account || "";
      localStorage.networkId = networkId;
      localStorage.balance = tokenBalance;

      await setFormData({
        ...formData,
        account: account,
        netId: networkId,
        tokenContract: tokenContract,
        balance: temp,
        loaded: true,
        walletConnected: true,
      });
      await setAccount(account);
    } else {
      notifyError("Please connect to BSC Mainnet");
    }
  } catch (err) {
    console.log(err);
  }
};

////////// CHECK IF USER SELECTED A DIFFERENT ACCOUNT IN METAMASK ///////////////

const listenAccountChange = async (formData, setFormData, setAccount) => {
  try {
    const web3 = window.web3;
    window.ethereum.on("accountsChanged", async () => {
      const accounts = await web3.eth.getAccounts();
      await setFormData({
        ...formData,
        account: accounts[0],
      });
      await setAccount(accounts[0]);
      localStorage.account = accounts[0] || "";
    });
  } catch (err) {
    console.log(err);
  }
};

////////// CHECK IF USER SELECTED A DIFFERENT NETWORK ////////////

const listenNetworkChange = async (formData, setFormData) => {
  const web3 = window.web3;

  window.ethereum.on("networkChanged", async () => {
    const networkId = await web3.eth.net.getId();

    await setFormData({
      ...formData,
      netId: networkId,
    });
    localStorage.networkId = networkId;
  });
};

export {
  loadWeb3,
  loadBlockChainData,
  listenAccountChange,
  listenNetworkChange,
};
