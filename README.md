This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Create Simple App with npx create-react-app app-name

Change the code in src/index.js file

```javascript
ReactDOM.render(<App />, document.getElementById('root'));

 replace with

ReactDOM.hydrate(<App />, document.getElementById('root'));

```

#### `Install Expree with below command `

```javascript
npm install express
```

#### `Install babel,babel-react and ignore-style with below command `

```javascript
npm install @babel/register @babel/preset-env @babel/preset-react ignore-styles

```

#### `Create a new folder called server, then go into it and create a file named server.js `

```javascript
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
app.use('^/$', (req, res) => {
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
```

#### `Let’s create an entry point in server/index.js:`

```javascript
//Ignore to serve styles files
require('ignore-styles');

//register the app to convert jsx and env files
require('@babel/register')({
	ignore: [/(node_module)/],
	presets: ['@babel/preset-env', '@babel/preset-react']
});

//import server to run from this file
require('./server');
```

#### `Make a Script to run node server in package.json:`

```javascript
"scripts": {
	...
	"ssr": "node server/index.js"
}

```

## `Make Build file while running first time and then run the script with npm ssr:`

```javascript

npm run build
npm run ssr

```
