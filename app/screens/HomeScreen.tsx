import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, ImageBackground,useWindowDimensions } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useOwnerApi } from "../hooks/useOwnerApi";
import { useCompanyApi } from "../hooks/useCompanyApi";
import { useTradingApi } from "../hooks/useTradingApi";
import { useBankApi } from "../hooks/useBankApi";
import { ownerId, companyId, tradeID, bankID } from "../data";
import {
  AlertCircleIcon,
  Box,
  HStack,
  Icon,
  Image,
  Pressable,
  Progress,
  ProgressFilledTrack,
  Text,
  VStack,
} from "@/components/ui";
import LottieView from "lottie-react-native";
import { useThemeToggle } from "@/ThemeContext";
import { actions } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setAllOwnerDetails } from "../store/features/owner/ownerSlice";
import { setAllBusinessDetails } from "../store/features/business/businessSlice";
import { setAllTradingDetails } from "../store/features/trading/tradingSlice";
import { setAllBankDetails } from "../store/features/bank/bankSlice";




export default function HomeScreen() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const navigation = useNavigation<any>();



  const { getOwnerDetails } = useOwnerApi();
  const { getCompanyDetails } = useCompanyApi();
  const { getTradingDetails } = useTradingApi();
  const { getBankDetails } = useBankApi();

  const [track, setTrack] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const dispatch=useDispatch()


  useFocusEffect(
    useCallback(() => {
      const fetchDetails = async () => {
        try {
          const ownerData = await getOwnerDetails(ownerId);
          if (ownerData?.business?.flag == 1) setTrack(1);
          dispatch(setAllOwnerDetails(ownerData?.business))

          const companyData = await getCompanyDetails(companyId);
          console.log("===========>",companyData?.companyDetails)
          if (companyData?.companyDetails?.flag === 1) setTrack(2);
          dispatch(setAllBusinessDetails(companyData?.companyDetails))

          const tradingData = await getTradingDetails(tradeID);
          console.log("==checking for the trading on home=========>",tradingData?.tradingDetails)
          if (tradingData?.tradingDetails?.flag === 1) setTrack(3);
          dispatch(setAllTradingDetails(tradingData?.tradingDetails))

          const bankData = await getBankDetails(bankID);
          console.log("===========>",bankData?.bankDetails)
          if (bankData?.bankDetails?.flag === 1) setTrack(4);
          dispatch(setAllBankDetails(bankData?.bankDetails))


        } catch (error) {
          console.error("Error fetching details:", error);
        }
      };

      fetchDetails();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      setProgress(track * 25);
    }, [track])
  );

  const { toggleTheme,theme} = useThemeToggle();


  return (
<VStack className={`flex-1 ${
    theme === "dark" ? "bg-black" : "bg-white"
  } py-5`}>
<HStack className="mb-6 cursor-pointer items-center px-2 md:px-7 md:py-4">
<Pressable onPress={toggleTheme} className="flex-row items-center">
      <Image
        source={require("../../assets/images/logo.png")}
        alt="Logo"
        className="h-8 w-8 ml-3 md:m-0"
      />
     <Text
  className={`ml-2 font-bold ${
    theme === "dark" ? "text-white" : "text-black"
  } text-lg cursor-pointer md:text-xl`}
>
  John's Takeaway
</Text>

      </Pressable>

    </HStack>
    <VStack space="md" className="px-7">
    <Box className="mb-3">
        <Text className={`text-base ${
    theme === "dark" ? "text-white" : "text-black"} sm:text-md md:text-lg font-semibold`}>
          Hey John, 👋
        </Text>
        <Text className={`text-sm ${
    theme === "dark" ? "text-textgrey" : "text-black"
  } sm:text-base md:text-md lg:text-lg font-medium`}>
          Here's the latest update on your store.
        </Text>
      </Box>
      </VStack>
      <Pressable className="w-full mb-4 cursor-pointer" onPress={() => navigation.navigate("Onboarding")}>
      <VStack className="rounded-xl sm:mb-5 mb-0 w-full h-60">
<ImageBackground
                className=" flex-grow mx-3 md:mx-0 mb-4 md:mb-0 md:mr-5 md:ml-5"
                source={{
                  uri:
                    progress === 100
                      ? theme === 'dark'
                        ? 'https://cp-docs-stage-b.s3.eu-west-1.amazonaws.com/app-images/docReviewDarkTheme.png'
                        : 'https://cp-docs-stage-b.s3.eu-west-1.amazonaws.com/app-images/docReviewLightTheme.png'
                      : theme === 'dark'
                      ? 'https://cp-docs-stage-b.s3.eu-west-1.amazonaws.com/app-images/payoutBlockedDarkTheme.png'
                      : 'https://cp-docs-stage-b.s3.eu-west-1.amazonaws.com/app-images/payoutBlockedLightTheme.png',
                }}                
                
                imageStyle={{ resizeMode: 'cover', borderRadius: 20 }}>

                {/* </ImageBackground> */}
                <Box className="p-4 flex-1 justify-between">
              <VStack space="sm">
                <Text className={`text-base ${
    theme === "dark" ? "text-white" : "text-black"
  } font-bold`}>
                  Available balance
                </Text>
                <Box className="w-[20vw] xs:[22vw]  md:w-[7vw] lg:w[9vw] aspect-square">
                  <LottieView
                    source={require("../../assets/lotty.json")}
                    autoPlay
                    loop
                    style={{
                      height: "100%",
                      width: "100%",
                      alignSelf: "flex-start",
                    }}
                  />
                </Box>
              </VStack>
              <VStack space="xs">
                <HStack className="items-start">
                  <Text className={`text-xs sm:text-md ${
    theme === "dark" ? "text-white" : "text-black"
  } md:text-md sm:leading-normal`}>
                    {progress === 100 ? (
                      "Onboarding verification is pending and will be verified soon."
                    ) : (
                      <>
                        ⚠️ Complete the onboarding verification to withdraw money.{" "}
                        <Text className="text-yellow text-sm underline font-medium">
                          Complete
                        </Text>
                      </>
                    )}
                  </Text>
                </HStack>
  
                {progress !== 100 && (
                  <VStack space="xs">
                    <HStack className="justify-between items-center">
                      <Text className={`text-xs ${
    theme === "dark" ? "text-white" : "text-black"
  }`}>
                        Verification progress
                      </Text>
                      <Text className={`text-xs font-bold ${
    theme === "dark" ? "text-white" : "text-black"
  }`}>
                        {progress}%
                      </Text>
                    </HStack>
                    <Progress value={progress} className="h-1.5 rounded-full bg-textgrey">
                      <ProgressFilledTrack className="h-0.5 bg-black text-black" />
                    </Progress>
                  </VStack>
                )}
              </VStack>
          </Box>
          </ImageBackground>

                </VStack>
              </Pressable>

                  {/* Divider */}
      {/* <Divider className="text-divider  md:my-20 " /> */}
  
  {/* Action Buttons */}
  <HStack className="flex-wrap overflow-hidden p-3 px-4 justify-between">
  {actions.map((action) => (
    <Box
      key={action.id}
      className="basis-[48%] rounded-md sm:basis-[32%] lg:basis-[23%] mb-4"
    >
      <Pressable
        onPress={() =>
          setActiveItem(activeItem === action.id ? null : action.id)
        }
      >
        <Box
          className={`h-24 p-3 rounded-xl items-center justify-center ${
            activeItem === action.id
              ? "bg-lightyellow"
              : theme === "dark"
              ? "bg-gray-700"
              : "bg-gray-200"
          }`}
        >
          <Box
            className={`mb-2 p-2 rounded-full ${
              theme === "dark" ? "bg-white" : "bg-white"
            }`}
          >
            <Image
              source={action.icon}
              alt={action.label}
              className="h-6 w-6"
              style={{
                tintColor: activeItem === action.id ? "#F59E0B" : "#9CA3AF",
              }}
            />
          </Box>
          <Text
            className={`text-xs sm:text-sm text-center font-medium ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {action.label}
          </Text>
        </Box>
      </Pressable>
    </Box>
  ))}
</HStack>

</VStack>
  );
}
