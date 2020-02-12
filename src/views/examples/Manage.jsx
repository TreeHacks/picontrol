
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

import Select from "react-select";
// core components
import Header from "components/Headers/Header.jsx";
import PiCard from "components/PiCard.jsx"

import StatusText from "components/StatusText.jsx";
import LogTable from "components/LogTable.jsx";
import NotificationContainer from "components/NotificationContainer.jsx";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class Icons extends React.Component {
  constructor(props) {
    super(props);
    this.NotificationRef = React.createRef();
    this.state = {
      pi: {},
      selectedOption: null
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

    //fetch eventive details
    //TODO: convert url to env var...
    const resp = await fetch(`https://api.eventive.org/event_buckets/5e2d4729d44a8300290de7cf/events_slim?api_key=2db927190aa686598bf88c893181cb7a`);
    if (resp.status !== 200) {
      this.NotificationRef.current.addAlert("danger", `Error getting eventive data - code ${response.status}: ${response.statusText}`)
    }
    let data = await resp.json();
    let options = [];
    var selectedOption = null;

    for (var i = 0; i < data.length; i++) {
      let opt = {
        value: data[i].id,
        label: data[i].title
      }

      options.push(opt)

      if (data[i].id === this.state.pi.eventid) {
        selectedOption = opt
      }
    }

    this.setState({ selectOptions: options, selectedOption: selectedOption });

    console.log(address)
  }

  async handleSubmit(event) {
    event.preventDefault();

    const response = await fetch(`/api/pis/update/${this.state.address}?name=${event.target.name.value}&eventid=${this.state.selectedOption.value}`, { method: "PUT" })
    if (response.status !== 200) { //error
      this.NotificationRef.current.addAlert("danger", `Error code ${response.status}: ${response.statusText}`)
    } else {
      this.NotificationRef.current.addAlert("success", (await response.json()).message)
    }
  }

  handleSelectChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  render() {
    const { selectedOption } = this.state;

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
                                <Select
                                  value={selectedOption}
                                  onChange={this.handleSelectChange}
                                  options={this.state.selectOptions}
                                />
                                {/*
                                <Input
                                  type="text"
                                  placeholder="Event ID"
                                  defaultValue={this.state.pi.eventid}
                                  name="eventid"
                                /> */}
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
