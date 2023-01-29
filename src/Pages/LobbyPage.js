import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function LobbyPage() {
	const navigate = useNavigate();
	const [allTitles, setAllTitles] = useState([{}]);

	const handleClick = (event) => {
		navigate('/codeblock/' + event.target.value);
	};

	useEffect(() => {
		fetch('/getAllTitles')
			.then((response) => response.json())
			.then((data) => {
				setAllTitles(data);
			});
	}, []);

	return (
		<div className="app">
			<h2>Choose code block:</h2>
			<select onChange={(e) => handleClick(e)}>
				<option key="" value=""></option>
				{allTitles.map((user, i) => (
					<option key={i} value={user.title}>
						{user.title}
					</option>
				))}
			</select>
		</div>
	);
}

export default LobbyPage;
