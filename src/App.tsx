// import React from 'react';
import {useEffect} from 'react';

import './App.css';
import PostContainer from './components/PostContainer';
import PostContainer2 from './components/PostContainer2';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUsers } from './store/reducers/ActionCreator';
import { userSlice } from './store/reducers/UserSlice';



function App() {

// const {count} = useAppSelector(state => state.userReducer)
// const {increment} = userSlice.actions;
// const dispatch = useAppDispatch()

// const {users, isLoading, error} = useAppSelector(state => state.userReducer)

// useEffect(() => {
//   dispatch(fetchUsers())
// }, [])

  return (
    <div className="App">
      {/* {isLoading && <h1>Идет загрузка</h1>}
      {error && <h1>{error}</h1>}
    //   <h1>{count}</h1>
    //  <button
    //  onClick={() => dispatch(increment(3))}
    //  >INCREMENT</button> 
  {JSON.stringify(users, null, 2)} */}
  
  <div style={{ display: 'flex' }}>
  <PostContainer />
      <PostContainer2 />
  </div>
      
    </div>
  );
}

export default App;
