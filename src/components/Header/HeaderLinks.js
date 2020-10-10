/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';
import { renderIcon } from '@download/blockies'
// react components for routing our app without refresh
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from '@material-ui/core/Avatar';
// @material-ui/icons
import TranslateIcon from '@material-ui/icons/Translate';
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
// hooks
import { useTranslation } from 'react-i18next';


import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {



  let history = useHistory();
  const { dropdownHoverColor, connected, address, connectWallet, disconnectWallet } = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [lng, setLanguage] = useState('en');
  const [shortAddress, setShortAddress] = useState('');
  const [dataUrl, setDataUrl] = useState(null);
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!connected) return;
    const canvas = canvasRef.current
    renderIcon({ seed: address.toLowerCase() }, canvas)
    const updatedDataUrl = canvas.toDataURL()
    if (updatedDataUrl !== dataUrl) {
      setDataUrl(updatedDataUrl)
    }
    if (address.length < 11) {
      setShortAddress(address)
    } else {
      setShortAddress(`${address.slice(0, 6)}...${address.slice(-4)}`)
    }
  }, [dataUrl, address])

  let defaultTabValue = '';
  if (window.location.hash != '#/' && window.location.hash != '#/index') {
    defaultTabValue = window.location.hash.split('/')[1];
  }

  return (
    <List className={classes.list + " " + classes.mlAuto}>
      {/* DARK mode buton */}
      <ListItem className={classes.listItem}>

      </ListItem>

      <ListItem className={classes.listItem}>
        <Button
          style={{
            width: '180px',
            margin: '12px 0',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: '#4169e1',
            color: '#fff',
            boxShadow: '0 2px 2px 0 rgba(53, 56, 72, 0.14), 0 3px 1px -2px rgba(53, 56, 72, 0.2), 0 1px 5px 0 rgba(53, 56, 72, 0.12)',
          }}
          className={classes.Button}
          round
          type="button"
          color="primary"
          onClick={connected ? disconnectWallet : connectWallet}
        >
          {connected ? (
            <>
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              <Avatar alt="address" src={dataUrl} style={{
                width: '24px',
                height: "24px",
                marginRight: '4px',
              }} />{shortAddress}
            </>
          ) : (
              <>
                <i className={"yfiiicon yfii-help-circle"} style={{
                  width: '24px',
                  marginRight: '4px',
                }} />{t('Vault-Wallet')}
              </>
            )}
        </Button>
      </ListItem>
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};
