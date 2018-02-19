/**
 * Created by skynetsaa on 17.02.18.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {AudioCore, ControlsPanel, AudioInformationPanel} from '../components';

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
		const audio  = ReactDOM.findDOMNode(this.refs.audio);
		let isPaused = audio.paused;
		this.props.next(audio);
		// Set autoplay for player
		if (!isPaused) {
			setTimeout(() => {
				this.props.play(audio)
			}, 500);
		}
	};

	handlePrevious = () => {
		const audio  = ReactDOM.findDOMNode(this.refs.audio);
		let isPaused = audio.paused;
		this.props.previous(audio);
		// Set autoplay for player
		if (!isPaused) {
			setTimeout(() => {
				this.props.play(audio)
			}, 500);
		}
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
		this.props.updatePosition(ReactDOM.findDOMNode(this.refs.audio), percent / 100);
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
				<Segment.Group>
					<Segment inverted>
						<Header inverted color='blue' as='h2' icon textAlign='center'>
							<Icon inverted name='music' circular color="blue"/>
							<Header.Content>
								JET PLAYER
							</Header.Content>
						</Header>
					</Segment>
					{/*@todo player status bar*/}
					<AudioCore
						ref="audio"
						autoplay={false}
						source={song.audioFile}
						onProgress={this.handleProgress}
						onTimeupdate={this.handleTimeupdate}
						onError={this.handleError}
						onEnded={this.handleEnd}
						onLoadedData={this.handleLoadedData}/>

					<ControlsPanel
						isPlaying={isPlaying}
						disableChange={songs.length <= 1}
						onPlay={this.handlePlay}
						onNext={this.handleNext}
						onPrevious={this.handlePrevious}
						isFavorite={song.favorite}
						isRepeating={isRepeating}
						isLooping={isLooping}
						onTrackClick={this.handleTrackClick}
						onToggleRepeat={this.handleToggleRepeat}
						onToggleFavorite={this.handleToggleFavorite}
						onToggleLoop={this.handleToggleLoop}/>

					<AudioInformationPanel
						songID={song.id}
						title={song.title}
						artist={song.artist}
						volume={volume}
						hasError={error != null}
						onNext={this.handleNext}
						onPrevious={this.handlePrevious}
						onVolumeChange={this.handleVolumeChange}
					/>
					{/*@todo player search bar*/}
					{/*@todo player playlist*/}
				</Segment.Group>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	audio: state.audio
});

export default connect(mapStateToProps, dispatch => bindActionCreators(AudioActions, dispatch))(App)
