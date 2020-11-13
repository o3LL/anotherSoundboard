import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Cog from './cog-solid.svg';

class BoardNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSettingsOpened: false,
        }

        this.toggleSettings = this.toggleSettings.bind(this);
    }

    toggleSettings() {
        // Change state
        this.setState({
            isSettingsOpened: !this.state.isSettingsOpened
        }, () => {
            // Change props after state as changed in order to retrieve the state on parent
            this.props.onSettingsChange(this.state.isSettingsOpened)
        })
    }

    render() {
        return <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Mister MV</Navbar.Brand>
                <Nav className="mr-auto"></Nav>
                <Nav>
                    <Nav.Link onClick={this.toggleSettings} href="#">
                        <img src={Cog} width='25px' style={{ color: 'white' }} alt="Settings" />
                    </Nav.Link>
                </Nav>
            </Navbar>
        </>
    }
}

export default BoardNavbar;



