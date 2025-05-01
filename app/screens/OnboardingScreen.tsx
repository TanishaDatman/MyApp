import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Image,
  Text,
  VStack,
  GluestackUIProvider,
  Pressable
} from '@/components/ui';
import { config } from '@gluestack-ui/config';
import { useThemeToggle } from '@/ThemeContext';

const OnboardingScreen = () => {
  const navigation: any = useNavigation();

  const {theme}=useThemeToggle()

  return (
    <GluestackUIProvider>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className={`flex-1 ${
    theme === "dark" ? "bg-black" : "bg-white"
  } p-6 pt-7`}>

          {/* Header */}
          <HStack className="items-center mb-4 sm:mb-6">
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
            <Text className={`text-md xs:text-base sm:text-md ${
    theme === "dark" ? "text-white" : "text-black"} font-semibold`}>Onboarding</Text>
          </HStack>

          {/* Image */}
          <Box className="items-center mb-4  sm:mb-6">
            <Image
              source={require('../../assets/images/frame.png')}
              alt="Onboarding Graphic"
              className='h-[30vh] w-full object-contain rounded-xl'
            />
          </Box>

          {/* Onboarding Description */}
          <Text className={`text-md sm:text-lg ${
    theme === "dark" ? "text-white" : "text-black"} font-bold mb-2`}>Onboarding</Text>
          <Text className="text-sm sm:text-base text-textgrey mb-4">
            Onboarding is an essential step to activate my Datman account for accepting payments and receiving payouts.
          </Text>

          {/* Required Details */}
          <Text className={`text-md ${
    theme === "dark" ? "text-white" : "text-black"} sm:text-lg xl:text-xl font-semibold mb-2`}>What details are required?</Text>
          <Text className="text-sm sm:text-base text-textgrey mb-4">
            To complete the onboarding process, I need to follow the steps below:
          </Text>

          <VStack space="sm" className="sm:mb-8 mb-5 text-base sm:text-md">
            {[
              'Select a business type',
              'Share my business details',
              'Provide the trading address',
              'Fill in the owner details',
              'Add bank details',
              'Upload documents to verify all of the above',
              'Review before I submit',
            ].map((step, idx) => (
              <HStack key={idx} className="items-start">
                <Text className={`text-sm ${
    theme === "dark" ? "text-white" : "text-black"} `}>• {step}</Text>
              </HStack>
            ))}
          </VStack>

          {/* Buttons */}
          <HStack space="md" className="justify-between">
            <Button
              variant="outline"
              className={`flex-1 mr-2 ${
    theme === "dark" ? "border-green" : "border-black"}  border-2 cursor-pointer  rounded-full`}
              onPress={() => navigation.goBack()}
            >
              <ButtonText className={`text-xs ${
    theme === "dark" ? "text-green" : "text-black"} sm:text-sm `}>I’ll do this later</ButtonText>
            </Button>

            <Button
              className={`flex-1 ml-2 ${
    theme === "dark" ? "bg-green" : "bg-black"}  cursor-pointer rounded-full`}
              onPress={() => navigation.navigate('Details')}
            >
              <ButtonText className={`text-xs sm:text-sm ${
    theme === "dark" ? "text-black" : "text-white"}`}>Continue</ButtonText>
            </Button>
          </HStack>

        </Box>
      </ScrollView>
    </GluestackUIProvider>
  );
};

export default OnboardingScreen;
