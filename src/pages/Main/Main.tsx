import styles from "./Main.module.css";
import { useEffect } from "react";
import { getCards, IMovie, selectMovies } from "../../store/slices/cards";
import { useAppDispatch, useAppSelector } from "../../store";
import { CardComponent } from "../../components/Card";

export const Main = () => {
  const movies = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  return (
    <div className="main">
      {movies?.map((movie: IMovie) => {
        return (
          <div className="card" key={movie.id}>
            <CardComponent movie={movie} />
          </div>
        );
      })}
    </div>
  );
};
