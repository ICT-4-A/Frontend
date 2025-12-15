import React from "react";
import GenreFilter from "../contents/Filter/GenreFilter";
import ActorFilter from "../contents/Filter/ActorFilter";
import DirecetorFilter from "../contents/Filter/DirectorFilter";

import Mypage from "../contents/Mypage/MyPage";
import { Route, Routes } from "react-router-dom";
import MovieLog from "../contents/Movie/MovieMain";

import BoardDetail from "../contents/Board/BoardDetail1";
import MovieForm from "../contents/Movie/MovieForm";
import MovieDetail from "../contents/Movie/MovieDetail";
import MovieDetail2 from "../contents/Movie/MovieDetail2";
import MovieDetail3 from "../contents/Movie/MovieDetail3";
import MovieDetail4 from "../contents/Movie/MovieDetail4";

import Board from "../contents/Board/Board";
import BoardDetail1 from "../contents/Board/BoardDetail1";
import BoardDetail2 from "../contents/Board/BoardDetail2";
import BoardForm from "../contents/Board/BoardForm";
import ToAdminForm from "../contents/Mypage/ToAdminForm";
import ToAdminDetail from "../contents/Mypage/ToAdminDetail";
import Login from "../contents/Login/Login";
import SignUp from "../contents/SignUp/SignUp";

const AppRoutes: React.FC = () => {


  const routeList = [
    { path: "/", element: <MovieLog /> },
    { path: "/movielog", element: <MovieLog /> },
    { path: "/movieform", element: <MovieForm /> },
    { path: "/movielog/detail", element: <MovieDetail /> },
    { path: "/movielog/detail2", element: <MovieDetail2 /> },
    { path: "/movielog/detail3", element: <MovieDetail3 /> },
    { path: "/movielog/detail4", element: <MovieDetail4 /> },

    { path: "/genre", element: <GenreFilter /> },
    { path: "/actor", element: <ActorFilter /> },
    { path: "/director", element: <DirecetorFilter /> },

    { path: "/board", element: <Board /> },
    { path: "/board/detail1", element: <BoardDetail1 /> },
    { path: "/board/detail2", element: <BoardDetail2 /> },
    { path: "/board/write", element: <BoardForm /> },

    { path: "/mypage", element: <Mypage /> },
    { path: "/mypage/toadminform", element: <ToAdminForm /> },
    { path: "/mypage/toadmindetail", element: <ToAdminDetail /> },

    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
  ];

  return (
    <Routes>
      {routeList.map((route, idx) => (
        <Route key={idx} {...route} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
