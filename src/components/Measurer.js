import React from 'react';

class Measurer extends React.Component {
    render() {
        return (
            <div style={{
                position:'relative',
            }}>
                {this.props.children}
                <div style={{
                    position:'absolute',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: '#DDD',
                    borderTop: 'none',
                    height:5,
                    bottom: -8,
                    right:0,
                    left:0,
                }}>
                    <div style={{
                        color: '#DDD',
                        position: 'absolute',
                        right: 0,
                        left: 0,
                        justifyContent: 'center',
                        display: 'flex',
                        marginTop: 6,
                    }}>
                        <small>
                            {this.props.length}
                        </small>
                    </div>
                </div>
            </div>
        );
    }
}

export default Measurer;