import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function SpecificBook() {
  const { id } = useParams();  
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/books/${id}`);
        setData(response.data); 
      } catch (error) {
        console.error("Error fetching specific book details:", error);
      }
    };
    fetchBook(); 
  }, [id]); 
  return (
    <div>
      {data ? (  
        <div key={data.book_id}>
          <p><strong>Name:</strong> {data.book_name}</p>
          <p><strong>Launch Date:</strong> {new Date(data.book_launch_date).toLocaleDateString()}</p>
          <p><strong>Publisher:</strong> {data.book_publisher}</p>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
}

export default SpecificBook;
