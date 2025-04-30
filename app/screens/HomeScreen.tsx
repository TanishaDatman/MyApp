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
  Progress,
  ProgressFilledTrack,
  Text,
  VStack,
} from "@/components/ui";
import {
  Divider,
  ImageBackground,
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
          // console.log("===========>",ownerData?.business?.flag)
          if (ownerData?.business?.flag == 1) setTrack(1);

          const companyData = await getCompanyDetails(companyId);
          // console.log("===========>",companyData?.companyDetails?.flag)
          if (companyData?.companyDetails?.flag === 1) setTrack(2);

          const tradingData = await getTradingDetails(tradeID);
          // console.log("===========>",tradingData?.tradingDetails?.flag)
          if (tradingData?.tradingDetails?.flag === 1) setTrack(3);

          const bankData = await getBankDetails(bankID);
          console.log("===========>",bankData?.bankDetails?.flag)
          if (bankData?.bankDetails?.flag === 1) setTrack(4);
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
      <Text className="ml-2 font-bold text-lg sm:text-xl text-black">
        John's Takeaway
      </Text>
    </HStack>
  
    <VStack space="md" className="sm:px-7">
      {/* Greeting */}
      <Box className="mb-3">
        <Text className="text-base sm:text-lg font-semibold text-black">
          Hey John, 👋
        </Text>
        <Text className="text-sm sm:text-base font-medium text-black">
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
            <Box className="p-4 flex-1 justify-between">
              <VStack space="sm">
                <Text className="text-base font-bold text-black">
                  Available balance
                </Text>
                <Box className="h-24 items-start">
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
                  <Text className="text-xs sm:text-sm text-black sm:leading-normal">
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
                      <Text className="text-xs text-black">
                        Verification progress
                      </Text>
                      <Text className="text-xs font-bold text-black">
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
        </Box>
      </Pressable>
  
      {/* Divider */}
      <Divider className="text-divider my-4" />
  
      {/* Action Buttons */}
      <HStack className="flex-wrap justify-between">
        {actions.map((action) => (
          <Box
            key={action.id}
            className="basis-[48%] sm:basis-[32%] lg:basis-[23%] mb-4"
          >
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
                <Text className="text-xs sm:text-sm text-black text-center font-medium">
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
