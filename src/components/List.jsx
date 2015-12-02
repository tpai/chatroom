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