import React, { Component } from 'react';
import bond from '../images/bond.png';

class BondExample extends Component {
    state = {}
    render() {
        return (
            <div style={{ width: '70%', margin: 'auto', paddingTop: '5em' }}>
                <img src={bond} alt="savings bond" style={{ height: '100%', width: '100%', marginBottom: '2em' }}></img>
            </div>);
    }
}

export default BondExample;