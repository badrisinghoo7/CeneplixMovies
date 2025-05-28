import React, { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard';

export default function UserDashboard({ search, setSearch }) {
  const token = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [liked, setLiked] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [genre, setGenre] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);

  const fetchMovies = async () => {
    const res = await fetch('https://ceneplixmovies.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMovies(data);
    setFiltered(data);
  };

  useEffect(() => {
    fetchMovies();
    setTimeout(() => setShowFilter(true), 400);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let filteredMovies = movies;
    if (search) {
      filteredMovies = filteredMovies.filter(
        (m) =>
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.genre.toLowerCase().includes(search.toLowerCase()) ||
          m.director.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (genre.length > 0) {
      filteredMovies = filteredMovies.filter((m) => genre.includes(m.genre));
    }
    setFiltered(filteredMovies);
    setCurrentPage(1); // Reset to first page on filter/search change
  }, [search, genre, movies]);

  useEffect(() => {
    setCurrentPage(1);
  }, [moviesPerPage]);

  // Get unique genres for filter
  const genres = Array.from(new Set(movies.map((m) => m.genre)));

  const handleGenreChange = (g) => {
    setGenre((prev) =>
      prev.includes(g) ? prev.filter((item) => item !== g) : [...prev, g]
    );
  };

  const handleClearGenres = () => setGenre([]);

  const handleLike = (id) => {
    setLiked((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      setSnackbar({
        open: true,
        message: updated[id] ? 'Added to favorites!' : 'Removed from favorites!',
        severity: updated[id] ? 'success' : 'info',
      });
      return updated;
    });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / moviesPerPage);
  const paginatedMovies = filtered.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8 tracking-wide">🎬 Movie Explorer</h2>
      {/* Search bar (mobile only) */}
      <div className="block md:hidden mb-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search movies..."
          className="w-full px-4 py-2 rounded border border-blue-200 bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />
      </div>
      {/* Movies per page filter */}
      <div className="flex justify-end mb-4">
        <label className="mr-2 font-semibold text-blue-700" htmlFor="moviesPerPage">
          Movies per page:
        </label>
        <select
          id="moviesPerPage"
          value={moviesPerPage}
          onChange={e => setMoviesPerPage(Number(e.target.value))}
          className="px-3 py-1 rounded border border-blue-300 bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        >
          {[5, 10, 15, 20].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      {/* Genre Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {genres.map((g) => (
          <button
            key={g}
            className={`px-3 py-1 rounded-full border font-semibold text-sm transition
              ${genre.includes(g)
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200'}
            `}
            onClick={() => handleGenreChange(g)}
          >
            {g}
          </button>
        ))}
        {genre.length > 0 && (
          <button
            className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 font-semibold text-sm ml-2"
            onClick={handleClearGenres}
          >
            Clear
          </button>
        )}
      </div>
      {/* Selected genres as chips */}
      {genre.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {genre.map((g) => (
            <span
              key={g}
              className="flex items-center bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold"
            >
              {g}
              <button
                className="ml-2 text-blue-900 hover:text-blue-500"
                onClick={() => handleGenreChange(g)}
                aria-label="Remove genre"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}
      {/* Movie Grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-blue-500 font-semibold text-lg mt-10">
          No movies found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedMovies.map((movie) => (
              <div key={movie._id} className="flex justify-center">
                <MovieCard
                  movie={movie}
                  action={
                    <button
                      aria-label="like"
                      onClick={() => handleLike(movie._id)}
                      className={`transition text-2xl ${
                        liked[movie._id] ? 'text-blue-600' : 'text-blue-300 hover:text-blue-600'
                      }`}
                    >
                      {liked[movie._id] ? '💙' : '🤍'}
                    </button>
                  }
                />
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-1 rounded font-semibold transition ${
                    currentPage === idx + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
      {/* Snackbar */}
      {snackbar.open && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white font-semibold z-50
            ${snackbar.severity === 'success' ? 'bg-blue-600' : 'bg-blue-400'}
          `}
        >
          {snackbar.message}
          <button className="ml-4 text-lg" onClick={handleCloseSnackbar}>&times;</button>
        </div>
      )}
    </div>
  );
}
