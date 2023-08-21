import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Button, ButtonGroup} from "@nextui-org/react";
import { ethers } from "ethers";
import * as abi from "../ABIs/abis";

const Header = ({user_address}) =>  {
    const truncatedAddress = `${user_address.slice(0, 7)}...${user_address.slice(-5)}`;
    return (
        <div className="header space">
            <Link
                key='home'
                className="header textStyle"
                to='/home'
            >
                <h2 className="header textStyle">bonfire 🔥🪵</h2>
            </Link>
            <span text={user_address}>user: {truncatedAddress}</span>
        </div >
    );

}

const Signup = () => {
    const [ethAddress, setEthAddress] = useState("");
    
    useEffect(()=>{
        getWallet()
    }, []);

    const getWallet = async () => {
        const { ethereum } = window;
    
        return ethereum.request({ method: 'eth_requestAccounts' })
            .then((accounts) =>
                setEthAddress(accounts[0])
            )
    }

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

    const titleStyle = {
        margin: '30px',
        fontSize: '40px',
        color: 'black',
        textAlign: 'center',
    }

    const onButtonClick = async () => {
        const { ethereum } = window;
        const BONFIRE_FACTORY_CONTRACT_ADDRESS = "0x96D7cCfa8cB77CD5E807d88967D31940b8258EcF";
        const provider = new ethers.BrowserProvider(ethereum, "any");
        const factoryContract = new ethers.Contract(
            BONFIRE_FACTORY_CONTRACT_ADDRESS,
            abi.bonfireFactoryabi.abi,
            await provider.getSigner()
        );
            
        try{
            const tx = await factoryContract.createContract();
            console.log(tx);
            window.location = '/home';
        }
        catch(err){
             console.log(err);
        }
    }


    return (
        <div>
            <Header user_address={ethAddress}/>
            <div style={space_horizontal}>
                <div style={space_vertical}>
                    <h1 style={titleStyle}>
                       create a personal smart contract to get started!
                    </h1>
                    <Button onClick={onButtonClick}>create contract</Button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
