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
// import OpeningPage from './OpeningPage/OpeningPage';
import { UserContext } from './user-context';
import { UserService } from './services/user-service';
import Menu from './Menu/Menu';
import MainPage from './MainPage/MainPage';
import AppLoader from './AppLoader/AppLoader';
import { PageTransition } from '@steveeeie/react-page-transition';
import Feed from './Feed/Feed';
import Profile from './Profile/Profile';
import Search from './Search/Search';
import ProfileEdit from './Profile/ProfileEdit/ProfileEdit';



function App() {

  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  useEffect( () =>{
    async function getUser() {
      const user = await UserService.get() 
    setUser(user);
    // setTimeout(() => setLoading(false), 3000);
    setLoading(false)
      if(!user) {
        return history.push('/login');
      }
    }
    getUser();
    
  }, [history]);

  //https://mir-s3-cdn-cf.behance.net/project_modules/disp/dffa7728921223.55d957033b79d.gif

  return (
    <UserContext.Provider value={{user, setUser}}>
      

      {isLoading && <AppLoader/>}
      <div className=" App d-flex flex-column flex-md-column-reverse vh-100">
          <div className="app-body flex-grow-1" >
            {/* <div>
              
            </div> */}
            <Route
              render={({location}) => (
                <PageTransition
                // enterAnimation=""
                preset="scaleDownScaleUp"
                transitionKey={location.pathname}
                >
                  <Switch location={location}>
                    <Route path="/register">
                      <MainPage>
                        <Register/>
                      </MainPage>
                    </Route>
                    <Route path="/login">
                      <MainPage>
                        <Login/>
                      </MainPage>
                    </Route>
                    <Route>
                      <MainPage path="/profile/edit">
                        <ProfileEdit/>
                      </MainPage>
                    </Route>
                    <Route path="/profile">
                      <MainPage>
                        <Profile/>
                      </MainPage>
                    </Route>
                    <Route path="/search">
                      <MainPage>
                        <Search/>
                      </MainPage>
                    </Route>
                    <Route path="/post/create">
                      <MainPage>
                        <PostCreate/>
                      </MainPage>
                    </Route>
                    <Route path="/">
                      <MainPage>
                        <Feed/>
                      </MainPage>
                    </Route>
                  </Switch>
                  
                </PageTransition>
                
              )}
            />
          </div>
          {user && <Menu />}
      </div>   
    </UserContext.Provider>
    
  );
}

export default App;
