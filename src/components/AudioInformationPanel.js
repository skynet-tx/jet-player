/**
 * Created by skynetsaa on 18.02.18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Slider, {Range} from 'rc-slider';

import isFunction from 'lodash/isFunction';

import {Segment, Icon, Button, Divider, Progress} from 'semantic-ui-react';

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
		title: PropTypes.string,
		artist: PropTypes.string,
		onVolumeChange: PropTypes.func,
		volume: PropTypes.number,
		hasError: PropTypes.bool
	};

	static defaultProps = {
		volume: 30,
		hasError: false,
		percent: 0,
		progress: {}
	};

	onVolumeChange = (value) => {
		if (isFunction(this.props.onVolumeChange)) {
			this.props.onVolumeChange(value);
		}
	};

	render() {
		const {title, artist, volume, songID, hasError} = this.props;


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
						<p><Icon name="sound"/>Title: "{title}"</p>
						<p><Icon name="user"/>Artist: "{artist}"</p>
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