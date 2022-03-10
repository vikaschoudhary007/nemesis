import "./App.css";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUser, sendEmail } from "./helpers/api";
import {
  loadWeb3,
  loadBlockChainData,
  listenAccountChange,
  listenNetworkChange,
  walletConnectProvider
} from "./helpers/web3";
//Material
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
  tokenContract: {},
  balance: 0,
};

function App() {
  // const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [navBackground, setNavBackground] = useState("appBarTransparent");
  const [colorChange, setColorchange] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState();

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const navRef = useRef();
  navRef.current = navBackground;

  useEffect(() => {

    const handleScroll = () => {
      const show = window.scrollY > 310;
      if (show) {
        setNavBackground("appBarSolid");
      } else {
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
    loadBlockChainData(formData, setFormData, notifySuccess, setAccount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setIsChecked1(false);
    setIsChecked2(false);
    setIsChecked3(false);
    setIsChecked4(false);
    setIsChecked5(false);
  };

  const handleWalletOpen = () => {
    setOpen2(true);
  };

  const handleWalletClose = () => {
    setOpen2(false);
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
      tokenContract: {},
      balance: 0,
    };
    setFormData(obj);

    localStorage.removeItem("walletconnect")
  };

  const handleMetamaskConnect = async () => {
    const metaMaskInstalled = typeof window.web3 !== "undefined";
    // setMetaMaskInstalled(metaMaskInstalled);

    if (metaMaskInstalled) {
      await loadWeb3();
      await loadBlockChainData(formData, setFormData, notifyError, setAccount);
      await listenAccountChange(formData, setFormData, setAccount);
      await listenNetworkChange(formData, setFormData);

      handleWalletClose()
    } else {
      notifyError("Please install Metamask");
      // this.setState({ loaded: false, walletConnected: false });
    }
  };

  const handleSecondConnect = async () => {
    await walletConnectProvider(formData, setFormData, setAccount);
    await loadBlockChainData(formData, setFormData, notifyError, setAccount);
    await listenAccountChange(formData, setFormData, setAccount);
    await listenNetworkChange(formData, setFormData);

    handleWalletClose()
  }

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
    toast.success(data, toastStyle);
  };

  const notifyError = (data) => {
    toast.error(data, toastStyle);
  };

  const handleAddAccount = async () => {
    try {
      if (!formData.loaded || !formData.walletConnected) {
        notifyError("Wallet not connected");
        return;
      }
      if (!isChecked1 || !isChecked2 || !isChecked3) {
        notifyError("Subscribe to our channels first");
        return;
      }

      if (isChecked4) {
        if (email === "") {
          notifyError("Please enter email");
          return;
        }
      }

      const balance = formData.balance;

      if (balance === 0) {
        notifyError("Doge2.0 balance insufficient");
        return;
      }

      let dogePayment = "not_required";

      if (isChecked5) {
        dogePayment = "required";
      }

      const account = formData.account;
      const status = "pending";
      const response = await addUser(account, balance, status, dogePayment);

      if (
        response.status === 200 &&
        response.data.errorMessage === "Already claimed"
      ) {
        notifyError("Already Claimed");
        handleClose();
        return;
      }

      if (response.status === 200 && isChecked4) {
        const receiverEmail = email;
        await sendEmail(receiverEmail);
        notifySuccess("Conformation Email is sent");
        handleClose();
        return;
      }

      if (response.status === 200) {
        notifySuccess("Claim Successful");
        handleClose();
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <UserProvider
        value={{
          formData,
          open,
          open2,
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
          handleMetamaskConnect,
          handleWalletDisconnect,
          handleAddAccount,
          handleOpen,
          handleClose,
          truncate,
          setEmail,
          notifySuccess,
          notifyError,
          handleWalletOpen,
          handleWalletClose,
          handleSecondConnect
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
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
