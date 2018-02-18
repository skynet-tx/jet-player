/**
 * Created by skynetsaa on 18.02.18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Icon, Button} from 'semantic-ui-react'

export default class ControlButton extends Component {

	static propTypes = {
		mode: PropTypes.oneOf(['play', 'pause', 'next', 'previous']),
		size: PropTypes.oneOf(['small', 'medium', 'large', 'big']),
	};

	static defaultProps = {
		mode: 'play',
	};


	render() {

		let iconType = <Icon name='pause' />;
		let size = this.props.size

		switch (this.props.mode) {
			case 'play':
				iconType = <Icon name="play" />;
				break;
			case 'next':
				iconType = <Icon name="chevron left" />;
				break;
			case 'previous':
				iconType = <Icon name="chevron right" />;
				break;
		}

		return (
			<Button circular={true}
					icon
					size={size}
					inverted
					disabled={this.props.disabled}
					onClick={this.props.onClick}>
				{iconType}
			</Button>
		);
	}
}