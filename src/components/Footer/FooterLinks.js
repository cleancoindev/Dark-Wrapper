/* eslint-disable */
import React, { useEffect, useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import Footer from "components/Footer/Footer.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-pro-react/components/footerLinksStyle.js";
import classNames from "classnames";
import {
    grayColor,
    roseColor,
    primaryColor,
    secondaryColor,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    blackColor,
    whiteColor,
    twitterColor,
    facebookColor,
    googleColor,
    linkedinColor,
    pinterestColor,
    youtubeColor,
    tumblrColor,
    behanceColor,
    dribbbleColor,
    redditColor,
    instagramColor,
    hexToRgb
  } from "assets/jss/material-kit-pro-react.js";
const useStyles = makeStyles(styles);

const footerLinkArr = [
    {content:'Token Contract',href:'https://etherscan.io/address/0x3108ccfd96816f9e663baa0e8c5951d229e8c6da'},
    // {content:'CoinMarketCap',href:'https://coinmarketcap.com/zh/currencies/yearn-finance-ii/'},
    // {content:'CoinGecko',href:'https://www.coingecko.com/en/coins/dfi-money'},
    // {content:'Forum',href:'https://gov.dfi.money/'},
    // {content:'Stats',href:'https://stats.dfi.money/'},
    // {content:'Voting',href:'https://snapshot.page/#/dfi'},
    {content:'Documentation',href:'https://medium.com/@darkswap/darkswap-7bf717646aa0'},
    {content:'Uniswap DARK-ETH',href:'https://app.uniswap.org/#/swap?inputCurrency=0x3108ccfd96816f9e663baa0e8c5951d229e8c6da'},
];

export default function FooterLinks(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const color = props.color;
    const badgeClasses = classNames({
        [classes.container]: true,
        [classes.fixed]: props.fixed,
    });

    //留着控制底部联系方式的颜色
    const iconGroundStyle={
        width:'40px',
        height:'40px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        // fontSize: "1.25rem",
        borderRadius: "1.25rem",
        color:'white',
        // backgroundColor:primaryColor[0],
    }

    const iconColorStyle={
        fontSize: "24px",
        color: "#fff"
    }

    return (
        <div className={badgeClasses}>
            <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <Button
                    color={color}
                    className={
                        classes.navLink + " " + classes.socialIconsButton
                    }
                    href="https://twitter.com/Darkswap1"
                    target="_blank"
                    >
                    <i
                        style={iconColorStyle}
                        className={
                        "yfiiicon yfii-twitter"
                        }
                    />
                    </Button>
                </ListItem>
                
                <ListItem className={classes.listItem}>
                    <Button
                    color={color}
                    className={
                        classes.navLink + " " + classes.socialIconsButton
                    }
                    href="https://discord.com/invite/GS3c5D8"
                    target="_blank"
                    >
                    <i
                        style={iconColorStyle}
                        className={
                        "yfiiicon yfii-discord"
                        }
                    />
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                    color={color}
                    className={
                        classes.navLink + " " + classes.socialIconsButton
                    }
                    href="https://github.com/Ladarken/dVault"
                    target="_blank"
                    >
                    <i
                        style={iconColorStyle}
                        className={
                        "yfiiicon yfii-github"
                        }
                    />
                    </Button>
                </ListItem>                
            </List>
            <GridContainer className={classes.linkList} justify='center' align='center' >
                {
                    footerLinkArr.map((item)=>{
                        return (
                            <GridItem className={classes.linkItem} md={2} xs={6} key={item.content} >
                                <a className={classes.extraContent} href={item.href} target="_blank">{item.content}</a>
                            </GridItem >
                        )
                    })
                }
            </GridContainer>
        </div>
    )
}

FooterLinks.defaultProps = {
    color: "transparent",
    fixed:false
  };
  
FooterLinks.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "transparent",
        "white",
        "rose",
        "dark"
    ]),
    fixed: PropTypes.bool,
};
  