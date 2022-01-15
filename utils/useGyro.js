import { useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { sandbox, unbox } from ".";

export const useGyro = (gyroEnabled = true) => {
  const initialValues = useRef(null);

  const alpha = useMotionValue(0);
  const beta = useMotionValue(0);
  const gamma = useMotionValue(0);

  const angle = [0, -30];

  const useDeltaAngle = (mvValue) => {
    const [param, value] = unbox(mvValue);

    return useTransform(
      value,
      initialValues.current ? [initialValues.current[param], 180] : [0, 180],
      [0, -30]
    );
  };

  const dAlpha = useDeltaAngle({ alpha });
  const dBeta = useDeltaAngle({ beta });
  const dGamma = useDeltaAngle({ gamma });

  const handleDeviceOrientation = (gyro) => {
    if (!initialValues.current) {
      initialValues.current = {
        alpha: gyro.alpha,
        beta: gyro.beta,
        gamma: gyro.gamma,
      };
    }

    alpha.set(gyro.alpha);
    beta.set(gyro.beta);
    gamma.set(gyro.gamma);
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
    delta: { alpha: dAlpha, beta: dBeta, gamma: dGamma },
  };
};
