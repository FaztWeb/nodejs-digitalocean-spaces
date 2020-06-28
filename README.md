# Nodejs & DigitalOcean Spaces Example
This is a simple application using Nodejs, Mongodb and DigitalOcean Spaces to storage assets.

# Environment variables
Because Digitalocea Spaces is compatible with AWS SDK, we need to stablish environment variables, in the same way for AWS SDK:
* AWS_ACCESS_KEY_ID, the AWS Access KEY
* AWS_SECRET_ACCESS_KEY, the AWS secret ID
* S3_ENDPOINT, the S3 o digialOceanSpaces Endpoint
* BUCKET_NAME, The name of the bucket on AWS or digitalOcean

* [Setup AWS Credentials](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html)

Also, you can stablish the following Optional environment variables:
* PORT, the http port of the server. By default is `3000`
* MONGODB_URI, the mongodb uri

# Docker
to run with docker execute
```
docker-compose build
```

```
docker-compose up
```

# Resouces
* [Bootswatch CDN](https://www.bootstrapcdn.com/bootswatch/)
* [Setup AWS Credentials Documentation](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html)
* [Multer S3](https://www.npmjs.com/package/multer-s3)