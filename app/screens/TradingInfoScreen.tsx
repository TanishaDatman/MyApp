import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTradingName as setTradingNameAction,
  setSameAsRegistered,
  setTradingAddress,
} from '../store/features/trading/tradingSlice';
import { useTradingApi } from '../hooks/useTradingApi';
import { MaterialIcons } from '@expo/vector-icons';

import {
  Box,
  Button,
  ButtonText,
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  HStack,
  Icon,
  Image,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  Pressable,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  VStack,
} from '@/components/ui';
import { Center, Divider, ScrollView } from '@gluestack-ui/themed';

const TradingInfoScreen = () => {
  const [isSameAsRegistered, setIsSameAsRegistered] = useState(true);
  const [tradingName, setTradingName] = useState('');
  const [postCode, setPostCode] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [townCity, setTownCity] = useState('');
  const [county, setCounty] = useState('');
  const [country, setCountry] = useState('');
  const [modal, setModal] = useState(false);
  const navigation: any = useNavigation();

  const isNextEnabled =
    (isSameAsRegistered && tradingName) ||
    (tradingName &&
      postCode &&
      addressLine1 &&
      townCity &&
      county &&
      country);
  const dispatch = useDispatch();

  const countries = ['UK', 'USA', 'Mexico', 'Canada', 'Australia', 'Ireland'];

  const handleNext = async () => {
    const tradingDetails = {
      tradingName,
      postCode,
      addressLine1,
      addressLine2,
      townCity,
      county,
      country,
      isSameAsRegistered,
    };

    try {
      console.log('Trading details submitted====>:', tradingDetails);
      await postTradingDetails(tradingDetails);
      console.log('Trading details submitted====>:', tradingDetails);
      setModal(true);
    } catch (error) {
      console.error('Error posting trading details:', error);
    }
  };

  const tradingState = useSelector((state: any) => state.trading);

  useEffect(() => {
    console.log('%c[Trading State Updated]', 'color: green; font-weight: bold;');
    console.log('Trading Name:', tradingState.tradingName);
    console.log('Is Same As Registered:', tradingState.isSameAsRegistered);
    console.log('Trading Address:', tradingState.address);
  }, [tradingState]);

  const { postTradingDetails } = useTradingApi();

  return (
    <Box className="flex-1 p-3 sm:p-5 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="pt-4 px-5">
        <HStack className="items-center mb-6">
                   <Pressable onPress={() => navigation.goBack()}>
                     <Image
                       source={require('../../assets/images/arrow_forward.png')}
                       className='h-4 w-7'
                       alt="back button"
                     />
                   </Pressable>
                   <Text className="text-md xs:text-base sm:text-md font-semibold">Trading Information</Text>
                 </HStack>

        <Text className="text-md sm:text-lg font-bold ">Trading Information</Text>

        <Text className="text-gray-500 text-sm mb-6">
          Provide us with the trading details of your business or select same as registered address if that applies.
        </Text>

        <VStack className="space-y-4 mb-6">
          <Text className="text-sm md:text-md font-semibold ">Trading name</Text>
          <Input variant="underlined">
            <InputField
              placeholder="Enter trading name"
              value={tradingName}
              onChangeText={setTradingName}
              className="text-base"
            />
          </Input>
        </VStack>

        <VStack className="space-y-4 mb-6">
          <Text className="text-sm mb-2">
            Is trading address the same as registered address?
          </Text>

          <Checkbox
            value="sameAddress"
            isChecked={isSameAsRegistered}
            onChange={(isSelected) => setIsSameAsRegistered(isSelected)}
            aria-label="Same as registered address"
          >
            <CheckboxIndicator className="mr-2">
            {isSameAsRegistered && (
    <MaterialIcons name="check" size={16} className='text-white bg-black p-1' />
  )}
                        </CheckboxIndicator>
            <CheckboxLabel>Same as registered address</CheckboxLabel>
          </Checkbox>
        </VStack>

        {!isSameAsRegistered && (
          <VStack className="space-y-4 mb-6">
            <Divider className="my-2" />

            <Text className="text-lg font-semibold mb-3">Trading address</Text>

            <VStack className="space-y-2 mb-3">
              {/* <Text className="text-sm">Post code</Text> */}
              <Input variant="underlined">
                <InputField
                  placeholder="Enter post code"
                  value={postCode}
                  onChangeText={setPostCode}
                  className="text-base"
                />
              </Input>
            </VStack>

            <VStack className="space-y-2 mb-3">
              {/* <Text className="text-sm">Address line 1</Text> */}
              <Input variant="underlined">
                <InputField
                  placeholder="Enter address line 1"
                  value={addressLine1}
                  onChangeText={setAddressLine1}
                  className="text-base"
                />
              </Input>
            </VStack>

            <VStack className="space-y-2 mb-3">
              {/* <Text className="text-sm">Address line 2 (optional)</Text> */}
              <Input variant="underlined">
                <InputField
                  placeholder="Enter address line 2"
                  value={addressLine2}
                  onChangeText={setAddressLine2}
                  className="text-base"
                />
              </Input>
            </VStack>

            <VStack className="space-y-2 mb-3">
              {/* <Text className="text-sm">Town/City</Text> */}
              <Input variant="underlined">
                <InputField
                  placeholder="Enter town/city"
                  value={townCity}
                  onChangeText={setTownCity}
                  className="text-base"
                />
              </Input>
            </VStack>

            <VStack className="space-y-2 mb-3">
              {/* <Text className="text-sm">County</Text> */}
              <Input variant="underlined">
                <InputField
                  placeholder="Enter county"
                  value={county}
                  onChangeText={setCounty}
                  className="text-base"
                />
              </Input>
            </VStack>

            <VStack className="space-y-2">
              {/* <Text className="text-sm">Country</Text> */}
            <Box className="pb-2">
                      <Select selectedValue={country} onValueChange={(value) => setCountry(value)}>
                        <SelectTrigger
                              className="border-0 border-b-[1px] border-gray-300 rounded-none px-0 min-h-[40px] bg-transparent"
                              style={{
                                borderTopWidth: 0,
                                borderLeftWidth: 0,
                                borderRightWidth: 0,
                                borderBottomWidth: 1,
                                borderColor: '#D1D5DB', // same as Tailwind's gray-300
                                borderRadius: 0,
                              }}
                            >
                          <SelectInput placeholder="Country" />
                          <SelectIcon />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent className='bg-lightgrey'>
                            {countries.map((name) => (
                              <SelectItem key={name} label={name} value={name} />
                            ))}
                          </SelectContent>
                        </SelectPortal>
                      </Select>
                    </Box>
            </VStack>
          </VStack>
        )}
      </ScrollView>

      <HStack className="p-4 space-x-4 bg-white">
        <Button
          variant="outline"
          className="flex-1 border-black mr-3 rounded-full"
          onPress={() => navigation.goBack()}
        >
          <ButtonText className="text-black ">Later</ButtonText>
        </Button>

        <Button
          className={`flex-1 rounded-full ${
            isNextEnabled ? 'bg-black' : 'bg-gray-300'
          }`}
          disabled={!isNextEnabled}
          onPress={handleNext}
        >
          <ButtonText className="text-white">Next</ButtonText>
        </Button>
      </HStack>

      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <ModalBackdrop />
        <ModalContent         className="absolute  md:relative md:bottom-auto md:rounded-2xl md:self-center md:mt-24 md:max-w-md bottom-0 w-full bg-white rounded-t-3xl px-6 pt-4 pb-8"
        >
          <ModalBody className="mt-6">
            <Center className="mb-4">
              <Image
                source={require('../../assets/images/tick.png')}
                alt="Tick"
                style={{ height: 90, width: 110 }}
              />
            </Center>
            <Text className="text-lg font-semibold text-center">
              Owner verification in progress
            </Text>
            <Text className="text-sm text-center mt-2 text-gray-500">
              The owner details will be verified soon. You can continue filling in the remaining details.
            </Text>
          </ModalBody>
          <ModalFooter className="w-full px-4 pb-6">
            <Button
              className="flex-1 bg-black rounded-full"
              onPress={() => {
                navigation.navigate('Details');
                setModal(false);
              }}
            >
              <ButtonText className="text-white">Continue</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TradingInfoScreen;
