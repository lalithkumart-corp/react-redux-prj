import React, { Component } from 'react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import Todo from './components/Todo';
import todoReducer from './reducers/todo-reducer';

import Comments from './components/Comments';
import commentReducer from './reducers/comments-reducer';

import User from './components/user/User';
import userReducer from './components/user/user-reducer';


const middleware = applyMiddleware(logger);
const theReducers = combineReducers({
  todoStore     :  todoReducer,
  commentStore  : commentReducer,
  userStore     : userReducer
});
const myStore = createStore(theReducers, middleware);

class App extends Component {
  render() {
    return (
      <div>
          <Router>
              <Provider store={myStore}>
                  <div>
                      <Route exact path='/comments' component={Comments} />
                      <Route exact path='/todo' component={Todo} />
                      <Route exact path='/users' component={User} />
                      {/* <button onClick={myStore.dispatch({type: 'ADD_TODO', todo:'take pushups'})}>Click me man</button> */}
                      {/* <button onClick={myStore.dispatch({type: 'INCREAMENT'})}>Click me man</button> */}
                  </div>
              </Provider>   
          </Router>  
      </div>
    );
  }
}

export default App;
