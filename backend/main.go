package main

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "8000"
	}

	r := gin.Default()

	APIroutes(r)

	r.Run(fmt.Sprintf(":%s", port)) // listen and serve on process.env.port
}
