import { useEffect } from "react";
import { getCards, IMovie, selectMovies } from "../../store/slices/cards";
import { useAppDispatch, useAppSelector } from "../../store";
import { CardComponent } from "../../components/Card";

export const Main = () => {
  const movies = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(movies.length);
    if (movies?.length) return;

    dispatch(getCards());
  }, [dispatch, movies.length]);

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
