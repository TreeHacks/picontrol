package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func APIroutes(r *gin.Engine) {
	api := r.Group("/api")
	authorized := r.Group("/api", gin.BasicAuth(gin.Accounts{
        "admin": os.Getenv("PASSWORD"),
    }))

	api.GET("/ping", func(c *gin.Context) {
		c.String(200, "pong")
	})

	//Pi routes

	//Get a list of Pis in the database
	//TODO: sort by whether connected or not
	authorized.GET("/pis/list", func(c *gin.Context) {
		list, err := ListPis()
		if !checkErr(err, c) {
			c.JSON(200, list)
		}
	})

	authorized.GET("/pis/getpi/:address", func(c *gin.Context) {
		piAddress := c.Param("address")
		pi, err := GetPi(piAddress)

		if !checkErr(err, c) {
			c.JSON(200, pi)
		}
	})

	authorized.GET("/pis/getlogs", func(c *gin.Context) {
		logs, err := GetLogs()

		if !checkErr(err, c) {
			c.JSON(200, logs)
		}
	})

	authorized.GET("/pis/getlogs/:address", func(c *gin.Context) {
		piAddress := c.Param("address")
		logs, err := GetLogsForPi(piAddress)

		if !checkErr(err, c) {
			c.JSON(200, logs)
		}
	})

	api.PUT("/pis/update/:address", func(c *gin.Context) {
		piAddress := c.Param("address")
		name := c.Query("name")
		eventid := c.Query("eventid")
		updateMap := make(map[string]string)
		updateMap["slug"] = name
		updateMap["eventid"] = eventid

		err := UpdatePi(piAddress, updateMap)

		if !checkErr(err, c) {
			c.JSON(200, gin.H{
				"message": "successfully updated pi",
			})
		}
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

		ScanTicket(pi, serial)
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
//	send request to eventive. Return error if error :(
func ScanTicket(pi Pi, serial string) error {
	fmt.Printf("Scanning user %s for event %s", serial, pi.Eventid)

	apiKey := os.Getenv("EVENTIVE_API_KEY")

	apiString := fmt.Sprintf("https://api.eventive.org/scan_ticket?api_key=%s", apiKey)

	jsonString := fmt.Sprintf(`{"event":"%s", "code": "%s"}`, pi.Eventid, serial)
	jsonBytes := []byte(jsonString)

	/*
		fmt.Println(apiString)
		fmt.Println(url.Values{
			"event": {pi.Eventid},
			"code":  {serial},
		})

		resp, err := http.PostForm(apiString, url.Values{
			"event": {pi.Eventid},
			"code":  {serial},
		})

		fmt.Println(resp)
	*/

	req, err := http.NewRequest("POST", apiString, bytes.NewBuffer(jsonBytes))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)

	fmt.Println("---debug stuff---")
	fmt.Println("response Status:", resp.Status)
	fmt.Println("response Headers:", resp.Header)
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println("response Body:", string(body))

	if err != nil || resp.StatusCode != 200 {
		CreateLog(pi, serial, false)
	} else {
		CreateLog(pi, serial, true)
	}

	defer resp.Body.Close()

	return err
}
