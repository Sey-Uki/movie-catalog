import { Modal, Card, Rate } from "antd";
import {
  StarOutlined,
  StarFilled,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { IMovie, likeFilm, retesFilm } from "../store/slices/cards";
import { useState } from "react";
import { useAppDispatch } from "../store";
const { Meta } = Card;

interface ICardProps {
  movie: IMovie;
}

type rates = "filmscript" | "acting" | "operator";

export const CardComponent = ({ movie }: ICardProps) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const selectMovie = (movie: IMovie) => {
    setSelectedMovie(movie);
    showModal();
  };

  const handleOk = () => {
    if (!selectedMovie) return;

    const { rates } = selectedMovie;

    if (rates.filmscript && rates.acting && rates.operator) {
      dispatch(retesFilm(selectedMovie));
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changeRate = (value: number, rateName: rates) => {
    if (selectedMovie) {
      setSelectedMovie({
        ...selectedMovie,
        rates: {
          ...selectedMovie?.rates,
          [rateName]: value,
        },
      });
    }
  };

  // const desc = movie.description.l

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
              onClick={() => dispatch(likeFilm(movie.id))}
            />
          ) : (
            <HeartOutlined
              key="heart"
              onClick={() => dispatch(likeFilm(movie.id))}
            />
          ),
        ]}
      >
        <Meta title={movie.name} description={movie.description} />
      </Card>

      <Modal
        title="Оценка фильма"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <div>Сценарий:</div>
          <Rate
            allowHalf
            onChange={(value: number) => changeRate(value, "filmscript")}
            value={selectedMovie?.rates.filmscript}
          />
        </div>
        <div>
          <div>Актерское мастерство:</div>
          <Rate
            allowHalf
            onChange={(value: number) => changeRate(value, "acting")}
            value={selectedMovie?.rates.acting}
          />
        </div>
        <div>
          <div>Операторская работа:</div>
          <Rate
            allowHalf
            onChange={(value: number) => changeRate(value, "operator")}
            value={selectedMovie?.rates.operator}
          />
        </div>
      </Modal>
    </>
  );
};
