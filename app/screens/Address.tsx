import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setAddressDetails } from '../store/features/owner/ownerSlice';

import { Box, Button, HStack, Image, Input, InputField, Pressable, Select, SelectBackdrop, SelectContent, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text, VStack } from '@/components/ui';

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

  return (
    <Box className="flex-1 px-4 pt-6 rounded-t-3xl">
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        {/* Header */}
        <HStack className="items-center mb-6">
                   <Pressable onPress={() => navigation.goBack()}>
                     <Image
                       source={require('../../assets/images/arrow_forward.png')}
                       className='h-4 w-7'
                       alt="back button"
                     /> 
                   </Pressable>
                   <Text className="text-lg font-semibold">Owner Address</Text>
                 </HStack>

        {/* Title & Description */}
        <Text className="text-2xl font-bold mb-2">Owner address</Text>
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
      className="border-0 border-b-[1px] border-gray-300 rounded-none px-0 min-h-[40px] bg-transparent"
      style={{
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#D1D5DB', // same as Tailwind's gray-300
        borderRadius: 0,
      }}
    >
              <SelectInput variant='underlined' placeholder="Country" />
              <SelectIcon />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent className='bg-lightgrey'>
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
          className="flex-1 border-black rounded-full mr-2"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-black">Later</Text>
        </Button>
        <Button
          className={`flex-1 rounded-full ${
            isNextEnabled ? 'bg-black' : 'bg-gray-300'
          }`}
          onPress={handleNext}
          disabled={!isNextEnabled}
        >
          <Text className={`font-medium ${isNextEnabled ? 'text-white' : 'text-gray-500'}`}>Next</Text>
        </Button>
      </HStack>
    </Box>
  );
}



