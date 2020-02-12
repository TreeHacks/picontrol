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
    const [events, setEvents] = useState({});

    React.useEffect(() => {
        _loadLogs(props.address, setLogs);
        _loadEvents(setEvents);
    }, [props.address]); // <-- Have to pass in [] here! 

    return (
        <Table className="align-items-center">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Time</th>
                    <th scope="col">Participant</th>
                    <th scope="col">Event</th>
                    <th scope="col">Success?</th>
                </tr>
            </thead>
            <tbody>

                {logs.map((obj) => (
                    <tr>
                        <td><TimeStamp epoch={obj.timestamp} /></td>
                        <td>{obj.userId}</td>
                        <td>{events[obj.eventid] || obj.eventid}</td>
                        <td>{obj.success.toString()}</td>
                    </tr>
                ))}

            </tbody>
        </Table>
    );
}

function TimeStamp(props) {
    var d = new Date(0);
    d.setSeconds(props.epoch);

    return (
        <>
            {`${d.toString().split(" ")[4]}`}
        </>
    )
}

const _loadLogs = async (address, setLogs) => {
    var logresponse;
    if (address !== undefined) {
        logresponse = await fetch(`/api/pis/getlogs/${address}`)
    } else {
        logresponse = await fetch(`/api/pis/getlogs/`);
    }

    console.log(logresponse);

    var arr = await logresponse.json();
    console.log(arr);
    setLogs(arr);
}

const _loadEvents = async (setEvents) => {
    //TODO: use env var instead of hardcoded link...
    const resp = await fetch(`https://api.eventive.org/event_buckets/5e2d4729d44a8300290de7cf/events_slim?api_key=2db927190aa686598bf88c893181cb7a`);
    const data = await resp.json()

    var idsToName = {}
    for (var i = 0; i < data.length; i++) {
        idsToName[data[i].id] = data[i].title
    }

    setEvents(idsToName);
}