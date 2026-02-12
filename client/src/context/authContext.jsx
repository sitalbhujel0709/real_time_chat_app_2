import api from "../config/axios";
import { createContext,useContext,useState,useEffect } from "react";

const AuthContext = createContext();


export const AuthProvider = ({children})=>{
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const response = await api.get('/users/profile');
        setUser({id:response.data.id,username:response.data.username});
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
      finally{
        setLoading(false);
      }
    }
    fetchUser();
  },[])
  const login = (data)=>{
    setUser(data);
  }
  const logout = async ()=>{
    try {
      await api.post('/users/logout');
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
  return (
    <AuthContext.Provider value={{user, loading, login, logout}}>{children}</AuthContext.Provider>
  )
}

export const useAuth = ()=>{
  return useContext(AuthContext);
}
