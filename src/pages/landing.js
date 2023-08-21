import React from 'react';
import '../styles/fonts.css';
import metamask_fox from '../images/MetaMask_Fox.png';
import background_picture from '../images/heartfire.jpg';
import { MetaMaskSDK } from '@metamask/sdk';
import { Link } from 'react-router-dom';
import "../styles/header.css"
import { ethers } from "ethers";
import * as abi from "../ABIs/abis";


import "../styles/landing.css"

const ConnectWalletButton = ({ connect_wallet }) => {
    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        border: "2px solid white",
        color: 'black', // force color here since background changes
        marginTop: 15,
        paddingRight: 5,
        
        cursor: 'pointer',
    };

    const imageStyle = {
        width: '40px',
        height: '40px',
    };

    return (
        <button style={{ ...buttonStyle }} onClick={connect_wallet}>
            <img style={imageStyle} src={metamask_fox} alt=""/>
            Login via MetaMask  
        </button>
    );
};

const connect_wallet = async () => {
    const MMSDK = new MetaMaskSDK();
    //const ethereum = MMSDK.getProvider(); 
    const { ethereum } = window;

    var user_address;
    await ethereum
        .request({ method: 'eth_requestAccounts'})
        .then((accounts) => {
            console.log("addrerss:", accounts[0])
            user_address = accounts[0];
        })
        //.then(() => (window.location = '/home'))
        .catch((err) => console.log(err));
    
    const BONFIRE_FACTORY_CONTRACT_ADDRESS = "0x96D7cCfa8cB77CD5E807d88967D31940b8258EcF";
    const provider = new ethers.BrowserProvider(ethereum, "any");
    const factoryContract = new ethers.Contract(
        BONFIRE_FACTORY_CONTRACT_ADDRESS,
        abi.bonfireFactoryabi.abi,
        provider
    );

    const tx = await factoryContract.getUserContract(user_address);
    console.log(tx);
    if(tx === "0x0000000000000000000000000000000000000000"){
        window.location = '/signup';
    }
    else{
        window.location = '/home';
    }

};

  
const Header = () =>  {
    return (
        <div className="header space">
            <Link
                key='home'
                className="header textStyle"
                to='/home'
            >
                {/*<h2 className="header textStyle">bonfire 🔥🪵</h2>*/}
                <h2 className="header textStyle">bonfire 🔥🪵</h2>
            </Link>
        </div >
    );
}

const Landing = () => {
    const space_horizontal = {
        display: 'flex',
        width: '100vw', /* 100% of the viewport width */
        height: '80vh', /* 100% of the viewport height */
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    };
    const space_vertical = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };
    const backgroundStyle = {
        backgroundImage: `url(${background_picture})`,
        backgroundSize: 'cover', /* Cover the entire container */
        backgroundPosition: "center center", /* Center the image */
        width: "100vw", /* 100% of the viewport width */
        height: "100vh", /* 100% of the viewport height */
        overflow: "hidden" /* Prevent scrollbars */
    }
    const titleStyle = {
        margin: '0px',
        fontSize: '50px',
        color: 'white',
        textAlign: 'center',
    }
    const textStyle = {
        margin: '0px',
        fontSize: '25px',
        color: 'white',
        textAlign: 'center',
    }

    return (
           <div style={backgroundStyle}>
            <Header />
            <div style={space_horizontal}>
                <div className="box" style={space_vertical}>
                    <div style={titleStyle}>
                        Welcome to Bonfire
                    </div>
                    <div style={textStyle}>
                        Your cloud that belongs to you
                    </div>
                    <ConnectWalletButton connect_wallet={connect_wallet}/>
                </div>
            </div>
        </div>
    );
};

export default Landing;
