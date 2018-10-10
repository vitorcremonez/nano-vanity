import React, {Component} from 'react';
import '../styles/App.css';
import Header from './Header';
import PrefixPicker from "./PrefixPicker";
import WalletFinder from './WalletFinder';
import Footer from './Footer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numeric_prefix: '',
            prefix: '',
            isValidPrefix: true,
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
                        onChangePrefix={(prefix, isValidPrefix) => {
                            this.setState({
                                prefix: prefix,
                                isValidPrefix: isValidPrefix,
                            });
                        }}
                    />
                </div>
                <WalletFinder
                    prefix={this.state.prefix}
                    isValidPrefix={this.state.isValidPrefix}
                />
                <Footer/>
            </div>
        );
    }
}

export default App;
