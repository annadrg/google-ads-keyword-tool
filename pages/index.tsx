import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [wordsA, setWordsA] = useState('');
  const [broad, setBroad] = useState(true);
  const [exact, setExact] = useState(false);
  const [phrase, setPhrase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [stripNumbers, setStripNumbers] = useState(false);
  const [copied, setCopied] = useState(false);

  function getWords() {
    let words = wordsA.split('\n');
    const allWords: string[] = [];

    if (lowerCase) words = words.map((w) => w.toLowerCase());
    if (stripNumbers) words = words.map((w) => w.replace(/[^A-Za-z ]/g, ''));

    words.forEach((w) => {
      if (!w) return;
      if (broad) allWords.push(w);
      if (exact) allWords.push(`[${w}]`);
      if (phrase) allWords.push(`"${w}"`);
    });

    return allWords.join(' ');
  }

  function copyToClipboard() {
    const copyText = document.getElementById('result')?.textContent;
    navigator.clipboard.writeText(copyText ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Label Digital SEO Tool</title>
        <meta name="description" content="Label Digital SEO Tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.navbar}>
          <Link href="/">
            <Image
              src="/images/labeldigital_logo_300px.jpeg"
              alt="logo"
              width="150"
              height="31"
            />
          </Link>
        </div>
        <h1 className={styles.title}>SEO tool</h1>

        <p className={styles.description}>
          Dit is een SEO tool. Vul hier je zoekwoorden in bla bla bla bla.
        </p>

        <div className={styles.checkInputContainer}>
          <div className={styles.checkInput}>
            <input
              id="broad"
              checked={broad}
              onChange={(e) => setBroad(e.target.checked)}
              type="checkbox"
            />
            <label htmlFor="broad">Broad</label>
          </div>

          <div className={styles.checkInput}>
            <input
              id="exact"
              checked={exact}
              onChange={(e) => setExact(e.target.checked)}
              type="checkbox"
            />
            <label htmlFor="exact">Exact</label>
          </div>

          <div className={styles.checkInput}>
            <input
              id="phrase"
              checked={phrase}
              onChange={(e) => setPhrase(e.target.checked)}
              type="checkbox"
            />
            <label htmlFor="phrase">Phrase</label>
          </div>

          <div className={styles.checkInput}>
            <input
              id="lowerCase"
              checked={lowerCase}
              onChange={(e) => setLowerCase(e.target.checked)}
              type="checkbox"
            />
            <label htmlFor="lowerCase">Lower case</label>
          </div>

          <div className={styles.checkInput}>
            <input
              id="stripNumbers"
              checked={stripNumbers}
              onChange={(e) => setStripNumbers(e.target.checked)}
              type="checkbox"
            />
            <label htmlFor="stripNumbers">Strip numbers</label>
          </div>
        </div>

        <textarea
          value={wordsA}
          rows={8}
          onChange={(e) => setWordsA(e.target.value)}
          className={styles.textBox}
          placeholder="Zoekwoorden"
        />

        <h3 className={styles.subTitle}>Resultaat</h3>
        <p className={styles.result} id="result">
          {getWords()}
        </p>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.copyButton}
            onClick={copyToClipboard}
            disabled={!navigator?.clipboard || getWords() === ''}
          >
            Kopiëren
          </button>
          {copied && <span>✔ Gekopieerd</span>}
        </div>
      </main>
    </div>
  );
};

export default Home;
