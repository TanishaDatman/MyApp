import React, { useEffect, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useCompanyApi } from '../hooks/useCompanyApi';
import {
  Box, Button, ButtonText, HStack, Image, Modal,
  ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader, Pressable,
  Text, VStack
} from '@/components/ui';
import { Center, ScrollView } from '@gluestack-ui/themed';
import { setBusinessDocument } from '../store/features/business/businessSlice';

export default function DocumentsBusiness() {
  const navigation: any = useNavigation();
  const [utility, setUtility]: any = useState(null);
  const [rental, setRental]: any = useState(null);
  const [rates, setRates]: any = useState(null);
  const dispatch=useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState(false);

  const pickDocument = async (type: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });

      if (!result.canceled) {
        const pickedFile = result.assets[0];
        if (type === 'utility') {
          setUtility(pickedFile);
        } else if (type === 'rental') {
          setRental(pickedFile);
        } else if (type === 'rates') {
          setRates(pickedFile);
        }

 dispatch(setBusinessDocument({ name: pickedFile.name , type: pickedFile?.mimeType||"" }));     
}
    } catch (err) {
      console.warn('Document pick error:', err);
    }
  };

  const { postCompanyDetails } = useCompanyApi();

  const companyWhat = useSelector((state: any) => state.business.companywhat);
  const orgType = useSelector((state: any) => state.business.businessType);
  const company = useSelector((state: any) => state.business.company);
  const contact = useSelector((state: any) => state.business.contact);
  const address = useSelector((state: any) => state.business.address);
  const document = useSelector((state: any) => state.business.document);


  const handleNoDocumentClick = async () => {
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
      console.log('Business detail submitted without document', details);
    } catch (err) {
      console.error(err);
    }
  };

  const isNextEnabled = utility || rental || rates;

  return (
    <Box className="flex-1 pt-7 p-5">
      <Box className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
                    <HStack className="items-center mb-6">
                      <Pressable onPress={() => navigation.goBack()}>
                        <Image
                          source={require('../../assets/images/arrow_forward.png')}
                          className='h-4 w-7'
                          alt="back button"
                        />
                      </Pressable>
                      <Text className="text-lg font-semibold">Upload Documents</Text>
                    </HStack>

          {/* Title */}
          <Text className="text-xl font-bold mb-2">
            Upload any of the documents to verify your business
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            Accepted formats: JPG, PNG, JPEG, and PDF.
          </Text>

          {/* Identity Verification */}
          <Text className="font-semibold mb-1">Address Verification</Text>
          <HStack className="items-center mb-2">
            <Box className="bg-lightyellow mb-2 rounded-full px-2 py-1">
              <Text className="text-yellow text-xs">Pending</Text>
            </Box>
          </HStack>
          <Text className="text-sm text-gray-500 mb-6">
            Submit a utility bill, lease agreement, or business rates bill showing your business address.
          </Text>

          {/* Upload Options */}
          <VStack className="space-y-6">
            <Pressable onPress={() => pickDocument('utility')}>
              <Text className="text-green mb-2 text-md">+ Utility bill</Text>
              {utility && (
                <Text className="text-xs text-gray-500">
                  Uploaded: {utility.name}
                </Text>
              )}
            </Pressable>

            <Pressable onPress={() => pickDocument('rental')}>
              <Text className="text-green mb-2 text-md">+ Rental agreement</Text>
              {rental && (
                <Text className="text-xs text-gray-500">
                  Uploaded: {rental.name}
                </Text>
              )}
            </Pressable>

            <Pressable onPress={() => pickDocument('rates')}>
              <Text className="text-green mb-2 text-md">+ Business rates bill</Text>
              {rates && (
                <Text className="text-xs text-gray-500">
                  Uploaded: {rates.name}
                </Text>
              )}
            </Pressable>
          </VStack>
        </ScrollView>

        {/* Footer */}
        <HStack className="mt-6 space-x-4 justify-between">
          <Button
            variant="outline"
            className="rounded-full flex-1 border border-black mr-2"
            onPress={() => navigation.goBack()}
          >
            <ButtonText className="text-black">Later</ButtonText>
          </Button>

          <Button
            className={`rounded-full flex-1 ${isNextEnabled ? 'bg-black' : 'bg-gray-300'}`}
            disabled={!isNextEnabled}
            onPress={() => isNextEnabled && setShowModal(true)}
          >
            <ButtonText className="text-white">Next</ButtonText>
          </Button>
        </HStack>
      </Box>

      {/* Review Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBackdrop />
        <ModalContent   className="absolute  md:relative md:bottom-auto md:rounded-2xl md:self-center md:mt-24 md:max-w-md bottom-0 w-full bg-white rounded-t-3xl px-6 pt-4 pb-8"
        >
          <ModalHeader>
            <Text className="text-lg font-semibold">
              Review your details <Text className="font-medium">(Optional)</Text>
            </Text>
          </ModalHeader>

          <ModalBody>
            <Text className="text-sm mb-4">
              You can review your provided information and make changes if needed, or proceed as it is.
            </Text>
          </ModalBody>

          <ModalFooter>
            <HStack className="w-full space-x-4">
              <Button
                className="rounded-full flex-1"
                variant="outline"
                onPress={async () => {
                  setShowModal(false);
                  navigation.navigate('ReviewBusiness');
                }}
              >
                <ButtonText className="text-sm">Review</ButtonText>
              </Button>

              <Button
                className="rounded-full flex-1 ml-2 bg-black"
                onPress={async () => {
                  setShowModal(false);
                  setModal(true);
                  await handleNoDocumentClick();
                }}
              >
                <ButtonText className="text-sm text-white">No, I’m good</ButtonText>
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <ModalBackdrop />
        <ModalContent        className="absolute  md:relative md:bottom-auto md:rounded-2xl md:self-center md:mt-24 md:max-w-md bottom-0 w-full bg-white rounded-t-3xl px-6 pt-4 pb-8"
        >
          <ModalBody className="mt-6">
            <Center className="mb-4">
              <Image
                source={require('../../assets/images/tick.png')}
                alt="Tick"
                className="h-[90px] w-[110px]"
              />
            </Center>
            <Text className="text-lg font-semibold text-center">
              Owner verification in progress
            </Text>
            <Text className="text-sm text-center mt-2">
              The owner details will be verified soon. You can continue filling in the remaining details.
            </Text>
          </ModalBody>
          <ModalFooter className="px-4 pb-6 w-full">
            <Button
              className="flex-1 rounded-full bg-black"
              onPress={() => {
                navigation.navigate('Details');
                setModal(false);
              }}
            >
              <ButtonText className="text-white">Continue</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
