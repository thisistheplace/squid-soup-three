/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';

import { SquidSoupThree } from '../lib';

class App extends Component {

    constructor() {
        super();
        this.state = {
            id: 'test'
        };
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    render() {
        return (
            <div>
                <SquidSoupThree
                    setProps={this.setProps}
                    {...this.state}
                />
            </div>
        )
    }
}

export default App;
