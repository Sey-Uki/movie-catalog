import { Empty } from "antd";
import { MovieCard } from "../../components/MovieCard";
import { useAppSelector } from "../../store";
import { selectRatedMovies } from "../../store/slices/cards";

export const Rated = () => {
  const rated = useAppSelector(selectRatedMovies);

  if (!rated?.length) {
    return (
      <div className="noData">
      <Empty />
    </div>
    )
  }

  return (
    <div className="rated">
      {rated.map((movie) => {
        return (
          <div className="card" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        );
      })}
    </div>
  );
};
