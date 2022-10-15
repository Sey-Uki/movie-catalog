import { Empty } from "antd";
import { MovieCard } from "../../components/MovieCard";
import { useAppSelector } from "../../store";
import { selectFavoritesMovies } from "../../store/slices/cards";

export const Favorites = () => {
  const favorites = useAppSelector(selectFavoritesMovies);

  if (!favorites?.length) {
    return (
      <div className="noData">
      <Empty />
    </div>
    )
  }

  return (
    <div className="favorites">
      {favorites.map((movie) => {
        return (
          <div className="card" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        );
      })}
    </div>
  );
};
