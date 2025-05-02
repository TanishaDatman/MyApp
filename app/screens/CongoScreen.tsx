import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, ButtonText, Image, Text, VStack } from '@/components/ui';
import { useThemeToggle } from '@/ThemeContext';

const CongoScreen = () => {
  const navigation: any = useNavigation();

  const {theme}=useThemeToggle()

  return (
    <Box className={` min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 ${
      theme === "dark" ? "bg-black" : "bg-white"
    }`}>
      <VStack className="space-y-6 sm:space-y-8 items-center w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        {/* Checkmark Image */}
        <Image
          source={require('../../assets/images/tick.png')}
          alt="Success checkmark"
          className='h-[90] w-[110]' 
        />

        {/* Header */}
        <Text className={`text-xl ${
            theme === "dark" ? "text-white" : "text-black"
          }  sm:text-2xl md:text-3xl font-bold text-center`}>
          It's done 😍 🎉
        </Text>

        {/* Description */}
        <Text className="text-sm sm:text-base md:text-lg text-gray-500 text-center px-2 sm:px-4">
          Congratulations on completing the onboarding form! We will review your information shortly. Once approved, you can start trading smoothly using your Datman account.
        </Text>

        {/* Action Button */}
        <Button
          className={`mt-6 sm:mt-8 cursor-pointer rounded-full ${
            theme === "dark" ? "bg-green" : "bg-black"
          } px-6 py-3`}
          onPress={() => navigation.navigate('HomeMain')}
        >
          <ButtonText className={`${
              theme === "dark" ? "text-black" : "text-white"
            } text-sm sm:text-lg`}>Awesome!💪</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

export default CongoScreen;
