const apiUrl = "https://localhost:5001";

export const login = (userObject) => {
 return fetch(`${apiUrl}/api/UserProfile/GetByEmail/${userObject.email}`)

  .then((r) => r.json())
    .then((user) => {
      if(user.id){
        localStorage.setItem("userProfile", JSON.stringify(user));
        return user
      }
      else{
        return undefined
      }
    });
};

export const logout = () => {
      localStorage.clear()
};

export const register = (userObject) => {
  return  fetch(`${apiUrl}/api/UserProfile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  })
  .then((response) => response.json())
    .then((savedUser) => {
      localStorage.setItem("userProfile", JSON.stringify(savedUser))
    });
};
export const getUserStatus = (email) => {
  return fetch(`${apiUrl}/api/UserProfile/GetByEmail?email=${email}`).then((res) => res.json());
};

export const getAllUserProfiles = () => {
  return fetch(`${apiUrl}/api/UserProfile`)
  .then((response) => response.json())
};

export const getUserProfileById = (id) => {
  if (!id) {
    throw new Error('User ID is undefined');
  }
  return fetch(`${apiUrl}/api/UserProfile/${id}`)
    .then((response) => response.json());
};


export const editUserProfile = (userProfileObject) => {
  return fetch(`${apiUrl}/api/UserProfile/edit/${userProfileObject.Id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userProfileObject),
  });
};

export const deleteProfile = (id) => {
  return fetch(`${apiUrl}/api/UserProfile/${id}`, {
    method: "DELETE",
    
  })
  .then( () => localStorage.clear());
}