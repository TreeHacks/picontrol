package main

import (
	"fmt"
	"strings"
)

type Pi struct {
	Address string
	Id      int
	Slug    string
	Eventid string
}

//all of these functions use the global *sql.DB variable created in main.go

//Adds a pi to the database
func AddPi(address, slug, eventid string) error {
	sqlStatement := `
INSERT INTO pis (address, slug, eventid)
VALUES ($1, $2, $3)`

	_, err := db.Exec(sqlStatement, address, slug, eventid)

	return err
}

//Updates a pi in the database
//Takes in a map[string]string of updates and applies those to the db query
//Inputs not completely sanitized right now, but this should only be used by admins anyways
//TODO: properly clean inputs
func UpdatePi(address string, updates map[string]string) error {
	sqlStatement := `
UPDATE pis
SET %s
WHERE address = $1;`

	setStatements := make([]string, 0)
	vals := make([]interface{}, 0)
	vals = append(vals, address)
	ind := 2
	for key, val := range updates {
		statement := fmt.Sprintf("%s = $%d", key, ind)
		setStatements = append(setStatements, statement)
		vals = append(vals, val)
		ind = ind + 1
	}

	setStatement := strings.Join(setStatements, ", ")
	sqlStatement = fmt.Sprintf(sqlStatement, setStatement)

	_, err := db.Exec(sqlStatement, vals...)
	return err
}

func ListPis() ([]Pi, error) {
	sqlTemplate := `SELECT address, id, slug, eventid FROM pis`

	rows, err := db.Query(sqlTemplate)

	out := make([]Pi, 0)

	if rows == nil {
		return nil, fmt.Errorf("No pis found")
	}

	defer rows.Close()

	for rows.Next() {

		var address string
		var id int
		var slug string
		var eventid string

		err = rows.Scan(&address, &id, &slug, &eventid)
		if err != nil {
			return out, err
		}

		out = append(out, Pi{address, id, slug, eventid})
	}

	return out, nil
}

func GetPi(address string) (Pi, error) {
	sqlTemplate := `SELECT id, slug, eventid FROM pis WHERE address=$1`

	row := db.QueryRow(sqlTemplate, address)

	var id int
	var slug string
	var eventid string

	err := row.Scan(&id, &slug, &eventid)
	out := Pi{address, id, slug, eventid}

	if err != nil {
		return out, err
	}

	return out, nil
}

func CreateLog(pi Pi, user string, success bool) {
	sqlStatement := `
INSERT INTO events (pi_address, user_id, success, eventid)
VALUES ($1, $2, $3, $4)`

	db.Exec(sqlStatement, pi.Address, user, success, pi.Eventid)
}

//TODO: implement function
//Checks the socketio channels for each pi and sees if they're online, and then updates them in the database if so
func UpdatePiStatuses() {

}
