import React from "react";

import { Card, CardBody, CardTitle, Container, Row, Col, Button } from "reactstrap";

class PiCard extends React.Component {
    render() {
        return (
            <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                    <Row>
                        <div className="col">
                            <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                            >
                                <StatusText online={this.props.online} />
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                                {this.props.name}
                            </span>
                        </div>
                        <Col className="col-auto">
                            <Button color="primary" class="my-5"> Manage </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

function StatusText(props) {
    if (props.online) {
        return (
            <span className="text-success">
                online
        </span>
        )
    } else {
        return (
            <span className="text-danger">
                offline
            </span>
        )
    }
}

export default PiCard