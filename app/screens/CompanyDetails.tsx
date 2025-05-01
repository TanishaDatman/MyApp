// import React, { useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { useForm, Controller } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useDispatch } from 'react-redux';
// import { setCompanyDetails } from '../store/features/business/businessSlice';
// import { Box, Button, ButtonText, HStack, Image, Input, InputField, Pressable, Text, VStack } from '@/components/ui';
// import { ScrollView } from '@gluestack-ui/themed';

// // Define Zod schema for validation
// const companySchema = z.object({
//   companyNumber: z
//     .string()
//     .nonempty('Company number is required')
//     .regex(/^\d{10}$/, 'Please enter a valid company number with 10 digits'),
//   legalName: z
//     .string()
//     .nonempty('Legal business name is required')
//     .regex(/^[a-zA-Z\s]+$/, 'Legal name can only contain letters and spaces'),
// });

// const CompanyDetails = () => {
//   const navigation: any = useNavigation();

//   // React Hook Form initialization with Zod validation
//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isValid },
//     reset,
//   } = useForm({
//     resolver: zodResolver(companySchema),
//     defaultValues: {
//       companyNumber: '',
//       legalName: '',
//     },
//     mode: 'onTouched',
//   });

//   const dispatch=useDispatch()

//   // Handle form submission
//   // const onSubmit = (data: any) => {
//   //   navigation.navigate('ContactBusiness');
//   // };
//   const onSubmit = (data: any) => {
//     dispatch(setCompanyDetails({
//       businessType: '', 
//       companyNumber: data.companyNumber,
//       legalName: data.legalName,
//     }));
  
//     navigation.navigate('ContactBusiness');
//   };
  

//   // Enable Next button when the form is valid
//   const isNextEnabled = isValid && !!errors.companyNumber && !!errors.legalName;

//   return (
//     <Box flex={1} pt="$4" bg="$backgroundLight0">
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }} p="$4">
//         {/* Header */}
//         <HStack alignItems="center" mt="$3" mb="$6">
//           <Pressable onPress={() => navigation.goBack()}>
//             <Image
//               source={require('../assets/images/arrow_forward.png')} // Make sure this image exists
//               style={{ width: 20, height: 20, marginRight: 8 }}
//               alt="back button"
//             />
//           </Pressable>
//           <Text fontSize="$lg" fontWeight="$medium">Business Details</Text>
//         </HStack>

//         {/* Subheader */}
//         <Text fontSize="$lg" fontWeight="$semibold" mb="$1">
//           Company registered details
//         </Text>
//         <Text color="$textLight500" fontSize="$sm" mb="$6">
//           Onboarding is an essential step to activate my Datman account for accepting payments and receiving payouts.
//         </Text>

//         {/* Form Section */}
//         <VStack space="md" mb="$6">
//           <Text fontWeight="$semibold">Company look-up</Text>

//           {/* Company Number Input */}
//           <VStack space="sm">
//             <Text fontSize="$sm">Company registered number</Text>
//             <Controller
//               control={control}
//               name="companyNumber"
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <Input variant="underlined" size="md">
//                   <InputField
//                     placeholder="Enter company number"
//                     value={value}
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                     keyboardType="numeric"
//                   />
//                 </Input>
//               )}
//             />
//             {errors.companyNumber && (
//               <Text fontSize="$xs" color="$red500" mt="$1">
//                 {errors.companyNumber.message}
//               </Text>
//             )}
//           </VStack>

//           {/* Legal Name Input */}
//           <VStack space="sm">
//             <Text fontSize="$sm">Business legal name</Text>
//             <Controller
//               control={control}
//               name="legalName"
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <Input variant="underlined" size="md">
//                   <InputField
//                     placeholder="Enter legal business name"
//                     value={value}
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                   />
//                 </Input>
//               )}
//             />
//             {errors.legalName && (
//               <Text fontSize="$xs" color="$red500" mt="$1">
//                 {errors.legalName.message}
//               </Text>
//             )}
//           </VStack>
//         </VStack>
//       </ScrollView>

//       {/* Footer Buttons */}
//       <HStack p="$4" space="md" bg="$backgroundLight0">
//         <Button
//           variant="outline"
//           flex={1}
//           borderColor="$black"
//           borderRadius="$full"
//           onPress={() => navigation.goBack()}
//         >
//           <ButtonText color="$black">Later</ButtonText>
//         </Button>

//         <Button
//                      flex={1}
//                      bg={isValid ? '$black' : '$coolGray300'}
//                      borderRadius="$full"
//                      onPress={handleSubmit(onSubmit)}
//                      disabled={!isValid}
//                      opacity={isValid ? 1 : 0.7}
//                    >
//                      <ButtonText 
//                        fontWeight="$medium" 
//                        color={isValid ? '$white' : '$coolGray500'}
//                      >
//                        Next
//                      </ButtonText>
//                    </Button>
//       </HStack>
//     </Box>
//   );
// };

// export default CompanyDetails;



import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { setCompanyDetails } from '../store/features/business/businessSlice';
import { Box, Button, ButtonText, HStack, Image, Input, InputField, Pressable, Text, VStack } from '@/components/ui';
import { ScrollView } from '@gluestack-ui/themed';

const companySchema = z.object({
  companyNumber: z
    .string()
    .nonempty('Company number is required')
    .regex(/^\d{10}$/, 'Please enter a valid company number with 10 digits'),
  legalName: z
    .string()
    .nonempty('Legal business name is required')
    .regex(/^[a-zA-Z\s]+$/, 'Legal name can only contain letters and spaces'),
});

const CompanyDetails = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyNumber: '',
      legalName: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = (data: any) => {
    dispatch(setCompanyDetails({
      businessType: '',
      companyNumber: data.companyNumber,
      legalName: data.legalName,
    }));

    navigation.navigate('ContactBusiness');
  };

  return (
    <Box className="flex-1 p-3 sm:p-4 md:p-5 pt-4 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
        {/* Header */}
                 <HStack className="items-center mb-6">
                   <Pressable onPress={() => navigation.goBack()}>
                     <Image
                       source={require('../../assets/images/arrow_forward.png')}
                       className='h-4 w-7'
                       alt="back button"
                     />
                   </Pressable>
                   <Text className="text-md xs:text-base sm:text-md font-semibold">Business Details</Text>
                 </HStack>
       

        {/* Subheader */}
        <Text className="text-md sm:text-lg font-bold mb-1 ">
          Company registered details
        </Text>
        <Text className="text-sm text-gray-500 mb-6">
          Onboarding is an essential step to activate my Datman account for accepting payments and receiving payouts.
        </Text>

        {/* Form */}
        <VStack className="space-y-4 mb-6">
          <Text className="font-semibold mb-3">Company look-up</Text>

          {/* Company Number Input */}
          <VStack className="space-y-1 mb-4">
            <Text className="text-sm">Company registered number</Text>
            <Controller
              control={control}
              name="companyNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input variant="underlined" size="md" className="border-b border-gray-300">
                  <InputField
                    placeholder="Enter company number"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    className="py-2"
                  />
                </Input>
              )}
            />
            {errors.companyNumber && (
              <Text className="text-xs text-red mt-1">
                {errors.companyNumber.message}
              </Text>
            )}
          </VStack>

          {/* Legal Name Input */}
          <VStack className="space-y-1">
            <Text className="text-sm">Business legal name</Text>
            <Controller
              control={control}
              name="legalName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input variant="underlined" size="md" className="border-b border-gray-300">
                  <InputField
                    placeholder="Enter legal business name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className="py-2"
                  />
                </Input>
              )}
            />
            {errors.legalName && (
              <Text className="text-xs text-red mt-1">
                {errors.legalName.message}
              </Text>
            )}
          </VStack>
        </VStack>
      </ScrollView>

      {/* Footer Buttons */}
      <HStack className="px-4 pb-4 space-x-4 bg-white">
        <Button
          variant="outline"
          className="flex-1 border mr-3 border-black rounded-full"
          onPress={() => navigation.goBack()}
        >
          <ButtonText className="text-black">Later</ButtonText>
        </Button>

        <Button
          className={`flex-1 rounded-full ${isValid ? 'bg-black' : 'bg-gray-300 opacity-70'}`}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          <ButtonText
            className={`font-medium ${isValid ? 'text-white' : 'text-gray-500'}`}
          >
            Next
          </ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};

export default CompanyDetails;
