import React, { useState, useEffect } from "react";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Container,
    Row,
    Col,
    Button,
    UncontrolledTooltip,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Table
} from "reactstrap";


export default function LogTable(props) {


    const [logs, setLogs] = useState([]);
    React.useEffect(() => {
        _loadLogs(props.address, setLogs);
    }, [props.address]); // <-- Have to pass in [] here! 

    return (
        <Table className="align-items-center">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Time</th>
                    <th scope="col">Participant</th>
                    <th scope="col">Event ID</th>
                </tr>
            </thead>
            <tbody>

                {logs.map((obj) => (
                    <tr>
                        <td>{obj.timestamp}</td>
                        <td>{obj.userId}</td>
                        <td>{obj.eventid}</td>
                    </tr>
                ))}

            </tbody>
        </Table>
    );
}

const _loadLogs = async (address, setLogs) => {
    const logresponse = await fetch(`/api/pis/getlogs/${address}`)
    if (logresponse.status !== 200) { //error
        this.NotificationRef.current.addAlert("danger", `Error getting logs - code ${logresponse.status}: ${logresponse.statusText}`)
    }

    console.log(logresponse);

    var arr = await logresponse.json();
    console.log(arr);
    setLogs(arr);
}