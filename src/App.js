import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'App.css';

function App() {
  const url = `http://newsapi.org/v2/top-headlines?sources=associated-press&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;

  const [ stories, setStories ] = useState([]);
  
  useMountEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url);
      setStories(response.data.articles);
    }
    
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>tidy news</h1>
      {stories.map(story =>
      <div key={story.url}>
        <a href={story.url}>{story.title}</a>
        <p>{story.description}</p>
      </div>
    )}
    </div>
  );
}

const useMountEffect = (fun) => useEffect(fun, [])

export default App;
