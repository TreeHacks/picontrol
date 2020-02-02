
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
import NotificationContainer from "components/NotificationContainer.jsx";

class Icons extends React.Component {
  constructor(props) {
    super(props);
    this.NotificationRef = React.createRef();
    this.state = {
      pi: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { address } = this.props.match.params;

    this.setState({ address: address })

    //fetch pi details
    const response = await fetch(`/api/pis/getpi/${address}`)
    if (response.status !== 200) { //error
      this.NotificationRef.current.addAlert("danger", `Error getting pi data - code ${response.status}: ${response.statusText}`)
    }
    this.setState({ pi: await response.json() });

    console.log(address)
  }

  async handleSubmit(event) {
    event.preventDefault();

    const response = await fetch(`/api/pis/update/${this.state.address}?name=${event.target.name.value}&eventid=${event.target.eventid.value}`, { method: "PUT" })
    if (response.status !== 200) { //error
      this.NotificationRef.current.addAlert("danger", `Error code ${response.status}: ${response.statusText}`)
    } else {
      this.NotificationRef.current.addAlert("success", (await response.json()).message)
    }
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
                  <h3 className=" mb-0">Managing {this.state.pi.name} (Address: {this.state.address})</h3>
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
                        <Form onSubmit={this.handleSubmit}>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                Name
                                <Input
                                  type="text"
                                  placeholder="Name"
                                  defaultValue={this.state.pi.name}
                                  name="name"
                                />
                                Event ID
                                <Input
                                  type="text"
                                  placeholder="Event ID"
                                  defaultValue={this.state.pi.eventid}
                                  name="eventid"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Button color="primary" type="submit">
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
                  <Button color="primary" className="mt-3" type="button" onClick={() => this.NotificationRef.current.addAlert("success", "example success alert")}>
                    Test Alert
                  </Button>
                </CardBody>
              </Card>
            </div>
          </Row>
          <NotificationContainer ref={this.NotificationRef} />
        </Container>
      </>
    );
  }
}

export default Icons;
