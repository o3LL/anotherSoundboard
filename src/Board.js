import React from 'react';
import Sound from './Sound';
import Col from 'react-bootstrap/Col';
import io from 'socket.io-client';
import { connect } from "react-redux";

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            server: this.props.server,
            sounds: [],
        }

        this.play = this.play.bind(this);
        this.emitSound = this.emitSound.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.server !== this.state.server) {
            this.setState({server: this.props.server});
        }

        if (this.props.config !== this.state.config) {
            this.setState(this.props.config)
        }

        if (prevState.server !== this.state.server) {
            if (this.state.server) {
                const payload = {};
                const socket = io(this.state.server, {
                    path: '/feed',
                    withCredentials: false
                });

                socket.on('connect', () => {
                    payload.id = socket.id; // unique identifier for the socket session
                });

                socket.on('play', (payload) => {
                    this.play(payload.sound)
                });

                // Rewrite send method when we have a server
                this.send = (index) => {
                    payload.sound = index;
                    socket.emit('play', payload)
                }
            }
        }
    }

    send(index) {
        // Do nothing...
        return;
    }

    emitSound(index) {
        this.send(index);
    }

    play(id) {
        // Hacky...
        this.soundElements[id].click();
    }

    render() {
        this.soundElements = [];
        const sounds = this.props.sounds[this.props.default] || [];
        return <Col xs={{ order: 'first' }}>
            {sounds.map((sound, index) => <Sound emitSound={() => this.emitSound(sound.id)} soundRef={el => this.soundElements[sound.id] = el} soundId={sound.id} key={sound.id} name={sound.name} file={'sounds/' + sound.file} />)}
        </Col>
    }
}

const mapStateToProps = state => {
    return state.config;
};

export default connect(mapStateToProps)(Board);
