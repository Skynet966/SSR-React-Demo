//Express server to serve app
import express from 'express';
//Fs to enable file reading/writing
import fs from 'fs';
//Path to resolve the directory path
import path from 'path';

//React and ReactDOMServer to enable support of react on server-side
import React from 'react';
import ReactDOMServer from 'react-dom/server';

//App use to render the application on server
import App from '../src/App';

//Port where app will serve while running
const PORT = 8000;

const app = express();

//Serve app from root URI
app.use('/', (req, res) => {
	fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
		if (err) {
			console.log('Error occure while reading file from build folder :::', err);
			return res.status(500).send('Something went wrong on server!!!');
		} else {
			return res.send(
				data.replace(
					`<div id="root"></div>`,
					`<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
				)
			);
		}
	});
});

//provide static path
app.use(express.static(path.resolve(__dirname, '..', 'build')));

//Starting the server on CUSTOM PORT
app.listen(PORT, () =>
	console.log(`SSR App is running, URL:: http://localhost:${PORT}/`)
);
