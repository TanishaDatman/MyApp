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

  return (
    <Box className="flex-1 px-4 pt-6 rounded-t-3xl">
      <HStack className="items-center mt-3 mb-6">
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/arrow_forward.png')}
            className="w-5 h-5 mr-2"
            alt="back button"
          />
        </Pressable>
        <Text className="text-lg font-medium">Business Address</Text>
      </HStack>

      <Text className="text-2xl font-bold mb-2">Business address</Text>
      <Text className="text-sm text-[#888888] mb-6">
        Onboarding is an essential step to activate my Datman account for accepting payments and receiving payouts.
      </Text>

      <VStack space="md" className='mb-6'>
  {fields.map((field, index) => (
    <Box key={index} className='pb-2'>
      <Input variant="underlined" style={{ paddingVertical: 8 }}>
        <InputField
          placeholder={field.label}
          placeholderTextColor="#888"
          value={field.value}
          onChangeText={field.onChange}
        />
      </Input>
    </Box>
  ))}

        
<Box className='pb-2'>
  <Select
    selectedValue={country}
    onValueChange={(value) => setCountry(value)}
  >
    <SelectTrigger
      borderBottomWidth={1}
      borderColor="$borderLight300"
      borderWidth={0}
      borderRadius={0}
      px={0}
    >
      <SelectInput placeholder="Country" />
      {/* <SelectIcon as={ChevronDownIcon} /> */}
    </SelectTrigger>
    <SelectPortal>
      <SelectBackdrop />
      <SelectContent>
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
          className="flex-1 rounded-full border-black mr-2"
          onPress={() => navigation.goBack()}
        >
          <ButtonText className="text-black">Later</ButtonText>
        </Button>
        
        <Button
          className={`flex-1 rounded-full ${isNextEnabled ? 'bg-black' : 'bg-gray-300'}`}
          onPress={handleNext}
          isDisabled={!isNextEnabled}
        >
          <ButtonText className={`${isNextEnabled ? 'text-white' : 'text-gray-500'}`}>Next</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
}
