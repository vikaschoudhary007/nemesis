import "./App.css";
import { useState, useEffect, useRef } from "react";
import  {BrowserRouter , Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {addUser, sendEmail} from "./helpers/api"
import {loadWeb3,loadBlockChainData, listenAccountChange, listenNetworkChange} from "./helpers/web3"
//Material
import { makeStyles } from "@material-ui/core/styles";
import Home from "./components/home";
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
  const [open, setOpen] = useState(false);
  const [isChecked1, setIsChecked1] = useState(true)
  const [isChecked2, setIsChecked2] = useState(true)
  const [isChecked3, setIsChecked3] = useState(true)
  const [isChecked4, setIsChecked4] = useState(false)
  const [isChecked5, setIsChecked5] = useState(false)
  const [email, setEmail] = useState("")
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

  // const metaMaskInstalled = typeof window.web3 !== 'undefined';
  // setMetaMaskInstalled(metaMaskInstalled);

  // if(metaMaskInstalled){
  //   loadWeb3()
  //   loadBlockChainData(formData, setFormData, notifySuccess, setAccount)
  //   listenAccountChange(formData, setFormData, setAccount)
  //   listenNetworkChange(formData, setFormData)
  // }

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


const handleOpen = () => {
  setOpen(true); 
};

const handleClose = () => {
  setOpen(false);
  setEmail("")
  setIsChecked4(false)
  setIsChecked5(false)
};

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

  const handleAddAccount = async() => {
    try{

      if (!formData.loaded || !formData.walletConnected){
        notifyError("Wallet not connected")
        return
      }
      if(!isChecked1 || !isChecked2 || !isChecked3) {
        notifyError("Subscribe to our channels first")
        return
      }

      if(isChecked4) {
        if(email == ""){
          notifyError("Please enter email")
          return
        }
      }

      const balance = formData.balance;

      if(balance == 0){
        notifyError("Doge2.0 balance insufficient")
        return
      }

      let dogePayment = "not_required";

      if(isChecked5){
        dogePayment = "required"
      }

      const account = formData.account
      const status = "pending"
      const response = await addUser(account,balance,status,dogePayment)

      if(response.status == 200 && response.data.errorMessage === "Already claimed"){
        notifyError("Already Claimed")
        handleClose()
        return
      }

      if(response.status == 200 && isChecked4){
        const receiverEmail = email
        await sendEmail(receiverEmail)
        notifySuccess("Conformation Email is sent")
        handleClose()
        return
      }

      if(response.status == 200) {
        notifySuccess("Claim Successful")
        handleClose()
        return
      }

    }catch(err){
      console.log(err)
    }
  }


  return (
    <>
    <UserProvider 
    value={{
      formData,
      open,
      email,
      isChecked1,
      isChecked2,
      isChecked3,
      isChecked4,
      isChecked5,
      colorChange,
      setIsChecked1,
      setIsChecked2,
      setIsChecked3,
      setIsChecked4,
      setIsChecked5,
      handleWalletConnect,
      handleWalletDisconnect,
      handleAddAccount,
      handleOpen,
      handleClose,
      truncate,
      setEmail,
      notifySuccess,
      notifyError,

    }}
    >

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
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
