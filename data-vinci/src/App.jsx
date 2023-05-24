import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { Dashboard } from "./Pages/Dashboard";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Dashboard/>
      </div>
    </>
  );
}

export default App;
