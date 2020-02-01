/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import PiCard from "components/PiCard.jsx"

const dummyData = [
  { name: "demo rpi 1", online: false },
  { name: "demo rpi 2", online: true },
  { name: "demo rpi 3", online: false }
]

const dataitems = dummyData.map((obj) =>
  <Col lg="4" md="4">
    <PiCard name={obj.name} online={obj.online} />
  </Col>
);

class Icons extends React.Component {
  state = {};
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Raspberry Pis</h3>
                </CardHeader>
                <CardBody>
                  <Row className=" icon-examples">
                    {dataitems}
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Icons;
