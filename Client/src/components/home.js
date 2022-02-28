import React, { Fragment, useContext } from "react";
// import Abi from "./contractAbi/bnbToShree.json";
import {
  Nav,
  NavContainer,
  NavLogo,
  NavItem,
  NavLinks,
  NavMenu,
  MobileIcon,
} from "../components/NavbarStyles";
import { FaBars } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import Banner from "../pages/banner";
import BG from "../assets/images/bg1.jpg";
import Air from "../assets/images/air.png";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Box, Checkbox, Menu, MenuItem } from "@material-ui/core";
import { UserContext } from "../contexts/UserContext";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

const style = {
  list: "px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white text-gray-200 md:mt-0  hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",
  hoverList:
    "px-2 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white text-gray-200 md:mt-0 text-gray-900 focus:text-gray-900 bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 390,
    bgcolor: "rgba(0,0,0,1)",
    border: "2px solid #000",
    borderRadius: "20px",
    p: 2,
    color: "white",
    boxShadow: "1px 1px 5px #888888",
  },
  email: {
    borderRadius: "10px",
    width: "100%",
    borderStyle: "none ",
    outline: "none",
    padding: "4px",
    paddingLeft: "5px",
    color: "black",
  },
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

export default function Home() {
  const classes = useStyles();

  const {
    formData,
    open,
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
    email,
    setEmail,
  } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMobileMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div>
        <Fragment>
          <Nav className={colorChange ? "navbar colorChange" : "navbar"}>
            <NavContainer className="container">
              <NavLogo href="#">
                <div className="py-4">
                  <img src={logo} alt="logo" className="h-12" />
                </div>
              </NavLogo>
              {/* <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Dashboard
              </Button> */}
              <MobileIcon
                id="menu-button"
                aria-controls={openMobileMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMobileMenu ? "true" : undefined}
                onClick={handleMenuClick}
              >
                <FaBars color="white" />
              </MobileIcon>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMobileMenu}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "menu-button",
                }}
              >
                {formData.walletConnected && (
                  <>
                    <MenuItem
                      className={style.hoverList}
                      href="#"
                      style={{
                        width: "180px",
                        height: "35px",
                        paddingTop: "8px",
                        textAlign: "center",
                      }}
                    >
                      <span className="text-md">
                        {truncate(formData.account)}
                      </span>
                    </MenuItem>
                    <MenuItem>
                      <span
                        className="text-md"
                        style={{ color: "#ce5316", paddingLeft: "5px" }}
                      >{`${formData.balance} Doge2.0`}</span>
                    </MenuItem>
                  </>
                )}
                <MenuItem>
                  {formData.walletConnected ? (
                    <div className="flex">
                      <button
                        className="flex-1 text-white border-0 rounded-lg py-2 px-4 text-sm primary__button transition ease-in duration-100 font-semibold focus:outline-none"
                        onClick={handleWalletDisconnect}
                      >
                        <span>Disconnect Wallet</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      className=" flex-1 text-white border-0 rounded-lg py-2 px-4 text-sm primary__button transition ease-in duration-100 font-semibold focus:outline-none"
                      onClick={handleWalletConnect}
                    >
                      Connect Wallet
                    </button>
                  )}
                </MenuItem>
              </Menu>
              <NavMenu className="">
                <NavItem>
                  {formData.walletConnected && (
                    <NavLinks
                      className={style.hoverList}
                      href="#"
                      style={{
                        float: "left",
                        height: "35px",
                        paddingTop: "8px",
                        marginTop: "24px",
                      }}
                    >
                      <span className="text-md">
                        {truncate(formData.account)}
                      </span>
                      <span
                        className="text-md"
                        style={{ color: "#ce5316", paddingLeft: "5px" }}
                      >{`${formData.balance} Doge2.0`}</span>
                    </NavLinks>
                  )}
                  <NavLinks
                    style={{
                      float: "left",
                      marginTop: "24px",
                      marginRight: 0,
                      marginLeft: 0,
                    }}
                  >
                    {formData.walletConnected ? (
                      <div className="flex">
                        <button
                          className="flex-1 text-white border-0 rounded-lg py-2 px-4 text-sm primary__button transition ease-in duration-100 font-semibold focus:outline-none"
                          onClick={handleWalletDisconnect}
                        >
                          <span className="sm:block hidden">
                            Disconnect Wallet
                          </span>
                          <span className="sm:hidden block">D</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        className=" flex-1 text-white border-0 rounded-lg py-2 px-4 text-sm primary__button transition ease-in duration-100 font-semibold focus:outline-none"
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
          <div style={{ overflowY: "scroll" }}></div>
        </Fragment>
        <div className={classes.root}></div>

        <div
          className="bg-gray-200 bg-center bg-cover"
          style={{ backgroundImage: `url(${BG})` }}
        >
          <Banner />
        </div>

        {/* AIRDROP SECTION */}
        <div className="bg-black">
          <div className="container mx-auto text-white">
            <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
              <div className="px-10 xl:py-44 lg:py-40 md:py-36 py-20">
                <div className="text-center flex-1 rounded-lg overflow-hidden">
                  <div className="py-1 text-4xl font-black uppercase mb-5">
                    Airdrop
                  </div>
                  <div>
                    <button
                      className="flex-1 text-white border-0 rounded-lg py-5 p-2 text-sm primary__button transition ease-in duration-100 uppercase w-4/5 font-semibold focus:outline-none"
                      onClick={handleOpen}
                    >
                      Claim NEMESIS TOKENS
                    </button>
                  </div>
                  <div className="py-2">
                    Claim to get Nemesis Downfall Tokens. Claim NO LIMIT
                  </div>
                  <div className="font-bold">1 DOGE2.0 = 1 NEMESIS</div>
                </div>
              </div>
              <div className="py-20">
                <div className="my-auto" style={{ height: "400px" }}>
                  <img src={Air} alt="airdrop" className="mx-auto h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        keepMounted
        open={open}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style.box}>
          <h1 className="text-xl">
            {" "}
            Claim {formData.balance} NEMESIS DOWNFALL tokens{" "}
          </h1>
          <hr className="mt-2 mb-3" />

          <div>
            <label>Email : </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control border-0 w-auto"
              style={style.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div>
              <label className="text-xs">
                <Checkbox
                  checked={isChecked4}
                  onChange={(e) => setIsChecked4(e.target.checked)}
                  style={{ color: "#ce5316" }}
                  size="small"
                />
                I agree for email conformation
              </label>
            </div>

            <label className="text-xs">
              <Checkbox
                checked={isChecked5}
                onChange={(e) => setIsChecked5(e.target.checked)}
                style={{ color: "#ce5316" }}
                size="small"
              />
              <span>
                Have you transferred Doge2 from a centralized exchange ?
              </span>
            </label>
          </div>

          <div className="text-sm">
            <div>
              <label>
                <Checkbox
                  checked={isChecked1}
                  onChange={(e) => setIsChecked1(e.target.checked)}
                  style={{ color: "#d69637" }}
                  size="small"
                />
                Subscribe to our{" "}
                <span style={{ color: "#d69637" }}>
                  <a
                    href="https://t.me/NemesisDownfall"
                    target="_blank"
                    rel="noreferrer"
                  >
                    telegram
                  </a>
                </span>{" "}
                channel
              </label>
            </div>
            <div>
              <label>
                <Checkbox
                  checked={isChecked2}
                  onChange={(e) => setIsChecked2(e.target.checked)}
                  style={{ color: "#d69637" }}
                  size="small"
                />
                Subscribe to our{" "}
                <span style={{ color: "#d69637" }}>
                  <a
                    href="https://discord.com/invite/nemesisdownfall"
                    target="_blank"
                    rel="noreferrer"
                  >
                    discord
                  </a>
                </span>{" "}
                channel
              </label>
            </div>
            <div>
              <label>
                <Checkbox
                  checked={isChecked3}
                  onChange={(e) => setIsChecked3(e.target.checked)}
                  style={{ color: "#d69637" }}
                  size="small"
                />
                Follow us on our{" "}
                <span style={{ color: "#d69637" }}>
                  <a
                    href="https://twitter.com/NemesisGame_"
                    target="_blank"
                    rel="noreferrer"
                  >
                    twitter
                  </a>
                </span>{" "}
                channel
              </label>
            </div>
          </div>
          <hr className="my-3" />
          <div className="flex mt-2 gap-4 justify-end">
            <div>
              <button
                className="text-white border-0 rounded-lg py-3 w-40 text-sm primary__button uppercase font-semibold"
                onClick={handleAddAccount}
              >
                Claim
              </button>
            </div>
            <div className="">
              <button
                className="text-white border-0 rounded-lg py-3 w-40 text-sm secondary__button uppercase font-semibold"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
