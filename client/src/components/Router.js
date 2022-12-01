import React from 'react';
import IntroPage from './introPage/IntroPage';
import UploadPage from './uploadPage/UploadPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function Router(props) {
  return (
    <BrowserRouter>
    <Routes>
   
        <Route path="/" exact element={<IntroPage />} />
        <Route path="upload" exact element={<UploadPage />} />

    </Routes>
  </BrowserRouter>
  );
}

export default Router;