'use strict';

import React from 'react';

const UserButtonDisabled = ({text}) => (
  <div className="clientdisabled-component">
    <button>
      {text}
    </button>
  </div>
);

UserButtonDisabled.displayName = 'UserButtonDisabled';

export default UserButtonDisabled;
