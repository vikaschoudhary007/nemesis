import "./App.css";
import { useState, useEffect, useRef } from "react";
import  {BrowserRouter , Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {updateDogeRequire} from "./helpers/api"
import {loadWeb3,loadBlockChainData, listenAccountChange, listenNetworkChange} from "./helpers/web3"
//Material
import { makeStyles } from "@material-ui/core/styles";
import ShowAccounts from "./components/showAccounts";
import { UserProvider } from "./contexts/UserContext";

const initialData = {
  web3: null,
  account: "",
  MultiSender: null,
  loaded: false,
  walletConnected: false,
  netId: null,
  sidebar: false,
  tokenContract:{},
  balance: 0,
};

const style = {
  list: "px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",
  hoverList:
    "px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white text-gray-200 md:mt-0 md:ml-4 text-gray-900 focus:text-gray-900 bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",
  box:{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "rgba(0,0,0,0.9)",
    border: "2px solid #000",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
    color:"white"
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "black",
  },
  title: {
    flexGrow: 1,
    color: "black",
  },
  appBarTransparent: {
    backgroundColor: "rgba(0, 0, 0,0)",
  },
  appBarSolid: {
    backgroundColor: "rgba(255,255,255,0.8)",
  },
}));

function App() {
  const classes = useStyles();
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [navBackground, setNavBackground] = useState("appBarTransparent");
  const [colorChange, setColorchange] = useState(false);
  const [account, setAccount] = useState()


const changeNavbarColor = () =>{
	if(window.scrollY >= 80){
	setColorchange(true);
	}
	else{
	setColorchange(false);
	}
};
window.addEventListener('scroll', changeNavbarColor);

  const navRef = useRef();
  navRef.current = navBackground;


useEffect(() => {

  const metaMaskInstalled = typeof window.web3 !== 'undefined';
  setMetaMaskInstalled(metaMaskInstalled);

  if(metaMaskInstalled){
    loadWeb3()
    loadBlockChainData(formData, setFormData, notifySuccess, setAccount)
    listenAccountChange(formData, setFormData, setAccount)
    listenNetworkChange(formData, setFormData)
  }

  const handleScroll = () => {
    const show = window.scrollY > 310;
    if (show) {
      setNavBackground("appBarSolid");
    }else {
      setNavBackground("appBarTransparent");
    }
  };
  document.addEventListener("scroll", handleScroll);
  return () => {
    document.removeEventListener("scroll", handleScroll);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(() => {
  loadBlockChainData(formData, setFormData, notifySuccess, setAccount)
}, [account]);



const handleWalletDisconnect = () => {
  const obj = {
    web3: null,
    account: "",
    MultiSender: null,
    loaded: false,
    walletConnected: false,
    netId: null,
    sidebar: false,
    tokenContract:{},
    balance: 0
  };
  setFormData(obj);
  
};

  const handleWalletConnect = async () => {

    const metaMaskInstalled = typeof window.web3 !== 'undefined';
    setMetaMaskInstalled(metaMaskInstalled);

    if(metaMaskInstalled){
      loadWeb3()
      loadBlockChainData(formData, setFormData, notifyError, setAccount)
      listenAccountChange(formData, setFormData, setAccount)
      listenNetworkChange(formData, setFormData)
    }  
    else {
      notifyError("Please install Metamask")
      // this.setState({ loaded: false, walletConnected: false });
    }
  };

  const truncate = (str) => {
    return str.length > 10
      ? str.substring(0, 6) + "..." + str.substring(38, 42)
      : str;
  };

  const toastStyle = {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const notifySuccess = (data) => {
    toast.success(data,toastStyle)
  }

  const notifyError = (data) => {
    toast.error(data,toastStyle);
  };
  

  const handlePayDoge = async(receiverAddress, amount) => {

    try{
      const {tokenContract, account} = formData
      amount = amount*(1000000000)
      await tokenContract.methods.transfer(receiverAddress, amount).send({from : account})
      const dogePayment="not_required"
      await updateDogeRequire(account, dogePayment)
      notifySuccess("Payment Successful")
      window.location.reload()
    }catch(err){
      notifyError("Something went wrong")
    }
  }


  return (
    <>
    <UserProvider 
    value={{
      formData,
      colorChange,
      handleWalletConnect,
      handleWalletDisconnect,
      truncate,
      notifySuccess,
      notifyError,
      handlePayDoge
    }}
    >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowAccounts/>}/>
      </Routes>
    </BrowserRouter>
    </UserProvider>
    
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
