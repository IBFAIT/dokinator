'use strict';

import React from 'react';

let ClientButtonPastComponent = (props) => (
  <div className="clientbuttonpast-component">
  <div>
    <div className="icon">ClientName is very long hey </div>
    <div className="text">
      { props.text }
    </div>
    </div>
  </div>
);

ClientButtonPastComponent.displayName = 'ClientButtonPastComponent';

// Uncomment properties you need
// ClientButtonComponent.propTypes = {};
// ClientButtonComponent.defaultProps = {};

export default ClientButtonPastComponent;
