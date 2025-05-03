import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useCompanyApi } from "../hooks/useCompanyApi";
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Image,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  Pressable,
  Text,
  VStack,
} from "@/components/ui";
import { Center, ScrollView } from "@gluestack-ui/themed";
import { useThemeToggle } from "@/ThemeContext";
import { useTranslation } from "react-i18next";

export default function ReviewBusiness() {
  const navigation: any = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const companyWhat = useSelector((state: any) => state.business.companywhat);
  const orgType = useSelector((state: any) => state.business.businessType);
  const company = useSelector((state: any) => state.business.company);
  const companyNumber = company?.companyNumber;
  const legalName = company?.legalName;
  const contact = useSelector((state: any) => state.business.contact);
  const email = contact?.email;
  const phone = contact?.phone;
  const url = contact?.url;
  const address = useSelector((state: any) => state.business.address);
  const document = useSelector((state: any) => state.business.document);

  const { postCompanyDetails } = useCompanyApi();

  const handleConfirm = async () => {
    const details = {
      ...company,
      ...contact,
      ...address,
      companyWhat,
      orgType,
      document,
    };
    try {
      await postCompanyDetails(details);
      setShowModal(true);
      console.log("Business detail submitted without document", details);
    } catch (err) {
      console.error(err);
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    navigation.navigate("Details");
  };

  const {t}=useTranslation()

  const { theme } = useThemeToggle();

  return (
    <Box className="flex-1 p-3 sm:p-5 pt-10">
      <ScrollView className="px-4">
        {/* Header */}
        <HStack className="items-center mb-4 sm:mb-6">
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
            className={`text-md xs:text-base ${
              theme === "dark" ? "text-white" : "text-black"
            }  sm:text-md font-semibold`}
          >
            Review Business
          </Text>
        </HStack>

        {/* Title */}
        <Text
          className={`text-lg sm:text-xl ${
            theme === "dark" ? "text-white" : "text-black"
          }  font-bold mb-2`}
        >
          Review
        </Text>
        <Text className="text-sm text-gray-500 mb-5">
          Time to review before you submit this onboarding form.
        </Text>

        {/* Section: Owner Details */}
        <Text
          className={`text-sm ${
            theme === "dark" ? "text-white" : "text-black"
          }  font-semibold mb-2`}
        >
          Business details
        </Text>
        <Box
          className={`${
            theme === "dark" ? "bg-black" : "bg-white"
          } border-2 rounded-lg p-4 mb-4`}
        >
          <HStack className="justify-between mb-2">
            <VStack>
              <Text className="text-sm text-gray-500">
                Company: {companyWhat} {orgType}
              </Text>
              <Text className="text-sm text-gray-500">
                Company Number: {companyNumber}
              </Text>
              <Text className="text-sm text-gray-500">
                Company Legal Number: {legalName}
              </Text>
            </VStack>
            <Pressable onPress={() => navigation.navigate("EditOwner")}>
              {/* <Text className="text-green-600 font-semibold">Edit</Text> */}
            </Pressable>
          </HStack>
        </Box>

        {/* Section: Contact Details */}
        <Text
          className={`text-sm ${
            theme === "dark" ? "text-white" : "text-black"
          }  font-semibold mb-2`}
        >
          Contact details
        </Text>
        <Box
          className={`${
            theme === "dark" ? "bg-black" : "bg-white"
          } border-2 rounded-lg p-4 mb-4`}
        >
          {" "}
          <HStack className="justify-between mb-2">
            <VStack>
              <Text className="text-sm text-gray-500">{email}</Text>
              <Text className="text-sm text-gray-500">{phone}</Text>
              <Text className="text-sm text-gray-500">{url}</Text>
            </VStack>
            <Pressable
              onPress={() => navigation.navigate("EditContact")}
            ></Pressable>
          </HStack>
        </Box>

        {/* Section: Address */}
        <Text
          className={`text-sm ${
            theme === "dark" ? "text-white" : "text-black"
          }  font-semibold mb-2`}
        >
          Address details
        </Text>
        <Box
          className={`${
            theme === "dark" ? "bg-black" : "bg-white"
          } border-2 rounded-lg p-4 mb-4`}
        >
          {" "}
          <HStack className="justify-between items-start">
            <Text className="text-sm text-gray-500 flex-shrink">
              {address.country} {address.postCode} {address.address1}{" "}
              {address.address2} {address.town} {address.county}
            </Text>
            <Pressable
              onPress={() => navigation.navigate("EditAddress")}
            ></Pressable>
          </HStack>
        </Box>

        {/* Confirm Button */}
        <Button
                
                 className={`${theme === "dark" ? "bg-green" : "bg-black"} rounded-full`}
                 onPress={handleConfirm}
               >
                 <ButtonText className={`font-semibold cursor-pointer ${theme === "dark" ? "text-black" : "text-white"}`}>
                 {t('confirm')}
                 </ButtonText>
               </Button>

        <Box className="h-10" />
      </ScrollView>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
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
              Business verification in progress
            </Text>
            <Text
              className={`text-sm ${
                theme === "dark" ? "text-textgrey" : "text-black"
              } text-center mt-2`}
            >
              The business details will be verified soon. You can continue filling
              in the remaining details.
            </Text>
          </ModalBody>
          <ModalFooter className="px-4 pb-6 w-[100%]">
            <Button
              className={`rounded-full cursor-pointer flex-1 border border-black ${
                theme === "dark" ? "bg-green" : "bg-black"
              } `}
              onPress={() => {
                navigation.navigate("Details");
                setShowModal(false);
              }}
            >
              <ButtonText
                className={`${theme === "dark" ? "text-black" : "text-white"}`}
              >
                {t('continue')}
              </ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
