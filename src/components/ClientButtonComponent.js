'use strict';

import React from 'react';

let ClientButtonComponent = (props) => (
  <button className="clientbutton-component" onClick={(e)=>props.updatePathState(e,{path: props.path, answerIndex: props.index})}>
    { props.text }
  </button>
);

ClientButtonComponent.displayName = 'ClientButtonComponent';

// Uncomment properties you need
// ClientButtonComponent.propTypes = {};
// ClientButtonComponent.defaultProps = {};

export default ClientButtonComponent;
