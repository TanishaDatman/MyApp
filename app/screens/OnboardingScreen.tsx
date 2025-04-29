// import React from 'react';
// import { ScrollView } from 'react-native';
// // import { customConfig } from '../theme';
// import { useNavigation } from '@react-navigation/native';
// import { Box, Button, ButtonText, GluestackUIProvider, HStack, Image, Text, VStack } from '@/components/ui';
// import { config } from '@gluestack-ui/config';
// import { Pressable } from '@gluestack-ui/themed';

// const OnboardingScreen = () => {

//     const navigation:any=useNavigation();

//   return (
//     <GluestackUIProvider>
//       <ScrollView contentContainerStyle={{ flexGrow: 1,  }} >
//         <Box className='flex-1 pt-8 p-6'>
//  <HStack className='flex-1 items-center justify-center mt-3'>
//                <Pressable onPress={() => navigation.goBack()}>
//                  <Image
//                    source={require('../../assets/images/arrow_forward.png')} // Make sure this image exists
//                    style={{ width: 20, height: 20, marginRight: 8 }}
//                    alt="back button"
//                  />
//                </Pressable>
//                <Text className='text-lg font-medium'>Onboarding</Text>
//              </HStack>
          
//           {/* Description */}
//           <Text className='mt-4 mb-6 xs:text-sx sm:text-sm md:text-md'>
//             Onboarding is an essential step to activate your account for accepting payments and receiving payouts.
//           </Text>
          
//        <Box className='flex-1 justify-center items-center' >
//        <Image

//   source={require('../../assets/images/frame.png')}
//   alt="Descriptive text"
//   className='mb-3 text-2xl flex-1 rounded-lg'
 
// />
//         </Box>  


//           <Text className='text-xl font-bold mb-4'>
//             What details are required?
//           </Text>
          
//           <Text className='text-md mb-4'>
//             To complete the onboarding process, you need to follow the steps below:
//           </Text>
          
//           {/* Steps List */}
//           <VStack className='mb-5'>
//             {[
//               'Select a business type',
//               'Share your business details',
//               'Provide the trading address',
//               'Fill in the owner details',
//               'Add your bank details',
//               'Upload documents to verify all of the above',
//               'Review all your details and submit'
//             ].map((step, index) => (
//               <HStack key={index} space="sm" className='text-center'>
//                 <Box className='p-1 rounded-full'>
//                   {/* <CheckIcon size="sm" color="$white" /> */}
//                 </Box>
//                 <Text className='text-sm'>{step}</Text>
//               </HStack>
//             ))}
//           </VStack>
          
//           {/* Buttons */}
//           <HStack space="md" className='flex-1 justify-between mt-3'>
//             <Button
//               variant="outline"
//               className='border-2 flex-1 border-borderLight400 rounded-full'
//               onPress={() => navigation.goBack()}
//             >
//               <ButtonText className='text-sm '>I'll do this later</ButtonText>
//             </Button>
            
//             <Button
//             className='flex-1 rounded-full '
//               onPress={() => navigation.navigate("Details")}
//             >
//               <ButtonText className='text-sm'>Continue</ButtonText>
//             </Button>
//           </HStack>
//         </Box>
//       </ScrollView>
//     </GluestackUIProvider>
//   );
// };

// export default OnboardingScreen;



// // const OnboardingScreen = () => {
// //     return(
// //       <Text>Onboarding</Text>
// //     )

// // }


// // export default OnboardingScreen;


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
          <HStack className="items-center mb-6">
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/images/arrow_forward.png')}
                className='h-4 w-7'
                alt="back button"
              />
            </Pressable>
            <Text className="text-lg font-semibold">Onboarding</Text>
          </HStack>

          {/* Image */}
          <Box className="items-center  mb-6">
            <Image
              source={require('../../assets/images/frame.png')}
              alt="Onboarding Graphic"
              className='h-44 w-full object-contain rounded-xl'
            />
          </Box>

          {/* Onboarding Description */}
          <Text className="text-xl font-bold mb-2">Onboarding</Text>
          <Text className="text-sm text-textgrey mb-4">
            Onboarding is an essential step to activate my Datman account for accepting payments and receiving payouts.
          </Text>

          {/* Required Details */}
          <Text className="text-md font-semibold mb-2">What details are required?</Text>
          <Text className="text-sm text-textgrey mb-4">
            To complete the onboarding process, I need to follow the steps below:
          </Text>

          <VStack space="sm" className="mb-8">
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
              className="flex-1 mr-2 border-2 border-gray-300 rounded-full"
              onPress={() => navigation.goBack()}
            >
              <ButtonText className="text-sm">I’ll do this later</ButtonText>
            </Button>

            <Button
              className="flex-1 ml-2  bg-black rounded-full"
              onPress={() => navigation.navigate('Details')}
            >
              <ButtonText className="text-sm text-white">Continue</ButtonText>
            </Button>
          </HStack>

        </Box>
      </ScrollView>
    </GluestackUIProvider>
  );
};

export default OnboardingScreen;
