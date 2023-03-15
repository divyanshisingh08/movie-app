import styled from 'styled-components';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import { useState } from 'react';
import axios from 'axios';
export const API_KEY="763f2244";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #1e81b0;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding:30px;
  gap: 24px;
  justify-content: space-evenly;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;
function App() {
  const [searchQuery,updateSearchQuery]=useState();
  const [timeoutId,updatetimeoutId]=useState();
  const [movieList,updateMovieList]=useState([]);
  const [selectedMovie,onMovieSelect]=useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };
   const onTextChange=(event)=>{
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
  const timeout=setTimeout(()=>fetchData(event.target.value),500);
  updatetimeoutId(timeout);
  };
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/movie-icon.svg" />
          Movie Mania
        </AppName>
        <SearchBox>
          <SearchIcon src='/search-icon.svg'/>
          <SearchInput 
          placeholder='Search Movie' 
          value={searchQuery}
          onChange={onTextChange}/>
        </SearchBox>
      </Header>
      {selectedMovie && <MovieDetails selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieList
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="movie-icon.svg" />
        )}
      </MovieListContainer>
    </Container>
   
    
  );
}

export default App;
