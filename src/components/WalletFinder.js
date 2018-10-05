import React from 'react';
import Numbers from '../helpers/Numbers';
import WalletModal from './WalletModal';
import Worker from "worker-loader!../helpers/app.worker"; /* eslint import/no-webpack-loader-syntax: off */
import {
    Button,
} from 'reactstrap';

class WalletFinder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attempts: 0,
            average_aps: 0,
            aps: 0,
            elapsed: 0,
            wallet: null,
            running: false,
        };
        this.numbers = new Numbers();
    }

    componentDidUpdate(prevProps) {
        if (this.props.prefix !== prevProps.prefix) {
            this.terminate();
            this.clean();
        }
    }

    search() {
        if (typeof(this.worker) === "undefined") {
            this.setState({running:true});
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

    clean() {
        this.setState({
            attempts: 0,
            average_aps: 0,
            aps: 0,
            elapsed: 0,
            wallet: null,
            running: false,
        });
    }

    terminate() {
        if (typeof(this.worker) !== "undefined") {
            this.setState({running:false});
            this.worker.terminate();
            this.worker = undefined;
        }
    }

    renderWallet = () => (
        <div className={'cursor-pointer mb-4'} onClick={() => this.walletModal.toggle()}>
            <WalletModal
                seed={this.state.wallet ? this.state.wallet.seed : undefined}
                ref={ref => this.walletModal = ref}
            />
            <h5 className={'responsive-text p-2'}>
                {this.state.wallet ? this.state.wallet.public_address : null}
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
                <div className={'mb-3'} style={{color: this.state.running ? 'gray' : 'lightgray'}}>
                    <h3>
                        {this.numbers.addThousandsSeparator(this.state.attempts)}
                        {' '}
                        <small>attempts</small>
                    </h3>
                    <div title={'average of ' + Math.round(this.state.average_aps) + ' attempts per second'}>
                        {this.numbers.addThousandsSeparator(this.state.aps)} <small>attempts per second</small>
                    </div>
                    <div>
                        <small>extimative</small> {this.numbers.addThousandsSeparator(Math.pow(32, this.props.prefix.length))} <small>attempts</small>
                    </div>
                </div>

                { !this.state.running ? this.renderWallet() : null}

                <Button outline color="primary" size="sm" onClick={() => this.search()} disabled={this.state.running}>
                    Search
                </Button>
                <Button outline color="primary" size="sm" onClick={() => this.terminate()} disabled={!this.state.running} className={'ml-2'}>
                    Cancel
                </Button>
            </div>
        );
    }
}

export default WalletFinder;