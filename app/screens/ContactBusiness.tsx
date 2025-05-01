// import React, { useState } from 'react';
// import { ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useForm, Controller } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { setBusinessContact } from '../store/features/business/businessSlice';
// import { useDispatch } from 'react-redux';
// import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
// import { Box, Button, ButtonText, HStack, Image, Input, InputField, Pressable, Text, VStack } from '@/components/ui';

// // Define Zod schema for validation
// const businessContactSchema = z.object({
//   email: z
//     .string()
//     .nonempty('Email is required')
//     .email('Please enter a valid email address'),
//   phone: z
//     .string()
//     .nonempty('Phone number is required')
//     .regex(/^\d{10}$/, 'Please enter a valid phone number'),
//   url: z
//     .string()
//     .nonempty('Company URL is required')
//     .url('Please enter a valid URL'),
// });

// const ContactBusiness = () => {
//   const navigation: any = useNavigation();

//   // Initialize react-hook-form with Zod resolver
//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isValid },
//     reset,
//   } = useForm({
//     resolver: zodResolver(businessContactSchema),
//     defaultValues: {
//       email: '',
//       phone: '',
//       url: '',
//     },
//     mode: 'onTouched', // Validate on blur and change for better UX
//   });

//   // Check if the form is valid
//   const isNextEnabled = isValid;

//   const dispatch=useDispatch()

//   // Handle form submission
//   // const onSubmit = (data: any) => {
//   //   // console.log('Submitted Business Contact Details:', data);
//   //   navigation.navigate('AddressBusiness');
//   // };

//   const onSubmit = (data: any) => {
//       dispatch(setBusinessContact(data));
//         navigation.navigate("AddressBusiness");
//       };
  

//   return (
//     <GluestackUIProvider>
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <Box bg="$white" flex={1} pt="$7" p="$4">
//           <HStack alignItems="center" mt="$3" mb="$6">
//             <Pressable onPress={() => navigation.goBack()}>
//               <Image
//                 source={require('../assets/images/arrow_forward.png')}
//                 style={{ width: 20, height: 20, marginRight: 8 }}
//                 alt="back button"
//               />
//             </Pressable>
//             <Text fontSize="$lg" fontWeight="$medium">Business Contact Details</Text>
//           </HStack>

//           {/* Title */}
//           <Text fontSize="$xl" fontWeight="$bold" mb="$3">
//             Business Contact details
//           </Text>

//           {/* Description */}
//           <Text fontSize="$md" mb="$6">
//             Onboarding is an essential step to activate my
//             Datman account for accepting payments and
//             receiving payouts.
//           </Text>

//           {/* Email Input */}
//           <VStack space="sm" mb="$6">
//             <Text fontSize="$sm" fontWeight="$medium">Email ID</Text>
//             <Controller
//               control={control}
//               name="email"
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <Input 
//                   variant="underlined" 
//                   size="md" 
//                   borderColor={errors.email ? '$red500' : '$borderLight300'}
//                 >
//                   <InputField
//                     value={value}
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                     placeholder="Email ID"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                   />
//                 </Input>
//               )}
//             />
//             {errors.email && (
//               <Text fontSize="$xs" color="$red500" mt="$1">
//                 {errors.email.message}
//               </Text>
//             )}
//           </VStack>

//           {/* Phone Number Input */}
//           <VStack space="sm" mb="$6">
//             <Text fontSize="$sm" fontWeight="$medium">Phone number</Text>
//             <Controller
//               control={control}
//               name="phone"
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <Input 
//                   variant="underlined" 
//                   size="md" 
//                   borderColor={errors.phone ? '$red500' : '$borderLight300'}
//                 >
//                   <InputField
//                     value={value}
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                     placeholder="Phone number"
//                     keyboardType="phone-pad"
//                   />
//                 </Input>
//               )}
//             />
//             {errors.phone && (
//               <Text fontSize="$xs" color="$red500" mt="$1">
//                 {errors.phone.message}
//               </Text>
//             )}
//           </VStack>

//           {/* URL Input */}
//           <VStack space="sm" mb="$8">
//             <Text fontSize="$sm" fontWeight="$medium">Company URL</Text>
//             <Controller
//               control={control}
//               name="url"
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <Input 
//                   variant="underlined" 
//                   size="md" 
//                   borderColor={errors.url ? '$red500' : '$borderLight300'}
//                 >
//                   <InputField
//                     value={value}
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                     placeholder="Company URL"
//                   />
//                 </Input>
//               )}
//             />
//             {errors.url && (
//               <Text fontSize="$xs" color="$red500" mt="$1">
//                 {errors.url.message}
//               </Text>
//             )}
//           </VStack>

//           {/* Buttons */}
//           <HStack space="md" justifyContent="space-between" mt="$8">
//             <Button
//               variant="outline"
//               borderColor="$borderLight400"
//               flex={1}
//               borderRadius="$full"
//               onPress={() => navigation.goBack()}
//             >
//               <ButtonText color="$textDark700">Later</ButtonText>
//             </Button>

//             <Button
//               flex={1}
//               bg={isNextEnabled ? "$black" : "$coolGray300"}
//               borderRadius="$full"
//               onPress={handleSubmit(onSubmit)}
//               disabled={!isNextEnabled} 
//               opacity={isNextEnabled ? 1 : 0.7} 
//             >
//               <Text fontWeight="$medium" color={isNextEnabled ? "$white" : "$coolGray500"}>
//                 Next
//               </Text>
//             </Button>
//           </HStack>
//         </Box>
//       </ScrollView>
//     </GluestackUIProvider>
//   );
// };

// export default ContactBusiness;


// No changes to imports
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { setBusinessContact } from '../store/features/business/businessSlice';
import { useDispatch } from 'react-redux';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Box, Button, ButtonText, HStack, Image, Input, InputField, Pressable, Text, VStack } from '@/components/ui';

// Zod schema remains unchanged
const businessContactSchema = z.object({
  email: z.string().nonempty('Email is required').email('Please enter a valid email address'),
  phone: z.string().nonempty('Phone number is required').regex(/^\d{10}$/, 'Please enter a valid phone number'),
  url: z.string().nonempty('Company URL is required').url('Please enter a valid URL'),
});

const ContactBusiness = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(businessContactSchema),
    defaultValues: {
      email: '',
      phone: '',
      url: '',
    },
    mode: 'onTouched',
  });

  const isNextEnabled = isValid;

  const onSubmit = (data: any) => {
    dispatch(setBusinessContact(data));
    navigation.navigate("AddressBusiness");
  };

  return (
    <GluestackUIProvider>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="bg-white flex-1 mt-2 pt-7 p-4">
                   <HStack className="items-center mb-6">
                     <Pressable onPress={() => navigation.goBack()}>
                       <Image
                         source={require('../../assets/images/arrow_forward.png')}
                         className='h-4 w-7'
                         alt="back button"
                       />
                     </Pressable>
                     <Text className="text-base sm:text-md font-semibold">Business Contact Details</Text>
                   </HStack> 

          <Text  className="text-md sm:text-lg font-bold mb-3 ">
            Business Contact details
          </Text>

          <Text className="text-[14px] sm:text-base mb-6">
            Onboarding is an essential step to activate my
            Datman account for accepting payments and
            receiving payouts.
          </Text>

          {/* Email Input */}
          <VStack className="space-y-1 mb-6">
            <Text className="text-sm font-medium">Email ID</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                variant='underlined'
                  className={`border-b mt-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <InputField
              
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Email ID"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </Input>
              )}
            />
            {errors.email && (
              <Text className="text-xs text-red mt-1">
                {errors.email.message}
              </Text>
            )}
          </VStack>

          {/* Phone Input */}
          <VStack className="space-y-1 mb-6">
            <Text className="text-sm font-medium">Phone number</Text>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                variant='underlined'

                  className={`border-b mt-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Phone number"
                    keyboardType="phone-pad"
                  />
                </Input>
              )}
            />
            {errors.phone && (
              <Text className="text-xs text-red mt-1">
                {errors.phone.message}
              </Text>
            )}
          </VStack>

          {/* URL Input */}
          <VStack className="space-y-1 mb-8">
            <Text className="text-sm font-medium">Company URL</Text>
            <Controller
              control={control}
              name="url"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                variant='underlined'
                  className={`border-b mt-2 ${errors.url ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Company URL"
                  />
                </Input>
              )}
            />
            {errors.url && (
              <Text className="text-xs text-red mt-1">
                {errors.url.message}
              </Text>
            )}
          </VStack>

          {/* Buttons */}
          <HStack className="flex-row justify-between space-x-4 mt-8">
            <Button
              className="flex-1 mr-3 cursor-pointer border border-gray-300 rounded-full"
              onPress={() => navigation.goBack()}
            >
              <ButtonText className="text-gray-700">Later</ButtonText>
            </Button>

            <Button
              className={`flex-1 cursor-pointer rounded-full ${isNextEnabled ? 'bg-black' : 'bg-gray-300'} ${!isNextEnabled ? 'opacity-70' : ''}`}
              onPress={handleSubmit(onSubmit)}
              disabled={!isNextEnabled}
            >
              <Text className={`font-medium ${isNextEnabled ? 'text-white' : 'text-gray-500'}`}>
                Next
              </Text>
            </Button>
          </HStack>
        </Box>
      </ScrollView>
    </GluestackUIProvider>
  );
};

export default ContactBusiness;
