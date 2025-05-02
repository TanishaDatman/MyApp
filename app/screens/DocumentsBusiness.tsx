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
import { useThemeToggle } from '@/ThemeContext';

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

  const {theme}=useThemeToggle()

  return (
    <Box className="flex-1 pt-7 p-5">
      <Box className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
                    <HStack className="items-center mb-6">
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
                      <Text className={`text-lg font-semibold ${
            theme === "dark" ? "text-white" : "text-black"
          } `}>Upload Documents</Text>
                    </HStack>

          {/* Title */}
          <Text className={`text-xl font-bold ${
            theme === "dark" ? "text-white" : "text-black"
          }  mb-2`}>
            Upload any of the documents to verify your business
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            Accepted formats: JPG, PNG, JPEG, and PDF.
          </Text>

          {/* Identity Verification */}
          <Text className={`font-semibold ${
            theme === "dark" ? "text-textgrey" : "text-black"
          }  mb-1`}>Address Verification</Text>
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
       <HStack space="md" className='mt-6 justify-between'>
                <Button
                className={`flex-1 mr-2 ${
                  theme === "dark" ? "border-green" : "border-black"}  border-2 cursor-pointer  rounded-full`}
                  onPress={() => navigation.goBack()}
                >
                  <ButtonText className={`text-xs ${
          theme === "dark" ? "text-green" : "text-black"} sm:text-sm `}>Later</ButtonText>
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
        onPress={() => setShowModal(true)}
      >
      
                  <ButtonText className={`font-medium text-xs sm:text-sm 
            ${theme === "dark" ? "text-black" : "text-white"} 
            ${!isNextEnabled && "text-white"}`}>Next</ButtonText>
                </Button>
              </HStack>
      </Box>

      {/* Review Modal */}
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      avoidKeyboard
      // className={` ${
      //   theme === "dark" ? "bg-dgrey" : "bg-white"
      //     }`}
    >
      <ModalBackdrop />
    
      <ModalContent className={`absolute md:relative md:bottom-auto md:rounded-2xl md:self-center md:mt-24 md:max-w-md bottom-0 w-full rounded-t-3xl px-6 pt-4 pb-8 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}>
        {/* Drag handle */}
        <Box className="items-center mb-4">
          <Box className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </Box>
    
        <ModalHeader>
          <Text className={`text-lg font-semibold  ${theme === "dark" ? "text-white" : "text-black"} `}>
            Review your details 
            <Text className={`font-medium  ${theme === "dark" ? "text-white" : "text-black"}`}>(Optional)</Text>
          </Text>
        </ModalHeader>
    
        <ModalBody>
          <Text className="text-sm text-gray-600 mb-6">
            You can review your provided information and make changes if needed, or proceed as it is.
          </Text>
        </ModalBody>
    
        <ModalFooter>
          <HStack space="md" className="w-full">
            <Button
              className={`rounded-full  cursor-pointer flex-1 border ${theme === "dark" ? "border-green" : "border-black"} `}
              variant="outline"
              onPress={() => {
                setShowModal(false);
                navigation.navigate('ReviewBusiness');
              }}
            >
              <ButtonText className={`text-sm  ${theme === "dark" ? "text-green" : "text-black"}`}>Review</ButtonText>
            </Button>
    
            <Button
              className={`rounded-full flex-1  ${theme === "dark" ? "bg-green" : "bg-black"}`}
              onPress={async () => {
                setShowModal(false);
                setModal(true);
                await handleNoDocumentClick();
              }}
            >
              <ButtonText className={`text-sm cursor-pointer ${theme === "dark" ? "text-black" : "text-white"}`}>No, I’m good</ButtonText>
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>



      {/* Success Modal */}
      <Modal isOpen={modal} onClose={() => setModal(false)} >
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
                     setModal(false);
     
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
