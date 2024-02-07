import { createContext, useEffect, useState, useContext } from "react";
import { useGlobalContext } from "./Hooks/useGlobalContext";
import axios from "axios";

const AdminContext = createContext();

export const useAdminContext = () => useContext(AdminContext);

const AdminProvider = ({ children }) => {
  const { Base_Url } = useGlobalContext();
  const url = `${Base_Url}/property`;
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProperties = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(url);
      setProperties(data.properties);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <AdminContext.Provider value={{ isLoading, properties }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;