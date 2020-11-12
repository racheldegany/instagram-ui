import React, { useState, useEffect } from 'react';
import config from '../config/index';
import './Search.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGlasses} from '@fortawesome/free-solid-svg-icons';
import UserResult from '../common/UserResult/UserResult';


function Search(props) {

    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [timer, setTimer]= useState();

    useEffect( () => {
        if(query) {
            setIsSearching(true);
            debounce(getUsers)
        }
        
        // getUsers();
        if(!query || query === '') setUsers([]);
    } ,[query]);


    function debounce(cb){
    if (timer){
        clearTimeout(timer);
    }
    setTimer(setTimeout(cb, 500));
    }

    async function getUsers() {
        try{
            const res = await fetch( `${config.apiUrl}/users?username=${query}`, {
                credentials: 'include'
            });
            if(res.status === 400){
                console.log('posts not found');
                setIsSearching(false);
                return;
            }
            const usersArr = await res.json();
            console.log(usersArr);
            setUsers(usersArr);
            setIsSearching(false);

        } catch (err) {
            console.log('unknown error');
        }
    }

    function hasNoResult(){
        return query && !isSearching && users.length === 0;
    }
    
    return (
        <div className="Search">
            <header className="Search-input ">
                <input placeholder="Search profile " 
                        className="shadow-sm"
                        type="text" 
                        value={query}
                        onChange={(e) => (setQuery(e.target.value))}
                />
            </header>
            {hasNoResult()
                ? <div className="user_message d-flex flex-column align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faGlasses}/>
                    <span>No result found</span>
                  </div>
                : <div className="d-flex flex-wrap">
                    {users.map(user => (
                        <UserResult
                            key={user._id}
                            user={user}  
                        />
                    ))}
                    </div>
                    }
        </div>
    );
}

export default Search;