import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, resetDetail } from "../../redux/actions";
import NavBar from "../Home/NavBar/NavBar";
import styles from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [props.match.params.id, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetDetail());
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div>
        <NavBar />
      </div>

      <div>
        {detail.length ? (
          <div className={styles.card}>
            <h1>{detail[0].name}</h1>
            <img src={detail[0].image} alt="" />

            <div className={styles.text}>
              <h2>
                <span className={styles.weight}>
                  {detail[0].weight} 
                  {detail[0].weight_min ? ` ${detail[0].weight_min} - ${detail[0].weight_max}`  : null}
                  { ' '} Kg
                </span>
                <span className={styles.height}>
                  {detail[0].height} 
                  {detail[0].height_min ?  `${detail[0].height_min} - ${detail[0].height_max}`  : null}
                   { ' '} cm
                </span>
              </h2>

              <h2>
                
                {detail[0].life_span || `${detail[0].createdInDB} years`? `${detail[0].life_span}` : null}
                { ' '} 
              </h2>
            </div>
           
            <div className={styles.temperaments}>
              <p className={styles.content}>
                {detail[0].createdInDB || detail[0].temperaments
                  ? detail[0].temperaments.map((temp) => temp.name).join(", ")
                  : detail[0].temperament}
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.loader}>
            <div className={styles.loader_square}></div>
            <div className={styles.loader_square}></div>
            <div className={styles.loader_square}></div>
            <div className={styles.loader_square}></div>
            <div className={styles.loader_square}></div>
            <div className={styles.loader_square}></div>
            <div className={styles.loader_square}></div>
          </div>
        )}
      </div>
    </div>
  );
}
