import React, { useState, useEffect } from 'react';
import config from '../config/index';
import SearchResult from './SearchResult/SearchResult';
import './Search.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGlasses} from '@fortawesome/free-solid-svg-icons';


function Search(props) {

    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('');

    useEffect( () => {
        if(query) getUsers();
        if(!query) setUsers([]);
    } ,[query]);

    async function getUsers() {
        try{
            const res = await fetch( `${config.apiUrl}/users?username=${query}`, {
                credentials: 'include'
            });
            if(res.status === 400){
                console.log('posts not found');
                return;
            }
            const usersArr = await res.json();
            setUsers(usersArr);
        } catch (err) {
            console.log('unknown error');
        }
    }

    function hasNoResult(){
        return query && users.length === 0;
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
                :    users.map(user => (
                        <SearchResult
                            key={user._id}
                            user={user}  
                        />
                    ))}
        </div>
    );
}

export default Search;