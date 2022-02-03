import { NextSeo } from "next-seo";
import React from "react";
import { Button } from "../components/Button";
import { Hero } from "../components/Hero";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <NextSeo
        title="SON SLIV LIVES HERE"
        description="THERE IS SOMETHING YOU NEED TO HEAR"
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://sonsliv.live/",
          images: [
            {
              url: "/favicon.ico",
              width: 256,
              height: 256,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <Hero />
      <section className="mx-auto mt-14 space-y-5 hover-blur">
        <Button type="spotify" />
        <Button type="apple" />
        <Button type="youtube" />
        <Button type="soundcloud" />
      </section>
    </main>
  );
}
