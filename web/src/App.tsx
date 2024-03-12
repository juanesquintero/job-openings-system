import cvLogo from "./assets/cv.svg";
import chatLogo from "../public/chat.svg";
import "./App.css";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={chatLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={cvLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>SGC Chat</h1>
      <div className="card">
        <Chat></Chat>
      </div>
    </>
  );
}

export default App;
