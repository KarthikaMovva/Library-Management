import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./pages.css";

function UpdateBook() {
    const [category, setCategory] = useState([]);
    const [collection, setCollection] = useState([]);

    const [bookName, setBookName] = useState("");
    const [publisher, setPublisher] = useState("");
    const [categoryId, setCategoryId] = useState(null);
    const [collectionId, setCollectionId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCollection, setSelectedCollection] = useState("");
    const [date, setDate] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    const token=localStorage.getItem('token');

    useEffect(() => {
        const fetchCategories = async () => {
            if (!token) {
                console.log('No token found, redirecting to login...');
                navigate("/")
                return;
              }
        
            try {
                const response = await axios.get("/categories");
                setCategory(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchCollections = async () => {
            try {
                const response = await axios.get("/collections");
                setCollection(response.data);
            } catch (error) {
                console.error("Error fetching collections:", error);
            }
        };

        fetchCategories();
        fetchCollections();
    }, []);

    useEffect(() => {
        if (!id) return;
        
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`/book/${id}`);
                const bookData = response.data;

                setBookName(bookData.book_name);
                setPublisher(bookData.book_publisher);
                setDate(bookData.book_launch_date.replace(" ", "T").slice(0, 16)); 

                setCategoryId(bookData.book_cat_id);
                setCollectionId(bookData.book_collection_id);

         
                const foundCategory = category.find(cat => cat.cat_id === bookData.book_cat_id);
                if (foundCategory) {
                    setSelectedCategory(foundCategory.cat_name);
                }

           
                const foundCollection = collection.find(col => col.collection_id === bookData.book_collection_id);
                if (foundCollection) {
                    setSelectedCollection(foundCollection.collection_name);
                }
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        fetchBookDetails();
    }, [id, category, collection]);

    const updateBook = async (event) => {
        event.preventDefault();

        if (!bookName || !categoryId || !collectionId || !date || !publisher) {
            console.log("All fields are required");
            return;
        }

        try {
            await axios.put(`/book/${id}`, {
                book_name: bookName,
                book_cat_id: categoryId,
                book_collection_id: collectionId,
                book_launch_date: date.replace("T", " ") + ":00", 
                book_publisher: publisher
            });

            console.log("Book updated successfully");
            navigate("/book");
        } catch (err) {
            console.error("Update book error:", err.response?.data || err.message);
        }
    };

    const handleSelectedCategory = (event) => {
        const pickedCategoryName = event.target.value;
        setSelectedCategory(pickedCategoryName);

        const selectedCat = category.find(cat => cat.cat_name === pickedCategoryName);
        if (selectedCat) {
            setCategoryId(selectedCat.cat_id);
        }
    };

    const handleSelectedCollection = (event) => {
        const pickedCollectionName = event.target.value;
        setSelectedCollection(pickedCollectionName);

        const selectedCol = collection.find(col => col.collection_name === pickedCollectionName);
        if (selectedCol) {
            setCollectionId(selectedCol.collection_id);
        }
    };

    return (
        <div className="form-container">
            <input type="text" placeholder="Book Name" className="input-field" value={bookName} onChange={(e) => setBookName(e.target.value)} />

            <label htmlFor="category" className="label">Pick a Category:</label>
            <select id="category" name="category" value={selectedCategory} onChange={handleSelectedCategory} className="dropdown">
                <option value="" disabled>Select a Category</option>
                {category.map((bookCategory) => (
                    <option key={bookCategory.cat_id} value={bookCategory.cat_name}>
                        {bookCategory.cat_name}
                    </option>
                ))}
            </select>

            <label htmlFor="collection" className="label">Pick a Collection:</label>
            <select id="collection" name="collection" value={selectedCollection} onChange={handleSelectedCollection} className="dropdown">
                <option value="" disabled>Select a Collection</option>
                {collection.map((book) => (
                    <option key={book.collection_id} value={book.collection_name}>
                        {book.collection_name}
                    </option>
                ))}
            </select>

            <label htmlFor="date" className="label">Date and Time:</label>
            <input type="datetime-local" id="date" name="date" className="input-field" value={date} onChange={(e) => setDate(e.target.value)} />

            <input type="text" placeholder="Book Publisher" className="input-field" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
            
            <button onClick={updateBook}>Update Book</button>
        </div>
    );
}

export default UpdateBook;
