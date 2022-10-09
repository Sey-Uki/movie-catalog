import React from "react";
import styles from "./Main.module.css";
import { StarOutlined, HeartOutlined } from "@ant-design/icons";
import { Modal, Card, Rate } from "antd";
import { useState, useEffect } from "react";
import { getCards } from "../../store/slices/cards";
import { useAppDispatch, useAppSelector } from "../../store";

const { Meta } = Card;

export const Main = () => {
  const movies = useAppSelector((state) => state.cards.cards);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

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
      {movies?.map((movie: any) => {
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
