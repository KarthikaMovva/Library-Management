import { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";

function UpdateIssuance() {
    const [pickedbook, setpickedbook] = useState("");
    const [bookid, setbookid] = useState(0);
    const [issuancedate, setissdate] = useState("");
    const [returndate, setreturndate] = useState("");
    const [pickedmember, setpickedmember] = useState("");
    const [pickedstatus, setpickedstatus] = useState("");
    const [memid, setmemid] = useState(0);
    const [members, setmembers] = useState([]);
    const [issuedby, setissuedby] = useState("");
    const [books, setbook] = useState([]);
    const{id}=useParams();
    const Nextpage = useNavigate();

    useEffect(() => {
        const fetchbooks = async () => {
            try {
                const response = await axios.get("http://localhost:3001/books");
                setbook(response.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchbooks();
    }, []);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get("http://localhost:3001/members");
                setmembers(response.data);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };
        fetchMembers();
    }, []);

    const UpdateIssuance = async (event) => {
        event.preventDefault();

        if (!bookid || !memid || !issuancedate || !returndate || !issuedby || !pickedstatus) {
            console.log("All fields are required");
            return;
        }

        try {
            const newIssuance = await axios.put(`http://localhost:3001/issuance/${id}`, {
                book_id: bookid,
                issuance_member: memid,
                issuance_date: formatDate(issuancedate),
                issued_by: issuedby,
                target_return_date: formatDate(returndate),
                issuance_status: pickedstatus
            });

            console.log("Issuance updated successfully:", newIssuance.data);
            Nextpage("/");
        } catch (err) {
            console.error("UpdateIssuance error:", err.response?.data || err.message);
        }
    };

    const handleSelectedbook = (event) => {
        const selectedbook = event.target.value;
        setpickedbook(selectedbook);

        const pickedbookData = books.find(book => book.book_name === selectedbook);
        if (pickedbookData) {
            setbookid(pickedbookData.book_id);
        }
    };

    const handleSelectedMember = (event) => {
        const selectedmember = event.target.value;
        setpickedmember(selectedmember);

        const pickedmemData = members.find(mem => mem.mem_name === selectedmember);
        if (pickedmemData) {
            setmemid(pickedmemData.mem_id);
        }
    };

    const handleSelectedStatus = (event) => {
        setpickedstatus(event.target.value);
    };

    function submitIssuanceDate(event) {
        setissdate(event.target.value);
    }

    function submitReturnDate(event) {
        setreturndate(event.target.value);
    }

    function formatDate(date) {
        const [year, month, day] = date.split("T")[0].split("-");
        return `${day}-${month}-${year}`;  
    }

    return (
        <div className="form-container">
            <label htmlFor="book" className="label">Pick a Book:</label>
            <select id="book" name="book" value={pickedbook} onChange={handleSelectedbook} className="dropdown">
                <option value="" disabled>Select a Book</option>
                {books.map((book) => (
                    <option key={book.book_id} value={book.book_name}>
                        {book.book_name}
                    </option>
                ))}
            </select>

            <label htmlFor="member" className="label">Pick a Member:</label>
            <select id="member" name="member" value={pickedmember} onChange={handleSelectedMember} className="dropdown">
                <option value="" disabled>Select a Member</option>
                {members.map((mem) => (
                    <option key={mem.mem_id} value={mem.mem_name}>
                        {mem.mem_name}
                    </option>
                ))}
            </select>

            <label htmlFor="date" className="label">Issuance Date and Time:</label>
            <input type="datetime-local" id="date" name="date" className="input-field" onChange={submitIssuanceDate} />

            <label htmlFor="date" className="label">Return Date and Time:</label>
            <input type="datetime-local" id="date" name="date" className="input-field" onChange={submitReturnDate} />

            <input type="text" placeholder="Issued by" className="input-field" value={issuedby} onChange={(e) => setissuedby(e.target.value)} />

            <label htmlFor="status" className="label">Issuance Status:</label>
            <select id="status" name="status" value={pickedstatus} onChange={handleSelectedStatus} className="dropdown">
                <option value="" disabled>Status</option>
                <option value="pending">Pending</option>
                <option value="Done">Done</option>
            </select>

            <button onClick={UpdateIssuance}>Update Issuance</button>
        </div>
    );
}

export default UpdateIssuance;
