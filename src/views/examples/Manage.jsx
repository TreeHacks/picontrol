
import React from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
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
// core components
import Header from "components/Headers/Header.jsx";
import PiCard from "components/PiCard.jsx"

import StatusText from "components/StatusText.jsx";
import LogTable from "components/LogTable.jsx";

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

  componentDidMount() {
    const { address } = this.props.match.params;

    this.setState({ address: address })

    //TODO: API call... will be stored in this.state.pi

    this.setState({ pi: { name: "demo rpi 1", online: false, address: "123" } });

    console.log(address)
  }

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
                  <h3 className=" mb-0">Managing Pi: {this.state.address}</h3>
                </CardHeader>
                <CardBody>
                  <div className="mb-4">
                    <h5
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      Status: <StatusText online={this.props.online} />
                    </h5>

                  </div>
                  <Row>
                    <Col lg="6">
                      <div>
                        <h2>Update Pi</h2>
                        <Form>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                Name
                                <Input
                                  type="text"
                                  placeholder="Name"
                                />
                                Event ID
                                <Input
                                  type="text"
                                  placeholder="Event ID"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Button color="primary" type="button">
                            Update
                          </Button>
                        </Form>
                      </div>
                    </Col>
                    <Col lg="6">
                      <h2>Logs</h2>
                      <LogTable address={this.state.address} />
                    </Col>
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
