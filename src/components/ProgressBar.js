/**
 * Created by skynetsaa on 24.02.18.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Slider from 'rc-slider';

import {Segment,Progress} from 'semantic-ui-react'
import isFunction from 'lodash/isFunction';

const VolumeHandle = (props) => {
	const progress = props.offset.toFixed();

	return (
		<Progress size="small"
				  style={{margin: 0}}
				  percent={progress}
				  indicating
		/>
	);
};

class ProgressBar extends Component {

	handleProgressChange = (value) => {
		if (isFunction(this.props.onChangeProgress)) {
			this.props.onChangeProgress(value);
		}
	};

	render(){

		return(
			<Segment compact={true} basic inverted>
				<Slider
					min={0}
					max={100}
					value={this.props.percent || 0}
					onChange={this.handleProgressChange}
					handle={VolumeHandle}/>
			</Segment>
		)
	}
}

export default ProgressBar;