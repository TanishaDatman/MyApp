// import React, { createContext, useContext, useState } from 'react';
// import { Appearance } from 'react-native';
// import { useColorScheme } from 'nativewind';


// type Theme = 'light' | 'dark';
 
// const ThemeContext = createContext({
//   theme: 'light',
//   toggleTheme: () => {},
// });



// export const ThemeProvider = ({ children }: any) => {
//   const systemTheme = Appearance.getColorScheme();
//   const [theme, setTheme] = useState<Theme>('light');
//     const { setColorScheme } = useColorScheme();

//   const toggleTheme = () => {
//     const next = theme === 'light' ? 'dark' : 'light';
//     setTheme(next);
//     setColorScheme(next);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useThemeToggle = () => useContext(ThemeContext);


import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = 'light' | 'dark';


const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {},
  });

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("appTheme");
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("appTheme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeToggle = () => useContext(ThemeContext);
