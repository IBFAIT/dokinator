'use strict';

import React from 'react';

const UserButton = ({updatePathState, text, index, path}) => (
  <div className="user-button">
    <button {...{
      onClick: e => {
        updatePathState(e, {path, index});
      }
    }}>
      { text }
    </button>
  </div>
);

UserButton.displayName = 'UserButton';

export default UserButton;
