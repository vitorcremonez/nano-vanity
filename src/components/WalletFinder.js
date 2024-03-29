import React from 'react';
import Numbers from '../helpers/Numbers';
import WalletModal from './WalletModal';
import Worker from "worker-loader!../helpers/app.worker"; /* eslint import/no-webpack-loader-syntax: off */
import {
    Button,
    UncontrolledTooltip,
    UncontrolledCollapse,
} from 'reactstrap';
import moment from 'moment';

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
            this.clean(true);
        }
    }

    search() {
        if (typeof(this.worker) === "undefined") {
            this.setState({running:true});
            this.worker = new Worker();
            this.worker.onmessage = (event) => {
                if (event.data.action === "finished" && event.data.wallet) {
                    this.setState({
                        wallet: event.data.wallet,
                        aps: event.data.aps,
                        attempts: event.data.attempts,
                        average_aps: event.data.average_aps,
                        elapsed: event.data.elapsed,
                    });
                    this.terminate();
                } else if (event.data.action === "update") {
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

    clean(preserveWallet = false) {
        console.log('clean');
        this.setState({
            attempts: 0,
            average_aps: 0,
            aps: 0,
            elapsed: 0,
            wallet: preserveWallet ? this.state.wallet : null,
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

    getExtimative(extimative_attempts, average_aps) {
        let extimative_seconds = Math.round(extimative_attempts / this.state.average_aps);
        let isOverEvaluated = false;
        if (extimative_seconds > 126144000000) { // 4k years =S
            isOverEvaluated = true;
        }
        if (!this.props.isValidPrefix) {
            return 'Insert a valid prefix, or wait forever!'
        }
        if (average_aps === 0) {
            return 'Press search to calculate it...';
        }
        return isOverEvaluated ? 'It is too much thousands years... Just give up!' : moment().add(extimative_seconds, 'seconds').fromNow(true);
    }

    render() {
        const extimative_attempts = this.props.isValidPrefix ? Math.pow(32, this.props.prefix.length) : Infinity;

        return (
            <div>
                <div className={'mb-3'} style={{color: this.state.running ? 'gray' : 'lightgray'}}>
                    <h3>
                        {this.numbers.addThousandsSeparator(this.state.attempts)}
                        {' '}
                        <small>attempts</small>
                    </h3>
                    <div id={'aps'}>
                        <UncontrolledTooltip placement="top" target={'aps'}>
                            {'average ' + this.numbers.addThousandsSeparator(Math.round(this.state.average_aps)) + ' aps'}
                        </UncontrolledTooltip>
                        {this.numbers.addThousandsSeparator(this.state.aps)} <small>attempts per second</small>
                    </div>
                    <div>
                        <div className={'cursor-pointer'} id={'extimative-toggler'}>
                            <small>extimative</small> {this.numbers.addThousandsSeparator(extimative_attempts)} <small>attempts</small>
                        </div>
                        <UncontrolledCollapse toggler="#extimative-toggler">
                            <div className={'small'}>
                                { this.getExtimative(extimative_attempts, this.state.average_aps) }
                            </div>
                        </UncontrolledCollapse>
                    </div>
                </div>

                { !this.state.running && this.state.wallet ? this.renderWallet() : null}

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