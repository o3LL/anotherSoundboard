

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Board from './Board';
import BoardNavbar from './BoardNavbar';

class AppContainer extends React.Component {
    render() {
        return <Container fluid className="App">
            <BoardNavbar></BoardNavbar>
            <Row>
                <Board></Board>
            </Row>
        </Container>
    }
}

export default AppContainer;
