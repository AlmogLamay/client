import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Highlight from 'react-highlight';

import io from 'socket.io-client';
const socket = io.connect('https://server-new.onrender.com'); //http://localhost:5000');

function CodeBlockPage() {
	const { title } = useParams();
	const [codeBlock, setCodeBlock] = useState('');
	const [codeOnly, setCodeOnly] = useState('');
	const [typer, setTyper] = useState(-1);
	const shouldCheck = useRef(true);
	const [room, setRoom] = useState('');

	const joinRoom = () => {
		socket.emit('join_room', title);
	};

	const sendMessage = (msg) => {
		socket.emit('send_message', { message: msg, room });
	};

	useEffect(() => {
		socket.on('receive_message', (data) => {
			setCodeOnly(data.message);
		});
	}, [socket]);

	useEffect(() => {
		stage1();

		joinRoom();
	}, [title]);

	useEffect(() => {
		if (shouldCheck.current) {
			shouldCheck.current = false;
			setRoom(title);
			stage2();
		}
	});

	const stage1 = () => {
		fetch(`/getCodeBlockByTitle/${title}`)
			.then((response) => response.json())
			.then((data) => {
				//console.log('DATA: ', data);
				//console.log('DATA.code: ', data.code);
				setCodeBlock(data);
				setCodeOnly(data.code);
			});
	};

	const stage2 = () => {
		fetch(`/getReadWrite/${title}`, {
			method: 'POST',
		})
			.then((response) => response.json())
			.then((data) => {
				setTyper(data);
				//console.log(data);
			});
	};

	function updateCodeInDB(c) {
		fetch('/updateCode', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: title, code: c }),
		});
	}

	const updateCodeOnChange = (event) => {
		setCodeOnly(event.target.value);
		sendMessage(event.target.value);
		updateCodeInDB(event.target.value);
	};

	return (
		<div className="app">
			<h1>{title}</h1>
			<textarea
				rows={30}
				cols={60}
				value={codeOnly}
				readOnly={typer === 0}
				onChange={(e) => updateCodeOnChange(e)}
			/>
		</div>
	);
}

export default CodeBlockPage;
