import React from 'react';
import Numbers from '../helpers/Numbers';
import Worker from "worker-loader!../helpers/app.worker"; /* eslint import/no-webpack-loader-syntax: off */

class WalletFinder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attempts: 0,
            average_aps: 0,
            aps: 0,
            wallet: null,
            isSearching: false,
        };
        this.numbers = new Numbers();
    }

    search() {
        if (typeof(this.worker) === "undefined") {
            this.setState({isSearching:true});
            this.worker = new Worker();
            this.worker.onmessage = (event) => {
                if (event.data.action === "finished" && event.data.wallet) {
                    console.log('Terminate', event.data);
                    this.setState({
                        wallet: event.data.wallet,
                        aps: event.data.aps,
                        attempts: event.data.attempts,
                        average_aps: event.data.average_aps,
                        elapsed: event.data.elapsed,
                    });
                    this.terminate();
                } else if (event.data.action === "update") {
                    console.log('Update', event.data);
                    this.setState({
                        aps: event.data.aps,
                        attempts: event.data.attempts,
                        average_aps: event.data.average_aps,
                        elapsed: event.data.elapsed,
                    });
                }
            };
        }
        this.worker.postMessage({
            action:'start',
            params:{
                prefix:this.props.prefix,
            },
        });
    }

    terminate() {
        if (typeof(this.worker) !== "undefined") {
            this.setState({isSearching:false});
            this.worker.terminate();
            this.worker = undefined;
        }
    }

    renderWallet = () => (
        <div>
            <h5>
                {this.state.wallet ? this.state.wallet.public_address : null}
            </h5>
            <h5>
                {this.state.wallet ? this.state.wallet.seed : null}
            </h5>
        </div>
    );

    renderLoading() {
        return (
            <div style={{padding:10}}>
                <img
                    title={`Nano Vanity is working at maximum to find a wallet with public address prefix "${this.props.prefix}"...`}
                    src={'https://media.giphy.com/media/BmmfETghGOPrW/giphy.gif'}
                    style={{
                        maxWidth: 400,
                        width: '100%',
                        boxShadow:'0px 5px 20px -10px black',
                        borderRadius:5,
                    }}
                />
            </div>
        );
    }

    render() {
        return (
            <div>
                <h2>
                    {this.numbers.addThousandsSeparator(this.state.attempts)}
                    {' '}
                    <small>attempts</small>
                </h2>
                <h5 title={'average of ' + Math.round(this.state.average_aps) + ' attempts per second'}>
                    {this.numbers.addThousandsSeparator(this.state.aps)} <small>attempts per second</small>
                </h5>
                <h5>
                    <small>extimative</small> {this.numbers.addThousandsSeparator(Math.pow(32, this.props.prefix.length))} <small>attempts</small>
                </h5>

                { this.state.isSearching ? this.renderLoading() : this.renderWallet()}

                <button onClick={() => this.search()}>
                    Search
                </button>
                <button onClick={() => this.terminate()}>
                    Cancel
                </button>
            </div>
        );
    }
}

export default WalletFinder;