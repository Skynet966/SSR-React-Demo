//Ignore to serve styles files
require('ignore-styles');

//register the app to convert jsx and env files
require('@babel/register')({
	ignore: [/(node_module)/],
	presets: ['@babel/preset-env', '@babel/preset-react']
});

//import server to run from this file
require('./server');
