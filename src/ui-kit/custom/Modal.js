import React, { useContext } from "react";
import styles from "./ui.module.css";
import Box from "./Box";
// import { GobalContext, IContextObject } from "store";


export default function Modal({ show, children }) {
  // const appContext = useContext(GobalContext) || {};

  const onClickHideHandler = (e) => {
    // if (e.currentTarget === e.target) {
    //   if (!!appContext) {
    //     appContext?.setModalData({
    //       show: false,
    //     });
    //   }
    // }
  };

  return show ? (
    <Box onClick={onClickHideHandler} className={styles.modalContainer}>
      <Box>{children}</Box>
    </Box>
  ) : null;
}

Modal.defaultProps = {
  show: false,
};
