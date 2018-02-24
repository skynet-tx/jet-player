/**
 * Created by skynetsaa on 24.02.18.
 */
import React, {Component} from 'react';

import {Segment, Form} from 'semantic-ui-react'

export default class SearchForm extends Component {
	state = {
		name: ''
	};

	handleChange = (e, { name, value }) => this.setState({ [name]: value });

	render() {
		const { name } = this.state;

		return (
			<Segment secondary={true}>
				<Form onSubmit={() => this.props.onFilterSongs(name)}>
					<Form.Group style={{margin: 0}}>
						<Form.Input placeholder='Find a song...' name='name' value={name} onChange={this.handleChange} />
						<Form.Button content='Submit' />
					</Form.Group>
				</Form>
			</Segment>
		)
	}
}