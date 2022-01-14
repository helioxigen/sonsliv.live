import styles from "./Button.module.css";
import React from "react";
import { appConfig } from "../../app.config";

export const Button = ({ children, className, type }) => {
  const url = appConfig.links[type];

  const regType = () =>
    gtag("event", "click", {
      event_label: "link",
      value: type,
      transport_type: "beacon",
      event_callback: () => {
        document.location = url;
      },
    });

  return (
    <a
      className={styles.container}
      data-type={type}
      onClick={regType}
      href={url}
    >
      <div
        className={`${className} ${styles.display} ${styles[type]} absolute text-4xl md:text-6xl text-center w-full hover:top-0`}
      >
        {type}
      </div>
    </a>
  );
};
