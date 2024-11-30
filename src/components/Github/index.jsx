import React, { useState, useEffect } from 'react'
import { giturl } from '../../axios';
import './index.css'

function Github() {
    const [username, setusername] = useState('');
    const [star, setStar] = useState([])

    function validateGit() {
        if (username === '' || username.length < 5) {
            alert('Username kiritilmagan yoki username juda qisqa!');
            return false
        }
        return true
    }

    function handleGit(e) {
        e.preventDefault();
        const isValid = validateGit()
        if (!isValid) {
            return
        }
        if (username) {
            giturl.get(`users/${username}/repos`)
                .then(response => {
                    if (response.status == 200) {
                        const filterStar = response.data.filter(repo => repo.stargazers_count > 10)
                        setStar(filterStar)
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        setusername('')
    }
    return (
        <div className='git'>
            <div className="container git-container">
                <h1>Git Hub Repositories: </h1>
                <div className="inputCenter">
                    <input value={username} onChange={(e) => { setusername(e.target.value) }} type="text" placeholder='git repo' id='gitInput' />
                </div>
                <div className="gitCenter">
                    <button className='gitBtn' onClick={handleGit}>Seacrh</button>
                </div>
            </div>
            <div className="cards">
                <div className="container cards-container">
                    {star.length > 0 ? (
                        star.map((data, index) => {
                            return (
                                <div className="Wrapping" key={index}>
                                    <h1>Repository name: {data.name}</h1>
                                    <h3>Stars: *{data.stargazers_count} yulduz</h3>
                                </div>
                            )
                        })
                    ) : (
                        <p>Repolar topilmadi yoki username notogri kiritilgan!</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Github;