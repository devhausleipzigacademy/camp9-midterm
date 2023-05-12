import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const TMDB_API_KEY = 'b83392e48747a4845ad80c2011eaa33b';
const TMDB_API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US`;
const TMDB_MOVIE_URL = 'https://api.themoviedb.org/3/movie';

async function getNumberOfPages(): Promise<number> {
  try {
    const response = await axios.get(TMDB_API_URL);
    return response.data.total_pages;
  } catch (error) {
    console.error('Error fetching total number of pages:');
    return 0;
  }
}

async function getMoviesFromPage(page = 1): Promise<any[]> {
  try {
    const response = await axios.get(`${TMDB_API_URL}&page=${page}`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching movies from page ${page}:`);
    return [];
  }
}

async function getMovieDetails(movieId: number): Promise<any | null> {
  try {
    const response = await axios.get(
      `${TMDB_MOVIE_URL}/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for movie id ${movieId}:`);
    return null;
  }
}

async function getMovieCredits(movieId: number): Promise<any | null> {
  try {
    const response = await axios.get(
      `${TMDB_MOVIE_URL}/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie credits for movie id ${movieId}:`);
    return null;
  }
}

export async function fetchNowPlayingMovies(): Promise<void> {
  try {
    const totalPages = await getNumberOfPages();
    for (let page = 1; page <= totalPages; page++) {
      const movies = await getMoviesFromPage(page);

      const moviePromises = movies.map(async movie => {
        const detailsPromise = getMovieDetails(movie.id);
        const creditsPromise = getMovieCredits(movie.id);

        const [details, credits] = await Promise.all([
          detailsPromise,
          creditsPromise,
        ]);
        if (!details || !credits) return;

        // Upsert movie
        const movieRecord = await prisma.movie.upsert({
          where: { tmdbId: movie.id },
          update: {},
          create: {
            tmdbId: movie.id,
            title: movie.title,
            backdropPath: details.backdrop_path,
            posterPath: details.poster_path,
            releaseDate: new Date(movie.release_date),
            runtime: details.runtime,
            voteAverage: details.vote_average,
            overview: movie.overview,
          },
        });

        // Upsert genres
        const genrePromises = details.genres.map(async (genre: any) => {
          await prisma.genre.upsert({
            where: { id: genre.id },
            update: { name: genre.name },
            create: { id: genre.id, name: genre.name },
          });

          // Connect movie and genre
          await prisma.movie.update({
            where: { id: movieRecord.id },
            data: { genres: { connect: { id: genre.id } } },
          });
        });

        await Promise.all(genrePromises);

        // Upsert credits
        await prisma.credit.upsert({
          where: { tmdbId: credits.id },
          update: { cast: { set: credits.cast }, crew: { set: credits.crew } },
          create: {
            tmdbId: credits.id,
            cast: { set: credits.cast },
            crew: { set: credits.crew },
            movie: { connect: { id: movieRecord.id } },
          },
        });
      });

      // Wait for all movie detail and credit fetching to complete
      await Promise.all(moviePromises);
    }
  } catch (error) {
    console.error('Error fetching now playing movies:');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
