import { CardComponent } from "../../components/Card";
import { useAppSelector } from "../../store";
import { selectRatedMovies } from "../../store/slices/cards";

export const Rated = () => {
  const rated = useAppSelector(selectRatedMovies);

  return(
    <div className="rated">
    {rated.map((movie) => {
      return (
        <div className="card" key={movie.id}>
          <CardComponent movie={movie} />
        </div>
      );
    })}
  </div>
  )
}
