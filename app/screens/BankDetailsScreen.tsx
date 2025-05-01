import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { setBankDetails } from '../store/features/bank/bankSlice';
import { Box, Button, ButtonText, HStack, Image, Input, InputField, Pressable, Text, VStack } from '@/components/ui';
import { ScrollView } from '@gluestack-ui/themed';
import { useThemeToggle } from '@/ThemeContext';

const BankDetailsSchema = z
  .object({
    accountHolderName: z.string().min(4, 'Account holder name is required'),
    sortCode: z
      .string()
      .regex(/^\d{6}$/, 'Sort code must be exactly 6 digits'),
    accountNumber: z
      .string()
      .min(8, 'Account number must be at least 8 digits')
      .max(18, 'Account number can be a maximum of 18 digits')
      .regex(/^\d+$/, 'Account number must be numeric'),
    confirmAccountNumber: z.string().min(1, 'Confirm account number'),
  })
  .refine((data) => data.accountNumber === data.confirmAccountNumber, {
    message: 'Account numbers do not match',
    path: ['confirmAccountNumber'],
  });

type BankDetailsFormData = z.infer<typeof BankDetailsSchema>;

// ...imports remain unchanged

const BankDetailsScreen = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BankDetailsFormData>({
    resolver: zodResolver(BankDetailsSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: BankDetailsFormData) => {
    dispatch(setBankDetails(data));
    navigation.navigate('DocumentsBank');
  };

  const bankState = useSelector((state: any) => state.bank);

  useEffect(() => {
    console.log('Bank State:', bankState);
  }, [bankState]);

  const {theme}=useThemeToggle()

  return (
    <Box className={`flex-1 p-3 md:p-5 ${
      theme === "dark" ? "bg-black" : "bg-white"
    } `}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="px-5 pt-7 "
      >
        <VStack className="space-y-2 mb-6">
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
                     <Text className={`text-md xs:text-base ${
              theme === "dark" ? "text-white" : "text-black"
            } sm:text-md font-semibold`}>Bank Details</Text>
                   </HStack>

          <Text className={`text-md ${
              theme === "dark" ? "text-white" : "text-black"
            } sm:text-lg font-bold mb-2`}>
            Set up your payout(bank) account
          </Text>
          <Text className="text-sm sm:text-base text-textgrey mb-4">
            We need your bank details to ensure payouts are sent securely and on time. Providing this information helps avoid delays in receiving payments.
          </Text>
        </VStack>

        <VStack className="space-y-4 mb-8">
  {/* Account Holder Name */}
  <VStack className="space-y-1 mb-3">
    <Controller
      control={control}
      name="accountHolderName"
      render={({ field: { onChange, value } }) => (
        <>
          <Input
            variant="underlined"
            className={`md:text-md border-b ${
              theme === "dark" ? "border-textgrey" : "border-black"
            } md:mb-0 mb-2`}
          >
            <InputField
              placeholder="Enter account holder name"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              autoCorrect={false}
              className={`${
                theme === "dark" ? "placeholder-textgrey text-white" : "placeholder-textgrey text-black"
              }`}
            />
          </Input>
          {errors.accountHolderName && (
            <Text className="text-xs text-red">{errors.accountHolderName.message}</Text>
          )}
        </>
      )}
    />
  </VStack>

  {/* Sort Code */}
  <VStack className="space-y-1 mb-3">
    <Controller
      control={control}
      name="sortCode"
      render={({ field: { onChange, value } }) => (
        <>
          <Input
            variant="underlined"
            className={`md:text-md border-b ${
              theme === "dark" ? "border-textgrey" : "border-black"
            } md:mb-0 mb-2`}
          >
            <InputField
              placeholder="Bank sort code"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
              className={`${
                theme === "dark" ? "placeholder-textgrey text-white" : "placeholder-textgrey text-black"
              }`}
            />
          </Input>
          {errors.sortCode && (
            <Text className="text-xs text-red">{errors.sortCode.message}</Text>
          )}
        </>
      )}
    />
  </VStack>

  {/* Account Number */}
  <VStack className="space-y-1 mb-3">
    <Controller
      control={control}
      name="accountNumber"
      render={({ field: { onChange, value } }) => (
        <>
          <Input
            variant="underlined"
            className={`md:text-md border-b ${
              theme === "dark" ? "border-textgrey" : "border-black"
            } md:mb-0 mb-2`}
          >
            <InputField
              placeholder="Account Number"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
              className={`${
                theme === "dark" ? "placeholder-textgrey text-white" : "placeholder-textgrey text-black"
              }`}
            />
          </Input>
          {errors.accountNumber && (
            <Text className="text-xs text-red">{errors.accountNumber.message}</Text>
          )}
        </>
      )}
    />
  </VStack>

  {/* Confirm Account Number */}
  <VStack className="space-y-1 mb-3">
    <Controller
      control={control}
      name="confirmAccountNumber"
      render={({ field: { onChange, value } }) => (
        <>
          <Input
            variant="underlined"
            className={`md:text-md border-b ${
              theme === "dark" ? "border-textgrey" : "border-black"
            } md:mb-0 mb-2`}
          >
            <InputField
              placeholder="Confirm Account Number"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
              className={`${
                theme === "dark" ? "placeholder-textgrey text-white" : "placeholder-textgrey text-black"
              }`}
            />
          </Input>
          {errors.confirmAccountNumber && (
            <Text className="text-xs text-red">{errors.confirmAccountNumber.message}</Text>
          )}
        </>
      )}
    />
  </VStack>
</VStack>

     

      {/* Footer buttons */}
      <HStack className="p-4 space-x-4">
        <Button
          variant="outline"
          className={`flex-1 ${
            theme === "dark" ? "border-green" : "border-black"
          } cursor-pointer rounded-full mr-3`}
         
          onPress={() => navigation.goBack()}
        >
          <ButtonText  className={`text-xs ${
                  theme === "dark" ? "text-green" : "text-black"
                } sm:text-sm `}>Later</ButtonText>
        </Button>

       <Button
className={`flex-1 rounded-full cursor-pointer 
  ${
    theme === "dark"
      ? isValid
        ? "bg-green"
        : "bg-textgrey"
      : isValid
      ? "bg-black"
      : "bg-textgrey"
  } 
  ${isValid ? "opacity-100" : "opacity-70"}`}         onPress={handleSubmit(onSubmit)}
         disabled={!isValid}
       >
         <ButtonText
 className={`font-medium text-xs sm:text-sm 
  ${theme === "dark" ? "text-black" : "text-white"} 
  ${!isValid && "text-white"}`}         >
           Next
         </ButtonText>
       </Button>
      </HStack>
      </ScrollView>
    </Box>
  );
};

export default BankDetailsScreen;
