import MovieList from '@/components/MovieList';
import SearchForm from '@/components/SearchForm';
import styles from '@/styles/Home.module.css';
import axios from '@/lib/axios';

export async function getStaticProps() {
  const res = await axios.get('/movies/');
  const movies = res.data.results ?? [];
  return {
    props: { movies },
  };
}

export default function Home({ movies }) {
  return (
    <>
      <SearchForm />
      <MovieList className={styles.movieList} movies={movies} />
    </>
  );
}
