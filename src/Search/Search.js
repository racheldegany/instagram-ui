import React, { useState, useEffect } from 'react';
import config from '../config/index';
import SearchResult from './SearchResult/SearchResult';
import './Search.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGlasses} from '@fortawesome/free-solid-svg-icons';
// import './SearchResult/SearchResult';


function Search(props) {

    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('');

    useEffect( () => {
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
                // console.log(usersArr);
            } catch (err) {
                console.log('unknown error');
            }
        }
        if(query) getUsers();
        if(!query) setUsers([]);
    } ,[query]);

    function hasNoResult(){
        return query && users.length === 0;
    }
    
    return (
        <div className="Search">
            <header className="Search-input text-center">
                <input placeholder="Search profile" 
                        className="rounded-pill pl-2"
                        type="text" 
                        value={query}
                        onChange={(e) => (setQuery(e.target.value))}
                />
            </header>

            <div className="d-md-flex flex-md-wrap justify-content-md-around">
            {hasNoResult()
                ? <div className="d-flex flex-column justify-content-center"><FontAwesomeIcon icon={faGlasses}/>No result found</div>
                :    users.map(user => (
                        <SearchResult
                            key={user._id}
                            user={user}  
                        />
                    ))}

            </div>
            
        </div>
    );
}

export default Search;