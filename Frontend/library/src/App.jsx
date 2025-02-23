import {Routes,Route} from "react-router-dom";
import SpecificBook from "./Pages/SpecificBook";
import Home from "./Pages/Home"
import Book from "./Pages/Book";
import Issuance from "./Pages/Issuance";
import UpdateBook from "./Pages/UpdateBook";
import UpdateIssuance from "./Pages/UpdateIssuance";
import Members from "./Pages/Members";
import AddMembers from "./Pages/AddMembers";
import UpdateMembers from "./Pages/UpdateMembers";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/book" element={<Home/>}></Route>
      <Route path="/book/:id" element={<SpecificBook/>}></Route>
      <Route path="/addBook" element={<Book/>}></Route>
      <Route path="/addIssuance" element={<Issuance/>}></Route>
      <Route path="/book/update/:id" element={<UpdateBook/>}></Route>
      <Route path="/issuance/update/:id" element={<UpdateIssuance/>}></Route>
      <Route path="/members" element={<Members/>}></Route>
      <Route path="/addMember" element={<AddMembers/>}></Route>
      <Route path="/member/:id" element={<UpdateMembers/>}></Route>
    </Routes>
    </>
  )
}

export default App
