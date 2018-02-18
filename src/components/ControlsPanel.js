/**
 * Created by skynetsaa on 17.02.18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import ControlButton from './ControlButton'

import {Segment, Icon, Button} from 'semantic-ui-react'

export default class ControlsPanel extends Component {

	static propTypes = {
		isPlaying: PropTypes.bool,
		percent: PropTypes.number,
		isFavorite: PropTypes.bool,
		onPlay: PropTypes.func,
		onNext: PropTypes.func,
		onPrevious: PropTypes.func,
		progress: PropTypes.object,
		onToggleFavorite: PropTypes.func,
		onToggleRepeat: PropTypes.func
	};

	static defaultProps = {
		isPlaying: false,
		percent: 0,
		isFavorite: false,
		progress: {},
	}

	render() {
		const playMode = this.props.isPlaying ? "pause" : "play";
		let heartStyle = this.props.isFavorite ? 'pink' : 'black';

		return (
			<Segment
				size='small'
				textAlign='center'
				inverted
				color='blue'>
				<ControlButton
					size="medium"
					mode="next"
					onClick={this.props.onNext}
					disabled={this.props.disableChange}
				/>
				<ControlButton
					size="big"
					mode={playMode} showProgress={true}
					onTrackClick={this.props.onTrackClick}
					percent={this.props.percent}
					duration={this.props.duration}
					progress={this.props.progress}
					onClick={this.props.onPlay}
				/>
				<ControlButton
					size="medium"
					mode="previous"
					onClick={this.props.onPrevious}
					disabled={this.props.disableChange}
				/>
				<Segment inverted
						 vertical={true}
						 color='blue'
						 size='tiny'
						 floated='right' >
					<Button.Group inverted size='mini'>
						<Button icon inverted onClick={this.props.onToggleRepeat}>
							<Icon name="repeat" />
						</Button>
						<Button icon inverted>
							<Icon name="share alternate" />
						</Button>
						<Button icon inverted onClick={this.props.onToggleFavorite}>
							<Icon color={heartStyle} name="like" />
						</Button>
					</Button.Group>
				</Segment>
			</Segment>
		)
	}
}