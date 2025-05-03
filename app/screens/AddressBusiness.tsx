import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectItem, ChevronDownIcon } from '@gluestack-ui/themed';
import { setBusinessAddress } from '../store/features/business/businessSlice';
import { useDispatch } from 'react-redux';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Input, InputField } from '@/components/ui/input';
import { Select, SelectIcon } from '@/components/ui/select';
import { Button, ButtonText } from '@/components/ui/button';
import { useThemeToggle } from '@/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function AddressBusiness() {
  const navigation: any = useNavigation();

  const [country, setCountry] = useState('');
  const [postCode, setPostCode] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [town, setTown] = useState('');
  const [county, setCounty] = useState('');

  const countries = ['UK', 'USA', 'Mexico', 'Canada', 'Australia', 'Ireland'];

  const fields = [
    { 
      label: 'Post code',
      value: postCode,
      onChange: setPostCode 
    },
    { 
      label: 'Address Line 1',
      value: address1,
      onChange: setAddress1 
    },
    { 
      label: 'Address Line 2',
      value: address2,
      onChange: setAddress2 
    },
    { 
      label: 'Town/City',
      value: town,
      onChange: setTown 
    },
    { 
      label: 'County',
      value: county,
      onChange: setCounty 
    },
  ];

  const isNextEnabled = postCode && 
                       address1 && 
                       town && 
                       county && 
                       country;

  const dispatch = useDispatch();

  const handleNext = () => {
    if (!isNextEnabled) return;
    
    const formData = {
      postCode,
      address1,
      address2,
      town,
      county,
      country
    };
    dispatch(setBusinessAddress(formData));
    navigation.navigate('DocumentsBusiness');
  };

  const {t}=useTranslation()

  const {theme}=useThemeToggle()

  return (
    <Box className="flex-1 px-4 pt-3rounded-t-3xl">
      <HStack className="items-center mt-5 mb-6">
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
        <Text className={`text-base ${
                theme === "dark" ? "text-white" : "text-black"
              } sm:text-md font-semibold`}>Business Address</Text>
      </HStack>

      <Text className={`text-md ${
                theme === "dark" ? "text-white" : "text-black"
              } sm:text-lg font-bold mb-3`}>Business address</Text>
      <Text className="text-sm text-[#888888] mb-6">
        Onboarding is an essential step to activate my Datman account for accepting payments and receiving payouts.
      </Text>

      <VStack space="md" className="mb-6">
  {fields.map((field, index) => (
    <Box key={index} className="pb-2">
      <Input variant="underlined" style={{ paddingVertical: 8 }} className="border-b-[1px] border-gray-300 px-0">
        <InputField
          className={`${theme === "dark" ? "text-white" : "text-black"}`}
          placeholder={field.label}
          placeholderTextColor="#888"
          value={field.value}
          onChangeText={field.onChange}
        />
      </Input>
    </Box>
  ))}

  {/* Country Dropdown */}
  <Box className="pb-2">
    <Select selectedValue={country} onValueChange={(value) => setCountry(value)}>
      <SelectTrigger
        variant="underlined"
        className={`border-0 border-b px-0 min-h-[40px] rounded-none bg-transparent focus:outline-none 
        ${theme === "dark" ? "border-textgrey" : "border-gray-300"}`}
      >
        <SelectInput
          placeholder="Country"
          className={`text-sm ${theme === "dark" ? "text-white" : "text-black"}`}
        />
        {/* <SelectIcon as={ChevronDownIcon} /> */}
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent className={` ${
    theme === "dark" ? "bg-gray-600" : "bg-lightgrey"}`}>
                {countries.map((name) => (
                  <SelectItem key={name} label={name} value={name} />
                ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  </Box>
</VStack>


     <HStack className="space-x-4 justify-between mt-auto mb-4">
             <Button
               variant="outline"
               className={`flex-1 mr-2 ${
                 theme === "dark" ? "border-green" : "border-black"}  border-2 cursor-pointer  rounded-full`}
               onPress={() => navigation.goBack()}
             >
               <Text className={`text-xs ${
         theme === "dark" ? "text-green" : "text-black"} sm:text-sm `}>{t('later')}</Text>
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
               onPress={handleNext}
               disabled={!isNextEnabled}
             >
               <Text className={`font-medium text-xs sm:text-sm 
           ${theme === "dark" ? "text-black" : "text-white"} 
           ${!isNextEnabled && "text-white"}`}>{t('next')}</Text>
             </Button>
           </HStack>
    </Box>
  );
}
