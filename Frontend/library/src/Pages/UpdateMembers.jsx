import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AddMembers(){

    const{id}=useParams();
    const[name,setname]=useState("");
    const[number,setnumber]=useState("");
    const[email,setmail]=useState("");
    const Nextpage=useNavigate();

    const token=localStorage.getItem('token')

    const UpdateMember = async (event) => {
        event.preventDefault();
        if (!token) {
            console.log('No token found, redirecting to login...');
            Nextpage("/")
            return;
          }
    

        if (!name || !number || !email) {
            console.log("All fields are required");
            return;
        }

        try {
            const updated = await axios.put(`http://localhost:3001/member/${id}`, {
                mem_name: name,
                mem_phone: number,
                mem_email: email,
            });

            console.log("member updated successfully:", updated.data);
            Nextpage("/members");
        } catch (err) {
            console.error("UpdateMember error:", err.response?.data || err.message);
        }
    };

    return(
        <div className="form-container">
            <h2>Enter Member Details</h2>
            <input type="text" placeholder="Name" className="input-field" onChange={(e)=>{setname(e.target.value)}}/>
            <input type="text" placeholder="Contact Number" className="input-field" onChange={(e)=>{setnumber(e.target.value)}}/>
            <input type="text" placeholder="Email" className="input-field" onChange={(e)=>{setmail(e.target.value)}}/>
            <button onClick={UpdateMember}>Update Member</button>
        </div>
    )
}
export default AddMembers;