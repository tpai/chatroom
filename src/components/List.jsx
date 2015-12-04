import React, { Component } from "react";
import _ from "lodash";

export const UserListCount = (props) => (
	<span>Online User: {props.users.length}</span>
);

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

export class ChannelList extends Component {
    render() {
        return (
            <select>
            {
                _.map(this.props.channels, channel => {
                    return (<option key={channel.id}>{channel.name}</option>)
                })
            }
            </select>
        );
    }
}
