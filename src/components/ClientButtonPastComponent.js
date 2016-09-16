'use strict';

import React from 'react';

let ClientButtonPastComponent = (props) => (
  <button className="clientbuttonpast-component">
    { props.text }
  </button>
);

ClientButtonPastComponent.displayName = 'ClientButtonPastComponent';

// Uncomment properties you need
// ClientButtonComponent.propTypes = {};
// ClientButtonComponent.defaultProps = {};

export default ClientButtonPastComponent;
