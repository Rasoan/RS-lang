import React from 'react';
import { NavLink } from 'react-router-dom';

import PATH from '../../constants/path';

const OnwGamePage = () => (
  <>
    <p>OnwGamePage</p>
    <NavLink to={PATH.SIGN_IN}>SignInPage</NavLink>
  </>
);

export default OnwGamePage;