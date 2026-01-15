import React from "react";

import Mypage from "../contents/Mypage/MyPage";
import { Route, Routes } from "react-router-dom";
import MovieLog from "../contents/Movie/MovieMain";

import MovieForm from "../contents/Movie/MovieForm";
import MovieDetail from "../contents/Movie/MovieDetail";




import Board from "../contents/Board/Board";
import BoardDetail1 from "../contents/Board/Detail1";
import BoardDetail2 from "../contents/Board/Detail2";
import BoardForm from "../contents/Board/BoardForm";
import ToAdminForm from "../contents/Mypage/ToAdminForm";
import ToAdminDetail from "../contents/Mypage/ToAdminDetail";
import Login from "../contents/Login/Login";
import SignUp from "../contents/SignUp/SignUp";
import Diary from "../contents/Diary/Diary";
import GenreSearch from "../contents/Search/GenreSearch";
import DirectorSearch from "../contents/Search/DirectorSearch";
import ActorSearch from "../contents/Search/ActorSearch";
import MovieInfo from "../contents/Movie/MovieInfo";
import MovieSearch from "../contents/Movie/MovieSearch";
import FindID from "../contents/Login/Find";
import SurveyForm from "../contents/Survey/SurveyForm";
import Survey from "../contents/Survey/Survey";
import SurveryDetail from "../contents/Survey/SurveryDetail";
import SurveyResult from "../contents/Survey/SurveyResult";
import BoardList from "../contents/Board/BoardList";
import BoardDetail from "../contents/Board/BoardDetail";

import Gallery from "../contents/Gallery/Gallery";
import GalleryDetail from "../contents/Gallery/GalleryDetail";
import GalleryForm from "../contents/Gallery/GalleryForm";
import RequireAuth from "../components/RequireAuth";



const AppRoutes: React.FC = () => {
  const routeList = [
    { path: "/", element: <MovieLog /> },
    { path: "/movielog", element: <MovieLog /> },
    { path: "/moviesearch", element: <MovieSearch /> },
    { path: "/movieform/:num", element: <MovieForm /> },

    { path: "/movie/detail/:num", element: <MovieDetail /> },
    // { path: "/movielog/detail2", element: <MovieDetail2 /> },
    // { path: "/movielog/detail3", element: <MovieDetail3 /> },
    // { path: "/movielog/detail4", element: <MovieDetail4 /> },

    { path: "/Diary", element: <Diary /> },

    { path: "/Search", element: <GenreSearch /> },
    { path: "/Search/Director", element: <DirectorSearch /> },
    { path: "/Search/Actor", element: <ActorSearch /> },

    { path: "/MovieInfo", element: <MovieInfo /> },

    // { path: "/board", element: <Board /> },
    // { path: "/board/detail1", element: <BoardDetail1 /> },
    // { path: "/board/detail2", element: <BoardDetail2 /> },
    // { path: "/board/write", element: <BoardForm /> },
    { path: '/board/list', element: <BoardList/>},
    { path: '/board/form', element: <BoardForm/>},
    { path: '/board/detail/:num', element: <RequireAuth><BoardDetail/></RequireAuth>},
    
    { path: "/board", element: <Board /> },
    { path: "/board/detail1", element: <BoardDetail1 /> },
    { path: "/board/detail2", element: <BoardDetail2 /> },
    { path: "/board/write", element: <BoardForm /> },
   
    { path: "/gallery/detail", element: <GalleryDetail /> },
    { path: "/gallery/form", element: <GalleryForm /> },
    { path: '/gallery', element: <Gallery /> },
    { path: '/gallery/write', element: <GalleryForm /> },
    { path: '/gallery/gdetail/:num', element: <RequireAuth><GalleryDetail /></RequireAuth> },



    { path: "/mypage", element: <Mypage /> },
    { path: "/mypage/toadminform", element: <ToAdminForm /> },
    { path: "/mypage/toadmindetail", element: <ToAdminDetail /> },

    { path: "/login", element: <Login /> },
    { path: "/Find", element: <FindID /> },
    { path: "/signup", element: <SignUp /> },

    { path: "/survey/surveyform", element: <SurveyForm /> },
    { path: "/survey", element: <Survey /> },
    { path: "/survey/detail/:num", element: <SurveryDetail /> },
    { path: "/survey/result/:num", element: <SurveyResult /> }
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
