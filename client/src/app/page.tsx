"use server";
import React from "react";
import Head from "next/head";
import "./LandingPage.module.scss";
import styles from "./LandingPage.module.scss";

const prompts = [
  "Ask AI to summarize documents",
  "Get instant answers from your data",
  "Generate reports with context",
];

const LandingPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Next-Gen AI Chat with Contextual Intelligence | Try Now</title>
      </Head>

      <main className="main">
        <section className={styles.heroSection}>
          <h1 className={styles.title}>Transform the Way You Chat with AI</h1>
          <p className={styles.subtitle}>
            Meet the AI assistant that understands your documents and
            conversations — powered by cutting-edge Retrieval-Augmented
            Generation (RAG) technology.
          </p>
          <p className={styles.subtitle}>
            Upload files, let AI analyze them, and get answers that truly
            understand your context.
          </p>
          <a href="/login" className={styles.ctaButton}>
            Try Now — It’s Free!
          </a>
        </section>
        <section>
          <ul className={styles.promptsContainer}>
            {prompts.map((prompt, i) => (
              <li key={i} className={styles.promptItem}>
                {prompt}
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>Why Choose Our AI Chat?</h2>
          <ul className={styles.featuresList}>
            <li>🔍 Context-aware answers from your own documents and data</li>
            <li>
              ⚡ Instant responses powered by vector search and advanced AI
              models
            </li>
            <li>🔒 Secure authentication with Google OAuth</li>
            <li>🛠️ Easy integration with your workflow and data sources</li>
            <li>☁️ Fully cloud-hosted for speed and reliability</li>
          </ul>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
