import React from "react";
import _ from "lodash";

export const UserList = (props) => (
	<ul>
		{
			_.map(props.users, user => {
				return (<li key={new Date().getTime()+Math.round(Math.random()*10)}>{user.name}</li>)
			})
		}
	</ul>
);