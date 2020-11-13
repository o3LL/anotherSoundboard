import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import github from './github.svg'

class BoardNavbar extends React.Component {
    render() {
        return <>
            <Navbar expand="lg" bg="transparent" variant="dark" className={'mb-3'}>
                <Navbar.Brand href="#home">Mister MV</Navbar.Brand>
                <Nav className="mr-auto"></Nav>
                <Navbar.Brand href="https://github.com/o3LL/anotherSoundboard">
                    <img
                        src={github}
                        color='white'
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
            </Navbar>
        </>
    }
}

export default BoardNavbar;



