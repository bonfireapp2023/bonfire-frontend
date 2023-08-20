import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Images from "../components/images";
import HealthRecord from '../components/health';


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
    const leftBar = {
        float: 'left',
        width: '15%',
        textAlign: 'right',
        padding: '10px',
        fontSize: '24px',
    }

    const rightSection = {
        float: 'right',
        width: '80%',
        padding: '10px',
        textAlign: 'center',
    }

    const tabsStyle = {
        cursor: 'pointer',
    }

    const side_items = [
        { content: 'Images', subpage: <Images /> },
        { content: 'Health Records', subpage: <HealthRecord /> },
    ]

    const [selectedTab, setSelectedTab] = useState(0)

    const select = (id) => {
        setSelectedTab(id)
    }

    return (
        <div>
            <Header user_address={ethAddress}/>
            <div>
                <div style={leftBar}>
                    <div style={tabsStyle}>
                        {
                            side_items.map((item, index) => {
                                return <p
                                    key={index}
                                    onClick={() => select(index)}
                                    style={selectedTab === index ? {
                                        //underline
                                        textDecoration: 'underline',

                                    } : {}}
                                >
                                    {item.content}
                                </p>
                            })
                        }
                    </div>
                </div>

                <div style={rightSection}>
                    {
                        side_items[selectedTab].subpage
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;
