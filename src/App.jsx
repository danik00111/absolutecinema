import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Suspense } from 'react'
import { Link, NavLink, Routes, Route, useSearchParams } from 'react-router-dom'

function App() {

  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzQyYjM1NWQ2ZTQ4ZmY3MDU2NTgzYWYwYTQwOWQ0NCIsIm5iZiI6MTc0NDIxMzM4NS4xNTY5OTk4LCJzdWIiOiI2N2Y2OTU4OWNjZTc2OTAyMzBhY2VkM2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4NqxNVWatdHZaA7idTe2Vrsx0kqLKnMBWw1rqL5g8SM'
      }
    };
    
    fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
      .then(res => res.json())
      .then(res => {console.log(res);setMovies(res.results)})
      .catch(err => console.error(err));
  },[])

  return (
    <>
    <Suspense fallback={<p>...</p>}>
      <Routes>
        <Route path='/'>
          <Route path='/movies'>
            <Route path='movies/:id'>
              <Route path='movies/:id/cast'></Route>
              <Route path='movies/:id/reviews'></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
      <input type='text'/>
      <div id='movies-cont'>
        <div className='movie'>
          {movies.map((x,i)=>(
            <p key={x.id}>{i} <Link to={`./movies/${x.id}`}>{x.title ?? x.name}</Link></p>
          ))}
        </div>
      </div>
    </Suspense>
    </>
  )
}

export default App
