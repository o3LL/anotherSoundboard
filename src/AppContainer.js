

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Board from './Board';
import BoardNavbar from './BoardNavbar';
import Settings from './SettingsContainer';

class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSettingsOpened: false,
            server: ''
        }

        this.handleSettingsChange = this.handleSettingsChange.bind(this);
        this.handleServerChange = this.handleServerChange.bind(this);
    }

    handleSettingsChange(open) {
        this.setState({
            isSettingsOpened: open
        });
    }

    handleServerChange(server) {
        this.setState({
            server: server
        });
    }

    render() {
        return <Container className="App">
            <BoardNavbar
                onSettingsChange={this.handleSettingsChange}
            ></BoardNavbar>
            <Row>
                <Board
                    server={this.state.server}
                    sounds={[]}
                ></Board>
                <Settings
                    hidden={!this.state.isSettingsOpened}
                    onServerChange={this.handleServerChange}
                ></Settings>
            </Row>
        </Container>
    }
}

export default AppContainer;
