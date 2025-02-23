import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./pages.css"

function Home() {
    const [data, setData] = useState([]);
    const [dates, setdates] = useState([]);
    const [datepicked, setpicked] = useState("");
    const [target, settarget] = useState([]);

    useEffect(() => {
        const booklist = async () => {
            try {
                const responded = await axios.get("http://localhost:3001/books");
                setData(responded.data);
            } catch (error) {
                console.log("booklist error in frontend:", error);
            }
        };
        booklist();
    }, []);
    

    useEffect(() => {
        const AvailabelDates = async () => {
            try {
                const responded = await axios.get("http://localhost:3001/issuances");
                setdates(responded.data);
            } catch (error) {
                console.log("Available dates error in frontend:", error);
            }
        };
        AvailabelDates();
    }, []);


    const handlePickedDate = (event) => {
        const selectedDate = event.target.value;
        setpicked(selectedDate);
        const details = dates.filter((eachdate) => eachdate.target_return_date === selectedDate && eachdate.issuance_status == "pending");
        settarget(details || null);
    }

    return (
        <div className="container">
            <div>
                <Link to="/addBook">
                <button>Add a Book</button>
                </Link>
                <Link to="/addIssuance">
                <button>Add a Issuance</button>
                </Link>
            </div>
            <h1 className="title">Available Books</h1>
            <div className="table-container">
                <table className="book-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((eachbook) => (
                                <tr key={eachbook.book_id}>
                                    <td>{eachbook.book_id}</td>
                                    <td>
                                        <Link to={`/book/${eachbook.book_id}`} className="book-link">
                                            {eachbook.book_name}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/book/update/${eachbook.book_id}`}>
                                        <button>Update</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-data">No books found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="container">
                <label htmlFor="date">Pick a Date: </label>
                <select id="date" name="date" value={datepicked} onChange={handlePickedDate}>
                    <option value="" disabled>Select a date</option>
                    {[...new Set(dates.map(eachdate => eachdate.target_return_date))].map((uniqueDate) => (
                        <option key={uniqueDate} value={uniqueDate}>
                            {new Date(uniqueDate).toLocaleDateString()}
                        </option>
                    ))}
                </select>
                {target.length > 0 ? (
                    <div className="issuance-details">
                        <h2>Issuance Details</h2>
                        {target.map((issuance) => (
                            <div key={issuance.issuance_id} className="issuance-entry">
                                <p><strong>Book ID:</strong> {issuance.book_id}</p>
                                <p><strong>Member ID:</strong> {issuance.issuance_member}</p>
                                <p><strong>Issuance Date:</strong>{new Date(issuance.issuance_date).toLocaleDateString()}</p>
                                <p><strong>Issued by:</strong> {issuance.issued_by}</p>
                                <p><strong>Issued Status:</strong> {issuance.issuance_status}</p>
                                <Link to={`/issuance/update/${issuance.issuance_id}`}>
                                <button>Update Issuance</button>
                                </Link>
                                <hr />
                            </div>
                        ))}
                    </div>
                ) : datepicked ? (
                    <p>No books found for the selected date.</p>
                ) : null}
            </div>
            <Link to="/members">
            <div>
                View Library Members
            </div>
            </Link>
        </div>
    );
}

export default Home;
