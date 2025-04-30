import React from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setBankStatement, setVoidCheque } from '../store/features/bank/bankSlice';
import { useBankApi } from '../hooks/useBankApi'; // adjust path if needed
import { Box, Button, ButtonText, HStack, Image, Pressable, Text, VStack } from '@/components/ui';
import { ScrollView } from '@gluestack-ui/themed';

export default function DocumentsBank() {
  const navigation: any = useNavigation();
  const statement = useSelector((state: any) => state.bank.statement);
  const cheque = useSelector((state: any) => state.bank.cheque);
  const dispatch = useDispatch();
  const { postBankDetails, loading } = useBankApi();

  const pickDocument = async (type: any) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });

      if (!result.canceled && result.assets.length > 0) {
        const file = result.assets[0];
        type === 'statement'
          ? dispatch(setBankStatement(file))
          : dispatch(setVoidCheque(file));
      }
    } catch (err) {
      console.warn('Document pick error:', err);
    }
  };

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
        flag: 1,
      };

      const res = await postBankDetails(bankPayload);
      console.log('Bank details submitted:', res);
      navigation.navigate('Congo');
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <Box className="flex-1 md:p-8 px-5 pt-7">
      <Box className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
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

          <Text className="text-xl font-bold mb-2">
            Upload any of the documents to verify your bank
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            Accepted formats: JPG, PNG, JPEG, and PDF.
          </Text>

          <Text className="font-semibold mb-1">Bank Account Verification</Text>
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

        <HStack className="mt-6 p-4 space-x-4 mb-3 justify-between">
          <Button
            variant="outline"
            className="rounded-full border border-black flex-1 mr-2"
            onPress={() => navigation.goBack()}
          >
            <ButtonText className="text-black">Later</ButtonText>
          </Button>

          <Button
            className={`rounded-full flex-1 ${
              isNextEnabled ? 'bg-black' : 'bg-gray-300'
            }`}
            disabled={!isNextEnabled || loading}
            onPress={handleNext}
          >
            <ButtonText className="text-white">
              {loading ? 'Submitting...' : 'Next'}
            </ButtonText>
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
