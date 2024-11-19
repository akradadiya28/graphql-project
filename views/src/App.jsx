import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_GAMES } from './graphql/queries';
import { ADD_GAME, DELETE_GAME } from './graphql/mutations';

const App = () => {
  const { data, loading, error } = useQuery(GET_GAMES);
  const [addGame] = useMutation(ADD_GAME, { refetchQueries: [{ query: GET_GAMES }] });
  const [deleteGame] = useMutation(DELETE_GAME, { refetchQueries: [{ query: GET_GAMES }] });

  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddGame = () => {
    addGame({ variables: { game: { title, platform: platform.split(',') } } });
    setTitle('');
    setPlatform('');
  };

  const handleDeleteGame = (id) => {
    deleteGame({ variables: { id } });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Games</h1>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Game Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Platforms (comma separated)"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddGame}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Game
        </button>
      </div>
      <ul className="space-y-4">
        {data.games.map((game) => (
          <li key={game.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold">{game.title}</h2>
            <p>Platforms: {game.platform.join(', ')}</p>
            <p>Reviews: {game.reviews.length}</p>
            <button
              onClick={() => handleDeleteGame(game.id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Game
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
