/**
 * Created by skynetsaa on 18.02.18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Slider from 'rc-slider';

import isFunction from 'lodash/isFunction';

import {Segment, Icon, Divider, Progress} from 'semantic-ui-react';

const SpeakerHandle = (props) => {
	const volumeVal = Math.max((props.offset * .96), 4).toFixed();
	let volumeIcon = 'volume off';

	if (volumeVal > 10 && volumeVal < 40) {
		volumeIcon = 'volume down';
	} else if (volumeVal > 41) {
		volumeIcon = 'volume up';
	}
// @todo need to fix volume +-4 position
	return (
		<div>
			<div><Icon name={volumeIcon} /> Volume: {volumeVal} %</div>
			<Progress color="orange" percent={volumeVal} size='tiny'/>
		</div>
	);
};


export default class AudioInformationPanel extends Component {

	static propTypes = {
		duration: PropTypes.number,
		percent: PropTypes.number
	};

	static defaultProps = {
		duration: 0,
		percent: 0
	};

	onVolumeChange = (value) => {
		if (isFunction(this.props.onVolumeChange)) {
			this.props.onVolumeChange(value);
		}
	};

	str_pad_left(string,pad,length) {
		return (new Array(length+1).join(pad)+string).slice(-length);
	}

	getTime(time) {
		if(!time) return '00:00';

		let hours = Math.floor(time / 3600);
		let minutes = Math.floor((time - (hours*3600)) / 60);
		let seconds = Math.floor(time % 60);

		return this.str_pad_left(minutes,'0',2) + ':' + this.str_pad_left(seconds,'0',2);
	};

	getTimeFromPercentage (percent, duration) {
		if (!percent && !duration) return '00:00';
		return this.getTime(percent * duration);
	}

	render() {
		const {title, artist, hasError} = this.props;

		return (
			<Segment
				size='small'
				inverted
				color='blue'>
				<Divider horizontal
						 inverted
						 color='blue'>
					Song details
				</Divider>

				{
					hasError &&
					<Segment textAlign='center' inverted color='red'>
						Error Playing Media
					</Segment>
				}
				<Segment.Group horizontal>
					<Segment inverted
							 floated="left"
							 color='blue'>
						<p style={{margin:0}}><Icon name="sound"/>Title: "{title}"</p>
						<p style={{margin:0}}><Icon name="user"/>Artist: "{artist}"</p>
						<p style={{margin:0}}><Icon name="time"/>{this.getTimeFromPercentage(this.props.percent, this.props.duration)}/{this.getTime(this.props.duration)}</p>
					</Segment>
					<Segment inverted
							 size="small"
							 floated="right"
							 color='blue'>
						<Slider
							min={0}
							max={100}
							defaultValue={30}
							onChange={this.onVolumeChange}
							handle={SpeakerHandle}/>
					</Segment>
				</Segment.Group>
			</Segment>
		)
	}
}