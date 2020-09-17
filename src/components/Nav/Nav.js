import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Nav.css';

function Nav(props) {
  const [sources, setSources] = useState([]);

  useMountEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://newsapi.org/v2/sources?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      setSources(response.data.sources);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className="Nav">
      <h1>tidy news</h1>
      <p>News source: </p>
      <div className="select">
        <select aria-label="News source" onChange={handleChange} value={props.sourceId}>
          {sources.map((source) => (
            <option value={source.id} key={source.id}>
              {source.name}
            </option>
          ))}
        </select>
      </div>
      <div className="NavImgToggle">
        <p>Show images when available: </p>
        <label className="toggle">
          <input
            type="checkbox"
            aria-label="Show images when available"
            defaultChecked={props.showImages}
            onChange={props.imageToggle}
          />
          <span className="Slider"></span>
        </label>
      </div>
    </div>
  );
}

Nav.propTypes = {
  sourceId: PropTypes.string.isRequired,
  sourceName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showImages: PropTypes.bool.isRequired,
  imageToggle: PropTypes.func.isRequired,
};

const useMountEffect = (fun) => useEffect(fun, []);

export default Nav;
