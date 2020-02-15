PiControl Web

## Development Set-up

- Set "homepage" in package.json to the url you want.
- Run `go get -u github.com/gin-gonic/gin github.com/joho/godotenv github.com/lib/pq`
- Run `npm run dev-start`
- Cross fingers
- Works?

Pushing and pulling to docker: https://ropenscilabs.github.io/r-docker-tutorial/04-Dockerhub.html

## Installation

- Build using the dockerfile
- Get the build onto your server
- create .env file
- $ sudo docker run -d -t --env-file=".env" -p 80:80 [container id]