import React from 'react';
import './Sound.css';
import Button from 'react-bootstrap/Button';
import { connect } from "react-redux";

class Sound extends React.Component {
    constructor(props) {
        super(props)

        // Set initial counter value.
        this.state = {
            playing: false,
            played: false,
            server: '',
        };

        this.audioRef = React.createRef();

        this.handleClick = this.handleClick.bind(this);
        this.handleOnPlay = this.handleOnPlay.bind(this);
        this.handleOnEnded = this.handleOnEnded.bind(this);
        this.play = this.play.bind(this);
    }

    handleClick() {
        this.audioRef.current.play();
        // Emit sound to our parent element
        // May be usefull if we are in websocket mode
        this.props.emitSound.call();
    }

    handleOnPlay() {
        this.setState({
            playing: true
        })
    }

    handleOnEnded() {
        this.setState({
            playing: false,
            played: true
        })
    }

    play() {
        this.audioRef.play();
    }

    render() {
        return <Button
                ref={this.props.soundRef}
                disabled={this.state.playing}
                onClick={this.handleClick}
            >
            {this.props.name}
            <audio
                ref={this.audioRef}
                src={this.props.server ? this.props.server + '/' + this.props.file : this.props.file}
                buffered="true"
                preload='auto'
                onPlay={this.handleOnPlay}
                onEnded={this.handleOnEnded}
            />
        </Button>
    }
}

const mapStateToProps = state => {
    return state.config || {
        server: ''
    };
};

export default connect(mapStateToProps)(Sound);
