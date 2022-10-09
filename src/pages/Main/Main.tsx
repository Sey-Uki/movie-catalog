import React from "react";
import styles from "./Main.module.css";
import { StarOutlined, HeartOutlined } from "@ant-design/icons";
import { Modal, Card, Rate } from "antd";
import { useState, useEffect } from "react";

const { Meta } = Card;

interface IMovie {
  id: number;
  name: string;
  description: string;
  src: string;
}

export const Main = () => {
  const [movie, setMovies] = useState<IMovie[]>([]);
  useEffect(() => {
    fetch("https://run.mocky.io/v3/f41356c2-e1ee-4fe3-aad7-62e2c5bb68a4")
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.data);
      });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.main}>
      {movie?.map((movie: any) => {
        return (
          <div className={styles.card} key={movie.id}>
            <Card
              style={{ width: 300 }}
              cover={<img alt="example" src={movie.src} />}
              actions={[
                <StarOutlined key="start" onClick={showModal} />,
                <HeartOutlined key="heart" />,
              ]}
            >
              <Meta
                title={movie.name}
                // description={movie.description}
              />
            </Card>

            <Modal
              title="Оценка фильма"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div>
                <div>Сценарий:</div> <Rate />
              </div>
              <div>
                <div>Актерское мастерство:</div>
                <Rate />
              </div>
              <div>
                <div>Операторская работа:</div> <Rate />
              </div>
            </Modal>
          </div>
        );
      })}
    </div>
  );
};
