import React from 'react';
import ReactDOM from 'react-dom';
import modelApi from './model/modelApi'

import App from './react/systems/App'


ReactDOM.render(
  <App {...modelApi.getState()}/>,
  document.getElementById('app')
);

modelApi.subscribe(state => {
	ReactDOM.render(
		<App {...state}/>, 
		document.getElementById('app')
	)
})