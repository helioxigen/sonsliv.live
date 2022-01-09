import styles from "./Button.module.css";
import React from "react";
import { appConfig } from "../../app.config";

export const Button = ({ children, className, type }) => {
  return (
    <a
      className={styles.container}
      data-type={type}
      href={appConfig.links[type]}
    >
      <div
        className={`${className} ${styles.display} ${styles[type]} absolute text-6xl text-center w-full hover:top-0`}
      >
        {type}
      </div>
    </a>
  );
};
