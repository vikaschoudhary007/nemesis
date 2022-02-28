import React, { Fragment, useContext, useEffect, useState } from 'react'
import { approveUser, deleteUser, getUsers } from '../helpers/api';
import {Box,Grid, MenuItem, Menu} from "@material-ui/core"
import {
  Nav,
  NavContainer,
  NavLogo,
  NavItem,
  NavLinks,
  NavMenu,
  MobileIcon,
} from "../components/NavbarStyles";
import logo from "../assets/images/logo.png";
import ReactExport from "react-data-export"
import * as c from "../helpers/const"
import { FaBars } from "react-icons/fa";
import { UserContext } from '../contexts/UserContext';
import { makeStyles } from "@material-ui/core/styles";


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ADMIN_ADDRESS = c.ADMIN_ADDRESS;

const style = {
  list: "px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",
  hoverList:
    "px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white text-gray-200 md:mt-0 md:ml-4 text-gray-900 focus:text-gray-900 bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",

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

export default function ShowAccounts() {
  const classes = useStyles();
  const {colorChange,notifySuccess, notifyError, formData, handlePayDoge, truncate, handleWalletConnect, handleWalletDisconnect} = useContext(UserContext)

  const [accountData, setAccountData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMobileMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUsers()
      // console.log("data",response.data)
      setAccountData(response.data)
    }

    fetchData()
  },[])


  const DataSet = [
    {
      columns : [
        {title: "Address", style: {font: {sz: "18", bold:true}}, width: {wpx: 125}},
        {title: "Balance", style: {font: {sz: "18", bold:true}}, width: {wpx: 125}},
        {title: "Status", style: {font: {sz: "18", bold:true}}, width: {wpx: 125}},
        {title: "DogePayment", style: {font: {sz: "18", bold:true}}, width: {wpx: 125}}
      ],
      data: accountData.map((data) => [
        {value: data.account, style: {font: {sz: "14"}}},
        {value: data.balance, style: {font: {sz: "14"}}},
        {value: data.status, style: {font: {sz: "14"}}},
        {value: data.dogePayment, style: {font: {sz: "14"}}},
      ])

    }
  ]

  const displayPendingAccounts = (accountData) => {

    if(!accountData.length) return null;

    return accountData.map((value, index) => {
      if(value.status === "pending"){
        return <div style={{marginBottom:"15px"}}>
          <li key={index} style={{listStyleType:"decimal", paddingLeft:"10px"}}>{value.account}</li><br/>
          <li style={{ float:"left", paddingLeft:"10px"}}><span style={{color:"#ce5316"}}>Balance : {value.balance}</span></li>
          <button className="text-white border-0 rounded-lg hover:bg-yellow-400 py-1 p-2 text-sm primary__button uppercase font-semibold" 
          style={{marginLeft:"15px",}}
          onClick={() => handleApprove(value.account)}
          >
          approve
          </button>
          {
            value.dogePayment === "required" ?
            (
              <button className="text-white border-0 rounded-lg hover:bg-yellow-400 py-1 p-2 text-sm secondary__button uppercase font-semibold" 
                style={{marginLeft:"15px",}}
                onClick={() => handlePayDoge(value.account, c.DOGE_AMOUNT)}
                >
                pay doge2.0
                </button>
            ) : null
          }
        </div>
      }
    })
  }

  
  const displayApprovedAccounts = (accountData) => {

    if(!accountData.length) return null;

    return accountData.map((value, index) => {
      if(value.status === "approved"){
        return <div style={{marginBottom:"15px"}}> 
          <li key={index} style={{listStyleType:"decimal", paddingLeft:"10px"}}>{value.account}</li><br />
          <li style={{ float:"left", paddingLeft:"10px", }}>
            <span style={{color:"#ce5316"}}>Balance : {value.balance}</span>
          </li>
          <button className="text-white border-0 rounded-lg hover:bg-yellow-400 py-1 p-2 text-sm primary__button uppercase font-semibold" 
          style={{marginLeft:"15px",}}
          onClick={() => handleDelete(value.account)}
          >
          delete
          </button>
        </div>
      }
    })
  }

  const handleApprove = async(account) => {
    try{
      const status = "approved";
      await approveUser(account,status)
      notifySuccess("Approve Successful")
      window.location.reload()
    }catch(err){
      notifyError("Something went wrong")
    }
  }

  const handleDelete = async (account) => {
    try{
      await deleteUser(account)
      notifySuccess("Successfully deleted")
      window.location.reload()
    }
    catch(e){
      notifyError("Something went wrong")
    }
  }



  return (
    <div style={{backgroundColor:"black"}}>
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

      <div className=" justify-between gap-24 px-24 bg-black text-white" style={{height:"100vh",overflowY:"scroll",overflowX:"inherit",paddingBottom:"30px"}}>
       {
         (formData.loaded && formData.netId == 56) ? 
         (
           <>
           {
             formData.account == ADMIN_ADDRESS ?
             (
              <div className=" flex-1 rounded-lg my-auto" >
          <div className="py-5 text-4xl font-black uppercase mb-5" style={{paddingTop:"100px"}}>Claimed Addresses</div>
          <div style={{float:"right"}}>
            {
              accountData.length !== 0 ? (
                <ExcelFile
                  filename="User Data"
                  element={<button type='button' className='text-white border-0 rounded-lg hover:bg-yellow-400 py-1 p-2 text-sm primary__button uppercase font-semibold focus:outline-none'>
                  Export Excel</button>}>
                  <ExcelSheet dataSet={DataSet} name="User Data Report"></ExcelSheet>
                </ExcelFile>    
              ): null
            }
          </div> 
         
            <Grid container spacing={2}>
              <Grid item xs={12} md={8} lg={8} xl={4}>
                <span style={{color:"#ce5316"}}>Pending Accounts</span>
                <div style={{marginTop:"10px"}}>
                  <ol>{displayPendingAccounts(accountData)}</ol>
                </div>
              </Grid>
              <Grid item xs={12} md={4}  lg={4} xl={6}>
              <span style={{color:"#d69637"}}>Approved Accounts</span>
                <div style={{marginTop:"10px"}}>
                  <ol>{displayApprovedAccounts(accountData)}</ol>
                </div>
              </Grid>
            </Grid>
        </div>
             ) : null
           }
           </>
          ) : null
       } 
      </div>
    </Fragment>
    </div>
  )
}
