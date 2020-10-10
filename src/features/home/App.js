import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
//  notistack
import { SnackbarProvider } from 'notistack';
//  core components
import { Notifier } from "features/common"
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import FooterLinks from 'components/Footer/FooterLinks.js'
//  @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//  hooks
import { useConnectWallet, useDisconnectWallet } from './redux/hooks';
//  i18n
import i18next from 'i18next';
//  web3Modal
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
//  core pages
//  style for this page
import appStyle from "./jss/appStyle.js";
import bgImage from "assets/img/dv_bg.jpg";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(appStyle);

export default function App({ children }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { connectWallet, web3, address, networkId, connected, connectWalletPending } = useConnectWallet();
  const { disconnectWallet } = useDisconnectWallet();
  const [web3Modal, setModal] = useState(null)
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    bg: {
      backgroundColor:"#111",
      backgroundSize: 'cover',
    }
  });
  var darked = true;
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    darked = event.target.checked;
    console.log(darked)
    if (darked == true) {
      setState({
        ...state, bg: {
          background: "#111"
        }, [event.target.name]: event.target.checked
      })
    } else {
      setState({
        ...state, bg: {
          background: 'no-repeat center/100% url(' + bgImage + ')',
          backgroundSize: 'cover',
        }, [event.target.name]: event.target.checked
      })
    }
  };


  useEffect(() => {
    const newModal = new Web3Modal({
      network: process.env.NETWORK ? process.env.NETWORK : "mainet",
      cacheProvider: true,
      providerOptions: {
        injected: {
          display: {
            name: "Injected",
            description: i18next.t('Home-BrowserWallet')
          },
        },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: process.env.INFURA_ID
          }
        }
      }
    })
    setModal(newModal)
  }, [setModal])



  useEffect(() => {
    if (web3Modal && (web3Modal.cachedProvider || window.ethereum)) {
      connectWallet(web3Modal);
    }
  }, [web3Modal, connectWallet, window.ethereum])

  useEffect(() => {
    if (web3 && address && !connectWalletPending && networkId && Boolean(networkId !== Number(process.env.NETWORK_ID))) {
      alert(t('App-SnackBarText'))
    }
  }, [web3, address, networkId])

  return (
    <SnackbarProvider>
      <div className={classes.page} style={state.bg}>
        <Header
          brand="DARK"
          links={
            <HeaderLinks
              dropdownHoverColor="dark"
              address={address}
              connected={connected}
              connectWallet={() => connectWallet(web3Modal)}
              disconnectWallet={() => disconnectWallet(web3, web3Modal)}
            />
          }
          color="dark"
        />

        <div className={classes.container}>
          <Grid style={{ margin: '0 0 20px 92.5%' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="DARK"
            /></Grid>
          <div className={classes.children}>
            {Boolean(networkId === Number(process.env.NETWORK_ID)) && children}
            <Notifier />
          </div>
          <FooterLinks />
        </div>
      </div>
    </SnackbarProvider>
  );
}
