import Head from "next/head";
import React from "react";
import { Button } from "../components/Button";
import { Hero } from "../components/Hero";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <Head>
        <title>SON SLIV LIVES HERE</title>
        <meta
          name="description"
          content="THERE IS SOMETHING YOU NEED TO HEAR"
        ></meta>
      </Head>
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
