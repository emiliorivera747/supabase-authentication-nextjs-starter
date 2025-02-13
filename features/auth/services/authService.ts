const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

/**
 * Authenticate with the backend API
 */
const authenticate = async (idToken: string) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response;
};

const invalidateLogin = async () => {
  const response = await fetch(`${API_URL}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response;
};

const authService = {
  authenticate,
  invalidateLogin,
};

export default authService;
