import React from 'react';
import '../styles/fonts.css';
import metamask_fox from '../images/MetaMask_Fox.png';
import { MetaMaskSDK } from '@metamask/sdk';


const ConnectWalletButton = ({ connect_wallet }) => {
    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 10,
        color: 'white', // force color here since background changes
    };

    const imageStyle = {
        width: '40px',
        height: '40px',
    };

    return (
        <button style={{ ...buttonStyle }} onClick={connect_wallet}>
            <img style={imageStyle} src={metamask_fox} alt=""/>
            Connect with MetaMask
        </button>
    );
};

const connect_wallet = async () => {
    const MMSDK = new MetaMaskSDK();
    //const ethereum = MMSDK.getProvider(); 
    const { ethereum } = window;

    await ethereum
        .request({ method: 'eth_requestAccounts'})
        .then((accounts) => {
            console.log("addrerss:", accounts[0])
        })
        .then(() => (window.location = '/home'))
        .catch((err) => console.log(err));
  };

const Landing = () => {
    const space_horizontal = {
        display: 'flex',
        width: '100vw', /* 100% of the viewport width */
        height: '90vh', /* 100% of the viewport height */
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

    return (
        <div>
           
            <div style={space_horizontal}>
                <div style={space_vertical}>
                    <h1 style={{ margin: '30px' }}>
                        Welcome to Bonfire 🔥🪵
                    </h1>
                    <ConnectWalletButton connect_wallet={connect_wallet} />
                </div>
            </div>
        </div>
    );
};

export default Landing;
