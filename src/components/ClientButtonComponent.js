'use strict';

import React from 'react';

let ClientButtonComponent = (props) => (
  <div className="clientbutton-component">
    <button onClick={(e)=>props.updatePathState(e,{path: props.path, answerIndex: props.index})}>
      { props.text }
    </button>
  </div>
);

ClientButtonComponent.displayName = 'ClientButtonComponent';

// Uncomment properties you need
// ClientButtonComponent.propTypes = {};
// ClientButtonComponent.defaultProps = {};

export default ClientButtonComponent;
