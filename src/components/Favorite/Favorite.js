import React from 'react';
import PropTypes from 'prop-types';
import './Favorite.css';

function Favorite(props) {
  const handleChange = (e) => {
    props.onClick(e.target.value);
  };

  return (
    <div className="Favorite">
      <h2>Favorites</h2>
      {props.favorites.length ? (
        props.favorites.map((favorite) => (
          <button key={favorite.id} value={favorite.id} onClick={handleChange}>
            {favorite.name}
          </button>
        ))
      ) : (
        <p>Add your first favorite!</p>
      )}
    </div>
  );
}

Favorite.propTypes = {
  favorites: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Favorite;
