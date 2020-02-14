
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
import Header from "../../components/Headers/Header.jsx";
import PiCard from "../../components/PiCard.jsx"
import NotificationContainer from "../../components/NotificationContainer.jsx"

const dummyData = [
  { name: "demo rpi 1", online: false, address: "123" },
  { name: "demo rpi 2", online: true, address: "456" },
  { name: "demo rpi 3", online: false, address: "789" }
]

const dataitems = dummyData.map((obj) =>
  <Col lg="4" md="4">
    <PiCard name={obj.name} online={obj.online} address={obj.address} />
  </Col>
);

class Icons extends React.Component {
  constructor(props) {
    super(props);
    this.NotificationRef = React.createRef();
    this.state = {
      pis: []
    }
  }

  async componentDidMount() {
    const response = await fetch("/api/pis/list")
    if (response.status !== 200) { //error
      this.NotificationRef.current.addAlert("danger", `Error code ${response.status}: ${response.statusText}`)
    }
    this.setState({ pis: await response.json() });
  }

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
                    {this.state.pis.map((obj) => (
                      <Col lg="4" md="4">
                        <PiCard name={obj.name} online={obj.online} address={obj.address} />
                      </Col>
                    ))}
                  </Row>
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
