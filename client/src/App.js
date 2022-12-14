import IntroPage from "./components/introPage/IntroPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPage from "./components/uploadPage/UploadPage";
import SandboxPage from "./components/sandboxPage/SandboxPage";
import Dashboard from "./components/spotifyPage/Dashboard";
import MicInput from "./components/micInput/MicInputPage";

const code = new URLSearchParams(window.location.search).get("code");
function App() {
  return code ? (
    <Dashboard code={code} />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<IntroPage />} />
        <Route path="upload" exact element={<UploadPage />} />
        <Route path="sandbox" exact element={<SandboxPage />} />
        <Route path="mic" exact element={<MicInput />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
