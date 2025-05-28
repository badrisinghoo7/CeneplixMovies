import React, { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard';

export default function AdminDashboard() {
  const token = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', director: '', releaseYear: '', genre: '', avatar: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);

  const fetchMovies = async () => {
    const res = await fetch('https://ceneplixmovies.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMovies(data);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, []);

  const handleOpen = (movie = null) => {
    setEditMovie(movie);
    setForm(movie || { title: '', description: '', director: '', releaseYear: '', genre: '', avatar: '' });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const method = editMovie ? 'PUT' : 'POST';
    const url = editMovie ? `https://ceneplixmovies.onrender.com/movies/${editMovie._id}` : 'https://ceneplixmovies.onrender.com/movies';
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    fetchMovies();
    handleClose();
    setSnackbar({ open: true, message: editMovie ? 'Movie updated!' : 'Movie created!', severity: 'success' });
  };

  const handleDelete = async (id) => {
    await fetch(`https://ceneplixmovies.onrender.com/movies/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMovies();
    setSnackbar({ open: true, message: 'Movie deleted!', severity: 'info' });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  // Pagination logic
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const paginatedMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [moviesPerPage]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 tracking-widest">🎬 Admin Dashboard</h1>
      <button
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6 transition"
        onClick={() => handleOpen()}
      >
        <span className="text-xl">＋</span> Add Movie
      </button>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedMovies.map((movie) => (
          <div key={movie._id} className="flex flex-col items-center w-full">
            <MovieCard movie={movie} />
            <div className="flex w-full mt-3 gap-2">
              <button
                className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded shadow transition"
                onClick={() => handleOpen(movie)}
                title="Edit"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm0 0V21h8"></path>
                </svg>
                Edit
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-3 py-2 rounded shadow transition"
                onClick={() => handleDelete(movie._id)}
                title="Delete"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Delete
              </button>
            </div>
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

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative border border-blue-200">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
              {editMovie ? 'Edit Movie' : 'Add Movie'}
            </h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-4"
            >
              <input
                className="w-full px-4 py-2 rounded border border-blue-200 bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
              />
              <input
                className="w-full px-4 py-2 rounded border border-blue-200 bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                type="text"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
              />
              <input
                className="w-full px-4 py-2 rounded border border-blue-200 bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                type="text"
                name="director"
                placeholder="Director"
                value={form.director}
                onChange={handleChange}
                required
              />
              <input
                className="w-full px-4 py-2 rounded border border-blue-200 bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                type="number"
                name="releaseYear"
                placeholder="Release Year"
                value={form.releaseYear}
                onChange={handleChange}
                required
              />
              <input
                className="w-full px-4 py-2 rounded border border-blue-200 bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                type="text"
                name="genre"
                placeholder="Genre"
                value={form.genre}
                onChange={handleChange}
                required
              />
              <input
                className="w-full px-4 py-2 rounded border border-blue-200 bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                type="text"
                name="avatar"
                placeholder="Avatar URL"
                value={form.avatar}
                onChange={handleChange}
                required
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-100 text-blue-700 font-semibold hover:bg-blue-50 transition border border-blue-200"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow"
                >
                  {editMovie ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Snackbar */}
      {snackbar.open && (
        <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white font-semibold z-50
          bg-blue-600
        `}>
          {snackbar.message}
          <button className="ml-4 text-lg" onClick={handleCloseSnackbar}>&times;</button>
        </div>
      )}
    </div>
  );
}
