import React from "react";
import {Container, Row, Col} from "react-bootstrap";

const Footer: React.FC = () => {
    return (
        <Container
            className="navbar navbar-expand-md navbar-light bg-opacity-25 bg-dark fixed-bottom">

            <Row>
                <Col>
                    <a href={"https://gist.github.com/xcambar/c6438e7330584e42f71f2a51b8b367cc"}
                       className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center">
                        Pokédex Mission
                    </a>
                </Col>
            </Row>
        </Container>
    );

}
export default Footer;
