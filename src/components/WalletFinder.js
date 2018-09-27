import React from 'react';

let MyWorker = import("worker!../helpers/Vanity.js");

class WalletFinder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attempts: 0,
        };
        this.worker = new MyWorker();
    }

    search() {

        this.worker.onmessage = function(attempts) {
            console.log(attempts);
        };
        //const wallet = vanity.findWallet(this.props.prefix, (attempts) => this.setState({attempts}));
        //alert(wallet.seed);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.search()}>
                    search
                </button>
                {this.props.prefix} ({this.state.attempts})
            </div>
        );
    }
}

export default WalletFinder;