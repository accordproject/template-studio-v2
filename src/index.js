import React from 'react';
import ReactDOM from 'react-dom';

import TemplateStudio from './TemplateStudio';

const wrapper = document.getElementById('root');
wrapper ? ReactDOM.render(<TemplateStudio />, wrapper) : false;