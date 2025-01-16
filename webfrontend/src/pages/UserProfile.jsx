import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./HomePage.css";

// function ProfilePage(){
//     const param = useParams().id;
//     const [username, setusername] = useState("");
//     const [email, setemail] = useState("");
//     const [password, setpassword] = useState("");
//     const [user, setuser] = useContext(UserContext);
//     const navigate = useNavigate();
//     const [updated, setUpdated] = useState(false);

//     const fetchProfilePage = async() => {
//         try{
//             const res = await axios.get(URL + "api/users/" + user._id);
//             setusername(res.data.username);
//             setemail(res.data.email);
//             setpassword(res.data.password);
//             }
//         catch(err) {
//             console.log(err)
//         }
//     };

//     const handleUserUpdated = async() => {
//         setUpdated(false);

//         try{
//             const res = await fetch(`/api/users/${user._id}`, {
//                 method: 'PUT',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify({username, email, password}),
//             })
//             console.log(res.data);
//             setUpdated(true);

//         }
//         catch(err){
//             console.log(err)
//             setUpdated(false);
//         }
//     };

//     const handleUserDelete = async() => {
//         try{
//             const res = await axios.delete("/api/users/" + user._id, {
//                 withCredentials: true,
//             })
//             setUser(null)
//             navigate("/")
//             console.log(res.data);
//         }
//         catch(err) {
//             console.log(err)
//         }
//     }

//     useEffect(() => {
//         fetchProfilePage();
//     }, [param]);

//     return (
//         <div>ProfilePage</div>
//     )
// }

// export default ProfilePage

function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the updated profile
    // to your backend.
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // If you want to revert changes, you can fetch the original profile data here
  };

  return (
    <>
      <Header />
      <div />
      <h1>User Profile</h1>
      {isEditing ? (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Username: {username}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
      <Footer />
    </>
  );
}

export default UserProfile;
