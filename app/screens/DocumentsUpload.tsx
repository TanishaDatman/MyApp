import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setDocument } from '../store/features/owner/ownerSlice';
import { useOwnerApi } from '../hooks/useOwnerApi';
import { Badge, BadgeText, Box, Button, ButtonText, HStack, Image, Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader, Pressable, Text, VStack } from '@/components/ui';
import { Center, ScrollView } from '@gluestack-ui/themed';
import { useThemeToggle } from '@/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function DocumentsUpload() {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const [passport, setPassport]: any = useState(null);
  const [license, setLicense]: any = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState(false);
  const { postOwnerDetails, loading } = useOwnerApi();

  const pickDocument = async (type: 'passport' | 'license') => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });
      console.log("result is ----======>",result)

      if (!result.canceled) {
        const selectedFile = result.assets[0];

        if (type === 'passport') {
          setPassport(selectedFile);
        } else {
          setLicense(selectedFile);
        }
console.log("selected file",selectedFile);
        dispatch(setDocument({ name: selectedFile.name , type: selectedFile?.mimeType||"" }));
      }
    } catch (err) {
      console.warn('Document pick error:', err);
    }
  };

  const isNextEnabled = passport || license;

   const owner = useSelector((state: any) => state.owner.owner);
    // console.log('Owner details from redux:', owner);
    const contact = useSelector((state: any) => state.owner.contact);
    // console.log('conatct details from redux:', contact);
    const address = useSelector((state: any) => state.owner.address);
    // console.log('address details from redux:', address);
    const document = useSelector((state: any) => state.owner.document);
    console.log('Image details from redux:', document);

  const handleNoDocumentClick = async () => {
    const selectedFile = passport || license
    const details = {
      ...owner,
      ...contact,
      ...address,
      document,
    };

    try {
      console.log('Business detail===========>',details);
      await postOwnerDetails(details);

      console.log('Business detail submitted without document',details);
    } catch (err) {
      console.error(err);
    }
  };

  const {t}=useTranslation()

  const {theme}=useThemeToggle()

  return (
    <Box className='flex-1 p-4 mt-5'>
      <Box className='flex-1'>
        <ScrollView showsVerticalScrollIndicator={false}>
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
              }`}>Upload Documents</Text>
                        </HStack>
          <Text className={`text-xl ${
                theme === "dark" ? "text-white" : "text-black"
              } font-bold mb-2`}>
            Upload any of the documents to verify your identity
          </Text>
          <Text className={`text-sm ${
                theme === "dark" ? "text-textgrey" : "text-black"
              } mb-4`}>
            Accepted formats: JPG, PNG, JPEG, and PDF.
          </Text>

          <Text className={`font-semibold ${
                theme === "dark" ? "text-white" : "text-black"
              } mb-1`}>Identity Verification</Text>
          <HStack className='items-center mb-2'>
            <Badge className='rounded-full px-3 py-1 bg-lightyellow'>
              <BadgeText className='text-xs text-yellow'>Pending</BadgeText>
            </Badge>
          </HStack>
          <Text className={`text-sm ${
                theme === "dark" ? "text-textgrey" : "text-black"
              } mb-6`}>
            Provide a copy of a government-issued ID such as a passport or driver’s license.
          </Text>

          <VStack space="lg">
            <Pressable onPress={() => pickDocument('passport')}>
              <Text className='text-md text-green'>+ Passport</Text>
              {passport && (
                <Text className={`text-xs ${
                  theme === "dark" ? "text-textgrey" : "text-black"
                    }`}>
                  Uploaded: {passport.name}
                </Text>
              )}
            </Pressable>

            <Pressable onPress={() => pickDocument('license')}>
              <Text className='text-md text-green'>+ Driving license</Text>
              {license && (
                <Text className={`text-xs ${
              theme === "dark" ? "text-textgrey" : "text-black"
                }`}>
                  Uploaded: {license.name}
                </Text>
              )}
            </Pressable>
          </VStack>
        </ScrollView>

        <HStack space="md" className='mt-6 justify-between'>
          <Button
          className={`flex-1 mr-2 ${
            theme === "dark" ? "border-green" : "border-black"}  border-2 cursor-pointer  rounded-full`}
            onPress={() => navigation.goBack()}
          >
            <ButtonText className={`text-xs ${
    theme === "dark" ? "text-green" : "text-black"} sm:text-sm `}>{t('later')}</ButtonText>
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
      ${!isNextEnabled && "text-white"}`}>{t('next')}</ButtonText>
          </Button>
        </HStack>
      </Box>

      {/* Review Modal */}
      <Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  avoidKeyboard
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
            navigation.navigate('Review');
          }}
        >
          <ButtonText className={`text-sm  ${theme === "dark" ? "text-green" : "text-black"}`}>{t('review')}</ButtonText>
        </Button>

        <Button
          className={`rounded-full flex-1  ${theme === "dark" ? "bg-green" : "bg-black"}`}
          onPress={async () => {
            setShowModal(false);
            setModal(true);
            await handleNoDocumentClick();
          }}
        >
          <ButtonText className={`text-sm cursor-pointer ${theme === "dark" ? "text-black" : "text-white"}`}>{t('no-good')}</ButtonText>
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
              <ButtonText className={`${theme === "dark" ? "text-black" : "text-white"}`}>{t('continue')}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
