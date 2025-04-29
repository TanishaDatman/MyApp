// import React, { useCallback, useEffect, useState } from "react";
// import { Pressable, useWindowDimensions } from "react-native";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import { useOwnerApi } from "../hooks/useOwnerApi";
// import { useCompanyApi } from "../hooks/useCompanyApi";
// import { useTradingApi } from "../hooks/useTradingApi";
// import { useBankApi } from "../hooks/useBankApi";
// import { ownerId, companyId, tradeID, bankID } from "../data";
// import { AlertCircleIcon, Box, HStack, Icon, Image, Text, VStack } from "@/components/ui";
// import {
//   Divider,
//   ImageBackground,
//   Progress,
//   ProgressFilledTrack,
//   ScrollView,
// } from "@gluestack-ui/themed";
// import LottieView from "lottie-react-native";

// export default function HomeScreen() {
//   const [activeItem, setActiveItem] = useState<string | null>(null);
//   const navigation = useNavigation<any>();

//   const actions = [
//     {
//       id: "lastPayout",
//       label: "Last payout",
//       icon: require("../../assets/images/card_travel.png"),
//     },
//     {
//       id: "alerts",
//       label: "Alerts",
//       icon: require("../../assets/images/notifications_unread.png"),
//     },
//     {
//       id: "callStatus",
//       label: "Call status",
//       icon: require("../../assets/images/perm_phone_msg.png"),
//     },
//     {
//       id: "recentPayments",
//       label: "Recent Payments",
//       icon: require("../../assets/images/credit_card_clock.png"),
//     },
//   ];

//   const { width } = useWindowDimensions();

//   const { getOwnerDetails } = useOwnerApi();
//   const { getCompanyDetails } = useCompanyApi();
//   const { getTradingDetails } = useTradingApi();
//   const { getBankDetails } = useBankApi();

//   const [track, setTrack] = useState<number>(0);
//   const [progress, setProgress] = useState<number>(0); // State for progress

//   useFocusEffect(
//     useCallback(() => {
//       const fetchDetails = async () => {
//         try {
//           const ownerData = await getOwnerDetails(ownerId);
//           console.log("Owner data:", ownerData);
//           if (ownerData?.data?.flag === 1) {
//             setTrack(1);
//           }

//           const companyData = await getCompanyDetails(companyId);
//           console.log("Company data:", companyData);
//           if (companyData?.data?.flag === 1) {
//             setTrack(2);
//           }

//           const tradingData = await getTradingDetails(tradeID);
//           console.log("Trading data:", tradingData);
//           if (tradingData?.data?.flag === 1) {
//             setTrack(3);
//           }

//           const bankData = await getBankDetails(bankID);
//           console.log("Banking data:", bankData);
//           if (bankData?.data?.flag === 1) {
//             setTrack(4);
//           }
//         } catch (error) {
//           console.error("Error fetching details:", error);
//         }
//       };

//       fetchDetails();
//     }, [ownerId, companyId, tradeID, bankID])
//   );

//   useFocusEffect(
//     useCallback(() => {
//       switch (track) {
//         case 1:
//           setProgress(25);
//           break;
//         case 2:
//           setProgress(50);
//           break;
//         case 3:
//           setProgress(75);
//           break;
//         case 4:
//           setProgress(100);
//           break;
//         default:
//           setProgress(0);
//       }
//     }, [track])
//   );

//   const getItemsPerRow = () => {
//     if (width < 768) return 2;
//     if (width < 1024) return 3;
//     return 4;
//   };

//   const itemsPerRow = getItemsPerRow();
//   const boxWidth = `${100 / itemsPerRow - 2}%`; // string like "48%"

//   return (
//     // bg="$white"  bgColor="#F5F5F5" flex={1} p="$4"
//     <ScrollView className="mt-5 flex-1 p-4">
//       <HStack className="mb-7 flex-1 items-center">
//         <Image
//           source={require("../../assets/images/logo.png")}
//           alt="John's Takeaway Logo"
//           className="h-8 w-8 object-contain"
//         />
//         <Text className="font-bold sm:text-lg md:text-xl lg:text-2xl">
//           John's Takeaway
//         </Text>
//       </HStack>

//       <VStack space="md">
//         <Box className="p-2 rounded-md">
//           <Text className="font-semibold tracking-wider md:text-md lg:text-lg text-black">
//             Hey John, 👋
//           </Text>
//           <Text className="font-semibold tracking-wider md:text-sm lg:text-md text-black">
//             Here's the latest update on your store.
//           </Text>
//         </Box>

//         <Pressable onPress={() => navigation.navigate("Onboarding")}>
//           <Box className="rounded-lg overflow-hidden w-[100%] h-200 mr-[-16]">
//             <ImageBackground
//               source={
//                 progress === 100
//                   ? require("../../assets/images/new.png")
//                   : require("../../assets/images/card.png")
//               }
//               resizeMode="cover"
//               style={{
//                 flex: 1,
//                 width: "100%",
//               }}
//               imageStyle={{
//                 borderRadius: 16,
//                 width: "100%",
//               }}
//             >
//               <Box className="p-4 flex-1 justify-between">
//                 <VStack space="sm">
//                   <Text className="text-lg font-bold text-black">
//                     Available balance
//                   </Text>

//                   <Box className="flex-1">
//                     <Box className="h-28">
//                       <LottieView
//                         source={require("../../assets/lotty.json")}
//                         autoPlay
//                         loop
//                         style={{ height: "100%", width: "100%" }}
//                       />
//                     </Box>
//                   </Box>
//                 </VStack>

//                 <VStack space="sm">
//                   <HStack className="flex-1 items-center ">
//                     <Icon 
//   as={AlertCircleIcon} 
  
//   color={progress === 100 ? "$black" : "$black"} 
// size="md"
//   className='text-xs'
// />
//                     <Text
//                       className="text-2xs underline text-black"
//                     >
//                       {progress == 100
//                         ? "Onboarding verification is pending and will be verified soon."
//                         : "Complete the onboarding verification to withdraw money."}
//                     </Text>
//                   </HStack>

//                   {progress == 100 ? (
//                     ""
//                   ) : (
//                     <VStack space="xs">
//                       <HStack className="flex-1 items-center justify-between">
//                         <Text className="text-sm text-black">
//                           Verification progress
//                         </Text>
//                         <Text className="text-sm font-bold text-black">
//                           {progress}%
//                         </Text>
//                       </HStack>
//                       <Progress
//                         value={progress}
//                         className="h-2 rounded-full"
//                       >
//                         <ProgressFilledTrack className="h-2 " />
//                       </Progress>
//                     </VStack>
//                   )}
//                 </VStack>
//               </Box>
//             </ImageBackground>
//           </Box>
//         </Pressable>

//         <Divider className="my-2" />

//         <HStack className="flex-1 items-center justify-between px-2">
//           {actions.map((action) => (
//             <Box key={action.id} className="mb-2 px-1 w-1/2">
//               <Pressable
//                 onPress={() =>
//                   setActiveItem(activeItem === action.id ? null : action.id)
//                 }
//               >
//                 <Box
//                   className="p-3 rounded-md flex-1 justify-between items-center h-96"

//                   // bg="$white"
//                   // p="$3"
//                   // borderRadius="$md"
//                   // alignItems="center"
//                   // justifyContent="space-between"
//                   // borderWidth={1}
//                   // borderColor={activeItem === action.id ? '$brandSecondary' : 'transparent'}
//                   // height={100}
//                 >
//                   <Box
//                     className="p-2 rounded-full mb-2"
//                     // bg={activeItem === action.id ? '$warningLight' : 'white'}
//                     // p="$2"
//                     // borderRadius="$full"
//                     // mb="$2"
//                   >
//                     <Image
//                       source={action.icon}
//                       alt={action.label}
//                       width={24}
//                       height={24}
//                       resizeMode="contain"
//                       style={{
//                         tintColor:
//                           activeItem === action.id ? "#F59E0B" : "#A3A3A3", // fallback color
//                       }}
//                     />
//                   </Box>
//                   <Text
//                     className="text-sm text-center"
//                     // fontSize="$sm"
//                     // fontWeight={activeItem === action.id ? '$bold' : '$normal'}
//                     // color={activeItem === action.id ? '$brandSecondary' : '$textPrimary'}
//                     // textAlign="center"
//                     // numberOfLines={1}
//                     // ellipsizeMode="tail"
//                   >
//                     {action.label}
//                   </Text>
//                 </Box>
//               </Pressable>
//             </Box>
//           ))}
//         </HStack>
//       </VStack>
//     </ScrollView>
//   );
// }


import React, { useCallback, useEffect, useState } from "react";
import { Pressable, useWindowDimensions } from "react-native";
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
  Text,
  VStack,
} from "@/components/ui";
import {
  Divider,
  ImageBackground,
  Progress,
  ProgressFilledTrack,
  ScrollView,
} from "@gluestack-ui/themed";
import LottieView from "lottie-react-native";

export default function HomeScreen() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const actions = [
    {
      id: "lastPayout",
      label: "Last payout",
      icon: require("../../assets/images/card_travel.png"),
    },
    {
      id: "alerts",
      label: "Alerts",
      icon: require("../../assets/images/notifications_unread.png"),
    },
    {
      id: "callStatus",
      label: "Call status",
      icon: require("../../assets/images/perm_phone_msg.png"),
    },
    {
      id: "recentPayments",
      label: "Recent Payments",
      icon: require("../../assets/images/credit_card_clock.png"),
    },
  ];

  const { getOwnerDetails } = useOwnerApi();
  const { getCompanyDetails } = useCompanyApi();
  const { getTradingDetails } = useTradingApi();
  const { getBankDetails } = useBankApi();

  const [track, setTrack] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      const fetchDetails = async () => {
        try {
          const ownerData = await getOwnerDetails(ownerId);
          if (ownerData?.data?.flag === 1) setTrack(1);

          const companyData = await getCompanyDetails(companyId);
          if (companyData?.data?.flag === 1) setTrack(2);

          const tradingData = await getTradingDetails(tradeID);
          if (tradingData?.data?.flag === 1) setTrack(3);

          const bankData = await getBankDetails(bankID);
          if (bankData?.data?.flag === 1) setTrack(4);
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

  return (
    <ScrollView className="flex-1 bg-white px-4 py-5">
      {/* Header */}
      <HStack className="mb-6 items-center sm:px-7 sm:py-4">
        <Image
          source={require("../../assets/images/logo.png")}
          alt="Logo"
          className="h-8 w-8"
        />
        <Text className="ml-2 font-bold text-lg text-black">
          John's Takeaway
        </Text>
      </HStack>

      <VStack space="md" className="sm:px-7">
        {/* Greeting */}
        <Box className="mb-3">
          <Text className="text-base font-semibold text-black">
            Hey John, 👋
          </Text>
          <Text className="text-sm font-medium text-black">
            Here's the latest update on your store.
          </Text>
        </Box>

        {/* Progress Card */}
        <Pressable onPress={() => navigation.navigate("Onboarding")}>
          <Box className="rounded-xl overflow-hidden w-full h-60">
            <ImageBackground
              source={
                progress === 100
                  ? require("../../assets/images/new.png")
                  : require("../../assets/images/card.png")
              }
              resizeMode="cover"
              style={{ flex: 1 }}
              imageStyle={{ borderRadius: 16 }}
            >
              <Box className="p-4 flex-1 justify-between ">
                <VStack space="sm">
                  <Text className="text-base font-bold text-black">
                    Available balance
                  </Text>
                  <Box className="h-24 items-start">
                    <LottieView
                      source={require("../../assets/lotty.json")}
                      autoPlay
                      loop
                      style={{ height: "100%", width: "100%",alignSelf:"flex-start" }}
                    />
                  </Box>
                </VStack>

                <VStack space="xs">
                <HStack className="items-start">
  <Text className="text-xs text-black sm:text-sm sm:leading-normal">
    {progress === 100 ? (
      "Onboarding verification is pending and will be verified soon."
    ) : (
      <>
        ⚠️ Complete the onboarding verification to withdraw money.{" "}
        <Text className="text-yellow text-sm underline font-medium">Complete</Text>
      </>
    )}
  </Text>
</HStack>


                  {progress !== 100 && (
                    <VStack space="xs">
                      <HStack className="justify-between items-center">
                        <Text className="text-xs text-black">
                          Verification progress
                        </Text>
                        <Text className="text-xs font-bold text-black">
                          {progress}%
                        </Text>
                      </HStack>
                      <Progress value={progress} className="h-0.5 rounded-full">
                        <ProgressFilledTrack className="h-0.5 bg-yellow-400" />
                      </Progress>
                    </VStack>
                  )}
                </VStack>
              </Box>
            </ImageBackground>
          </Box>
        </Pressable>

        {/* Divider */}
        <Divider className="text-divider" />

        {/* Action Buttons (2 per row on mobile) */}
        <HStack className="flex-wrap justify-between">
          {actions.map((action) => (
            <Box key={action.id} className="w-[48%] mb-4">
              <Pressable
                onPress={() =>
                  setActiveItem(activeItem === action.id ? null : action.id)
                }
              >
                <Box
                  className={`h-24 p-3 rounded-xl items-center justify-center ${
                    activeItem === action.id ? "bg-lightyellow" : "bg-gray-100"
                  }`}
                >
                  <Box className="mb-2 bg-white p-2 rounded-full">
                    <Image
                      source={action.icon}
                      alt={action.label}
                      className="h-6 w-6"
                      style={{
                        tintColor:
                          activeItem === action.id ? "#F59E0B" : "#9CA3AF",
                      }}
                    />
                  </Box>
                  <Text className="text-xs text-black text-center font-medium">
                    {action.label}
                  </Text>
                </Box>
              </Pressable>
            </Box>
          ))}
        </HStack>
      </VStack>
    </ScrollView>
  );
}
