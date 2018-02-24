/**
 * Created by skynetsaa on 24.02.18.
 */
import React, {Component} from 'react';

import {Segment,List} from 'semantic-ui-react'

export default class Playlist extends Component {

	render() {
		const songs = this.props.getPlaylist;

		return (
			<Segment>
				<List divided relaxed >
					{songs.map((track, index) =>
						<List.Item key={index} onClick={() => this.props.onSongChange(track.id)}>
							<List.Icon key={track.id} name='music' size='large' verticalAlign='middle' />
							<List.Content>
								<List.Header as='a'>{track.artist}</List.Header>
								<List.Description as='a'>{track.title}</List.Description>
							</List.Content>
						</List.Item>
					)}
				</List>
			</Segment>
		)
	}
}