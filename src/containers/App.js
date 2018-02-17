/**
 * Created by skynetsaa on 17.02.18.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {AudioCore} from '../components';

import {Container, Header, Icon, Segment} from 'semantic-ui-react'

import * as AudioActions from '../actions'
import find from 'lodash/find';

class App extends Component {

	componentDidMount() {
		// Initialize DOM Audio and retrieve
		this.props.updateVolume(ReactDOM.findDOMNode(this.refs.audio), this.props.audio.volume);
		this.props.setProgress(ReactDOM.findDOMNode(this.refs.audio));
		this.props.setTime(ReactDOM.findDOMNode(this.refs.audio));
		this.props.retrieveSongs();
	}

	handleProgress = () => {
		this.props.setProgress(ReactDOM.findDOMNode(this.refs.audio));
	};

	handleTimeupdate = () => {
		this.props.setTime(ReactDOM.findDOMNode(this.refs.audio));
	};

	handleError = (e) => {
		this.props.setError(ReactDOM.findDOMNode(this.refs.audio));
	};

	handlePlay = () => {
		this.props.play(ReactDOM.findDOMNode(this.refs.audio));
	};

	handleNext = () => {
		const audio = ReactDOM.findDOMNode(this.refs.audio);
		this.props.next(audio);
	};

	handlePrevious = () => {
		const audio = ReactDOM.findDOMNode(this.refs.audio);
		this.props.previous(audio);
	};

	handleVolumeChange = (volume) => {
		this.props.updateVolume(ReactDOM.findDOMNode(this.refs.audio), volume);
	};

	handleToggleFavorite = () => {
		this.props.toggleFavorite();
	};

	handleToggleRepeat = () => {
		this.props.toggleRepeat();
	};

	handleTrackClick = (percent) => {
		this.props.updatePosition(ReactDOM.findDOMNode(this.refs.audio), percent/100);
	};

	handleEnd = () => {
		const audio = ReactDOM.findDOMNode(this.refs.audio);
		if (this.props.audio.isRepeating) {
			this.props.next(audio);
		} else {
			this.props.pause(audio);
		}
	};

	handleToggleLoop = () => {
		this.props.toggleLoop(ReactDOM.findDOMNode(this.refs.audio));
	};

	handleLoadedData = () => {
		const audio = ReactDOM.findDOMNode(this.refs.audio);
		if (this.props.audio.isRepeating) {
			this.props.play(audio);
		}
	}

	render() {
		const {
				  volume, isPlaying, percent, isFavorite, progress, error,
				  duration, isRepeating, songs, currentID, autoplay, isLooping
			  } = this.props.audio;

		let song = find(songs, (o) => o.id === currentID);
		if (song === undefined) song = this.props.audio.defaultSong;

		return (
			<Container text>
				<Segment inverted>
					<Header inverted color='blue' as='h2' icon textAlign='center'>
						<Icon inverted name='music' circular color="blue"/>
						<Header.Content>
							JET PLAYER
						</Header.Content>
					</Header>
				</Segment>
				<Segment inverted>
					<AudioCore
						ref="audio"
						autoplay={false}
						source={song.audioFile}
						onProgress={this.handleProgress}
						onTimeupdate={this.handleTimeupdate}
						onError={this.handleError}
						onEnded={this.handleEnd}
						onLoadedData={this.handleLoadedData} />
				</Segment>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	audio: state.audio
});

export default connect(mapStateToProps, dispatch => bindActionCreators(AudioActions, dispatch))(App)
