import React from 'react';
import worker from '../helpers/app.worker.js';
import WebWorker from '../helpers/WebWorker';

class WalletFinder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attempts: 0,
        };

    }

    search() {
        if (typeof(this.worker) === "undefined") {
            this.worker = new WebWorker(worker);
            this.worker.onmessage = (event) => {
                console.log('ON WalletFinder', event.data);
            };
        }
        this.worker.postMessage(this.props.prefix);

        //setTimeout(() => {
        //    const vanity = new Vanity();
        //    const wallet = vanity.findWallet(this.props.prefix, (attempts) => this.setState({attempts}));
        //    alert(wallet.seed);
        //}, 1000);
        //const wallet = vanity.findWallet(this.props.prefix, (attempts) => this.setState({attempts}));
        //alert(wallet.seed);
    }

    terminate() {
        this.worker.terminate();
        this.worker = undefined;
    }

    render() {
        return (
            <div>
                <button onClick={() => this.search()}>
                    search
                </button>
                <button onClick={() => this.terminate()}>
                    terminate
                </button>
                {this.props.prefix} ({this.state.attempts})
            </div>
        );
    }
}

export default WalletFinder;