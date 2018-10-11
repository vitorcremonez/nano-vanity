import React from 'react';
import NanoLogo from '../assets/images/nano-logo.png';

const Header = () => {
    return (
        <div className={'p-3'} style={{marginBottom: 64}}>
            <a href={'./'}>
                <img
                    alt={'NANO VANITY'}
                    src={NanoLogo}
                    width={150}
                />
            </a>
            <div style={{
                color:'#AAA',
                fontWeight:'bold',
                fontSize:20,
            }}>
                NANO VANITY
            </div>
            <small style={{color:'#DDD'}}>
                version BETA
            </small>
        </div>
    );
};

export default Header;