const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

/**
 * Fetch User by userId
 *
 * @param userId
 * @returns User
 */
const fetchUser = async () => {
  const response = await fetch(`${API_URL}/id`);
  return response.json();
};

const fetchUserById = async (userId: string) => {
  const response = await fetch(`${API_URL}/${userId}`);
  return response.json();
};

// /**
//  * Register User
//  *
//  * @param user
//  * @returns User
//  */
// const registerUser = async (user: any) => {
//   const response = await fetch(`${API_URL}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   });
//   return response.json();
// };

/**
 * Delete User
 */
const deleteUser = async () => {
  const response = await fetch(`${API_URL}/id`, {
    method: "DELETE",
  });
  return response.json();
};

const userService = {
  fetchUser,
  // registerUser,
  deleteUser,
  fetchUserById,
};

export default userService;
