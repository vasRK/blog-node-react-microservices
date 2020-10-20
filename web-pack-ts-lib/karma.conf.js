module.exports = function (config) {
	config.set({
		frameworks: ["jasmine"],
		files: [
			{ pattern: 'Scripts/**/*.spec.ts' }
		],
		preprocessors: {
			'Scripts/**/*.spec.ts': ['webpack'],
		},
		reporters: ['mocha', 'kjhtml'],
		browsers: ["Chrome"],
		singleRun: false,
		retryLimit: 0,
		webpack: require('./webpack.config.test'),
		port: 9876,
		logLevel: config.LOG_WARN,
		client: {
			//capture all console output and pipe it to the terminal, true is default
			captureConsole: false,
			//if true, Karma clears the context window upon the completion of running the tests, true is default
			clearContext: false,
			//run the tests on the same window as the client, without using iframe or a new window, false is default
			runInParent: false,
			//true: runs the tests inside an iFrame; false: runs the tests in a new window, true is default
			useIframe: true,
			jasmine: {
				//tells jasmine to run specs in semi random order, false is default
				random: false
			}
		},
	});
};