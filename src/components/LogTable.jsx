import React from "react";

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
                <tr>
                    <td>1</td>
                    <td>AB:CD:EF:GH</td>
                    <td>5e2f7cc592f477002ba60128</td>
                </tr>
            </tbody>
        </Table>
    );
}