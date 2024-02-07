import { createContext, useEffect, useState } from "react";
import { properties } from "./mockData/properties";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import axios from "axios";
export const AppContext = createContext();

const CustomPrevArrow = (props) => (
  <div className="custom-arrow custom-prev-arrow" onClick={props.onClick}>
    <FaLongArrowAltLeft size="40px" />
  </div>
);

const CustomNextArrow = (props) => (
  <div className="custom-arrow custom-next-arrow" onClick={props.onClick}>
    <FaLongArrowAltRight size="40px" />
  </div>
);

const AppProvider = ({ children }) => {
  const [bedroomCount, setBedroomCount] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const setLightMode = () => {
    setIsDark(!isDark);
    console.log("clicked light mode");
  };

  const incrementBedroom = () => {
    setBedroomCount(bedroomCount + 1);
  };

  const decrementBedroom = () => {
    if (bedroomCount > 0) {
      setBedroomCount(bedroomCount - 1);
    }
  };


  const Base_Url = "https://betahomeapiteejay.onrender.com"
  const [location, setLocation] = useState("")
  const [type, setType] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [properties, setProperties] = useState([])
  const [bed, setBed] = useState("")
  const url  = `${Base_Url}/property?location=${location}&type=${type}&bedroom=${bed}`

  
  const getPropertiues = async () => {
    try {
      const {data } = await axios(url)
      setProperties(data .properties)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    getPropertiues()
  }, [type, location, bed])
  return (
    <AppContext.Provider
      value={{
        properties,
        bedroomCount,
        incrementBedroom,
        decrementBedroom,
        isDark,
        setIsDark,
        setLightMode,
        Base_Url,
        setLocation,
        setType, 
        isLoading,
        setBed
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
