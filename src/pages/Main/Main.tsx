import styles from "./Main.module.css";
import {
  StarOutlined,
  StarFilled,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Modal, Card, Rate } from "antd";
import { useState, useEffect } from "react";
import {
  getCards,
  IMovie,
  likeFilm,
  retesFilm,
} from "../../store/slices/cards";
import { useAppDispatch, useAppSelector } from "../../store";

type rates = "filmscript" | "acting" | "operator";

const { Meta } = Card;

export const Main = () => {
  const movies = useAppSelector((state) => state.cards.cards);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
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

  const selectMovie = (movie: IMovie) => {
    setSelectedMovie(movie);
    showModal();
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

  console.log(selectedMovie);
  return (
    <div className={styles.main}>
      {movies?.map((movie: IMovie) => {
        return (
          <div className={styles.card} key={movie.id}>
            <Card
              style={{ width: 300 }}
              cover={<img alt="example" src={movie.src} />}
              actions={[
                movie.rates.average > 0 ? (
                  <div>
                    <StarFilled
                      key="start"
                      onClick={() => selectMovie(movie)}
                    />
                    <span>{movie.rates.average.toFixed(1)}</span>
                  </div>
                ) : (
                  <StarOutlined
                    key="start"
                    onClick={() => selectMovie(movie)}
                  />
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
              <Meta
                title={movie.name}
                // description={movie.description}
              />
            </Card>
          </div>
        );
      })}
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
    </div>
  );
};
