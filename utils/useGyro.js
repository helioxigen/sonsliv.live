import { useMotionValue, useTransform, transform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { sandbox, unbox } from ".";

export const useGyro = (gyroEnabled = true) => {
  const initialValues = useRef(null);

  const alpha = useMotionValue(0);
  const beta = useMotionValue(0);
  const gamma = useMotionValue(0);

  const handleDeviceOrientation = (gyro) => {
    if (!initialValues.current) {
      initialValues.current = {
        alpha: gyro.alpha,
        beta: gyro.beta,
        gamma: gyro.gamma,
      };
    }

    const tr = (param) =>
      transform(
        gyro[param],
        initialValues.current ? [initialValues.current[param], 180] : [0, 180],
        [0, -30]
      );

    alpha.set(tr("alpha"));
    beta.set(tr("beta"));
    gamma.set(tr("gamma"));
  };

  const requestAccessAsync = async () => {
    if (!DeviceOrientationEvent) {
      throw new Error(
        "Device orientation event is not supported by your browser"
      );
    }

    const permission =
      (await DeviceOrientationEvent.requestPermission?.()) || null;

    if (permission && permission !== "granted") {
      throw new Error("Request to access the device orientation was rejected");
    }

    window.addEventListener("deviceorientation", handleDeviceOrientation);
  };

  useEffect(() => {
    if (!gyroEnabled) return () => {};

    sandbox(requestAccessAsync);

    return () =>
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
  }, [gyroEnabled]);

  return {
    gyro: { alpha, beta, gamma },
    // delta: { alpha: dAlpha, beta: dBeta, gamma: dGamma },
    enabled: !!initialValues.current,
  };
};
