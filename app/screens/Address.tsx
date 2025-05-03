import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setAddressDetails } from '../store/features/owner/ownerSlice';

import { Box, Button, HStack, Image, Input, InputField, Pressable, Select, SelectBackdrop, SelectContent, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text, VStack } from '@/components/ui';
import { useThemeToggle } from '@/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Address() {
  const navigation:any = useNavigation();
  const dispatch = useDispatch();

  const fields = ['Post code', 'House no.', 'Street', 'Town/City', 'County'];
  const countries = ['UK', 'USA', 'Mexico', 'Canada', 'Australia', 'Ireland'];

  const address = useSelector((state:any) => state.owner.address);

  const [country, setCountry] = useState(address?.country || '');
  const [postCode, setPostCode] = useState(address?.postCode || '');
  const [houseNo, setHouseNo] = useState(address?.houseNo || '');
  const [street, setStreet] = useState(address?.street || '');
  const [town, setTown] = useState(address?.town || '');
  const [county, setCounty] = useState(address?.county || '');

  useEffect(() => {
    if (address) {
      setCountry(address.country);
      setPostCode(address.postCode);
      setHouseNo(address.houseNo);
      setStreet(address.street);
      setTown(address.town);
      setCounty(address.county);
    }
  }, [address]);

  const isNextEnabled =
    country &&
    postCode &&
    houseNo &&
    street &&
    town &&
    county;

  const handleNext = () => {
    if (!isNextEnabled) return;

    const addressDetails = {
      postCode,
      houseNo,
      street,
      city: town,
      county,
      country,
    };

    dispatch(setAddressDetails(addressDetails));
    console.log('Submitted Address Details:', addressDetails);

    navigation.navigate('Documents');
  };

  const {t}=useTranslation()

  const {theme}=useThemeToggle()

  return (
    <Box className="flex-1 px-4 pt-6 rounded-t-3xl">
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
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
                   <Text className={`text-lg ${
                theme === "dark" ? "text-white" : "text-black"
              } font-semibold`}>Owner Address</Text>
                 </HStack>

        {/* Title & Description */}
        <Text className={`text-2xl ${
                theme === "dark" ? "text-white" : "text-black"
              } font-bold mb-2`}>Owner address</Text>
        <Text className="text-sm text-gray-500 mb-6">
          Onboarding is an essential step to activate my Datman account for accepting payments and receiving payouts.
        </Text>

        {/* Input Fields */}
        <VStack className="space-y-4 mb-6">
  {fields.map((label, index) => (
    <Box key={index} className="border-b mb-3 border-gray-300">
      <Input
        variant="underlined" // prevents any default box styling
        className="text-base text-black px-0 py-2 border-b-[1px] border-gray-300"
      >
        <InputField
          className={`${
            theme === "dark" ? "text-white" : "text-black"
          }`}
          placeholder={label}
          placeholderTextColor="#888"
          value={
            label === 'Post code'
              ? postCode
              : label === 'House no.'
              ? houseNo
              : label === 'Street'
              ? street
              : label === 'Town/City'
              ? town
              : label === 'County'
              ? county
              : ''
          }
          onChangeText={(text: any) => {
            if (label === 'Post code') setPostCode(text);
            if (label === 'House no.') setHouseNo(text);
            if (label === 'Street') setStreet(text);
            if (label === 'Town/City') setTown(text);
            if (label === 'County') setCounty(text);
          }}
        />
      </Input>
    </Box>
  ))}
</VStack>


        {/* Country Dropdown */}
        <Box className="pb-2">
          <Select selectedValue={country} onValueChange={(value) => setCountry(value)}>
          <SelectTrigger
          variant="underlined"
          className={`min-h-[40px] border-b ${
            theme === "dark" ? "border-textgrey" : ""
          }`}
        >
          <SelectInput
            placeholder="Country"
            placeholderTextColor={theme === 'dark' ? '#A0A0A0' : '#6B7280'}
            className={`text-sm ${
              theme === "dark" ? "placeholder-textgrey text-white" : "placeholder-textgrey text-black"
            }`}
          />
              <SelectIcon />
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
      {/* </ScrollView> */}

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



