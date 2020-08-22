import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Nav from 'components/Nav/Nav.js';
import Favorite from 'components/Favorite/Favorite.js';
import Source from 'components/Source/Source.js';
import Story from 'components/Story/Story.js';
import 'components/App/App.css';

function App() {
  const [stories, setStories] = useState([]);
  const [cookies, setCookie] = useCookies(['sourceId', 'sourceName', 'favorites', 'showImages']);
  const [favorites, setFavorites] = useState(cookies.favorites || []);
  const [sourceId, setSourceId] = useState(cookies.sourceId || 'google-news');
  const [sourceName, setSourceName] = useState(cookies.sourceName || 'Google News');
  const [showImages, setShowImages] = useState(cookies.showImages || false);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://newsapi.org/v2/top-headlines?sources=${sourceId}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
      setStories(response.data.articles);
      setSourceId(response.data.articles[0].source.id);
      setSourceName(response.data.articles[0].source.name);
      setCookie('sourceId', sourceId, { path: '/', maxAge: 86400 * 30 });
      setCookie('sourceName', sourceName, { path: '/', maxAge: 86400 * 30 });
    }
    
    fetchData();
  }, [sourceId, sourceName, setCookie]);
  
  const handleChange = (newSource) => {
    setSourceId(newSource);
  }

  const imageToggle = () => {
    setShowImages(!showImages);
    setCookie ('showImages', !showImages, { path: '/', maxAge: 86400 * 30});
  }
  
  const toggleFavorites = () => {
    let newFavs = [];

    if (favorites.some(fav => fav.id === sourceId)) {
      newFavs = favorites.filter(item => item.id !== sourceId);
    } else {
      newFavs = favorites.concat({
        id: sourceId,
        name: sourceName
      });
    }
      setFavorites(newFavs);
      setCookie('favorites', newFavs, { path: '/', maxAge: 86400 * 30 });
  }

  return (
    <div className="App">
      <div className="top">
        <Nav 
          sourceId={sourceId}
          sourceName={sourceName}
          onChange={handleChange}
          showImages={showImages}
          imageToggle={imageToggle} />  
        <Favorite favorites={favorites} onClick={handleChange} />
      </div>
      <Source
        sourceId={sourceId}
        sourceName={sourceName}
        favorites={favorites}
        toggleFavorites={toggleFavorites} />
      <Story
        stories={stories}
        showImages={showImages} />
    </div>
  );
}

export default App;
