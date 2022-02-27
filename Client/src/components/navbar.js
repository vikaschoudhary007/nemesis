import React, { useState, Fragment } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import {
  Nav,
  NavContainer,
  NavLogo,
  NavItem,
  NavLinks,
  NavMenu,
  MobileIcon,
} from "./NavbarStyles";
import "../App.css";
import Web3 from "web3";

const initialData = {
  web3: null,
  accounts: [""],
  MultiSender: null,
  loaded: false,
  walletConnected: false,
  netId: null,
  sidebar: false,
  bnbPriceInUSD: 0,
};

const style = {
  list: "px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",
  hoverList:
    "px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white text-gray-200 md:mt-0 md:ml-4 text-gray-900 focus:text-gray-900 bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",
};

const Navbar = () => {
  const [formData, setFormData] = useState(initialData);
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const truncate = (str) => {
    return str.length > 10
      ? str.substring(0, 6) + "..." + str.substring(38, 42)
      : str;
  };

  const handleWalletDiscount = () => {
    const obj = {
      web3: null,
      accounts: [""],
      MultiSender: null,
      loaded: false,
      walletConnected: false,
      netId: null,
      sidebar: false,
      bnbPriceInUSD: formData.bnbPriceInUSD,
    };
    setFormData(obj);
  };
  const handleWalletConnect = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Web3 not found");
      return;
    }

    const web3 = new Web3(ethereum);
    await ethereum.enable();

    window.ethereum.on("accountsChanged", function (accounts) {
      setFormData({
        ...formData,
        accounts: accounts,
      });
    });

    const netId = await web3.eth.net.getId();

    if (netId === 97) {
      setFormData({
        ...formData,
        netId: netId,
      });

      const accounts = await web3.eth.getAccounts();

      setFormData({
        ...formData,
        web3: web3,
        accounts: accounts,
        loaded: true,
        walletConnected: true,
      });
      // this.setState({ web3, accounts, loaded: true, walletConnected: true });

      // const ReferralContract = new web3.eth.Contract(
      //   Abi,
      //   "0xd06BD4E70984e2779E09a30c066c92A2E63C4435" //Address of the BUYSHREE contract
      // );

      // this.setState({ ReferralContract });
    } else {
      window.alert("Please connect to BSC Mainnet");
      setFormData({
        ...formData,
        loaded: false,
        walletConnected: false,
      });
      // this.setState({ loaded: false, walletConnected: false });
    }
  };
  return (
    <Fragment>
      <Nav className={colorChange ? "navbar colorChange" : "navbar"}>
        <NavContainer>
          <NavLogo href="#">
            <div className="p-4">
              <img src={logo} alt="logo" style={{ height: "20px" }} />
            </div>
          </NavLogo>
          <MobileIcon>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              {/* <NavLinks>Home</NavLinks>
                <NavLinks>Whitepaper</NavLinks> */}

              {/* <nav className="flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
              <div className={style.list} href="#">
                Home
              </div>
              <div className={style.list} href="#">
                Whitepaper
              </div> */}

              {formData.walletConnected && (
                <NavLinks className={style.hoverList} href="#">
                  {truncate(formData.accounts[0])}
                </NavLinks>
              )}

              <NavLinks className="md:mt-0 md:ml-4">
                {formData.walletConnected ? (
                  <div className="flex">
                    <button
                      className=" flex-1 text-white border-0 rounded-lg  py-2 px-4 text-sm primary__button transition ease-in duration-100 font-semibold focus:outline-none"
                      onClick={handleWalletDiscount}
                    >
                      Disconnect Wallet
                    </button>
                  </div>
                ) : (
                  <button
                    className=" flex-1 text-white border-0 rounded-lg  py-2 px-4 text-sm primary__button transition ease-in duration-100 font-semibold focus:outline-none"
                    onClick={handleWalletConnect}
                  >
                    Connect Wallet
                  </button>
                )}
              </NavLinks>
            </NavItem>
          </NavMenu>
        </NavContainer>
      </Nav>
    </Fragment>
  );
};

export default Navbar;
