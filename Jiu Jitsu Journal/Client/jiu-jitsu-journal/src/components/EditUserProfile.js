// import React, { useState, useEffect } from "react";
// import {
//   editUserProfile,
//   getUserProfileById,
//   deleteUserProfile,
// } from "../APIManagers/UserProfileManager";
// import {
//   Button,
//   CardBody,
//   CardSubtitle,
//   CardTitle,
//   FormGroup,
//   Label,
//   Input,
// } from "reactstrap";
// import { useParams } from "react-router-dom";

// export const UserProfileEdit = ({
//   userProfileProp,
//   setUserProfile,
//   setShowEdit,
// }) => {
//   const [editedUserProfile?, setEditedUserProfile] = useState({ ...userProfileProp });

//   const handleSaveButtonClick = async () => {
//     try {
//       await editUserProfile(editedUserProfile?);
//       const updatedProfile = await getUserProfileById(userProfileProp.id);
//       setUserProfile(updatedProfile);
//       setShowEdit(false);
//     } catch (error) {
//       console.error("Error editing user profile: ", error);
//     }
//   };
//   const handleDeleteButtonClick = async () => {
//     const confirmed = window.confirm("Are you sure you want to delete your profile?");
//     if (confirmed) {
//       try {
//         await deleteUserProfile(userProfileProp.id);
//         // Handle the deletion process or user feedback as needed
//       } catch (error) {
//         console.error("Error deleting user profile: ", error);
//       }
//     }
//   };

//   // Handle controlled input changes to the form
//   const handleFieldChange = (fieldName, value) => {
//     setEditedUserProfile({
//       ...editedUserProfile,
//       [fieldName]: value,
//     });
//   };

//   // Generate an array of <option> elements for a given range of numbers
//   const generateNumberOptions = (start, end) => {
//     const options = [];
//     for (let i = start; i <= end; i++) {
//       options.push(<option key={i} value={i}>{i}</option>);
//     }
//     return options;
//   };

//   // Map belt rank names to their corresponding ids
//   const beltRankIdMap = {
//     White: 1,
//     Blue: 2,
//     Purple: 3,
//     Brown: 4,
//     Black: 5,
//   };

//   return (
//     <>
//       <CardBody>
//         <FormGroup className="form-group">
//           <Label htmlFor="fullName">Full Name:</Label>
//           <Input
//             className="userProfile-input"
//             type="text"
//             id="fullName"
//             value={editedUserProfile.fullName}
//             onChange={(e) => handleFieldChange("fullName", e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup className="form-group">
//           <Label htmlFor="email">Email:</Label>
//           <Input
//             className="userProfile-input"
//             type="email"
//             id="email"
//             value={editedUserProfile.email}
//             onChange={(e) => handleFieldChange("email", e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup className="form-group">
//           <Label htmlFor="weeklyClassGoal">Weekly Class Goal:</Label>
//           <select
//             className="userProfile-input"
//             id="weeklyClassGoal"
//             value={editedUserProfile.weeklyClassGoal}
//             onChange={(e) =>
//               handleFieldChange("weeklyClassGoal", parseInt(e.target.value))
//             }
//           >
//             {generateNumberOptions(0, 21)}
//           </select>
//         </FormGroup>
//         <FormGroup className="form-group">
//           <Label htmlFor="weeklyRollGoal">Weekly Roll Goal:</Label>
//           <select
//             className="userProfile-input"
//             id="weeklyRollGoal"
//             value={editedUserProfile.weeklyRollGoal}
//             onChange={(e) =>
//               handleFieldChange("weeklyRollGoal", parseInt(e.target.value))
//             }
//           >
//             {generateNumberOptions(0, 150)}
//           </select>
//         </FormGroup>
//         <FormGroup className="form-group">
//           <Label htmlFor="beltRankId">Belt Rank:</Label>
//           <select
//             className="userProfile-input"
//             id="beltRankId"
//             value={editedUserProfile.beltRankId}
//             onChange={(e) =>
//               handleFieldChange("beltRankId", parseInt(e.target.value))
//             }
//           >
//             <option value={beltRankIdMap.White}>White</option>
//             <option value={beltRankIdMap.Blue}>Blue</option>
//             <option value={beltRankIdMap.Purple}>Purple</option>
//             <option value={beltRankIdMap.Brown}>Brown</option>
//             <option value={beltRankIdMap.Black}>Black</option>
//           </select>
//         </FormGroup>
//         <FormGroup className="form-group">
//           <Button
//             onClick={handleDeleteButtonClick}
//             className="btn btn-danger"
//           >
//             Delete Profile
//           </Button>
//           <Button
//             onClick={handleSaveButtonClick}
//             className="btn btn-primary"
//           >
//             Save Changes
//           </Button>
//         </FormGroup>
//       </CardBody>
//     </>
//   );
// };
// import React, { useState } from "react";
// import {
//   editUserProfile,
//   getUserProfileById,
//   deleteUserProfile,
// } from "../APIManagers/UserProfileManager";
// import { Button, CardBody, FormGroup, Input, Label } from "reactstrap";

// export const UserProfileEdit = ({ userProfileProp, setUserProfile }) => {
//   const [editedUserProfile, setEditedUserProfile] = useState({
//     fullName: userProfileProp?.fullName || "",
//     email: userProfileProp?.email || "",
//     startDate: userProfileProp?.startDate || "",
//     weeklyClassGoal: userProfileProp?.weeklyClassGoal || 0,
//     weeklyRollGoal: userProfileProp?.weeklyRollGoal || 0,
//     beltRankId: userProfileProp?.beltRankId || 1,
//   });

//   const handleInputChange = (fieldName, value) => {
//     setEditedUserProfile((prevProfile) => ({
//       ...prevProfile,
//       [fieldName]: value,
//     }));
//   };

//   const handleSaveButtonClick = (e) => {
//     e.preventDefault();
//     const userProfileToEdit = {
//       id: userProfileProp?.id,
//       fullName: editedUserProfile?.fullName,
//       email: editedUserProfile?.email,
//       startDate: editedUserProfile?.startDate,
//       weeklyClassGoal: editedUserProfile?.weeklyClassGoal,
//       weeklyRollGoal: editedUserProfile?.weeklyRollGoal,
//       beltRankId: editedUserProfile?.beltRankId,
//     };

//     editUserProfile(userProfileToEdit)
//       .then(() => {
//         // Update the userProfileProp directly, assuming setUserProfile updates the main user object
//         setUserProfile({
//           ...userProfileProp,
//           ...editedUserProfile,
//         });
//       })
//       .catch((error) => {
//         console.error("Error while saving user profile:", error);
//       });
//   };

//   const handleDeleteButtonClick = async () => {
//     const confirmed = window.confirm("Are you sure you want to delete your profile?");
//     if (confirmed) {
//       try {
//         await deleteUserProfile(userProfileProp?.id);
//         // Handle the deletion process or user feedback as needed
//       } catch (error) {
//         console.error("Error deleting user profile: ", error);
//       }
//     }
//   };

//           //Map belt rank names to their corresponding ids
//           const beltRankIdMap = {
//             White: 1,
//             Blue: 2,
//             Purple: 3,
//             Brown: 4,
//             Black: 5,
//           };
          
//           //  Generate an array of <option> elements for a given range of numbers
//         const generateNumberOptions = (start, end) => {
//           const options = [];
//           for (let i = start; i <= end; i++) {
//             options.push(<option key={i} value={i}>{i}</option>);
//           }
//           return options;
//         };
//           return (
//     <>
//       <CardBody>
//         <FormGroup className="form-group">
//           <Label htmlFor="fullName">Full Name:</Label>
//           <Input
//             className="userProfile-input"
//             type="text"
//             id="fullName"
//             value={editedUserProfile.fullName}
//             onChange={(e) => handleSaveButtonClick("fullName", e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup className="form-group">
//           <Label htmlFor="email">Email:</Label>
//           <Input
//             className="userProfile-input"
//             type="email"
//             id="email"
//             value={editedUserProfile.email}
//             onChange={(e) => handleSaveButtonClick("email", e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup className="form-group">
//           <Label htmlFor="weeklyClassGoal">Weekly Class Goal:</Label>
//           <select
//             className="userProfile-input"
//             id="weeklyClassGoal"
//             value={editedUserProfile.weeklyClassGoal}
//             onChange={(e) =>
//               handleSaveButtonClick("weeklyClassGoal", parseInt(e.target.value))
//             }
//           >
//             {generateNumberOptions(0, 21)}
//           </select>
//         </FormGroup>
//         <FormGroup className="form-group">
//           <Label htmlFor="weeklyRollGoal">Weekly Roll Goal:</Label>
//           <select
//             className="userProfile-input"
//             id="weeklyRollGoal"
//             value={editedUserProfile.weeklyRollGoal}
//             onChange={(e) =>
//               handleSaveButtonClick("weeklyRollGoal", parseInt(e.target.value))
//             }
//           >
//             {generateNumberOptions(0, 150)}
//           </select>
//         </FormGroup>
//         <FormGroup className="form-group">
//           <Label htmlFor="beltRankId">Belt Rank:</Label>
//           <select
//             className="userProfile-input"
//             id="beltRankId"
//             value={editedUserProfile.beltRankId}
//             onChange={(e) =>
//               handleSaveButtonClick("beltRankId", parseInt(e.target.value))
//             }
//           >
//             <option value={beltRankIdMap.White}>White</option>
//             <option value={beltRankIdMap.Blue}>Blue</option>
//             <option value={beltRankIdMap.Purple}>Purple</option>
//             <option value={beltRankIdMap.Brown}>Brown</option>
//             <option value={beltRankIdMap.Black}>Black</option>
//           </select>
//         </FormGroup>
//         <FormGroup className="form-group">
//           <Button
//             onClick={handleDeleteButtonClick}
//             className="btn btn-danger"
//           >
//             Delete Profile
//           </Button>
//           <Button
//             onClick={handleSaveButtonClick}
//             className="btn btn-primary"
//           >
//             Save Changes
//           </Button>
//         </FormGroup>
//       </CardBody>
//     </>
//   );
// };

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// import {
//   editUserProfile,
//   getUserProfileById,
// } from "../APIManagers/UserProfileManager";

// export const UserProfileEdit = () => {
//   const [editedUserProfile, setEditedUserProfile] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     getUserProfileById(id).then(setEditedUserProfile);
//   }, [id]);

//   const handleInputChange = (event) => {
//     // create new copy of the editedUserProfile with the updated value from the input
//     const newProfile = { ...editedUserProfile };
//     newProfile[event.target.id] = event.target.value;

//     // update the state with the new user data
//     setEditedUserProfile(newProfile);
//   };

//   const handleSave = () => {
//     editUserProfile(editedUserProfile).then(() =>
//       navigate(`/userprofile/${editedUserProfile.id}`)
//     );
//   };

//   if (!editedUserProfile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Form>
//       <FormGroup>
//         <Label for="fullName">Full Name</Label>
//         <Input
//           type="text"
//           id="fullName"
//           onChange={handleInputChange}
//           value={editedUserProfile.fullName}
//         />
//       </FormGroup>
//       <Button onClick={handleSave}>Save</Button>
//     </Form>
//   );
// };

// import React, { useState, useEffect } from 'react';
// import { getUserProfileById, editUserProfile } from '../APIManagers/UserProfileManager'; // Update the path accordingly

// export const UserProfileEdit = ({ userId }) => {
//   const localJournalUser = localStorage.getItem("userProfile")
//   const userProfileProp = JSON.parse(localJournalUser)
//   const [userProfile, setUserProfile] = useState({
//     Id: 0,
//     StartDate: '',
//     FullName: '',
//     Email: '',
//     WeeklyClassGoal: 0,
//     WeeklyRollGoal: 0,
//     BeltRank: {},
//     BeltRankId: 0,
//   });

//   useEffect(() => {
//     // Fetch the user profile by ID when the component mounts
//     getUserProfileById(userProfileProp.id)
//       .then((response) => setUserProfile(response))
//       .catch((error) => console.error('Error fetching user profile:', error));
//   }, [userId]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }));
//   };

//   const handleEdit = () => {
//     editUserProfile(userProfile)
//       .then(() => {
//         console.log('User profile updated successfully');
//         // You can add further actions or redirections after successful update
//       })
//       .catch((error) => {
//         console.error('Error updating user profile:', error);
//       });
//   };

//   return (
//     <div>
//       <h2>Edit User Profile</h2>
//       <label>
//         Full Name:
//         <input
//           type="text"
//           name="FullName"
//           value={userProfile.FullName}
//           onChange={handleInputChange}
//         />
//       </label>
//       <label>
//         Email:
//         <input
//           type="email"
//           name="Email"
//           value={userProfile.Email}
//           onChange={handleInputChange}
//         />
//       </label>
//       <label>
//         Weekly Class Goal:
//         <input
//           type="number"
//           name="WeeklyClassGoal"
//           value={userProfile.WeeklyClassGoal}
//           onChange={handleInputChange}
//         />
//       </label>
//       <label>
//         Weekly Roll Goal:
//         <input
//           type="number"
//           name="WeeklyRollGoal"
//           value={userProfile.WeeklyRollGoal}
//           onChange={handleInputChange}
//         />
//       </label>
//       <button onClick={handleEdit}>Save Changes</button>
//     </div>
//   );
// };

// export default UserProfileEdit;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { getUserProfileById, editUserProfile } from "../APIManagers/UserProfileManager";

export const UserProfileEdit = () => {
  const [editedUserProfile, setEditedUserProfile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getUserProfileById(id).then(setEditedUserProfile);
  }, [id]);
  const handleInputChange = (event) => {
    // create new copy of the editedUserProfile with the updated value from the input
    const newProfile = { ...editedUserProfile };
    newProfile[event.target.id] = event.target.value;
    // update the state with the new user data
    setEditedUserProfile(newProfile);
  };
  const handleSave = () => {
    editUserProfile(editedUserProfile).then(() =>
      navigate(`/users/${editedUserProfile.id}`)
    );
  };
  if (!editedUserProfile) {
    return <div>Loading...</div>;
  }
  return (
    <Form>
      <FormGroup>
        <Label for="fullName">Full Name</Label>
        <Input
          type="text"
          id="fullName"
          onChange={handleInputChange}
          value={editedUserProfile.fullName}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="text"
          id="email"
          onChange={handleInputChange}
          value={editedUserProfile.email}
        />
      </FormGroup>
      <FormGroup>
        <Label for="weeklyGlassGoal">Weekly Class Goal</Label>
        <Input
          type="text"
          id="weeklyClassGoal"
          onChange={handleInputChange}
          value={editedUserProfile.weeklyClassGoal}
        />
      </FormGroup>
      <FormGroup>
        <Label for="weeklyRollGoal">Weekly Roll Goal</Label>
        <Input
          type="text"
          id="weeklyRollGoal"
          onChange={handleInputChange}
          value={editedUserProfile.weeklyRollGoal}
        />
      </FormGroup>
      
      
      <Button onClick={handleSave}>Save</Button>
    </Form>
  );
};