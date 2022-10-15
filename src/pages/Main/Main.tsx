import { useEffect } from "react";
import { getCards, MovieItem, selectMovies } from "../../store/slices/cards";
import { useAppDispatch, useAppSelector } from "../../store";
import { MovieCard } from "../../components/MovieCard";
import { Skeleton } from "antd";

export const Main = () => {
  const movies = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (movies?.length) return;

    dispatch(getCards());
  }, [dispatch, movies.length]);

  const cards = movies.map((movie: MovieItem) => {
    return (
      <div className="card" key={movie.id}>
        <MovieCard movie={movie} />
      </div>
    );
  });

  const skeletons = Array.from(new Array(8)).map((_, i) => {
    return (
      <div key={i} className="card skeleton">
        <Skeleton.Image active />
        <Skeleton active />
      </div>
    );
  });

  return <div className="main">{movies.length ? cards : skeletons}</div>;
};
