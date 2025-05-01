import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setTradingName as setTradingNameAction,
  setSameAsRegistered,
  setTradingAddress,
} from "../store/features/trading/tradingSlice";
import { useTradingApi } from "../hooks/useTradingApi";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Box,
  Button,
  ButtonText,
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  HStack,
  Icon,
  Image,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  Pressable,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  VStack,
} from "@/components/ui";
import { Center, Divider, ScrollView } from "@gluestack-ui/themed";
import { useThemeToggle } from "@/ThemeContext";

const TradingInfoScreen = () => {
  const [isSameAsRegistered, setIsSameAsRegistered] = useState(true);
  const [tradingName, setTradingName] = useState("");
  const [postCode, setPostCode] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [townCity, setTownCity] = useState("");
  const [county, setCounty] = useState("");
  const [country, setCountry] = useState("");
  const [modal, setModal] = useState(false);
  const navigation: any = useNavigation();

  const isNextEnabled =
    (isSameAsRegistered && tradingName) ||
    (tradingName && postCode && addressLine1 && townCity && county && country);
  const dispatch = useDispatch();

  const countries = ["UK", "USA", "Mexico", "Canada", "Australia", "Ireland"];

  const handleNext = async () => {
    const tradingDetails = {
      tradingName,
      postCode,
      addressLine1,
      addressLine2,
      townCity,
      county,
      country,
      isSameAsRegistered,
    };

    try {
      console.log("Trading details submitted====>:", tradingDetails);
      await postTradingDetails(tradingDetails);
      console.log("Trading details submitted====>:", tradingDetails);
      setModal(true);
    } catch (error) {
      console.error("Error posting trading details:", error);
    }
  };

  const tradingState = useSelector((state: any) => state.trading);

  useEffect(() => {
    console.log(
      "%c[Trading State Updated]",
      "color: green; font-weight: bold;"
    );
    console.log("Trading Name:", tradingState.tradingName);
    console.log("Is Same As Registered:", tradingState.isSameAsRegistered);
    console.log("Trading Address:", tradingState.address);
  }, [tradingState]);

  const { postTradingDetails } = useTradingApi();

  const { theme } = useThemeToggle();

  return (
    <Box
      className={`flex-1 p-3 sm:p-5 ${
        theme === "dark" ? "bg-black" : "bg-white"
      } `}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="pt-4 px-5">
        <HStack className="items-center mb-6">
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={
                theme === "dark"
                  ? require("../../assets/images/white_arrow.png")
                  : require("../../assets/images/arrow_forward.png")
              }
              alt="back button"
              className="h-4 w-7"
            />
          </Pressable>
          <Text
            className={`text-md ${
              theme === "dark" ? "text-white" : "text-black"
            } xs:text-base sm:text-md font-semibold`}
          >
            Trading Information
          </Text>
        </HStack>

        <Text
          className={`text-md sm:text-lg font-bold ${
            theme === "dark" ? "text-white" : "text-black"
          } mb-1 `}
        >
          Trading Information
        </Text>

        <Text className="text-gray-500 text-sm mb-6">
          Provide us with the trading details of your business or select same as
          registered address if that applies.
        </Text>

        <VStack className="space-y-4 mb-6">
          <Text
            className={`text-sm md:text-md ${
              theme === "dark" ? "text-white" : "text-black"
            } font-semibold`}
          >
            Trading name
          </Text>
          <Input
            variant="underlined"
            className={`border-b ${
              theme === "dark" ? "border-textgrey" : "border-black"
            }`}
          >
            <InputField
              value={tradingName}
              onChangeText={setTradingName}
              placeholder="Enter trading name"
              className={`${
                theme === "dark"
                  ? "placeholder-textgrey text-white"
                  : "placeholder-textgrey text-black"
              }`}
            />
          </Input>
        </VStack>

        <VStack className="space-y-4 mb-6">
          <Text
            className={`text-sm ${
              theme === "dark" ? "text-textgrey" : "text-black"
            } mb-2`}
          >
            Is trading address the same as registered address?
          </Text>

          <Checkbox
            value="sameAddress"
            isChecked={isSameAsRegistered}
            onChange={(isSelected) => setIsSameAsRegistered(isSelected)}
            aria-label="Same as registered address"
          >
            <CheckboxIndicator className="mr-2">
              {isSameAsRegistered && (
                <MaterialIcons
                  name="check"
                  size={16}
                  className="text-white bg-black p-1"
                />
              )}
            </CheckboxIndicator>
            <CheckboxLabel
              className={`${theme === "dark" ? "text-textgrey" : "text-black"}`}
            >
              Same as registered address
            </CheckboxLabel>
          </Checkbox>
        </VStack>

        {!isSameAsRegistered && (
          <VStack className="space-y-4 mb-6">
            <Divider className="my-2" />

            <Text
              className={`text-lg font-semibold mb-3 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Trading address
            </Text>

            {/** Post Code */}
            <VStack className="space-y-2 mb-3">
              <Input
                variant="underlined"
                className={`border-b ${
                  theme === "dark" ? "border-textgrey" : "border-black"
                }`}
              >
                <InputField
                  placeholder="Enter post code"
                  value={postCode}
                  onChangeText={setPostCode}
                  className={`text-base ${
                    theme === "dark"
                      ? "placeholder-textgrey text-white"
                      : "placeholder-textgrey text-black"
                  }`}
                />
              </Input>
            </VStack>

            {/** Address Line 1 */}
            <VStack className="space-y-2 mb-3">
              <Input
                variant="underlined"
                className={`border-b ${
                  theme === "dark" ? "border-textgrey" : "border-black"
                }`}
              >
                <InputField
                  placeholder="Enter address line 1"
                  value={addressLine1}
                  onChangeText={setAddressLine1}
                  className={`text-base ${
                    theme === "dark"
                      ? "placeholder-textgrey text-white"
                      : "placeholder-textgrey text-black"
                  }`}
                />
              </Input>
            </VStack>

            {/** Address Line 2 */}
            <VStack className="space-y-2 mb-3">
              <Input
                variant="underlined"
                className={`border-b ${
                  theme === "dark" ? "border-textgrey" : "border-black"
                }`}
              >
                <InputField
                  placeholder="Enter address line 2"
                  value={addressLine2}
                  onChangeText={setAddressLine2}
                  className={`text-base ${
                    theme === "dark"
                      ? "placeholder-textgrey text-white"
                      : "placeholder-textgrey text-black"
                  }`}
                />
              </Input>
            </VStack>

            {/** Town/City */}
            <VStack className="space-y-2 mb-3">
              <Input
                variant="underlined"
                className={`border-b ${
                  theme === "dark" ? "border-textgrey" : "border-black"
                }`}
              >
                <InputField
                  placeholder="Enter town/city"
                  value={townCity}
                  onChangeText={setTownCity}
                  className={`text-base ${
                    theme === "dark"
                      ? "placeholder-textgrey text-white"
                      : "placeholder-textgrey text-black"
                  }`}
                />
              </Input>
            </VStack>

            {/** County */}
            <VStack className="space-y-2 mb-3">
              <Input
                variant="underlined"
                className={`border-b ${
                  theme === "dark" ? "border-textgrey" : "border-black"
                }`}
              >
                <InputField
                  placeholder="Enter county"
                  value={county}
                  onChangeText={setCounty}
                  className={`text-base ${
                    theme === "dark"
                      ? "placeholder-textgrey text-white"
                      : "placeholder-textgrey text-black"
                  }`}
                />
              </Input>
            </VStack>

            {/** Country Select */}
            <VStack className="space-y-2">
              <Box className="pb-2">
                <Select
                  selectedValue={country}
                  onValueChange={(value) => setCountry(value)}
                >
                  <SelectTrigger
                    variant="underlined"
                    className={`min-h-[40px] border-b ${
                      theme === "dark" ? "border-textgrey" : ""
                    }`}
                  >
                    <SelectInput
                      placeholder="Country"
                      className={`text-sm ${
                        theme === "dark"
                          ? "placeholder-textgrey text-white"
                          : "placeholder-textgrey text-black"
                      }`}
                    />
                    <SelectIcon />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent
                      className={` ${
                        theme === "dark" ? "bg-gray-600" : "bg-lightgrey"
                      }`}
                    >
                      {countries.map((name) => (
                        <SelectItem key={name} label={name} value={name} />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </Box>
            </VStack>
          </VStack>
        )}

        <HStack className="p-4 space-x-4">
          <Button
            variant="outline"
            className={`flex-1 mr-2 ${
              theme === "dark" ? "border-green" : "border-black"
            }  border-2 cursor-pointer  rounded-full`}
            onPress={() => navigation.goBack()}
          >
            <ButtonText
              className={`text-xs ${
                theme === "dark" ? "text-green" : "text-black"
              } sm:text-sm `}
            >
              Later
            </ButtonText>
          </Button>

          <Button
            className={`flex-1 rounded-full cursor-pointer 
              ${
                theme === "dark"
                  ? isNextEnabled
                    ? "bg-green"
                    : "bg-textgrey"
                  : isNextEnabled
                  ? "bg-black"
                  : "bg-textgrey"
              } 
              ${isNextEnabled ? "opacity-100" : "opacity-70"}`}
            disabled={!isNextEnabled}
            onPress={handleNext}
          >
            <ButtonText
              className={`font-medium text-xs sm:text-sm 
      ${theme === "dark" ? "text-black" : "text-white"} 
      ${!isNextEnabled && "text-white"}`}
            >
              Next
            </ButtonText>
          </Button>
        </HStack>

        <Modal isOpen={modal} onClose={() => setModal(false)}>
          <ModalBackdrop />
          <ModalContent
            className={`absolute md:relative md:bottom-auto md:rounded-2xl md:self-center md:mt-24 md:max-w-md bottom-0 w-full rounded-t-3xl px-6 pt-4 pb-8 ${
              theme === "dark" ? "bg-black" : "bg-white"
            }`}
          >
            <Box className="items-center mb-4">
              <Box className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </Box>
            <ModalBody className="mt-6">
              <Center mb="$4">
                <Image
                  source={require("../../assets/images/tick.png")}
                  alt="Tick"
                  className="h-[90] w-[110]"
                />
              </Center>
              <Text
                className={`text-lg ${
                  theme === "dark" ? "text-white" : "text-black"
                } font-semibold text-center`}
              >
                Trading verification in progress
              </Text>
              <Text
                className={`text-sm ${
                  theme === "dark" ? "text-textgrey" : "text-black"
                } text-center mt-2`}
              >
                The trading details will be verified soon. You can continue
                filling in the remaining details.
              </Text>
            </ModalBody>
            <ModalFooter className="px-4 pb-6 w-[100%]">
              <Button
                className={`rounded-full cursor-pointer flex-1 border border-black ${
                  theme === "dark" ? "bg-green" : "bg-black"
                } `}
                onPress={() => {
                  navigation.navigate("Details");
                  setModal(false);
                }}
              >
                <ButtonText
                  className={`${
                    theme === "dark" ? "text-black" : "text-white"
                  }`}
                >
                  Continue
                </ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ScrollView>
    </Box>
  );
};

export default TradingInfoScreen;
