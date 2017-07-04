// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");
const data = require("../resume-data.json");
// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App data={data}/>, document.getElementById('react-root'));
