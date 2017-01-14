# PhantomJS Lambda Template

This is a reference implementation of running [PhantomJS](http://phantomjs.org/) on [AWS Lambda](http://aws.amazon.com/lambda/) with a pipeline.

## Background
PhantomJS needs to be compiled for the OS you plan on running it. Until now this whole project has been painful because of that fact.
This could be circumvented with a build server, which is a very personal decision and it was hard to commit to a build server for this little project.
Now with CodeBuild, this has become a trivial matter. So we are using AWS Developer tools 100%, AWS created a great
[walk through: Automating Deployment of Lambda-based Applications](http://docs.aws.amazon.com/lambda/latest/dg/automating-deployment.html)
I have done my best to automate the walk through, so its simple and repeatable.

## Setup
1. Setup your AWS account and AWS CLI
1. Fork the project
1. Setup a personal access token with GitHub for [AWS CodePipeline](https://aws.amazon.com/codepipeline/) , you can skip this if you use [AWS CodeCommit](https://aws.amazon.com/codecommit/)
https://github.com/settings/tokens
1. npm install
1. npm test
1. ```npm run deploy-pipeline -- \
            GitHubToken=< your token > \
            GitHubUser=justengland \
            Repo=phantom-lambda-template \
            Branch=master
    ```
1. As you pipeline executes the first time, you will have to authorize the changeset.

> **Note:** npm version 2.x or newer required to pass arguments to the scripts using `-- args`

