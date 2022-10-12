import { CardComponent } from "../../components/Card";
import { useAppSelector } from "../../store";
import { selectFavoritesMovies } from "../../store/slices/cards";

export const Favorites = () => {
  const favorites = useAppSelector(selectFavoritesMovies);

  return (
    <div className="favorites">
      {favorites.map((movie) => {
        return (
          <div className="card" key={movie.id}>
            <CardComponent movie={movie} />
          </div>
        );
      })}
    </div>
  );
};
