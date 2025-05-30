import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { setOwnerDetails } from '../store/features/owner/ownerSlice';
import { useDispatch, useSelector } from 'react-redux';
import {  ChevronDownIcon, ScrollView } from '@gluestack-ui/themed';
import { useForm, Controller } from 'react-hook-form';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { Box, Button, HStack, Image, Input, InputField, Pressable, Select, SelectBackdrop, SelectContent, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text, VStack } from '@/components/ui';




export default function OwnerDetailsScreen() {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: 'Mr.',
      nationality: 'British',
      firstName: '',
      lastName: '',
      dob: ''
    }
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDateWithSlashes = (input: string): string => {
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, '');

    // Add slashes automatically based on input length
    if (digits.length <= 2) {
      return digits;
    }
    if (digits.length <= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
  };
  

const formatDateToDisplay = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

  
  const isValidDate = (dateStr: string) => {
    // Allow partial input during typing
    if (dateStr.length < 10) return true;
    
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dateStr)) return false;
  
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    
    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year &&
      year >= 1900 &&
      year <= new Date().getFullYear()
    );
  };

  

  
  
  // const ownerDetails = useSelector((state: any) => state.owner.ownerDetails);

  const onSubmit = (data: any) => {
    dispatch(setOwnerDetails(data));
    navigation.navigate("Contact");
  };


  return (
    <Box className='flex-1 px-4 pt-6'>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <HStack className="items-center mb-6">
                   <Pressable onPress={() => navigation.goBack()}>
                     <Image
                       source={require('../../assets/images/arrow_forward.png')}
                       className='h-4 w-7'
                       alt="back button"
                     />
                   </Pressable>
                   <Text className="text-lg font-semibold">Owner Details</Text>
                 </HStack>

        <Text className='text-xl font-bold mb-2'>
          Owner name as in ID
        </Text>
        <Text className='text-sm mb-6'>
          Onboarding is an essential step to activate my Datman account for accepting payments and receiving payouts.
        </Text>

        <VStack space="lg">
          <Box>
            <Text className='text-sm mb-1'>Title</Text>
            <Controller
              control={control}
              name="title"
              rules={{ required: 'Title is required' }}
              render={({ field: { onChange, value } }) => (
                <Select selectedValue={value} onValueChange={onChange}>
                  <SelectTrigger variant="underlined" className="min-h-[40px]">
                    <SelectInput placeholder="Select title" />
                    <SelectIcon>
                      <ChevronDownIcon />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent className='bg-lightgrey'>
                      <SelectItem label="Mr." value="Mr." />
                      <SelectItem label="Mrs." value="Mrs." />
                      <SelectItem label="Ms." value="Ms." />
                      <SelectItem label="Dr." value="Dr." />
                    </SelectContent>
                  </SelectPortal>
                </Select>
              )}
            />
            {errors.title && <Text className='text-xs text-red'>{errors.title.message}</Text>}
          </Box>

          <Box>
            <Text className='text-sm mb-1'>First name</Text>
            <Controller
              control={control}
              name="firstName"
              rules={{
                required: 'First name is required',
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: 'Only alphabetic characters allowed'
                },
                minLength: {
                  value: 2,
                  message: 'Minimum 2 characters required'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input variant="underlined">
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter first name"
                  />
                </Input>
              )}
            />
            {errors.firstName && <Text className='text-xs text-red'>{errors.firstName.message}</Text>}
          </Box>

          <Box>
            <Text className='text-sm mb-1'>Last name</Text>
            <Controller
              control={control}
              name="lastName"
              rules={{
                required: 'Last name is required',
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: 'Only alphabetic characters allowed'
                },
                minLength: {
                  value: 2,
                  message: 'Minimum 2 characters required'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input variant="underlined">
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter last name"
                  />
                </Input>
              )}
            />
            {errors.lastName && <Text className='text-xs text-red'>{errors.lastName.message}</Text>}
          </Box>


          <Box>
  {/* <Text className='text-sm mb-1'>Date of Birth</Text>
  <Controller
    control={control}
    name="dob"
    rules={{ required: 'Date of birth is required' }}
    render={({ field: { onChange, value } }) => (
      <>
        {Platform.OS === 'web' ? (
          <Input variant="underlined">
          <InputField
            value={value}
            onChangeText={(text) => {
              const formatted = formatDateWithSlashes(text);
              onChange(formatted);
            }}
            placeholder="DD/MM/YYYY"
            maxLength={10}
            keyboardType="numeric"
          />
        </Input>
        ) : (
          <>
            <Pressable onPress={() => setShowDatePicker(true)}>
              <Input variant="underlined" isReadOnly>
                <InputField
                  value={value}
                  placeholder="Date of Birth"
                  editable={false}
                  pointerEvents="none"
                />
              </Input>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                maximumDate={new Date()}
                value={value ? new Date(value.split('/').reverse().join('-')) : new Date()}
                onChange={(event:any, selectedDate:any) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const formatted = formatDateToDisplay(selectedDate);
                    onChange(formatted);
                  }
                }}
              />
            )}
          </>
        )}
      </>
    )}
  /> */}
  <Text className="text-sm mb-1">Date of Birth</Text>
<Controller
  control={control}
  name="dob"
  rules={{
    required: 'Date of birth is required',
    pattern: {
      value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      message: 'Date must be in DD/MM/YYYY format',
    },
  }}
  render={({ field: { onChange, value }, fieldState: { error } }) => (
    <>
      <Input variant="underlined">
        <InputField
          value={value}
          onChangeText={(text) => {
            const formatted = formatDateWithSlashes(text);
            onChange(formatted);
          }}
          placeholder="DD/MM/YYYY"
          maxLength={10}
          keyboardType="numeric"
        />
      </Input>
      {error && <Text className="text-red text-xs mt-1">{error.message}</Text>}
    </>
  )}
/>

</Box>

          <Box>
            <Text className='text-sm mb-1' >Nationality</Text>
            <Controller
              control={control}
              name="nationality"
              rules={{ required: 'Nationality is required' }}
              render={({ field: { onChange, value } }) => (
                <Select selectedValue={value} onValueChange={onChange}>
                  <SelectTrigger variant="underlined" className="min-h-[40px]">
                    <SelectInput placeholder="Select nationality" />
                    <SelectIcon>
                      <ChevronDownIcon />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent className='bg-lightgrey'>
                      <SelectItem label="British" value="British" />
                      <SelectItem label="Indian" value="Indian" />
                      <SelectItem label="American" value="American" />
                      <SelectItem label="Other" value="Other" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
              )}
            />
            {errors.nationality && <Text className='text-xs text-red'>{errors.nationality.message}</Text>}
          </Box>
        </VStack>

        <HStack space="md" className='mt-8 justify-between' >
          <Button
          className='flex-1 rounded-full '
            variant="outline"
            // flex={1}
            // borderRadius="$full"
            // borderColor="$black"
            onPress={() => navigation.goBack()}
          >
            <Text className='font-medium'>Later</Text>
          </Button>
          <Button
            className='flex-1 rounded-full bg-black '
            // flex={1}
            // bg="$black"
            // borderRadius="$full"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className='font-medium text-white'>Next</Text>
          </Button>
        </HStack>
      </ScrollView>
    </Box>
  );
}



