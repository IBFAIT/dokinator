'use strict';

import React from 'react';

const UserButtonDisabled = ({text}) => (
  <div className="user-button-disabled">
    <button>
      {text}
    </button>
  </div>
);

UserButtonDisabled.displayName = 'UserButtonDisabled';

export default UserButtonDisabled;
