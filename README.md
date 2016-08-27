# PhantomJS Lambda Template

A [PhantomJS](http://phantomjs.org/) node.js app for [Amazon Lambda](http://aws.amazon.com/lambda/). Based on [node-lambda-template](https://github.com/rebelmail/node-lambda-template) using [node-lambda](https://github.com/rebelmail/node-lambda). The app includes a PhantomJS binary (`phantomjs`) compiled for AWS Linux (https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-linux-x86_64.tar.bz2).

## Try my new NPM Module! (phantomjs-lambda-pack)[https://github.com/justengland/phantomjs-lambda-pack]
Its not done, but it works and you can see how it works. I do need to clean up the local environment, currently it relys on the phantomjs being in the path, and I need to better support versioning of phantomjs.

## Setup

Install dependencies using npm. It'll install the AWS SDK as well as PhantomJS on the development machine.

```shell
npm install
```

## Usage

After installing use the following `npm` commands as described below. They're only wrapping the `node-lambda` functionality to allow `node-lambda` to be installed only locally. Additional params can be provided using `-- args`. For a list of available options see the `node-lambda` [documentation](https://github.com/RebelMail/node-lambda).

Run the setup command to generate the environment file with the configuration used for the Amazon Lambda function. Edit the resulting `.env.` file with your custom settings.
```shell
npm run setup
```

To run the function locally execute the following command.
```shell
npm run start
```

Run the following command to deploy the app to Amazon Lambda. 
```shell
npm run deploy
```

> **Note:** npm version 2.x or newer required to pass arguments to the scripts using `-- args`

## Building phantomjs

If you want to use a different version of phantomjs or have trouble with the included version, follow the instructions in [build-phantomjs.sh](build-phantomjs.sh).

## dynamic phantomjs script

You can send a custom phantomjs script to the lambda function during invocation:

```javascript
'use strict'

const aws = require('aws-sdk')
aws.config.update({ region: 'us-east-1' })

const lambda = new aws.Lambda()

var params = {
    FunctionName: '<your functionname>-<environment>',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',

    // this code will run instead of phantomjs-script
    Payload: JSON.stringify({ code : 'console.log(\'123\')' })
}
lambda.invoke(params, function(err, data) {
    if (err) {
        return console.error(err, err.stack) // an error occurred
    }
    
    console.log(new Buffer(data.LogResult, 'base64').toString()) // successful response
})

```
