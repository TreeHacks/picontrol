package main

import (
	"fmt"

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

	//Registers a pi by its mac address if it doesn't already exist
	//TODO: Should send back something...
	api.POST("/pis/register/:address", func(c *gin.Context) {
		piAddress := c.Param("address")
		_, err := GetPi(piAddress)

		if err != nil {
			adderr := AddPi(piAddress, piAddress, "")
			if !checkErr(adderr, c) {
				c.JSON(200, gin.H{"message": "success"})
			}
		} else {
			c.JSON(200, gin.H{"message": "success", "reason": "pi already registered"}) //still a good thing, pi already registered
		}
	})

	api.POST("/scanticket/:address", func(c *gin.Context) {
		piAddress := c.Param("address")
		serial := c.Query("serial")

		if piAddress == "" || serial == "" {
			checkErr(fmt.Errorf("Bad values for pi address or serial"), c)
			return
		}

		pi, err := GetPi(piAddress)

		if checkErr(err, c) {
			return
		}

		eventId := pi.Eventid

		ScanTicket(eventId, serial)
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

//Sends event to eventive
//"scanticket" endpoint
//TODO: make function actually work
//	send request to eventive. Return error if error :(
func ScanTicket(event string, serial string) error {
	fmt.Printf("Scanning user %s for event %s", serial, event)
	return nil
}
