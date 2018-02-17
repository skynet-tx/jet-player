/**
 * Created by skynetsaa on 17.02.18.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

import isFunction from 'lodash/isFunction';
import partialRight from 'lodash/partialRight';
import forEach from 'lodash/forEach';

export default class AudioCore extends Component {

	state = {
		listeners: []
	};

	static propTypes = {
		autoplay: PropTypes.bool,
		preload: PropTypes.bool,
		source: PropTypes.string,
		loop: PropTypes.bool,
		volume: PropTypes.number,
		onTimeupdate: PropTypes.func,
		onError: PropTypes.func,
		onProgress: PropTypes.func,
		onEnded: PropTypes.func
	}

	static defaultProps = {
		autoplay: false,
		preload: true,
		source: "",
		loop: false,
		volume: .8,
		onTimeupdate: null,
		onError: null,
		onProgress: null,
		onEnded: null
	};

	get audio() {
		if (!this.refs)
			return {};

		return ReactDOM.findDOMNode(this.refs.audio);
	}

	set audio(a) {
	}

	handler(e, func) {
		if (isFunction(func)) {
			func(e);
		}
	}

	addListener = (event, func) => {
		var audio = ReactDOM.findDOMNode(this.refs.audio);
		audio.addEventListener(event, partialRight(this.handler, func));
		this.state.listeners.push({event: event, func: func});
	}

	removeAllListeners = () => {
		var audio = ReactDOM.findDOMNode(this.refs.audio);
		forEach(this.state.listeners, (obj) => {
			audio.removeEventListener(obj.event, obj.func);
		})
		this.state.listeners = [];
	}

	componentDidMount() {
		this.addListener('timeupdate', this.props.onTimeupdate);
		this.addListener('progress', this.props.onProgress);
		this.addListener('error', this.props.onError);
		this.addListener('ended', this.props.onEnded);
		this.addListener('loadeddata', this.props.onLoadedData);
	}

	componentWillUnmount() {
		this.removeAllListeners();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.autoplay === true && this.props.autoplay === false) {
			this.audio.play();
		}
	}

	togglePlay = () => {
		if (this.audio.paused)
			this.audio.play();
		else
			this.audio.pause();
	}

	setPlaybackPercent(percent) {
		this.audio.currentTime = percent * this.audio.duration;
	}

	changeCurrentTimeBy = (amount) => {
		this.audio.currentTime += amount;
	}

	setVolume = (percent) => {
		this.audio.volume = percent;
	}


	render() {
		return(
			<audio
				ref="audio"
				preload={this.props.preload.toString()}
				volume={this.props.volume}
				controls={false}
				crossOrigin="anonymous"
				autoPlay={this.props.autoplay}
				loop={this.props.loop}
				src={this.props.source} />
		)
	}
}