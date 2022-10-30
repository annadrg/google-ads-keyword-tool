import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [wordsA, setWordsA] = useState('');
  const [wordsB, setWordsB] = useState('');
  const [wordsC, setWordsC] = useState('');
  const [wordsD, setWordsD] = useState('');

  const [fieldsCount, setFieldsCount] = useState(1);

  const [broad, setBroad] = useState(true);
  const [exact, setExact] = useState(false);
  const [phrase, setPhrase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [stripNumbers, setStripNumbers] = useState(false);

  const [copied, setCopied] = useState(false);

  function pushWord(word: string, array: string[]) {
    if (!word) return;

    if (lowerCase) word = word.toLowerCase();
    if (stripNumbers) word = word.replace(/[^A-Za-z ]/g, '');

    if (broad) array.push(word);
    if (exact) array.push(`[${word}]`);
    if (phrase) array.push(`"${word}"`);
  }

  function getWords() {
    let words = wordsA.split('\n');
    const allWords: string[] = [];

    words.forEach((w) => {
      if (wordsB && fieldsCount > 1) {
        const wordCombos: string[] = [];
        wordsB.split('\n').forEach((wB) => {
          if (wordsC && fieldsCount > 2) {
            wordsC.split('\n').forEach((wC) => {
              if (wordsD && fieldsCount > 3) {
                wordsD.split('\n').forEach((wD) => {
                  if (!(w && wB && wC && wD)) return;
                  wordCombos.push(w + ' ' + wB + ' ' + wC + ' ' + wD);
                });
              } else {
                if (!(w && wB && wC)) return;
                wordCombos.push(w + ' ' + wB + ' ' + wC);
              }
            });
          } else {
            if (!(w && wB)) return;
            wordCombos.push(w + ' ' + wB);
          }
        });
        wordCombos.forEach((c) => pushWord(c, allWords));
      } else {
        pushWord(w, allWords);
      }
    });

    return allWords.join('\n');
  }

  function copyToClipboard() {
    const copyText = document.getElementById('result')?.textContent;
    navigator.clipboard.writeText(copyText ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function clear() {
    setWordsA('');
    setWordsB('');
    setWordsC('');
    setWordsD('');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Google Ads Keyword Tool - Wrap and Combine Keywords</title>
        <meta
          name="description"
          content="Free Google AdWords keyword wrapper to convert keywords to broad, phrase or exact match for your Google Ads search campaigns. Easily create keyword lists and combine keywords. "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.navbar}>
          <Link href="https://labeldigital.com/">
            <Image
              className={styles.image}
              src="/images/labeldigital_logo_300px.jpeg"
              alt="logo"
              width="150"
              height="31"
            />
          </Link>
          <Link href="https://labeldigital.com/schedule-call/">
            <button className={styles.consultancyButton}>
              Google Ads Services
            </button>
          </Link>
        </div>
        <h1 className={styles.title}>Google Ads Keyword Tool</h1>

        <p className={styles.description}>
          Our Google AdWords keyword wrapper tool helps PPC marketeers to
          convert a list of keywords to either broad match, phrase match or
          exact match. In addition, this tool can combine different keywords to
          create extensive keyword lists with ease. This Google Search Ads
          keyword tool is free to use and provided by Label Digital. Feel free
          to share.
        </p>
        <p className={styles.description}>
          To start using this tool, enter one keyword per line. If you want to
          combine more than 2 keywords, add more boxes with the + button.
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

        <div className={styles.fieldsWrapper}>
          <textarea
            value={wordsA}
            rows={8}
            onChange={(e) => setWordsA(e.target.value)}
            className={styles.textBox}
            placeholder="Enter keywords"
          />

          {fieldsCount > 1 && (
            <textarea
              value={wordsB}
              rows={8}
              onChange={(e) => setWordsB(e.target.value)}
              className={styles.textBox}
              placeholder="Enter keywords"
              disabled={!wordsA}
            />
          )}

          {fieldsCount > 2 && (
            <textarea
              value={wordsC}
              rows={8}
              onChange={(e) => setWordsC(e.target.value)}
              className={styles.textBox}
              placeholder="Enter keywords"
              disabled={!wordsB}
            />
          )}

          {fieldsCount > 3 && (
            <textarea
              value={wordsD}
              rows={8}
              onChange={(e) => setWordsD(e.target.value)}
              className={styles.textBox}
              placeholder="Enter keywords"
              disabled={!wordsC}
            />
          )}

          <div>
            <button
              onClick={() => setFieldsCount((v) => v + 1)}
              disabled={fieldsCount === 4}
            >
              +
            </button>
            <button
              onClick={() => setFieldsCount((v) => v - 1)}
              disabled={fieldsCount === 1}
            >
              −
            </button>
          </div>
        </div>

        <button
          className={styles.clearButton}
          onClick={clear}
          disabled={getWords() === ''}
        >
          Clear all
        </button>

        <h3 className={styles.subTitle}>Result</h3>
        <p className={styles.result} id="result">
          {getWords()}
        </p>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.copyButton}
            onClick={copyToClipboard}
            disabled={!global.navigator?.clipboard || getWords() === ''}
          >
            Copy
          </button>
          {copied && <span>✔ Copied</span>}
        </div>
        <div className={styles.footer}>
          © Label Digital | Do you need help with Google Ads? Schedule a{' '}
          <span>
            <Link href="https://labeldigital.com/schedule-call/">
              free discovery call
            </Link>
          </span>{' '}
          or{' '}
          <span>
            <Link href="https://labeldigital.com/contact/">contact us</Link>
          </span>
          .
        </div>
      </main>
    </div>
  );
};

export default Home;
