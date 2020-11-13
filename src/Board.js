import React from 'react';
import Sound from './Sound';
import Col from 'react-bootstrap/Col';
import config from './config.json'

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sounds: config.sounds || [],
        }
    }

    render() {
        this.soundElements = [];
        const sounds = this.state.sounds;
        return <Col xs={{ order: 'first' }}>
            {sounds.map((sound, index) => <Sound soundRef={el => this.soundElements[sound.id] = el} soundId={sound.id} key={sound.id} name={sound.name} file={'sounds/' + sound.file} />)}
        </Col>
    }
}

export default Board;
