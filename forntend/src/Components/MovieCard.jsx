import React from 'react';

export default function MovieCard({ movie, action }) {
  return (
    <div className="bg-white border border-blue-100 rounded-xl shadow hover:shadow-lg transition w-full flex flex-col">
      <div className="relative">
        <img
          src={movie.avatar}
          alt={movie.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute top-2 right-2 z-10">{action}</div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-blue-700 mb-1 truncate">{movie.title}</h3>
        <div className="flex gap-2 mb-2">
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">{movie.genre}</span>
          <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">{movie.releaseYear}</span>
        </div>
        <p className="text-blue-700 text-sm mb-2 line-clamp-2">{movie.description}</p>
        <div className="flex items-center gap-1 text-xs text-blue-500 mt-auto">
          <span className="font-semibold">Director:</span>
          <span>{movie.director}</span>
        </div>
        <div className="text-xs text-blue-300 mt-1">
          Added: {movie.createdAt ? new Date(movie.createdAt).toLocaleDateString() : 'N/A'}
        </div>
      </div>
    </div>
  );
}
