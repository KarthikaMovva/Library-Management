import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

function Members() {
    const [members, setMembers] = useState([]);
    const Next=useNavigate();
const token=localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            console.log('No token found, redirecting to login...');
            Next("/")
            return;
          }
    
        const memberslist = async () => {
            try {
                const responded = await axios.get("/members");
                setMembers(responded.data); 
            } catch (error) {
                console.log("memberslist error in frontend:", error);
            }
        };
        memberslist();
    }, []);

    const Logout = () => {
        localStorage.removeItem('token'); 
        Next("/") 
      };

    return (
        <div>
            <h1 className="title">Library Members</h1>
            <button onClick={Logout}>Logout</button>
            <div className="table-container">
                <table className="book-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Contact Number</th>
                            <th>Email</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.length > 0 ? (
                            members.map((eachmem) => (
                                <tr key={eachmem.mem_id}>
                                    <td>{eachmem.mem_id}</td>
                                    <td>{eachmem.mem_name}</td>  
                                    <td>{eachmem.mem_phone}</td>
                                    <td>{eachmem.mem_email}</td>
                                    <td>
                                        <Link to={`/member/${eachmem.mem_id}`}>
                                            <button>Update</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="no-members">No members found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Link to="/addMember">
            <button>Add Member</button>
            </Link>
            <Link to="/book">
            <div>
                View Books
            </div>
            </Link>
        </div>
    );
}

export default Members;
