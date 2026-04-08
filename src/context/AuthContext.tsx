"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  address?: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
}

export interface Address {
  id: string;
  label: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: "processing" | "confirmed" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  shippingAddress: Address;
  trackingNumber?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => Promise<void>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>;
  removeAddress: (id: string) => Promise<void>;
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date">) => Promise<void>;
  favorites: string[];
  toggleFavorite: (productId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("rsr-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("rsr-user");
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("rsr-user", JSON.stringify(user));
      loadAddresses(user.id);
      loadOrders(user.id);
      loadFavorites(user.id);
    } else {
      localStorage.removeItem("rsr-user");
    }
  }, [user]);

  async function loadAddresses(userId: string) {
    try {
      const res = await fetch(`${API_URL}/api/addresses?userId=${userId}`);
      const data = await res.json();
      if (data.addresses) {
        setAddresses(data.addresses.map((a: any) => ({
          id: a.id.toString(),
          label: a.label,
          street: a.street,
          number: a.number,
          complement: a.complement,
          neighborhood: a.neighborhood,
          city: a.city,
          state: a.state,
          cep: a.cep,
          isDefault: a.is_default
        })));
      }
    } catch (e) {
      console.error("Erro ao carregar endereços:", e);
    }
  }

  async function loadOrders(userId: string) {
    try {
      const res = await fetch(`${API_URL}/api/orders?userId=${userId}`);
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders.map((o: any) => ({
          id: o.id,
          date: o.created_at,
          status: o.status,
          total: parseFloat(o.total),
          items: o.items?.map((i: any) => ({
            productId: i.product_id?.toString() || "",
            name: i.product_name,
            quantity: i.quantity,
            price: parseFloat(i.price),
            image: i.image || ""
          })) || [],
          shippingAddress: o.street ? {
            id: o.shipping_address_id?.toString() || "",
            label: "Endereço",
            street: o.street,
            number: o.number,
            complement: o.complement,
            neighborhood: o.neighborhood,
            city: o.city,
            state: o.state,
            cep: o.cep,
            isDefault: true
          } : {
            id: "1",
            label: "Casa",
            street: "Rua das Flores",
            number: "123",
            neighborhood: "Jardim Primavera",
            city: "São Paulo",
            state: "SP",
            cep: "01234-567",
            isDefault: true
          },
          trackingNumber: o.tracking_number
        })));
      }
    } catch (e) {
      console.error("Erro ao carregar pedidos:", e);
    }
  }

  async function loadFavorites(userId: string) {
    try {
      const res = await fetch(`${API_URL}/api/favorites?userId=${userId}`);
      const data = await res.json();
      if (data.favorites) {
        setFavorites(data.favorites.map((f: any) => f.id.toString()));
      }
    } catch (e) {
      console.error("Erro ao carregar favoritos:", e);
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      setIsLoading(false);
      throw new Error(data.error || "Erro ao fazer login");
    }
    
    setUser(data.user);
    setIsLoading(false);
  };

  const register = async (userData: Omit<User, "id"> & { password: string }) => {
    setIsLoading(true);
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      setIsLoading(false);
      throw new Error(data.error || "Erro ao criar conta");
    }
    
    setUser(data.user);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setAddresses([]);
    setOrders([]);
    setFavorites([]);
    localStorage.removeItem("rsr-user");
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  const addAddress = async (address: Omit<Address, "id">) => {
    if (!user) return;
    
    const res = await fetch(`${API_URL}/api/addresses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...address, userId: user.id })
    });
    
    const data = await res.json();
    if (data.address) {
      setAddresses(prev => [...prev, {
        ...data.address,
        id: data.address.id.toString()
      }]);
    }
  };

  const updateAddress = async (id: string, address: Partial<Address>) => {
    if (!user) return;
    
    const res = await fetch(`${API_URL}/api/addresses`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...address, id: parseInt(id), userId: user.id })
    });
    
    const data = await res.json();
    if (data.address) {
      setAddresses(prev => prev.map(a => 
        a.id === id ? { ...a, ...data.address } : a
      ));
    }
  };

  const removeAddress = async (id: string) => {
    if (!user) return;
    
    await fetch(`${API_URL}/api/addresses?id=${id}&userId=${user.id}`, {
      method: "DELETE"
    });
    
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const addOrder = async (orderData: Omit<Order, "id" | "date">) => {
    if (!user) return;
    
    const res = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        items: orderData.items,
        total: orderData.total,
        shippingAddressId: orderData.shippingAddress.id
      })
    });
    
    const data = await res.json();
    if (data.success) {
      loadOrders(user.id);
    }
  };

  const toggleFavorite = async (productId: string) => {
    if (!user) return;
    
    const res = await fetch(`${API_URL}/api/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, productId: parseInt(productId) })
    });
    
    const data = await res.json();
    if (data.success) {
      setFavorites(prev => 
        data.isFavorite 
          ? [...prev, productId]
          : prev.filter(id => id !== productId)
      );
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateProfile,
      addresses,
      addAddress,
      updateAddress,
      removeAddress,
      orders,
      addOrder,
      favorites,
      toggleFavorite
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}