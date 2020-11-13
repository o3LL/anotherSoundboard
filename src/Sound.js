import React from 'react';
import './Sound.css';
import Button from 'react-bootstrap/Button';

class Sound extends React.Component {
    constructor(props) {
        super(props)

        // Set initial counter value.
        this.state = {
            playing: false,
            played: false,
        };

        this.audioRef = React.createRef();

        this.handleClick = this.handleClick.bind(this);
        this.handleOnPlay = this.handleOnPlay.bind(this);
        this.handleOnEnded = this.handleOnEnded.bind(this);
        this.play = this.play.bind(this);
    }

    handleClick() {
        this.audioRef.current.play();
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
                className={'mr-1 shadow-lg'}
                ref={this.props.soundRef}
                disabled={this.state.playing}
                onClick={this.handleClick}
                variant="green"
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

export default Sound;
