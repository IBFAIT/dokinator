'use strict';

import React from 'react';

require('styles/ClientButton.scss');

let ClientButtonComponent = (props) => (
  <button className="clientbutton-component" onClick={(e)=>props.updatePathState(e,props)}>
    { props.text }
  </button>
);

ClientButtonComponent.displayName = 'ClientButtonComponent';

// Uncomment properties you need
// ClientButtonComponent.propTypes = {};
// ClientButtonComponent.defaultProps = {};

export default ClientButtonComponent;
