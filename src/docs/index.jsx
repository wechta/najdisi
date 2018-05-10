'user strict';

import React from 'react';
import { render } from 'react-dom';

import Demo from '../components/demo';

const index = <Demo displayDemo={false} displayComponents={true} />;

render(index, document.getElementById('content'));
