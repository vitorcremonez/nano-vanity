import React from 'react';
import Measurer from './Measurer';
import Bracket, {
    LEFT_BRACKET,
    RIGHT_BRACKET,
} from './Bracket';

class PrefixPicker extends React.Component {
    render() {
        return (
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

                <Measurer length={5} color={'red'}>
                    <input
                        type={'text'}
                        className={'prefix-picker-letter'}
                        style={{
                            border: 'none',
                            width: 64,
                            textAlign: 'center',
                            outline: 'none',
                            color: 'black',
                        }}
                        onChange={(event) => this.props.onChangePrefix(event.target.value)}
                    />
                </Measurer>

                <Bracket
                    side={RIGHT_BRACKET}
                />

                <Measurer length={49}>
                    <span className={'prefix-picker-letter'}>
                        xxx...xxx
                    </span>
                </Measurer>
            </div>
        );
    }
}

export default PrefixPicker;