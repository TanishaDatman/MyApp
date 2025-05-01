import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useOwnerApi } from "../hooks/useOwnerApi";
import { Box, Button, ButtonText, HStack, Image, Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, Pressable, Text, VStack } from "@/components/ui";
import { Center, ScrollView } from "@gluestack-ui/themed";
import { useThemeToggle } from "@/ThemeContext";

export default function Review() {
  const navigation: any = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const { postOwnerDetails } = useOwnerApi();

  const ownerDetails = useSelector((state: any) => state.owner.owner);
  const ownerContact = useSelector((state: any) => state.owner.contact);
  const ownerAddress = useSelector((state: any) => state.owner.address);
  const document = useSelector((state: any) => state.owner.document);

  // const image = useSelector((state: any) => state.owner.image);
  // console.log("Image details from redux:", image);

  const handleConfirm = async () => {
    try {
      const combinedDetails = {
        ...ownerDetails,
        ...ownerContact,
        ...ownerAddress,
         document
      };

      await postOwnerDetails(combinedDetails);
      setShowModal(true); // Show success modal
    } catch (error) {
      console.error("Failed to post owner details:", error);
      // Optionally show an error alert here
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    navigation.navigate("Details"); // Replace with actual next screen
  };

  const {theme}=useThemeToggle()

  return (
    <Box className="flex-1 p-3 pt-10">
      <ScrollView className="px-4">
        {/* Header */}
        <HStack className="items-center mb-4 sm:mb-6">
                   <Pressable onPress={() => navigation.goBack()}>
                     <Image
                        source={
                          theme === 'dark'
                            ? require('../../assets/images/white_arrow.png') 
                            : require('../../assets/images/arrow_forward.png') 
                        }
                        alt="back button"
                        className='h-4 w-7'
                      />
                   </Pressable>
                   <Text className={`text-md ${theme === "dark" ? "text-white" : "text-black"} xs:text-base sm:text-md font-semibold`}>Review</Text>
                 </HStack>

        {/* Title */}
        <Text className={`text-lg sm:text-xl ${theme === "dark" ? "text-white" : "text-black"} font-bold mb-2`} >
          Review
        </Text>
        <Text className="text-sm text-textgrey mb-5">
          Time to review before you submit this onboarding form.
        </Text>

        {/* Section: Owner Details */}
        <Text className={`text-sm ${theme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}>
          Owner details
        </Text>
        <Box className="rounded-lg border-2  p-4 mb-4">
          <HStack className="justify-between mb-2">
            <VStack>
              <Text className={`text-md ${theme === "dark" ? "text-textgrey" : "text-black"}`}>
                {ownerDetails?.title} {ownerDetails?.firstName}{" "}
                {ownerDetails?.lastName}
              </Text>
              <Text className={`text-md ${theme === "dark" ? "text-textgrey" : "text-black"}`}>
                {ownerDetails?.dob}
              </Text>
              <Text className={`text-md ${theme === "dark" ? "text-textgrey" : "text-black"}`}>
                {ownerDetails?.nationality}
              </Text>
            </VStack>
            <Pressable onPress={() => navigation.navigate("EditOwner")}>
              {/* <Text color="$green600" fontWeight="$semibold">Edit</Text> */}
            </Pressable>
          </HStack>
        </Box>

        {/* Section: Contact Details */}
        <Text className={`text-sm ${theme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}>
          Contact details
        </Text>
        <Box className="rounded-lg border-2 p-4 mb-4">
          <HStack className="justify-between mb-2">
            <VStack>
              <Text className={`text-md ${theme === "dark" ? "text-textgrey" : "text-black"}`}>
                {ownerContact?.email}
              </Text>
              <Text className={`text-md ${theme === "dark" ? "text-textgrey" : "text-black"}`}>
                {ownerContact?.phone}
              </Text>
            </VStack>
            <Pressable onPress={() => navigation.navigate("EditContact")}>
            </Pressable>
          </HStack>
        </Box>

        {/* Section: Address */}
        <Text className={`text-sm ${theme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}>
          Address details
        </Text>
        <Box
        className="p-4 mb-6 border-2 rounded-lg"
       
        >
          <HStack className="justify-between " >
            <Text className={`text-md ${theme === "dark" ? "text-textgrey" : "text-black"}`} >
              {ownerAddress.houseNo} {ownerAddress.street}{" "}
              {ownerAddress.postCode} {ownerAddress.town} {ownerAddress.county}{" "}
              {ownerAddress.country}
            </Text>
            <Pressable onPress={() => navigation.navigate("EditAddress")}>
              {/* <Text color="$green600" fontWeight="$semibold">Edit</Text> */}
            </Pressable>
          </HStack>
        </Box>

        {/* Confirm Button */}
        <Button
         
          className={`${theme === "dark" ? "bg-green" : "bg-black"} rounded-full`}
          onPress={handleConfirm}
        >
          <ButtonText className={`font-semibold cursor-pointer ${theme === "dark" ? "text-black" : "text-white"}`}>
            Confirm
          </ButtonText>
        </Button>

        <Box className="h-10" />
      </ScrollView>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
             <ModalBackdrop />
             <ModalContent className={`absolute md:relative md:bottom-auto md:rounded-2xl md:self-center md:mt-24 md:max-w-md bottom-0 w-full rounded-t-3xl px-6 pt-4 pb-8 ${
         theme === "dark" ? "bg-black" : "bg-white"
       }`}>
               <Box className="items-center mb-4">
           <Box className="w-12 h-1.5 bg-gray-300 rounded-full" />
         </Box>
               <ModalBody className='mt-6' >
                 <Center mb="$4">
                   <Image source={require('../../assets/images/tick.png')} alt="Tick" className='h-[90] w-[110]'  />
                 </Center>
                 <Text className={`text-lg ${theme === "dark" ? "text-white" : "text-black"} font-semibold text-center`}>
                   Owner verification in progress
                 </Text>
                 <Text className={`text-sm ${theme === "dark" ? "text-textgrey" : "text-black"} text-center mt-2`}>
                   The owner details will be verified soon. You can continue filling in the remaining details.
                 </Text>
               </ModalBody>
               <ModalFooter className='px-4 pb-6 w-[100%]'>
                 <Button
               className={`rounded-full cursor-pointer flex-1 border border-black ${theme === "dark" ? "bg-green" : "bg-black"} `}
                  
                   onPress={() => {
                     navigation.navigate('Details');
                     setShowModal(false);
     
                   }}
                 >
                   <ButtonText className={`${theme === "dark" ? "text-black" : "text-white"}`}>Continue</ButtonText>
                 </Button>
               </ModalFooter>
             </ModalContent>
           </Modal>
    </Box>
  );
}
