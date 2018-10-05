import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import { QRCode } from 'react-qr-svg';

class WalletModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Wallet
                    </ModalHeader>
                    <ModalBody className={'text-center'}>
                        <h2>
                            <b>SEED</b>
                        </h2>
                        <h2>
                            <QRCode
                                style={{ width: 128 }}
                                value={this.props.seed}
                            />
                        </h2>
                        <p className={'responsive-text'}>
                            {this.props.seed}
                        </p>

                        <div className={'small'} style={{color:'#AAA'}}>
                            Copy your SEED and save to use in the <a href={'https://vitorcremonez.github.io/nano-paper-wallet/'} target={'_blank'}>paperwallet</a> or importing in your favorite wallet
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default WalletModal;