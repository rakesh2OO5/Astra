import "./App.css";
import Chatwindow from "./Chatwindow.jsx";
import Sidebar from "./Sidebar.jsx";
import { MyContext } from "./MyContext.jsx";
function App() {
  const valueProvider = {};
  return (
    <div className="app">
      <MyContext.Provider value={valueProvider}>
        <Sidebar />
        <Chatwindow />
      </MyContext.Provider>
    </div>
  );
}

export default App;
