import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./app/screens/HomeScreen";
import { StyledProvider } from "@gluestack-style/react";
import { config } from "@gluestack-ui/config";
import OnboardingScreen from "./app/screens/OnboardingScreen";
import Address from "./app/screens/Address";
import DetailsScreen from "./app/screens/DetailsScreen";

import { Image } from "@gluestack-ui/themed";
import TransactionsScreen from "./app/screens/TransactionsScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
import OwnerDetailsScreen from "./app/screens/OwnerDetailsScreen";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Contact from "./app/screens/Contact";
import { HStack, Text, VStack } from "./components/ui";
import DocumentsUpload from "./app/screens/DocumentsUpload";
import Review from "./app/screens/Review";
import BusinessDetailsScreen from "./app/screens/BusinessDetailsScreen";
import OrganisationType from "./app/screens/OrganizationType";
import CompanyDetails from "./app/screens/CompanyDetails";
import ContactBusiness from "./app/screens/ContactBusiness";
import AddressBusiness from "./app/screens/AddressBusiness";
import DocumentsBusiness from "./app/screens/DocumentsBusiness";
import TradingInfoScreen from "./app/screens/TradingInfoScreen";
import BankDetailsScreen from "./app/screens/BankDetailsScreen";
import ReviewBusiness from "./app/screens/ReviewBusiness";
import DocumentsBank from "./app/screens/DocumentsBank";
import CongoScreen from "./app/screens/CongoScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ThemeProvider, useThemeToggle } from "./ThemeContext";


const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent", // 👈 set background transparent
  },
};

export default function App() {


  return (
    <SafeAreaProvider>
          <ThemeProvider>
      <StyledProvider config={config}>
        <GluestackUIProvider mode="light">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <OverlayProvider>
                <AppContent />
              </OverlayProvider>
            </PersistGate>
          </Provider>
        </GluestackUIProvider>
      </StyledProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
       <Stack.Screen name="Onboarding" component={OnboardingScreen} /> 
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="OwnerDetails" component={OwnerDetailsScreen} /> 
      <Stack.Screen name="BusinessDetails" component={BusinessDetailsScreen} />
      <Stack.Screen name="TradingInfo" component={TradingInfoScreen} />
      <Stack.Screen name="BankDetails" component={BankDetailsScreen} /> 
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Documents" component={DocumentsUpload} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="Organization" component={OrganisationType} />
      <Stack.Screen name="Company" component={CompanyDetails} />
      <Stack.Screen name="ContactBusiness" component={ContactBusiness} />
      <Stack.Screen name="DocumentsBusiness" component={DocumentsBusiness} />
      <Stack.Screen name="ReviewBusiness" component={ReviewBusiness} />
      <Stack.Screen name="DocumentsBank" component={DocumentsBank} />
      <Stack.Screen name="Congo" component={CongoScreen} />
      {/* <Stack.Screen name="HomeOnboard" component={HomeOnboard} /> */}
      <Stack.Screen name="AddressBusiness" component={AddressBusiness} />
    </Stack.Navigator>
  );
}

function AppContent() {
  const colorMode = "light";

  const [isReady, setIsReady] = useState(false);
  const [navigationState, setNavigationState] = useState<any>(undefined);

  useEffect(() => {
    const loadNavigationState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(PERSISTENCE_KEY);
        if (savedState) {
          setNavigationState(JSON.parse(savedState));
        }
      } catch (e) {
        console.warn("Failed to load nav state", e);
      } finally {
        setIsReady(true);
      }
    };

    loadNavigationState();
  }, []);

  if (!isReady) return null; // Or return a loading component

  const { theme } = useThemeToggle(); 
  const isLight = theme === "light";

  return (
    <>
      <StatusBar
        translucent={true}
        animated={true}
        hidden={false}
        backgroundColor={isLight ? "#FFFFFF" : "#151515"}
        barStyle={isLight ? "dark-content" : "light-content"}
      />
      <SafeAreaView
        className={`${
          isLight ? "bg-[#ffffff]" : "bg-[#151515]"
        } flex-1`}
      >
        <NavigationContainer
          theme={MyTheme}
          initialState={navigationState}
          onStateChange={(state) => {
            AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
          }}
        >
           <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, focused }) => {
                let iconSource;

                if (route.name === "Home") {
                  iconSource = require("./assets/images/home.png");
                } else if (route.name === "Transactions") {
                  iconSource = require("./assets/images/multiple_stop.png");
                } else if (route.name === "Settings") {
                  iconSource = require("./assets/images/settings.png");
                }

                return (
                  <Image
                    source={iconSource}
                    alt={`${route.name} tab icon`}
                    width={24}
                    height={24}
                    resizeMode="contain"
                    style={{
                      tintColor: focused ? "#199F65" : "#848484",
                    }}
                  />
                );
              },
              tabBarActiveTintColor: "#199F65",
              tabBarInactiveTintColor: "#848484",
              headerShown: false,
              tabBarStyle: {
                backgroundColor: isLight ? "#ffffff" : "#000000", 
                paddingBottom: 4,
                height: 60,
                borderTopColor: isLight ? "#e0e0e0" : "#333333",
              },
            })}
          >
         <Tab.Screen name="Home" component={HomeStack} />
         <Tab.Screen name="Transactions" component={TransactionsScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />

          </Tab.Navigator>
        </NavigationContainer>
            
      </SafeAreaView>
    
    </>
  );
}
