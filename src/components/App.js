import React, {Component} from 'react';
import '../styles/App.css';
import PrefixPicker from "./PrefixPicker";

class App extends Component {
    render() {
        return (
            <div style={{textAlign:'center'}}>
                <div>
                    NANO VANITY
                </div>
                <div style={{padding:16}}>
                    <PrefixPicker
                        onChangeNumbericPrefix={() => {
                            console.log('Changed numeric prefix!');
                        }}
                        onChangePrefix={() => {
                            console.log('Changed prefix!');
                        }}
                    />

                    <small>attemps:</small> 60.466.176 attemps<br/>
                    <small>extimative:</small> 60.466.176<br/>
                </div>
                <br/>
                <br/>
                <br/>
                <button>
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
