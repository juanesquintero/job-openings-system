import cvLogo from "./assets/cv.svg";
import chatLogo from "../public/chat.svg";
import "./App.css";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <main>
      <div className="flex items-center justify-center w-full">
        <a href="https://vitejs.dev" target="_blank">
          <img src={chatLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={cvLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl">SGC Chat</h1>
      <div className="flex items-center justify-center w-full">
        <Chat />
      </div>
    </main>
  );
}

export default App;
