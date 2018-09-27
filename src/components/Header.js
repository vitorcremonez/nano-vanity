import React from 'react';
import NanoLogo from '../assets/images/nano-logo.png';

const Header = () => {
    return (
        <div style={{marginBottom: 100}}>
            <img
                src={NanoLogo}
                width={150}
            />
            <div style={{
                color:'#AAA',
                fontWeight:'bold',
                fontSize:20,
            }}>
                NANO VANITY
            </div>
        </div>
    );
};

export default Header;