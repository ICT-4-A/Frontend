// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import GenreFilter from "./components/Filter/GenreFilter";
import ActorFilter from "./components/Filter/ActorFilter";
import DirectorFilter from "./components/Filter/DirectorFilter";
import MovieLog from "./components/MovieLog/MovieLog";
import MovieLogForm from "./components/MovieLog/MovieLogForm";
import MyPage from "./components/Mypage/MyPage";
import Board from "./components/Board/Board"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<MovieLog />} />
        <Route path="/genre" element={<GenreFilter />} />
        <Route path="/actor" element={<ActorFilter />} />
        <Route path="/director" element={<DirectorFilter />} />
        <Route path="/movielog" element={<MovieLog />} />
        <Route path="/movielogform" element={<MovieLogForm />} />
        <Route path="/board" element={<Board/>} />
        <Route path="/mypage" element={<MyPage />} />

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
