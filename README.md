# PhantomJS Lambda Template

A [PhantomJS](http://phantomjs.org/) node.js app for [Amazon Lambda](http://aws.amazon.com/lambda/). Based on [node-lambda-template](https://github.com/rebelmail/node-lambda-template) using [node-lambda](https://github.com/rebelmail/node-lambda). The app includes a PhantomJS binary (`phantomjs`) compiled for AWS Linux (https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-linux-x86_64.tar.bz2).

> **Note:** Since there was [an issue](https://github.com/rebelmail/node-lambda/issues/19) with the deployment script this template uses a [node-lambda fork](https://github.com/christianklotz/node-lambda) until the [pull request](https://github.com/rebelmail/node-lambda/pull/20) has been accepted or an alternative solution has been found.


## Setup

Install dependencies using npm. It'll install the AWS SDK as well as PhantomJS on the development machine.

```shell
npm install
```

## Usage

To run the function locally execute the following command.
```shell
npm run start
```

Run the setup command to generate the environment file with the configuration used for the Amazon Lambda function. Edit the resulting `.env.` file with your custom settings.

```shell
npm run setup
```

Run the following command to deploy the app to Amazon Lambda. Providing the environment param is optional. If provided the function deployed to Amazon Lambda will use the environment as a prefix in the function name, e.g. FunctionName-production-version.

```shell
npm run deploy -- --environment {environment}
```

> **Note:** npm version 2.x or newer required to pass arguments to the scripts using `-- args`
