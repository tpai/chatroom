import React from "react";
import _ from "lodash";

export const UserList = (props) => {
	let id = 0;
	return (
		<ul>
		{
			_.map(props.users, name => {
				return (<li key={++id}>{name}</li>)
			})
		}
		</ul>
	);
};

export const ChannelList = (props) => {
	return (
		<select>
		{
			_.map(props.channels, channel => {
				return (<option key={channel.id}>{channel.name}</option>)
			})
		}
		</select>
	);
};