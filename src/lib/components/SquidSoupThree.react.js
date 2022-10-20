import React from 'react';
import PropTypes from 'prop-types';

import {Stage} from '../three/stage'

function SquidSoupThree(props) {
    return (
        <div id={props.id} style={{"height":"100%", "width":"100%", "position": "relative"}}>
            <Stage {...props}/>
        </div>
    )
}

SquidSoupThree.defaultProps = {

};

SquidSoupThree.propTypes = {
    /**
     * The ID used to identify the container for the IFC viewer component.
     */
    id: PropTypes.string.isRequired
};

export default SquidSoupThree;