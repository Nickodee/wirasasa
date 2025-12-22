import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedRole = await AsyncStorage.getItem('role');
      if (storedUser && storedRole) {
        setUser(JSON.parse(storedUser));
        setRole(storedRole as UserRole);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const login = async (email: string, password: string, selectedRole: UserRole) => {
    // Mock login - replace with actual API call
    const mockUser: User = {
      id: '1',
      name: selectedRole === 'client' ? 'Alice Mwangi' : 'John Doe',
      email,
      role: selectedRole,
      phone: '+254712345678',
      profileImage: undefined,
    };

    setUser(mockUser);
    setRole(selectedRole);
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    await AsyncStorage.setItem('role', selectedRole);
  };

  const logout = async () => {
    setUser(null);
    setRole(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('role');
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    AsyncStorage.setItem('role', newRole);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

