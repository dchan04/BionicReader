import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Converter from "./components/BionicConverter";
import Header from "./components/Header";

function App() {
	return (
		<div className="App">
			<Header />
			<Converter />
		</div>
	);
}

export default App;
