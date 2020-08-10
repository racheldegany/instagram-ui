import React, { useState, useEffect } from 'react';
import './App.scss';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Register from './Register/Register';
import Login from './Login/Login';
import PostCreate from './Menu/PostCreate/PostCreate';
import { UserContext } from './user-context';
import { UserService } from './services/user-service';
import Menu from './Menu/Menu';
import AppLoader from './AppLoader/AppLoader';
import { PageTransition } from '@steveeeie/react-page-transition';
import Feed from './Feed/Feed';
import Profile from './Profile/Profile';
import Search from './Search/Search';
import ProfileEdit from './Profile/ProfileEdit/ProfileEdit';
import PostPage from './PostPage/PostPage';

function App() {

  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  useEffect( () =>{
    async function getUser() {
      const user = await UserService.get() 
    setUser(user);
    setLoading(false)
      if(!user) {
        return history.push('/login');
      }
    }
    getUser();
    
  }, [history]);

  return (
    <UserContext.Provider value={{user, setUser}}>
      
      {isLoading && <AppLoader/>}
      <div className=" App d-flex flex-column vh-100 ">
          {user && <Menu />}
          <div className="app-body flex-grow-1" >
            <Route
              render={({location}) => (
                <PageTransition
                preset="scaleDownScaleUp"
                transitionKey={location.pathname}
                >
                  <Switch location={location}>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/profile/edit">
                        
                        <ProfileEdit/>
                    </Route>
                    <Route path="/profile/:id">
                        <Profile/>
                    </Route>
                    <Route path="/search">
                        <Search/>
                    </Route>
                    <Route path="/post/create">
                        <PostCreate/>
                    </Route>
                    <Route path="/posts/:id">
                      <PostPage/>
                    </Route>
                    <Route path="/">
                        <Feed/>
                    </Route>
                  </Switch>
                </PageTransition>
              )}
            />
          </div>
         
      </div>   
    </UserContext.Provider>
    
  );
}

export default App;
