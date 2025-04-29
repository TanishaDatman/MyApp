import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useOwnerApi } from "../hooks/useOwnerApi";
import { Box, Button, ButtonText, HStack, Image, Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, Pressable, Text, VStack } from "@/components/ui";
import { Center, ScrollView } from "@gluestack-ui/themed";

export default function Review() {
  const navigation: any = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const { postOwnerDetails } = useOwnerApi();

  const ownerDetails = useSelector((state: any) => state.owner.owner);
  const ownerContact = useSelector((state: any) => state.owner.contact);
  const ownerAddress = useSelector((state: any) => state.owner.address);
  // const image = useSelector((state: any) => state.owner.image);
  // console.log("Image details from redux:", image);

  const handleConfirm = async () => {
    try {
      const combinedDetails = {
        ...ownerDetails,
        ...ownerContact,
        ...ownerAddress,
        // image: image?.path
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

  return (
    <Box className="flex-1 pt-10">
      <ScrollView px="$4">
        {/* Header */}
        <HStack className="items-center mb-4">
          <Pressable onPress={() => navigation.goBack()}>
            <Text className="text-lg mr-2">
              ←
            </Text>
          </Pressable>
          <Text className="text-md font-medium">
            Review
          </Text>
        </HStack>

        {/* Title */}
        <Text className="text-2xl font-bold mb-1" >
          Review
        </Text>
        <Text className="text-sm mb-5">
          Time to review before I submit this onboarding form.
        </Text>

        {/* Section: Owner Details */}
        <Text className="text-sm font-semibold mb-2">
          Owner details
        </Text>
        <Box className="rounded-lg p-4 mb-4">
          <HStack className="justify-between mb-2">
            <VStack>
              <Text className="text-md">
                {ownerDetails?.title} {ownerDetails?.firstName}{" "}
                {ownerDetails?.lastName}
              </Text>
              <Text className="text-sm">
                {ownerDetails?.dob}
              </Text>
              <Text className="text-sm" >
                {ownerDetails?.nationality}
              </Text>
            </VStack>
            <Pressable onPress={() => navigation.navigate("EditOwner")}>
              {/* <Text color="$green600" fontWeight="$semibold">Edit</Text> */}
            </Pressable>
          </HStack>
        </Box>

        {/* Section: Contact Details */}
        <Text className="text-sm font-semibold mb-2">
          Contact details
        </Text>
        <Box className="rounded-lg p-4 mb-4">
          <HStack className="justify-between mb-2">
            <VStack>
              <Text className="text-sm">
                {ownerContact?.email}
              </Text>
              <Text className="text-sm">
                {ownerContact?.phone}
              </Text>
            </VStack>
            <Pressable onPress={() => navigation.navigate("EditContact")}>
              {/* <Text color="$green600" fontWeight="$semibold">Edit</Text> */}
            </Pressable>
          </HStack>
        </Box>

        {/* Section: Address */}
        <Text className="text-sm font-semibold mb-2">
          Contact details
        </Text>
        <Box
        className="p-4 mb-6 rounded-lg"
          // bg="$white"
          // borderRadius="$lg"
          // borderColor="$$white"
          // borderWidth={1}
          // p="$4"
          // mb="$6"
        >
          <HStack className="justify-between " >
            <Text className="text-sm " >
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
          // bg="$black"
          // borderRadius="$full"
          // size="lg"
          onPress={handleConfirm}
        >
          <ButtonText className="font-semibold">
            Confirm
          </ButtonText>
        </Button>

        <Box className="h-10" />
      </ScrollView>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBackdrop />
        <ModalContent
          // borderTopLeftRadius="$2xl"
          // borderTopRightRadius="$2xl"
          // alignItems="center"
        >
          <ModalBody className="mt-6">
            <Center mb="$4">
              {/* Optional icon (checkmark pen) */}
              <Image
                source={require("../../assets/images/tick.png")}
                alt="Tick"
                className="h-[90] w[110]"
               
              />
            </Center>
            <Text className="text-lg font-semibold text-center">
              Owner verification in progress
            </Text>
            <Text className="text-sm text-center mt-2">
              The owner details will be verified soon. You can continue filling
              in the remaining details.
            </Text>
          </ModalBody>
          <ModalFooter className="px-4 pb-6 w-[100%]">
            <Button
            className="flex-1 rounded-full"
              // flex={1}
              // bg="$black"
              // borderRadius="$full"
              onPress={handleContinue}
            >
              <ButtonText>Continue</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
