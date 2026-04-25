import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  tier: 'free' | 'premium' | 'gold';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, role?: 'admin' | 'member') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('memberhub_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = (email: string, role: 'admin' | 'member' = 'member') => {
    setLoading(true);
    // Mock user data logic
    const mockUser: User = {
      id: role === 'admin' ? 'admin-1' : 'user-1',
      name: role === 'admin' ? 'Alongkorn Meesin' : 'Alex Rivers',
      email: email,
      role: role,
      tier: role === 'admin' ? 'gold' : 'premium',
      avatar: role === 'admin' 
        ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alongkorn' 
        : 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    };
    
    setUser(mockUser);
    localStorage.setItem('memberhub_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('memberhub_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
