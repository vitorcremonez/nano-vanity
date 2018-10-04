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
                <WalletFinder
                    prefix={this.state.prefix}
                />

                <WalletFinder
                    prefix={this.state.prefix}
                />

                <WalletFinder
                    prefix={this.state.prefix}
                />

                <WalletFinder
                    prefix={this.state.prefix}
                />

                <WalletFinder
                    prefix={this.state.prefix}
                />
                <Footer/>
            </div>
        );
    }
}

export default App;
