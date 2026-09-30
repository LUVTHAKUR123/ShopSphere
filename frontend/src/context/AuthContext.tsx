import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import api, { User } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Cookie se session restore
  useEffect(() => {
    // // purana localStorage token/user ab use nahi hota
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");

    api
      .get("/auth/profile")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  function login(newUser: User) {
    setUser(newUser);
  }

  async function logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
