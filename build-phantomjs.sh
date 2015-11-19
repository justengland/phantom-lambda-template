# Launch an EC2 instance using the region-appropriate AMI from this document:
# http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.

# Use a fairly beefy Spot Instance (c4.large is good) unless you want to wait
# for a long time. Don't bother with a t2.micro.

# Once it starts, SSH into the machine:

ssh ec2-user@your-ec2-box.amazonaws.com

# And then run (following the instructions from
# http://phantomjs.org/build.html):

sudo yum -y install gcc gcc-c++ make flex bison gperf ruby \
  openssl-devel freetype-devel fontconfig-devel libicu-devel sqlite-devel \
  libpng-devel libjpeg-devel

wget https://github.com/ariya/phantomjs/archive/1.9.7.zip
unzip 1.9.7.zip
cd phantomjs-1.9.7/
./build.sh --confirm

# Once it's finished, retrieve the build product (run from your local machine):
scp ec2-user@your-ec2-box.amazonaws.com:phantomjs-1.9.7/bin/phantomjs .

# Since this AMI includes a newer version of libicudata than Amazon Lambda,
# we need to include those libraries too.
# This won't be necessary once
# https://github.com/ariya/phantomjs/issues/12948 is fixed.
scp ec2-user@your-ec2-box.amazonaws.com:"/usr/lib64/libicu*50" .

# That's it! Don't forget to terminate the EC2 instance.
