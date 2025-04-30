import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useCompanyApi } from '../hooks/useCompanyApi';
import { Box, Button, ButtonText, HStack, Image, Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, Pressable, Text, VStack } from '@/components/ui';
import { Center, ScrollView } from '@gluestack-ui/themed';

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
      console.log('Business detail submitted without document', details);
    } catch (err) {
      console.error(err);
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    navigation.navigate('Details');
  };

  return (
    <Box className="flex-1 bg-gray-100 pt-10">
      <ScrollView className="px-4">
        {/* Header */}
        <HStack className="items-center mb-4">
          <Pressable onPress={() => navigation.goBack()}>
            <Text className="text-lg mr-2">←</Text>
          </Pressable>
          <Text className="text-base font-medium text-gray-700">Review Business</Text>
        </HStack>

        {/* Title */}
        <Text className="text-2xl font-bold mb-1">Review</Text>
        <Text className="text-sm text-gray-500 mb-5">
          Time to review before I submit this onboarding form.
        </Text>

        {/* Section: Owner Details */}
        <Text className="text-sm font-semibold mb-2">Business details</Text>
        <Box className="bg-white rounded-lg p-4 mb-4">
          <HStack className="justify-between mb-2">
            <VStack>
              <Text className="text-base text-black">Company: {companyWhat} {orgType}</Text>
              <Text className="text-sm text-gray-500">Company Number: {companyNumber}</Text>
              <Text className="text-sm text-gray-500">Company Legal Number: {legalName}</Text>
            </VStack>
            <Pressable onPress={() => navigation.navigate('EditOwner')}>
              {/* <Text className="text-green-600 font-semibold">Edit</Text> */}
            </Pressable>
          </HStack>
        </Box>

        {/* Section: Contact Details */}
        <Text className="text-sm font-semibold mb-2">Contact details</Text>
        <Box className="bg-white rounded-lg p-4 mb-4">
          <HStack className="justify-between mb-2">
            <VStack>
              <Text className="text-sm text-gray-700">{email}</Text>
              <Text className="text-sm text-gray-700">{phone}</Text>
              <Text className="text-sm text-gray-700">{url}</Text>
            </VStack>
            <Pressable onPress={() => navigation.navigate('EditContact')}>
            </Pressable>
          </HStack>
        </Box>

        {/* Section: Address */}
        <Text className="text-sm font-semibold mb-2">Address details</Text>
        <Box className="bg-white rounded-lg border border-white p-4 mb-6">
          <HStack className="justify-between items-start">
            <Text className="text-sm text-gray-700 flex-shrink">
              {address.country} {address.postCode} {address.address1} {address.address2} {address.town} {address.county}
            </Text>
            <Pressable onPress={() => navigation.navigate('EditAddress')}>
            </Pressable>
          </HStack>
        </Box>

        {/* Confirm Button */}
        <Button className="bg-black rounded-full w-full py-3" onPress={handleConfirm}>
          <ButtonText className="text-white font-semibold">Confirm</ButtonText>
        </Button>

        <Box className="h-10" />
      </ScrollView>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBackdrop />
        <ModalContent className="rounded-t-2xl items-center">
          <ModalBody className="mt-6">
            <Center className="mb-4">
              <Image source={require('../../assets/images/tick.png')} alt="Tick" className="h-[90px] w-[110px]" />
            </Center>
            <Text className="text-lg font-semibold text-center">
              Owner verification in progress
            </Text>
            <Text className="text-sm text-center mt-2 text-gray-500">
              The owner details will be verified soon. You can continue filling in the remaining details.
            </Text>
          </ModalBody>
          <ModalFooter className="w-full px-4 pb-6">
            <Button className="flex-1 bg-black rounded-full py-3" onPress={handleContinue}>
              <ButtonText className="text-white text-sm">Continue</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
