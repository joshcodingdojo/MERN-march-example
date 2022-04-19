import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BandForm from "./components/BandForm";
import DisplayAllBands from "./components/DisplayAllBands";
import DisplayOneBand from "./components/DisplayOneBand";
import EditBand from "./components/EditBand";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* path is the arg that defines the client url for that component. element is the comopnent for that route
           */}
          <Route path="/new-band" element={<BandForm />} />
          <Route path="/band/:id" element={<DisplayOneBand />} />
          <Route path="/" element={<DisplayAllBands />} />
          <Route path="/band/:id/edit" element={<EditBand />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
