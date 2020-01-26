package main

import (
	"github.com/gin-gonic/gin"
)

func APIroutes(r *gin.Engine) {
	api := r.Group("/api")

	api.GET("/ping", func(c *gin.Context) {
		c.String(200, "pong")
	})
}
