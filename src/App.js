import { Route, Routes } from 'react-router-dom';
import CodeBlockPage from './Pages/CodeBlockPage';
import LobbyPage from './Pages/LobbyPage';
import './App.css';

function App() {
	return (
		<div className="app">
			<Routes>
				<Route
					path="https://client-new.onrender.com/"
					element={<LobbyPage />}
				/>
				<Route
					path="https://client-new.onrender.com/codeblock/:title"
					element={<CodeBlockPage />}
				/>
			</Routes>
		</div>
	);
}
export default App;
