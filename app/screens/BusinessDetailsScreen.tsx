// import React, { useState } from 'react';
// import { CheckCircle, Home, Store, Users, Grid } from 'lucide-react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { setwhatbusiness } from '../store/features/business/businessSlice';
// import { Box, Button, HStack, Icon, Image, Pressable, Text, VStack } from '@/components/ui';
// import { ScrollView } from '@gluestack-ui/themed';

// const businessOptions = [
//   {
//     id: 'sole_trader',
//     icon: require('../assets/images/location_away.png'),
//     label: 'Sole Trader',
//     description: 'A self-employed individual running a business.',
//   },
//   {
//     id: 'limited_llp',
//     icon: require('../assets/images/storefront.png'),

//     label: 'Limited/LLP',
//     description: 'A registered company with limited liability protection.',
//   },
//   {
//     id: 'partnership',
//     label: 'Partnership',
//     description: 'A business owned and operated by two or more individuals.',
//     icon: require('../assets/images/handshake.png'),
//   },
//   {
//     id: 'others',
//     label: 'Others',
//     description: 'Any business type that doesn’t fall into the above categories.',
//     icon: require('../assets/images/domain.png'),
//   },
// ];




// const BusinessDetailsScreen = () => {
//   const [selected, setSelected] = useState<string>('limited_llp');
//   const navigation:any=useNavigation()
//   const dispatch = useDispatch();

//   const onSubmit = (data: any) => {
//     dispatch(setwhatbusiness(selected));
//       navigation.navigate("Organization");
//     };

//   return (
    
//     <VStack flex={1} px="$4" py="$6" bg="$backgroundLight0" space="lg">
//       <ScrollView>
//         <HStack alignItems="center" mt="$3" mb="$3">
//                 <Pressable onPress={() => navigation.goBack()}>
//                   <Image
//                     source={require('../assets/images/arrow_forward.png')} // Make sure this image exists
//                     style={{ width: 20, height: 20, marginRight: 8 }}
//                     alt="back button"
//                   />
//                 </Pressable>
//                 <Text fontSize="$lg" fontWeight="$medium">Business Details</Text>
//               </HStack>
//       <Text fontSize="$xl" fontWeight="$bold">Which best describes your business?</Text>
//       <Text color="$textLight500" fontSize="$sm">
//         This helps us determine the documents required to activate your account and process payouts smoothly.
//       </Text>

//       <VStack space="md" mt="$4">
//       {businessOptions.map((option) => (
//   <Pressable
//     key={option.id}
//     onPress={() => setSelected(option.id)}
//   >
//     <Box
//       borderWidth={1}
//       borderColor={selected === option.id ? '$green' : '$borderLight200'}
//       bg="$white"
//       rounded="$lg"
//       p="$4"
//       flexDirection="row"
//       justifyContent="space-between"
//       alignItems="center"
//     >
//       <HStack space="md" alignItems="center" flexShrink={1}>
//         <Image
//           source={option.icon}
//           style={{
//             width: 32, 
//             height: 32,
//             resizeMode: 'contain',
//           }}
//           alt={`${option.label} icon`}
//         />
//         <VStack flexShrink={1}>
//           <Text fontWeight="$medium">{option.label}</Text>
//           <Text fontSize="$sm" color="$textLight500" flexShrink={1}>
//             {option.description}
//           </Text>
//         </VStack>
//       </HStack>
//       {selected === option.id && (
//         <Icon
//           as={CheckCircle}
//           color="$green"
//           size="md" 
//           style={{ marginLeft: 8 }}
//         />
//       )}
//     </Box>
//   </Pressable>
// ))}

//       </VStack>
//       <HStack space="md" mt="$8" justifyContent="space-between">
//                 <Button
//                   variant="outline"
//                   flex={1}
//                   borderRadius="$full"
//                   borderColor="$black"
//                   onPress={() => navigation.goBack()}
//                 >
//                   <Text fontWeight="$medium" color="$black">Later</Text>
//                 </Button>
//                 <Button
//                   flex={1}
//                   bg="$black"
//                   borderRadius="$full"
//                   // onPress={() => navigation.navigate("Organization")}
//                   onPress={onSubmit}

//                 >
//                   <Text fontWeight="$medium" color="$white">Next</Text>
//                 </Button>
//               </HStack>
//               </ScrollView>
//     </VStack>

//   );
// };

// export default BusinessDetailsScreen;



import React, { useState } from 'react';
import { CheckCircle, Home, Store, Users, Grid } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setwhatbusiness } from '../store/features/business/businessSlice';
import { Box, Button, HStack, Icon, Image, Pressable, Text, VStack } from '@/components/ui';
import { ScrollView } from '@gluestack-ui/themed';

const businessOptions = [
  {
    id: 'sole_trader',
    icon: require('../../assets/images/location_away.png'),
    label: 'Sole Trader',
    description: 'A self-employed individual running a business.',
  },
  {
    id: 'limited_llp',
    icon: require('../../assets/images/storefront.png'),
    label: 'Limited/LLP',
    description: 'A registered company with limited liability protection.',
  },
  {
    id: 'partnership',
    label: 'Partnership',
    description: 'A business owned and operated by two or more individuals.',
    icon: require('../../assets/images/handshake.png'),
  },
  {
    id: 'others',
    label: 'Others',
    description: 'Any business type that doesn’t fall into the above categories.',
    icon: require('../../assets/images/domain.png'),
  },
];

const BusinessDetailsScreen = () => {
  const [selected, setSelected] = useState<string>('limited_llp');
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(setwhatbusiness(selected));
    navigation.navigate("Organization");
  };

  return (
    <VStack className="flex-1 px-4 py-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <HStack className="items-center mb-6">
                   <Pressable onPress={() => navigation.goBack()}>
                     <Image
                       source={require('../../assets/images/arrow_forward.png')}
                       className='h-4 w-7'
                       alt="back button"
                     />
                   </Pressable>
                   <Text className="text-lg font-semibold">Business Details</Text>
                 </HStack>

        {/* Title */}
        <Text className="text-xl font-bold">Which best describes your business?</Text>
        <Text className="text-sm text-gray-500">
          This helps us determine the documents required to activate your account and process payouts smoothly.
        </Text>

        {/* Options */}
        <VStack className="space-y-4 mt-4">
          {businessOptions.map((option) => (
            <Pressable key={option.id} onPress={() => setSelected(option.id)}>
              <Box
                className={`flex-row items-center mb-4 justify-between p-4 rounded-lg border ${
                  selected === option.id ? 'border-green-500' : 'border-gray-300'
                } bg-white`}
              >
                <HStack className="space-x-3 items-center flex-shrink">
                  <Image
                    source={option.icon}
                    alt={`${option.label} icon`}
                    className="w-7 h-7 mr-3" // Tailwind units, adjust as needed

                  />
                  <VStack className="flex-shrink">
                    <Text className="font-medium">{option.label}</Text>
                    <Text className="text-sm text-gray-500">{option.description}</Text>
                  </VStack>
                </HStack>
                {selected === option.id && (
                  <Icon
                    as={CheckCircle}
                    color="#22c55e"
                    size="md"
                    style={{ marginLeft: 8 }}
                  />
                )}
              </Box>
            </Pressable>
          ))}
        </VStack>

        {/* Footer Buttons */}
        <HStack className="space-x-4 mt-8 justify-between">
          <Button
            variant="outline"
            className="flex-1 border mr-3 border-black rounded-full"
            onPress={() => navigation.goBack()}
          >
            <Text className="font-medium text-black">Later</Text>
          </Button>
          <Button
            className="flex-1 rounded-full bg-black"
            onPress={onSubmit}
          >
            <Text className="font-medium text-white">Next</Text>
          </Button>
        </HStack>
      </ScrollView>
    </VStack>
  );
};

export default BusinessDetailsScreen;
