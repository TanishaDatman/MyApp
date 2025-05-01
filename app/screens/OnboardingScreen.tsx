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

const OnboardingScreen = () => {
  const navigation: any = useNavigation();

  return (
    <GluestackUIProvider>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 p-6 pt-7 bg-white">

          {/* Header */}
          <HStack className="items-center mb-4 sm:mb-6">
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/images/arrow_forward.png')}
                className='h-4 w-7'
                alt="back button"
              />
            </Pressable>
            <Text className="text-md xs:text-base sm:text-md font-semibold">Onboarding</Text>
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
          <Text className="text-md sm:text-lg font-bold mb-2">Onboarding</Text>
          <Text className="text-sm sm:text-base text-textgrey mb-4">
            Onboarding is an essential step to activate my Datman account for accepting payments and receiving payouts.
          </Text>

          {/* Required Details */}
          <Text className="text-md sm:text-lg xl:text-xl font-semibold mb-2">What details are required?</Text>
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
                <Text className="text-sm text-black">• {step}</Text>
              </HStack>
            ))}
          </VStack>

          {/* Buttons */}
          <HStack space="md" className="justify-between">
            <Button
              variant="outline"
              className="flex-1 mr-2 border-2 cursor-pointer border-gray-300 rounded-full"
              onPress={() => navigation.goBack()}
            >
              <ButtonText className="text-xs sm:text-sm ">I’ll do this later</ButtonText>
            </Button>

            <Button
              className="flex-1 ml-2 cursor-pointer bg-black rounded-full"
              onPress={() => navigation.navigate('Details')}
            >
              <ButtonText className="text-xs sm:text-sm text-white">Continue</ButtonText>
            </Button>
          </HStack>

        </Box>
      </ScrollView>
    </GluestackUIProvider>
  );
};

export default OnboardingScreen;
