
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load stored data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedUsers = localStorage.getItem("users");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedUsers) setUsers(JSON.parse(storedUsers));
  }, []);

  // Save user(s) to state + localStorage
  const saveData = (updatedUser, updatedUsers) => {
    if (updatedUser) {
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
    if (updatedUsers) {
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  // Signup new user
  const signup = useCallback(
    (newUser) => {
      const exists = users.some(
        (u) => u.name.toLowerCase() === newUser.name.toLowerCase()
      );
      if (exists) {
        toast.error("User with this name already exists!");
        return false;
      }
      const userWithId = { id: Date.now(), ...newUser };
      const updatedUsers = [...users, userWithId];
      saveData(userWithId, updatedUsers);
      toast.success("Signup successful!");
      return true;
    },
    [users]
  );

  // Login
  const login = useCallback(
    (name, password) => {
      const existingUser = users.find(
        (u) =>
          u.name.toLowerCase() === name.toLowerCase() &&
          u.password === password
      );
      if (existingUser) {
        saveData(existingUser, null);
        toast.success("Login successful!");
        return true;
      }
      toast.error("Invalid username or password");
      return false;
    },
    [users]
  );

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("currentUser");
    toast.info("Logged out");
  }, []);

  // Update profile (by ID)
  const updateProfile = useCallback(
    (updatedUserData) => {
      if (!user) return;

      const updatedUsers = users.map((u) =>
        u.id === user.id ? { ...u, ...updatedUserData } : u
      );
      const newCurrentUser = { ...user, ...updatedUserData };

      saveData(newCurrentUser, updatedUsers);
      toast.success("Profile updated successfully!");
    },
    [user, users]
  );

  // Change password (by ID)
  const changePassword = useCallback(
    (newPassword) => {
      if (!user) return;

      const updatedUsers = users.map((u) =>
        u.id === user.id ? { ...u, password: newPassword } : u
      );
      const newCurrentUser = { ...user, password: newPassword };

      saveData(newCurrentUser, updatedUsers);
      toast.success("Password changed successfully!");
    },
    [user, users]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        signup,
        login,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
