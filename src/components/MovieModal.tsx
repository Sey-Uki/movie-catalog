import { Alert, Modal, Rate } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../store";
import { MovieItem, rateMovie } from "../store/slices/cards";

type Rates = "filmscript" | "acting" | "operator";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  selectedMovie: MovieItem | null;
  setSelectedMovie: (value: MovieItem | null) => void;
}

export const MovieModal = ({
  setIsModalOpen,
  selectedMovie,
  setSelectedMovie,
  isModalOpen,
}: Props) => {
  const dispatch = useAppDispatch();

  const [showWarning, setShowWarning] = useState(false);

  const changeRate = (value: number, rateName: Rates) => {
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    if (!selectedMovie) return;

    const { rates } = selectedMovie;

    if (rates.filmscript && rates.acting && rates.operator) {
      dispatch(rateMovie(selectedMovie));
      setIsModalOpen(false);
      showWarning && setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };
  return (
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
      {showWarning && (
        <Alert message="Заполните все оценки" type="error" />
      )}
    </Modal>
  );
};
