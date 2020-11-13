import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import config from './config.json'
import { connect } from "react-redux";

import './Settings.css'

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            server: config.SERVER_URL,
            config: config.DEFAULT_CONFIG,
            validated: false,
            isLoading: false,
            error: '',
            sounds: []
        }

        this.handleServerChange = this.handleServerChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        // Setting up default config if existing
        if (this.state.config) {
            let config = Object.assign(this.state.config, { server: this.state.server });
            this.props.changeConfig(config);
        }
        if (this.state.server) {
            this.changeServer();
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    checkServer(serverUrl) {
        const server = Object.assign(serverUrl, {}) ;
        server.pathname = 'ping';

        const headers = new Headers();
        const request = new Request(server, {
            method: 'GET',
            headers,
            mode: 'cors',
            cache: 'no-cache'
        });

        return new Promise((resolve, reject) => {
            fetch(request).then(function (response) {
                var contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(function (json) {
                        resolve(json);
                    });
                } else {
                    reject('Server didn\'t respond a JSON, that\'s strange...')
                }
            }).catch(err => reject(err));
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isLoading !== this.state.isLoading) {
            if (this.state.isLoading && this.state.validated) {
                this.changeServer();
            }
        }
    }

    changeServer() {
        const server = new URL(this.state.server);
        this.checkServer(server).then((response) => {
            this.setState({ config: response })
            this.props.changeConfig(response);
            this.props.onServerChange(this.state.server);
            this.setState({ isLoading: false });
        }).catch((error) => {
            this.setState({ error: error.message, isLoading: false });
        });
    }

    handleServerChange() {
        this.setState({error: ''});

        try {
            const server = new URL(this.state.server); // eslint-disable-line
            this.setState({ isLoading: true, validated: true });
        } catch (e) {
            this.setState({ validated: false, error: 'Invalid URL' });
        }
    }

    render() {
        return <Col xs={{ order: 'last', span: 4 }} hidden={this.props.hidden}>
            <Form
                className="settings"
                validated={this.state.validated}
            >
                <InputGroup className="mb-3">
                    <FormControl
                        name="server"
                        onChange={this.handleInputChange}
                        value={this.state.server}
                        placeholder="Server URL"
                        aria-label="Server URL"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button
                            onClick={this.handleServerChange}
                            disabled={this.state.isLoading}
                            variant="primary"
                        >{this.state.isLoading ? 'Connecting...' : 'Connect'}</Button>
                    </InputGroup.Append>
                </InputGroup>

                <Alert hidden={!this.state.error} variant='danger'>
                    {this.state.error}
                </Alert>
            </Form>
        </Col>
    }
}

const mapStateToProps = state => {
    return state.config || {sounds: []};
};

export default connect(mapStateToProps)(Settings);



