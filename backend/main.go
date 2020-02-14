package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *sql.DB

func main() {
	godotenv.Load("../.env")

	//open connection to postgres database
	OpenDB()

	//web stuff
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "8000"
	}

	r := gin.Default()

	//test route for now, will later serve the react page
	r.GET("/", TestHandler)

	//more test routes for now, will later serve the react page
	//TODO: look into whether or not there's a better to do "nested wildcards" like this. For now, I think two levels after admin is p decent
	r.Static("/admin", "../build")

	APIroutes(r)

	r.NoRoute(func(c *gin.Context) {
		c.File("../build/index.html")
	})

	r.Run(fmt.Sprintf(":%s", port)) // listen and serve on process.env.port
}

func OpenDB() {
	db_uri := os.Getenv("DATABASE_URI")

	var err error
	db, err = sql.Open("postgres", db_uri)

	if err != nil {
		log.Fatal(err)
	}
}

func TestHandler(c *gin.Context) {
	c.Redirect(302, "/admin")
}
