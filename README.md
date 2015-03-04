# phantom-lambda-template

The bare minimum for a [phantomjs](http://phantomjs.org/)app running on [Amazon Lambda](http://aws.amazon.com/lambda/).
Based off of [node-lambda-template](https://github.com/rebelmail/node-lambda-template)

* Keep in mind that aws-lambda runs on Aws Linux, you will have to make sure your package is compiled for Aws-Linux

The phantomjs program has been build to for Linux, https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-linux-x86_64.tar.bz2
If you are going to run this locally you will have to swap out phantomjs with the assembly built for your OS.

It uses [node-lambda](https://github.com/rebelmail/node-lambda) under the hood to locally run and also deploy your node.js Amazon Lambda application.

```
./node_modules/.bin/node-lambda run
```

## Usage

There are 3 available commands, make sure to use the appropriate phantomjs for your OS. 

```
./node_modules/.bin/node-lambda setup
./node_modules/.bin/node-lambda run
./node_modules/.bin/node-lambda deploy
```

## Install

```
git clone https://github.com/justengland/phantom-lambda-template.git
cd node-lambda-template
npm install
```

## Package
zip -r phantom.zip . --exclude=*.DS_Store* --exclude=*.git* --exclude=*node_modules* --exclude=*.idea* --exclude=*.c9*


## Install Phantomjs
npm install phantomjs --phantomjs_cdnurl=http://cnpmjs.org/downloads


## Ideas
1. install phantom locally using NPM - this will install the phantomjs version for your OS into node_modules
2. Package for Lambda without the node_modules, then the node script will read from the disk, 
    if node_modules does not exists then read it from the root of the package which will be setup for lambda


