import React, { useState } from 'react';
import { gogleAPI } from '../../axios';
import './index.css';
import img from '../../images/image.jpg'

function Books() {
    const [bookname, setBookname] = useState('');
    const [res, setRes] = useState({});

    function handleSearch(event) {
        event.preventDefault();

        gogleAPI.get(`books/v1/volumes?q=${bookname}`)
            .then(response => {
                if (response.status === 200 && response.data.items.length > 0) {
                    setRes(response.data.items[0].volumeInfo);
                } else {
                    setRes(null)
                }
                console.log(response.data.items[0].volumeInfo);
            })
            .catch(err => {
                console.error(err);
            });
        setBookname('')
    }

    return (
        <div className='boook'>
            <div className="container book-container">
                <div className="bookBoking">
                    <h1>Find favorite book and book it</h1>
                    <input
                        value={bookname}
                        onChange={(e) => setBookname(e.target.value)}
                        type="text"
                        placeholder="Book name:"
                        id="inputBook"
                    />
                    <div className="bookCenter">
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className="bookWr">
                    {res ?
                        (
                            <div div className="bookCard">
                                <img src={img} width={400} height={400} alt="" />
                                <h1>Book: {res.title}</h1>
                                <h1>Authors: {res.authors}</h1>
                                <div className="bookSame1">
                                    <div>Published date: {res.publishedDate}</div>
                                    <div className="bookCategory">Category: '{res.categories}'</div>
                                    <div className="bookPage">Pages: {res.pageCount} </div>
                                </div>

                                <p>About: {res.description}</p>
                            </div>
                        )
                        : (
                            <p>Book not found or search for a book!</p>
                        )}
                </div>
            </div>
        </div >
    );
}

export default Books;
