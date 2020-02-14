
import React from "react";
// react plugin used to create google maps

// reactstrap components
import { Card, Container, Row, CardBody, CardHeader } from "reactstrap";

// core components
import Header from "../../components/Headers/Header.jsx";
import LogTable from "../../components/LogTable";
// mapTypeId={google.maps.MapTypeId.ROADMAP}

class Maps extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Recent Logs</h3>
                </CardHeader>
                <CardBody>
                  <LogTable />
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Maps;
