'use strict';

import React from 'react';

require('styles/ClientButton.scss');

let ClientButtonPastComponent = (props) => (
  <button className="clientbutton-component">
    { props.text }
  </button>
);

ClientButtonPastComponent.displayName = 'ClientButtonPastComponent';

// Uncomment properties you need
// ClientButtonComponent.propTypes = {};
// ClientButtonComponent.defaultProps = {};

export default ClientButtonPastComponent;
