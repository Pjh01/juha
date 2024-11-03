import Head from 'next/head';
import MovieList from '@/components/MovieList';
import SearchForm from '@/components/SearchForm';
import styles from '@/styles/Search.module.css';
import axios from '@/lib/axios';

export async function getServerSideProps(context) {
  const { q } = context.query;
  const res = await axios.get(`/movies?q=${q}`);
  const movies = res.data.results ?? [];

  return {
    props: {
      movies,
      q,
    },
  };
}

export default function Search({ q, movies }) {
  return (
    <>
      <Head>
        <title>{q} 검색 결과 - watchit</title>
      </Head>
      <SearchForm initialValue={q} />
      <h2 className={styles.title}>
        <span className={styles.keyword}>{q}</span> 검색 결과
      </h2>
      <MovieList movies={movies} />
    </>
  );
}
