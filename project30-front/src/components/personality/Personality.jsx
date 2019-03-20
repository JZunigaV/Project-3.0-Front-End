import React, { Component } from 'react'

import { Row, Col } from "reactstrap"

class Personality extends Component {

    state = {

    }

    componentDidMount() {
        document.body.classList.toggle("landing-page");
    }
    componentWillUnmount() {
        document.body.classList.toggle("landing-page");
    }


    render() {

        console.log(this.props)
    
        return (
            <div>
                <div className="wrapeer">
                    <div className="page-header-recommendation">
                        <div className="content-center">
                            <Row>
                                <Col>
                                    <h1>Holaaaa</h1>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Personality