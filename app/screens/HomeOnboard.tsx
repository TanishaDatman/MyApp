import React, { useState } from 'react';
import LottieView from 'lottie-react-native';

import {
  Box,
  Text,
  VStack,
  HStack,
  Progress,
  ProgressFilledTrack,
  Divider,
  ScrollView,
  Image,
  Icon,
  AlertCircleIcon,
  ImageBackground,
} from '@gluestack-ui/themed';
import { Pressable, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { AlertCircle } from 'lucide-react-native';

export default function HomeOnboard() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const actions = [
    {
      id: 'lastPayout',
      label: 'Last payout',
      icon: require('../assets/images/card_travel.png'),
    },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: require('../assets/images/notifications_unread.png'),
    },
    {
      id: 'callStatus',
      label: 'Call status',
      icon: require('../assets/images/perm_phone_msg.png'),
    },
    {
      id: 'recentPayments',
      label: 'Recent Payments',
      icon: require('../assets/images/credit_card_clock.png'),
    },
  ];

  const { width } = useWindowDimensions();

  const getItemsPerRow = () => {
    if (width < 768) return 2;
    if (width < 1024) return 3;
    return 4;
  };

  const itemsPerRow = getItemsPerRow();
  const boxWidth = `${100 / itemsPerRow - 2}%`; // string like "48%"

  return (
    <ScrollView bg="$white" marginTop="$5" bgColor="#F5F5F5" flex={1} p="$4">
      <HStack marginBottom="$7" alignItems="center" space="sm">
        <Image
          source={require('../assets/images/logo.png')}
          alt="John's Takeaway Logo"
          h="$8"
          w="$8"
          resizeMode="contain"
        />
        <Text $lg-fontSize="$2xl" $sm-fontSize="$lg" $md-fontSize="$xl" fontWeight="$bold">
          John's Takeaway
        </Text>
      </HStack>

      <VStack space="md">
        <Box p="$2" borderRadius="$md">
          <Text fontSize="$xl" letterSpacing="$lg" fontWeight="$700" color="$black">
            Hey John, 👋
          </Text>
          <Text fontSize="$lg" letterSpacing="$xl" marginTop="$1" color="$grey">
            Here's the latest update on your store.
          </Text>
        </Box>

       
        
<Pressable onPress={() => navigation.navigate('Onboarding')}>
  <Box 
    borderRadius="$lg" 
    overflow="hidden" 
    width="100%" 
    height={200}
    // marginLeft={} // Negative margin to compensate for parent padding
    marginRight={-16} // Negative margin to compensate for parent padding
  >
    <ImageBackground
      source={require('../assets/images/new.png')}
      resizeMode="cover"
      style={{ 
        flex: 1,
        width: '100%',
      }}
      imageStyle={{ 
        borderRadius: 16,
        width: '100%',
      }}
    >
       <Box p="$4" flex={1} justifyContent="space-between">
        <VStack space="sm">
          <Text fontSize="$lg" fontWeight="$bold" color="$black">
            Available balance
          </Text>
          <Box flexDirection="row">
  <Box height={50} width={70}>
    <LottieView
      source={require('../assets/lotty.json')}
      autoPlay
      loop
      style={{ height: '100%', width: '100%' }}
    />
  </Box>
 
  </Box>
        </VStack>
        <VStack space="xs">
  <HStack alignItems="center" space="xs">
    <Icon as={AlertCircleIcon} color="$black" size="sm" />
    <Text fontSize="$xs" color="$black" underline flexShrink={1}>
      Onboarding verification is pending and will be verified soon.
    </Text>
  </HStack>
</VStack>

      </Box>
    </ImageBackground>
  </Box>
</Pressable>


        <Divider my="$2" />

        <HStack flexWrap="wrap" justifyContent="space-between" px="$2">
          {actions.map((action) => (
            <Box key={action.id} mb="$2" px="$1" width="$1/2">
              <Pressable onPress={() => setActiveItem(activeItem === action.id ? null : action.id)}>
                <Box
                  bg="$white"
                  p="$3"
                  borderRadius="$md"
                  alignItems="center"
                  justifyContent="space-between"
                  borderWidth={1}
                  borderColor={activeItem === action.id ? '$brandSecondary' : 'transparent'}
                  height={100}
                >
                  <Box
                    bg={activeItem === action.id ? '$warningLight' : 'white'}
                    p="$2"
                    borderRadius="$full"
                    mb="$2"
                  >
                    <Image
                      source={action.icon}
                      alt={action.label}
                      width={24}
                      height={24}
                      resizeMode="contain"
                      style={{
                        tintColor: activeItem === action.id ? '#F59E0B' : '#A3A3A3', // fallback color
                      }}
                    />
                  </Box>
                  <Text
                    fontSize="$sm"
                    fontWeight={activeItem === action.id ? '$bold' : '$normal'}
                    color={activeItem === action.id ? '$brandSecondary' : '$textPrimary'}
                    textAlign="center"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {action.label}
                  </Text>
                </Box>
              </Pressable>
            </Box>
          ))}
        </HStack>
      </VStack>
    </ScrollView>
  );
}
