import React, {Component} from 'react';
import '../styles/App.css';
import Header from './Header';
import PrefixPicker from "./PrefixPicker";
import WalletFinder from './WalletFinder';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numeric_prefix: '',
            prefix: '',
        };
    }

    render() {
        return (
            <div style={{textAlign:'center'}}>
                <Header/>
                <div style={{padding:16}}>
                    <PrefixPicker
                        onChangeNumbericPrefix={() => {
                            console.log('Changed numeric prefix!');
                        }}
                        onChangePrefix={(prefix) => {
                            this.setState({prefix: prefix});
                        }}
                    />
                </div>
                <br/>
                <br/>

                <WalletFinder
                    prefix={'lorem'}
                />

                <br/>
                <br/>
                <button onClick={() => alert(this.state.prefix)}>
                    FIND MY VANITY WALLET
                </button>

                <div>
                    <small>extimative:</small> 60.466.176 attemps
                </div>
            </div>
        );
    }
}

export default App;
