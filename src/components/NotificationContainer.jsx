import React, { useImperativeHandle, useState, forwardRef } from "react";

import { UncontrolledAlert, Row, Col } from "reactstrap";

import { useSpring, animated } from 'react-spring'

function Notification(props) {

    const [visible, setVisible] = useState(true)
    const style = useSpring({
        from: { opacity: 1 },
        to: { opacity: 0 },
        delay: 2500,
        onRest: () => {
            setVisible(false)
        }
    })

    if (visible) {
        return (
            <animated.div style={style}>
                <UncontrolledAlert color={props.color} fade={true}>
                    <span className="alert-inner--icon">
                        <i className="ni ni-like-2" />
                    </span>{" "}
                    <span className="alert-inner--text">
                        {props.text}
                    </span>
                </UncontrolledAlert>
            </animated.div>
        )
    }
    return null;
}

const NotificationContainer = forwardRef((props, ref) => {

    const [notifications, setNotifications] = useState([]); //use setNotifications(notifications.concat(newItem))
    //notifications contains the actual jsx -- hopefully this works?

    useImperativeHandle(ref, () => ({

        addAlert(color, text) {
            setNotifications(notifications.concat(<Notification color={color} text={text} />))
        }

    }));

    return (
        <div className="fixed-top position-absolute container-fluid my-3" >
            <Row className="justify-content-end">
                <Col sm="6">
                    <div className="mx-3">
                        {notifications}
                    </div>
                </Col>
            </Row>
        </div >
    )
});

export default NotificationContainer