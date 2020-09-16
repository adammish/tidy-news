import React from 'react';
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

export default Source;
