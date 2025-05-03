import React, { useState } from 'react';
import { CheckCircle, Home, Store, Users, Grid, CheckCircle2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setwhatbusiness } from '../store/features/business/businessSlice';
import { Box, Button, ButtonText, HStack, Icon, Image, Pressable, Text, VStack } from '@/components/ui';
import { ScrollView } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeToggle } from '@/ThemeContext';
import { businessOptions } from '../utils/constants';
import { useTranslation } from 'react-i18next';


const BusinessDetailsScreen = () => {
  const [selected, setSelected] = useState<string>('limited_llp');
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(setwhatbusiness(selected));
    navigation.navigate("Organization");
  };


  const {t}=useTranslation()

  const {theme}=useThemeToggle()

  return (
    <VStack className="flex-1 px-4 py-6">
      <ScrollView showsVerticalScrollIndicator={false}>
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
                   <Text className={`text-md ${
      theme === "dark" ? "text-white" : "text-black"} xs:text-base sm:text-md font-semibold`}>Business Details</Text>
                 </HStack>

        {/* Title */}
        <Text className={`text-base  ${
      theme === "dark" ? "text-white" : "text-black"} mb-2 sm:text-md md:text-lg font-bold`}>Which best describes your business?</Text>
        <Text className="text-sm text-gray-500">
          This helps us determine the documents required to activate your account and process payouts smoothly.
        </Text>

        {/* Options */}
        <VStack className="space-y-4 mt-4">
  {businessOptions.map((option) => (
    <Pressable key={option.id} onPress={() => setSelected(option.id)}>
      <Box
        className={`flex-row items-center mb-4 justify-between p-4 rounded-lg border-2 
          ${theme === "dark" ? "bg-black border-textgrey" : "bg-white border-textgrey"} 
          ${selected === option.id ? "border-green" : ""}`}
      >
        <HStack className="space-x-3 items-center flex-shrink">
          <Image
            source={
              theme==="dark" ? option.icond : option.iconl
            }
            alt={`${option.label} icon`}
            className="w-7 h-7 mr-3"
            style={{
              tintColor: theme === "dark" ? "#FFFFFF" : "#000000",}}
          />
          <VStack className="flex-shrink">
            <Text className={`${theme === "dark" ? "text-white" : "text-black"} md:font-medium font-base`}>
              {option.label}
            </Text>
            <Text className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              {option.description}
            </Text>
          </VStack>
        </HStack>
        {selected === option.id && (
          <MaterialIcons name="check-circle" size={22} color="#22c55e" />
        )}
      </Box>
    </Pressable>
  ))}
</VStack>


        {/* Footer Buttons */}
        <HStack space="md" className="mt-5 justify-between">
            <Button
              variant="outline"
              className={`flex-1 mr-2 ${
    theme === "dark" ? "border-green" : "border-black"}  border-2 cursor-pointer  rounded-full`}
              onPress={() => navigation.goBack()}
            >
              <ButtonText className={`text-xs ${
    theme === "dark" ? "text-green" : "text-black"} sm:text-sm `}>{t('later')}</ButtonText>
            </Button>

            <Button
              className={`flex-1 ml-2 ${
    theme === "dark" ? "bg-green" : "bg-black"}  cursor-pointer rounded-full`}
              onPress={onSubmit}
            >
              <ButtonText className={`text-xs sm:text-sm ${
    theme === "dark" ? "text-black" : "text-white"}`}>{t('next')}</ButtonText>
            </Button>
          </HStack>
      </ScrollView>
    </VStack>
  );
};

export default BusinessDetailsScreen;
