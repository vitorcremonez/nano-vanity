import React from 'react';
import Measurer from './Measurer';
import Bracket, {
    LEFT_BRACKET,
    RIGHT_BRACKET,
} from './Bracket';

class PrefixPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prefix: '',
        };
    }

    isValidPrefix = (prefix) => {
        return /^[13-9a-km-uw-z]{0,59}$/.test(prefix);
    };

    render() {
        return (
            <div>
                <div style={{
                    height:54,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Measurer length={4}>
                        <span style={{
                            color: '#999',
                            fontSize: 24,
                            fontWeight: 'bold',
                        }}>
                            xrb_
                        </span>
                    </Measurer>

                    <Bracket
                        side={LEFT_BRACKET}
                    />

                    <Measurer length={1}>
                        <span className={'prefix-picker-letter'}>
                            <span style={{color:'black'}}>
                                1
                            </span>
                            {' '}
                            <small>or</small>
                            {' '}
                            <span style={{color:'black'}}>
                                3
                            </span>
                        </span>
                    </Measurer>

                    <Bracket
                        side={RIGHT_BRACKET}
                    />

                    <Bracket
                        side={LEFT_BRACKET}
                    />

                    <Measurer length={this.state.prefix.length} color={'red'}>
                        <input
                            type={'text'}
                            className={'prefix-picker-letter'}
                            style={{
                                border: 'none',
                                width: 64,
                                textAlign: 'center',
                                outline: 'none',
                                color: this.isValidPrefix(this.state.prefix) ? 'black' : 'red',
                            }}
                            onChange={(event) => {
                                const prefix = event.target.value;
                                this.setState({prefix:prefix});
                                this.props.onChangePrefix(prefix);
                            }}
                            maxLength={59}
                        />
                    </Measurer>

                    <Bracket
                        side={RIGHT_BRACKET}
                    />

                    <Measurer length={59 - this.state.prefix.length}>
                        <span className={'prefix-picker-letter'}>
                            xxx...xxx
                        </span>
                    </Measurer>
                </div>
                <h6 className={'small font-weight-bold mt-4'} style={{color:'red'}}>
                    {!this.isValidPrefix(this.state.prefix) ? 'Just alphanumeric characters except: L - V - 0 - 2' : ' '}
                </h6>
            </div>
        );
    }
}

export default PrefixPicker;