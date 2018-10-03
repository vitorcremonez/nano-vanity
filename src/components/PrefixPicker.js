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
                                color: 'red',
                            }}
                            onChange={(event) => {
                                const prefix = event.target.value;
                                this.setState({prefix:prefix});
                                this.props.onChangePrefix(prefix);
                            }}
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
                <h5 style={{color:'red'}}>
                    Just alphanumeric characters except: L - V - 0 - 2
                </h5>
            </div>
        );
    }
}

export default PrefixPicker;