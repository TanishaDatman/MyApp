import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, ButtonText, Image, Text, VStack } from '@/components/ui';
import { Center } from '@gluestack-ui/themed';

const CongoScreen = () => {
  const navigation: any = useNavigation();

  return (
    <Box className="flex-1 bg-white p-6">
      <Center className="flex-1">
        <VStack className="space-y-8 items-center">
          {/* Checkmark Image */}
          <Image
            source={require('../../assets/images/tick.png')}
            alt="Success checkmark"
            className="mb-4"
            style={{ height: 90, width: 110 }}
          />

          {/* Header */}
          <Text className="text-2xl font-bold text-center">
            It's done 😍 🎉
          </Text>

          {/* Description */}
          <Text className="text-base text-gray-500 text-center max-w-xs">
            Congratulations on completing the onboarding form! We will review your information shortly. Once approved, you can start trading smoothly using your Datman account.
          </Text>

          {/* Action Button */}
          <Button
            className="mt-8 rounded-full bg-black"
            onPress={() => navigation.navigate('HomeOnboard')}
          >
            <ButtonText className="text-white">Awesome!💪</ButtonText>
          </Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default CongoScreen;
