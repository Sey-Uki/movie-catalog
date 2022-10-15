import { Routes, Route } from "react-router-dom";
import { Favorites } from "./pages/Favorites/Favorites";
import { Main } from "./pages/Main/Main";
import { Rated } from "./pages/Rated/Rated";

export enum Endpoints {
  Main = '/',
  Favorites = '/favorites',
  Rated = '/rated'
}

export const AppRoutes = () => {
  return(
    <Routes>
      <Route path={Endpoints.Main} element={<Main />}/>
      <Route path={Endpoints.Favorites} element={<Favorites />}/>
      <Route path={Endpoints.Rated} element={<Rated />}/>
    </Routes>
  )
}