import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { setBusinessContact } from '../store/features/business/businessSlice';
import { useDispatch } from 'react-redux';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Box, Button, ButtonText, HStack, Image, Input, InputField, Pressable, Text, VStack } from '@/components/ui';
import { useThemeToggle } from '@/ThemeContext';

// Zod schema remains unchanged
const businessContactSchema = z.object({
  email: z.string().nonempty('Email is required').email('Please enter a valid email address'),
  phone: z.string().nonempty('Phone number is required').regex(/^\d{10}$/, 'Please enter a valid phone number'),
  url: z.string().nonempty('Company URL is required').url('Please enter a valid URL'),
});

const ContactBusiness = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(businessContactSchema),
    defaultValues: {
      email: '',
      phone: '',
      url: '',
    },
    mode: 'onTouched',
  });

  const isNextEnabled = isValid;

  const onSubmit = (data: any) => {
    dispatch(setBusinessContact(data));
    navigation.navigate("AddressBusiness");
  };

  const {theme}=useThemeToggle()

  return (
    <GluestackUIProvider>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="bg-white flex-1 mt-2 pt-7 p-4">
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
                     <Text className="text-base sm:text-md font-semibold">Business Contact Details</Text>
                   </HStack> 

          <Text  className="text-md sm:text-lg font-bold mb-3 ">
            Business Contact details
          </Text>

          <Text className="text-[14px] sm:text-base mb-6">
            Onboarding is an essential step to activate my
            Datman account for accepting payments and
            receiving payouts.
          </Text>

          {/* Email Input */}
          <VStack className="space-y-1 mb-6">
            <Text className="text-sm font-medium">Email ID</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                variant='underlined'
                  className={`border-b mt-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <InputField
              
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Email ID"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </Input>
              )}
            />
            {errors.email && (
              <Text className="text-xs text-red mt-1">
                {errors.email.message}
              </Text>
            )}
          </VStack>

          {/* Phone Input */}
          <VStack className="space-y-1 mb-6">
            <Text className="text-sm font-medium">Phone number</Text>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                variant='underlined'

                  className={`border-b mt-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Phone number"
                    keyboardType="phone-pad"
                  />
                </Input>
              )}
            />
            {errors.phone && (
              <Text className="text-xs text-red mt-1">
                {errors.phone.message}
              </Text>
            )}
          </VStack>

          {/* URL Input */}
          <VStack className="space-y-1 mb-8">
            <Text className="text-sm font-medium">Company URL</Text>
            <Controller
              control={control}
              name="url"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                variant='underlined'
                  className={`border-b mt-2 ${errors.url ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Company URL"
                  />
                </Input>
              )}
            />
            {errors.url && (
              <Text className="text-xs text-red mt-1">
                {errors.url.message}
              </Text>
            )}
          </VStack>

          {/* Buttons */}
          <HStack className="flex-row justify-between space-x-4 mt-8">
            <Button
              className="flex-1 mr-3 cursor-pointer border border-gray-300 rounded-full"
              onPress={() => navigation.goBack()}
            >
              <ButtonText className="text-gray-700">Later</ButtonText>
            </Button>

            <Button
              className={`flex-1 cursor-pointer rounded-full ${isNextEnabled ? 'bg-black' : 'bg-gray-300'} ${!isNextEnabled ? 'opacity-70' : ''}`}
              onPress={handleSubmit(onSubmit)}
              disabled={!isNextEnabled}
            >
              <Text className={`font-medium ${isNextEnabled ? 'text-white' : 'text-gray-500'}`}>
                Next
              </Text>
            </Button>
          </HStack>
        </Box>
      </ScrollView>
    </GluestackUIProvider>
  );
};

export default ContactBusiness;
