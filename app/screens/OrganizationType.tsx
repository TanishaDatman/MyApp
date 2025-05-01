import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { setBusinessType } from "../store/features/business/businessSlice";
import { useDispatch } from 'react-redux';
import { Box, Button, HStack, Image, Pressable, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, Text, VStack } from '@/components/ui';
import { CircleIcon } from 'lucide-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeToggle } from '@/ThemeContext';
import { organisationOptions } from '../utils/constants';



const OrganisationType = () => {
  const [selectedValue, setSelectedValue] = useState('private');
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(setBusinessType(selectedValue));
    navigation.navigate("Company");
  };

  const {theme}=useThemeToggle()

  return (
    <Box className="flex-1 p-3 md:p-5 mt-2 bg-white">
      <VStack className="space-y-6">
                 <HStack className="items-center mb-6 md:mb-4">
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
                   <Text className="text-md xs:text-base sm:text-md font-semibold">Business Details</Text>
                 </HStack>

        <Text className="text-md sm:text-lg font-bold ">Choose your organisation type</Text>

        <Text className="text-sm text-gray-500">
          This helps us determine the documents required to activate your account.
        </Text>

        <RadioGroup
  value={selectedValue}
  onChange={setSelectedValue}
  className="mt-2 mb-5 space-y-4"
>
  {organisationOptions.map((option) => (
    <Radio
      key={option.value}
      value={option.value}
      aria-label={option.label}
      className="flex-row items-center p-1"
    >
      <MaterialIcons
        name={
          selectedValue === option.value
            ? 'radio-button-checked'
            : 'radio-button-unchecked'
        }
        size={22}
        color={selectedValue === option.value ? '#16a34a' : '#9ca3af'} // green-600 or gray-400
        style={{ marginRight: 8 }}
      />
      <RadioLabel className="text-[14px] sm:text-base ">{option.label}</RadioLabel>
    </Radio>
  ))}
</RadioGroup>


      </VStack>

      <HStack className="flex-row space-x-4 mt-8 justify-between">
        <Button
          variant="outline"
          className="flex-1 border cursor-pointer border-black mr-3 rounded-full"
          onPress={() => navigation.goBack()}
        >
          <Text className="font-medium text-black">Later</Text>
        </Button>
        <Button
          className="flex-1 bg-black cursor-pointer rounded-full"
          onPress={onSubmit}
        >
          <Text className="font-medium text-white">Next</Text>
        </Button>
      </HStack>
    </Box>
  );
};

export default OrganisationType;
