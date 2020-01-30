package main

import (
	"github.com/gin-gonic/gin"
)

func APIroutes(r *gin.Engine) {
	api := r.Group("/api")

	api.GET("/ping", func(c *gin.Context) {
		c.String(200, "pong")
	})

	//Pi routes

	//Get a list of Pis in the database
	//TODO: sort by whether connected or not
	api.GET("/pis/list", func(c *gin.Context) {
		list, err := ListPis()
		if !checkErr(err, c) {
			c.JSON(200, list)
		}
	})

	api.PUT("/pis/update/:address", func(c *gin.Context) {

	})
}

func checkErr(err error, c *gin.Context) bool {
	if err != nil {
		c.JSON(500, gin.H{
			"success": false,
			"error": gin.H{
				"code":    500,
				"message": err.Error(),
			},
		})
		return true
	}
	return false
}

//Handles admin routes -- these serve the frontend react bundle
//TODO: complete :)
func AdminRoutes(r *gin.Engine) {
	//admin := r.Group("/admin")
}
