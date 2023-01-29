import { Route, Routes } from 'react-router-dom';
import CodeBlockPage from './Pages/CodeBlockPage';
import LobbyPage from './Pages/LobbyPage';
import './App.css';

function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<LobbyPage />} />
				<Route path="/codeblock/:title" element={<CodeBlockPage />} />
			</Routes>
		</div>
	);
}
export default App;
