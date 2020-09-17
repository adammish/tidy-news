import React from 'react';
import PropTypes from 'prop-types';
import './Story.css';

function Story(props) {
  return (
    <div className="StoryWrapper">
      {props.stories.map((story) => (
        <a className="Story" href={story.url} key={story.url}>
          {props.showImages && story.urlToImage && (
            <div className="ImgWrap">
              <img src={story.urlToImage} alt={story.title} />
            </div>
          )}
          <div>
            <h2>{story.title}</h2>
            <p>{story.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

Story.propTypes = {
  stories: PropTypes.array.isRequired,
  showImages: PropTypes.bool.isRequired,
};

export default Story;
