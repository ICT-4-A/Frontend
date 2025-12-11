import React from 'react'
import GenreFilter from '../contents/Filter/GenreFilter'
import ActorFilter from '../contents/Filter/ActorFilter'
import DirecetorFilter from '../contents/Filter/DirectorFilter'


import Mypage from '../contents/Mypage/MyPage'
import { Route, Routes } from 'react-router-dom'
import MovieLog from '../contents/MovieLog/MovieLog'

import Board from '../contents/Board/Board'
import BoardDetail1 from '../contents/Board/BoardDetail1'
import BoardDetail2 from '../contents/Board/BoardDetail2'

import MovieForm from '../contents/MovieLog/MovieForm'


const AppRoutes: React.FC = () => {

    const routeList = [
        {path : '/', element:<MovieLog />},
        {path : '/movielog', element:<MovieLog />},
        {path : '/movieform', element:<MovieForm />},

        {path : 'genre', element:<GenreFilter />},
        {path : '/actor', element:<ActorFilter />},
        {path : '/director', element:<DirecetorFilter />},
        
        {path : '/board', element:<Board />},
        {path : '/board/detail1', element:<BoardDetail1 />},
        {path : '/board/detail2', element:<BoardDetail2 />},

        {path : '/mypage', element:<Mypage />}
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