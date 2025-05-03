import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setBankDocument } from '../store/features/bank/bankSlice';
import { useBankApi } from '../hooks/useBankApi'; // adjust path if needed
import { Box, Button, ButtonText, HStack, Image, Pressable, Text, VStack } from '@/components/ui';
import { ScrollView } from '@gluestack-ui/themed';
import { useThemeToggle } from '@/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function DocumentsBank() {
  const navigation: any = useNavigation();
  // const cheque = useSelector((state: any) => state.bank.cheque);
const [statement, setStatement]: any = useState(null);
  const [cheque, setCheque]: any = useState(null);
    const dispatch = useDispatch();
  const { postBankDetails, loading } = useBankApi();

  const pickDocument = async (type: any) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });

       if (!result.canceled) {
              const selectedFile = result.assets[0];
      
              if (type === 'statement') {
                setStatement(selectedFile);
              } else {
                setCheque(selectedFile);
              }
      console.log("selected file",selectedFile);
              dispatch(setBankDocument({ name: selectedFile.name , type: selectedFile?.mimeType||"" }));
            }
    } catch (err) {
      console.warn('Document pick error:', err);
    }
  };

  const document = useSelector((state: any) => state.bank.document);


  const isNextEnabled = statement || cheque;
  const bankState = useSelector((state: any) => state.bank);
  console.log("bank state from redux:...", bankState);

  const handleNext = async () => {
    try {
      const bankPayload = {
        accountHolderName: bankState?.accountHolderName,
        sortCode: bankState?.sortCode,
        accountNumber: bankState?.accountNumber,
        confirmAccountNumber: bankState?.confirmAccountNumber,
        document:bankState?.document,
        flag: 1,
      };

      const res = await postBankDetails(bankPayload);
      console.log('Bank details submitted:', res);
      navigation.navigate('Congo');
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  const {t}=useTranslation()

  const {theme}=useThemeToggle()

  return (
    <Box className="flex-1 md:p-8 px-5 pt-7">
      <Box className="flex-1">
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
                     <Text className={`text-lg ${
              theme === "dark" ? "text-white" : "text-black"
            } font-semibold`}>Upload Documents</Text>
                   </HStack>

          <Text className={`text-xl ${
              theme === "dark" ? "text-white" : "text-black"
            } font-bold mb-2`}>
            Upload any of the documents to verify your bank
          </Text>
          <Text className="text-sm text-textgrey mb-4">
            Accepted formats: JPG, PNG, JPEG, and PDF.
          </Text>

          <Text className={`font-semibold ${
              theme === "dark" ? "text-white" : "text-black"
            } mb-1`}>Bank Account Verification</Text>
          <HStack className="items-center mb-2">
            <Box className="bg-lightyellow rounded-full px-2 py-1">
              <Text className="text-yellow text-xs">Pending</Text>
            </Box>
          </HStack>
          <Text className="text-sm text-gray-500 mb-6">
            Upload a recent bank statement (Last 3 months) or a void/cancelled cheque.
          </Text>

          <VStack className="space-y-6 ">
            <Pressable onPress={() => pickDocument('statement')}>
              <Text className="text-green mb-3 text-md">+ Bank Statement</Text>
              {statement && (
                <Text className="text-xs text-gray-500">
                  Uploaded: {statement.name}
                </Text>
              )}
            </Pressable>

            <Pressable onPress={() => pickDocument('cheque')}>
              <Text className="text-green text-md">+ Void Cheque</Text>
              {cheque && (
                <Text className="text-xs text-gray-500">
                  Uploaded: {cheque.name}
                </Text>
              )}
            </Pressable>
          </VStack>
        </ScrollView>

       
         <HStack space="md" className='mt-6 mb-4 justify-between'>
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
            disabled={!isNextEnabled || loading}
            onPress={handleNext}
        >
        
                    <ButtonText className={`font-medium text-xs sm:text-sm 
              ${theme === "dark" ? "text-black" : "text-white"} 
              ${!isNextEnabled && "text-white"}`}>{t('next')}</ButtonText>
                  </Button>
                </HStack>
      </Box>
    </Box>
  );
}
