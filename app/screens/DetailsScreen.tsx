import React, { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useOwnerApi } from '../hooks/useOwnerApi';
import { useCompanyApi } from '../hooks/useCompanyApi';
import { useTradingApi } from '../hooks/useTradingApi';
import { useBankApi } from '../hooks/useBankApi';
import {ownerId,companyId,tradeID,bankID} from '../data'
import { Badge, BadgeText, Box, Button, HStack, Pressable, Text, VStack } from '@/components/ui';
import { Progress, ProgressFilledTrack, ScrollView } from '@gluestack-ui/themed';

const onboardingData = [
  {
    icon: require('../../assets/images/account_box.png'),
    title: 'Owner details',
    description: 'Includes name, address, contact, and identity proof.',
    route: 'OwnerDetails',
    key: 'owner', 
  },
  {
    icon: require('../../assets/images/cases.png'),
    title: 'Business details',
    description: 'Includes business type, contact, address, proof of business, etc.',
    route: 'BusinessDetails',
    key: 'business',
  },
  {
    icon: require('../../assets/images/store.png'),
    title: 'Trading information',
    description: 'Includes trading name, address, and related details.',
    route: 'TradingInfo',
    key: 'trading',
  },
  {
    icon: require('../../assets/images/account_balance.png'),
    title: 'Bank details',
    description: 'Includes account number, bank name, and related information.',
    route: 'BankDetails',
    key: 'bank',
  },
];

export default function DetailsScreen() {
  const navigation: any = useNavigation();
  const { getOwnerDetails } = useOwnerApi();
  const {getCompanyDetails}=useCompanyApi()
  const {getTradingDetails}=useTradingApi()
  const {getBankDetails}=useBankApi()


  const [ownerStatus, setOwnerStatus] = useState<'pending' | 'inProgress'>('pending');
  const [companyStatus, setCompanyStatus] = useState<'pending' | 'inProgress'>('pending');
  const [tradingStatus, setTradingtatus] = useState<'pending' | 'inProgress'>('pending');
  const [bankingStatus, setBankingtatus] = useState<'pending' | 'inProgress'>('pending');

  const [track, setTrack] = useState<number>(0); 
  const [progress, setProgress] = useState<number>(0);



  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const ownerData = await getOwnerDetails(ownerId);
        console.log('Owner data:', ownerData);
  
        if (ownerData?.business?.flag == 1) {
          setOwnerStatus('inProgress');
          setTrack(1);
        }
  
        const companyData = await getCompanyDetails(companyId);
        console.log('Company data:', companyData);
  
        if (companyData?.companyDetails?.flag == 1) {
          setCompanyStatus('inProgress');
          setTrack(2);
        }

        const traddingData = await getTradingDetails(tradeID);
        console.log('trading data: is ===>', traddingData);
  
        if (traddingData?.tradingDetails?.flag == 1) {
          setTradingtatus('inProgress');
          setTrack(3);
        }

        const bankData=await getBankDetails(bankID);
        console.log('banking data:', bankData);


        if (bankData?.bankDetails?.flag == 1) {
          setBankingtatus('inProgress');
          setTrack(4);
        }

      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };
  
    fetchDetails();
  }, []);

  useFocusEffect(
      useCallback(() => {
        switch (track) {
          case 1:
            setProgress(25);
            break;
          case 2:
            setProgress(50);
            break;
          case 3:
            setProgress(75);
            break;
          case 4:
            setProgress(100);
            break;
          default:
            setProgress(0);
        }
      }, [track])
    );
  
  const getStatusLabel = (stepKey: string) => {
    if (stepKey === 'owner') {
      return ownerStatus === 'inProgress' ? 'Verification in progress' : 'Pending';
    }
    if (stepKey === 'business') {
      return companyStatus === 'inProgress' ? 'Verification in progress' : 'Pending';
    }
    if (stepKey === 'trading') {
      return tradingStatus === 'inProgress' ? 'Verification in progress' : 'Pending';
    }
    if (stepKey === 'bank') {
      return bankingStatus === 'inProgress' ? 'Verification in progress' : 'Pending';
    }
    return 'Pending';
  };

  const getStatusColor = (stepKey: string) => {
    if ((stepKey === 'owner' && ownerStatus === 'inProgress') ||
        (stepKey === 'business' && companyStatus === 'inProgress') ||
        (stepKey === 'trading' && tradingStatus === 'inProgress')||
        (stepKey === 'bank' && bankingStatus === 'inProgress'))

         {
      return 'green';
    }
    return 'yellow';
  };


  const getStatusBg = (stepKey: string) => {
    if ((stepKey === 'owner' && ownerStatus === 'inProgress') ||
        (stepKey === 'business' && companyStatus === 'inProgress')||
        (stepKey === 'trading' && tradingStatus === 'inProgress') ||
        (stepKey === 'bank' && bankingStatus === 'inProgress')) {
      return 'lightgreen';
    }
    return 'lightyellow';
  };


  return (
    <>
    <Box className='flex-1 pt-8 px-4'>
      <ScrollView>

        {/* Back button and title */}
        <HStack className="items-center mb-6">
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/images/arrow_forward.png')}
                className='h-4 w-7'
                alt="back button"
              />
            </Pressable>
            <Text className="text-md xs:text-base sm:text-md font-semibold">Onboarding</Text>
          </HStack>

        <Text className="text-lg sm:text-xl font-bold mb-2">
          Complete Onboarding
        </Text>
        <Text className="text-sm sm:text-base text-textgrey mb-4">
          Onboarding is an essential step to activate my Datman account for accepting payments and receiving payouts.
        </Text>
        {
          progress==0 ? "":
          <VStack className='mb-3' >
          <HStack className='flex-1 items-center w-[100%]'>
            <Progress value={progress} flex={1} h="$1" bgColor="$coolGray300" rounded="$full">
              <ProgressFilledTrack h="$1.5" bgColor="$black" />
            </Progress>
            <Text className='text-sm font-bold ml-2'>
              {progress}%
            </Text>
          </HStack>
        </VStack>
        }
       


        {/* Card List */}
        <VStack space="md">
       
           {onboardingData.map((item, idx) => {
        const isVerificationInProgress = getStatusLabel(item.key) === 'Verification in progress';
        const isOwnerStep = item.key === 'owner';
        const isDisabledowner = isVerificationInProgress && isOwnerStep;
        const isVerificationInProgressbusiness = getStatusLabel(item.key) === 'Verification in progress';
        const isBusinessStep = item.key === 'business';
        const isDisabledbusiness = isVerificationInProgressbusiness && isBusinessStep;
        const isVerificationInProgresstrade = getStatusLabel(item.key) === 'Verification in progress';
        const isTradeStep = item.key === 'trading';
        const isDisabledtrading = isVerificationInProgresstrade && isTradeStep;
        const isVerificationInProgressbank = getStatusLabel(item.key) === 'Verification in progress';
        const isBankStep = item.key === 'bank';
        const isDisabledbank = isVerificationInProgressbank && isBankStep;

        return (
          <Pressable
            key={idx}
            onPress={() => {
              if (!isDisabledowner && !isDisabledbusiness && !isDisabledtrading && !isDisabledbank) {
                navigation.navigate(item.route);
              }
            }}
          >
            <Box
            className='rounded-xl mb-4 border border-lightgrey p-2 bg-white'
              // borderWidth={1}
              // borderColor="$borderLight300"
              // borderRadius="$xl"
              // p="$4"
              // bg="$white"
              // shadowColor="rgba(0, 0, 0, 0.05)"
              // shadowOpacity={0.1}
              // mb="$4"
            >
              <HStack className='justify-start' space="md">
                <Image source={item.icon} className='object-contain' />
                <VStack className='flex-1'>
                  <Text className='text-md font-semibold mb-1'>
                    {item.title}
                  </Text>
                  {/* className="text-sm sm:text-base text-textgrey mb-4" */}
                  <Text className='text-sm text-textgrey mb-1'>
                    {item.description}
                  </Text>
                 
{/* <Box
  className={`inline-flex w-auto px-3 py-1 rounded-full mt-2 bg-${getStatusBg(item.key)}`}
>
  <Text
    className={`text-xs text-${getStatusColor(item.key)} whitespace-nowrap`}
  >
    {getStatusLabel(item.key)}
  </Text>
</Box> */}

             <HStack className='items-center mb-2'>
                        <Badge className={`rounded-full px-3 bg-${getStatusBg(item.key)}`}>
                          <BadgeText className={`text-[8px] sm:text-xs md:text-sm text-${getStatusColor(item.key)}`}>{getStatusLabel(item.key)}</BadgeText>
                        </Badge>
                      </HStack>

                </VStack>
              </HStack>
            </Box>
          </Pressable>
        );
      })}
        </VStack>

        <HStack className='mt-6 mb-4 justify-between' space="md">
    <Button
    className='flex-1 rounded-full'
      variant="outline"
      onPress={() => navigation.goBack()}
    >
      <Text className='text-md font-medium'>Later</Text>
    </Button>
    <Button
    className='flex-1 rounded-full'
      variant="outline"
      onPress={() => console.log('Next')}
    >
      <Text className='text-md font-medium'>Next</Text>
    </Button>
  </HStack>

      </ScrollView>

      {/* Bottom Buttons */}
      
    </Box>
   
  </>
  );
}
