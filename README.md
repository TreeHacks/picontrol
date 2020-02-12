PiControl Web

## Development Set-up

- Set "homepage" in package.json to the url you want.
- Run npm build
- Run npm start
- Cross fingers
- Works?

Pushing and pulling to docker: https://ropenscilabs.github.io/r-docker-tutorial/04-Dockerhub.html

## Installation

- Build using the dockerfile
- Get the build onto your server
- create .env file
- $ sudo docker run -d -t --env-file=".env" -p 80:80 [container id]