import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CryptoTable from "./components/CryptoTable";
import CryptoDetails from "./components/CryptoDetails";
import { CryptoProvider } from "./context/CryptoContext";

function App() {
  return (
    <div className="bg-[#16171A]">
      <CryptoProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<CryptoTable />} />
            <Route path="/crypto-details/:id" element={<CryptoDetails />} />
          </Routes>
        </BrowserRouter>
      </CryptoProvider>
    </div>
  );
}

export default App;
