import { Card } from "antd";
import {
  StarOutlined,
  StarFilled,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { MovieItem, likeMovie } from "../store/slices/cards";
import { useState } from "react";
import { useAppDispatch } from "../store";
import { MovieModal } from "./MovieModal";
const { Meta } = Card;

type Props = {
  movie: MovieItem;
}

export const MovieCard = ({ movie }: Props) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const selectMovie = (movie: MovieItem) => {
    setSelectedMovie(movie);
    showModal();
  };

  return (
    <>
      <Card
        style={{ width: 300 }}
        cover={<img alt="example" src={movie.src} />}
        actions={[
          movie.rates.average > 0 ? (
            <div>
              <StarFilled key="start" onClick={() => selectMovie(movie)} />
              <span>{movie.rates.average.toFixed(1)}</span>
            </div>
          ) : (
            <StarOutlined key="start" onClick={() => selectMovie(movie)} />
          ),
          movie.like ? (
            <HeartFilled
              key="heart"
              onClick={() => dispatch(likeMovie(movie.id))}
            />
          ) : (
            <HeartOutlined
              key="heart"
              onClick={() => dispatch(likeMovie(movie.id))}
            />
          ),
        ]}
      >
        <Meta title={movie.name} description={movie.description} />
      </Card>
      <MovieModal
        setIsModalOpen={setIsModalOpen}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        isModalOpen={isModalOpen}
      />
    </>
  );
};
