import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddMembers(){

    const[name,setname]=useState("");
    const[number,setnumber]=useState("");
    const[email,setmail]=useState("");
    const Nextpage=useNavigate();

    const AddMember = async (event) => {
        event.preventDefault();

        if (!name || !number || !email) {
            console.log("All fields are required");
            return;
        }

        try {
            const newMember = await axios.post("http://localhost:3001/member", {
                mem_name: name,
                mem_phone: number,
                mem_email: email,
            });

            console.log("member created successfully:", newMember.data);
            Nextpage("/members");
        } catch (err) {
            console.error("PostMember error:", err.response?.data || err.message);
        }
    };
    

    return(
        <div className="form-container">
            <h2>Enter Member Details</h2>
            <input type="text" placeholder="Name" className="input-field" onChange={(e)=>{setname(e.target.value)}}/>
            <input type="text" placeholder="Contact Number" className="input-field" onChange={(e)=>{setnumber(e.target.value)}}/>
            <input type="text" placeholder="Email" className="input-field" onChange={(e)=>{setmail(e.target.value)}}/>
            <button onClick={AddMember}>Add Member</button>
        </div>
    )
}
export default AddMembers;