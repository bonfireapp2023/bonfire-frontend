import React, { useEffect, useState } from 'react';


const Home = () => {
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
         <div style={space_horizontal}>
            <div style={space_vertical}>
                <h1>
                    welcome user {ethAddress}
                </h1>
            </div>
        </div>
        

    );
};

export default Home;
