import React from 'react';
import PropTypes from 'prop-types';
import './Source.css';

function Source(props) {
  return (
    <div className="Source">
      <h1>{props.sourceName}</h1>
      <button onClick={props.toggleFavorites}>
        {props.favorites.some((fav) => fav.id === props.sourceId)
          ? 'Remove from Favorites'
          : 'Add to Favorites'}
      </button>
    </div>
  );
}

Source.propTypes = {
  sourceId: PropTypes.string.isRequired,
  sourceName: PropTypes.string.isRequired,
  favorites: PropTypes.array.isRequired,
  toggleFavorites: PropTypes.func.isRequired,
};

export default Source;
