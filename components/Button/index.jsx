import { motion } from "framer-motion";
import styles from "./Button.module.css";
import React from "react";

const ButtonsContext = React.createContext({ hover: false });

export const Button = ({ children, className, type }) => {
  return (
    <motion.a className={styles.container} data-type={type}>
      <div
        className={`${className} ${styles.display} ${styles[type]} absolute text-6xl text-center w-full hover:top-0`}
      >
        {type}
      </div>
    </motion.a>
  );
};
