import React from 'react'
import GenreFilter from '../contents/Filter/GenreFilter'
import ActorFilter from '../contents/Filter/ActorFilter'
import DirecetorFilter from '../contents/Filter/DirectorFilter'

import Board from '../contents/Board/Board'
import Mypage from '../contents/Mypage/MyPage'
import { Route, Routes } from 'react-router-dom'
import MovieLog from '../contents/MovieLog/MovieLog'

import BoardDetail from '../contents/Board/BoardDetail'
import MovieForm from '../contents/MovieLog/MovieForm'


const AppRoutes: React.FC = () => {

    const routeList = [
        {path : '/', element:<MovieLog />},
        {path : 'genre', element:<GenreFilter />},
        {path : '/actor', element:<ActorFilter />},
        {path : '/director', element:<DirecetorFilter />},
        {path : '/movielog', element:<MovieLog />},
        {path : '/movieform', element:<MovieForm />},
        {path : '/board', element:<Board />},
        {path : '/mypage', element:<Mypage />},
        {path : '/board/detail', element:<BoardDetail  />},

    ]

  return (
    <Routes>
            {
                routeList.map((route, idx) => (
                    <Route key={idx}{...route} />
                ))
            }
        </Routes>
  )
}

export default AppRoutes