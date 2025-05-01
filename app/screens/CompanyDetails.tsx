import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { setCompanyDetails } from "../store/features/business/businessSlice";
import {
  Box,
  Button,
  ButtonText,
  HStack,
  Image,
  Input,
  InputField,
  Pressable,
  Text,
  VStack,
} from "@/components/ui";
import { ScrollView } from "@gluestack-ui/themed";
import { useThemeToggle } from "@/ThemeContext";

const companySchema = z.object({
  companyNumber: z
    .string()
    .nonempty("Company number is required")
    .regex(/^\d{10}$/, "Please enter a valid company number with 10 digits"),
  legalName: z
    .string()
    .nonempty("Legal business name is required")
    .regex(/^[a-zA-Z\s]+$/, "Legal name can only contain letters and spaces"),
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
      companyNumber: "",
      legalName: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (data: any) => {
    dispatch(
      setCompanyDetails({
        businessType: "",
        companyNumber: data.companyNumber,
        legalName: data.legalName,
      })
    );

    navigation.navigate("ContactBusiness");
  };

  const { theme } = useThemeToggle();

  return (
    <Box
      className={`flex-1 p-3 sm:p-4 ${
        theme === "dark" ? "bg-black" : "bg-white"
      } md:p-5 pt-4 `}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
        {/* Header */}
        <HStack className="items-center mb-6">
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={
                theme === "dark"
                  ? require("../../assets/images/white_arrow.png")
                  : require("../../assets/images/arrow_forward.png")
              }
              alt="back button"
              className="h-4 w-7"
            />
          </Pressable>
          <Text
            className={`text-md ${
              theme === "dark" ? "text-white" : "text-black"
            } xs:text-base sm:text-md font-semibold`}
          >
            Business Details
          </Text>
        </HStack>

        {/* Subheader */}
        <Text
          className={`text-md ${
            theme === "dark" ? "text-white" : "text-black"
          } mb-2 sm:text-lg font-bold`}
        >
          Company registered details
        </Text>
        <Text className="text-sm text-gray-500 mb-6">
          Onboarding is an essential step to activate my Datman account for
          accepting payments and receiving payouts.
        </Text>

        {/* Form */}
        <VStack className="space-y-4 mb-6">
          <Text
            className={`font-semibold ${
              theme === "dark" ? "text-textgrey" : "text-black"
            } mb-3`}
          >
            Company look-up
          </Text>

          {/* Company Number Input */}
          <VStack className="space-y-1 mb-4">
            <Text
              className={`text-sm ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Company registered number
            </Text>
            <Controller
              control={control}
              name="companyNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  variant="underlined"
                  size="md"
                  className="border-b border-gray-300"
                >
                  <InputField
                    placeholder="Enter company number"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    className={`py-2 ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
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
          <VStack className="space-y-1 mb-5">
            <Text
              className={`text-sm ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Business legal name
            </Text>
            <Controller
              control={control}
              name="legalName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  variant="underlined"
                  size="md"
                  className="border-b border-gray-300"
                >
                  <InputField
                    placeholder="Enter legal business name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className={`py-2 ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
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

        {/* Footer Buttons */}
        <HStack className="px-4 pb-4 space-x-4">
          <Button
            variant="outline"
            className={`flex-1 mr-3 ${
              theme === "dark" ? "border-green" : "border-black"
            } cursor-pointer rounded-full`}
            onPress={() => navigation.goBack()}
          >
            <ButtonText
              className={`text-xs ${
                theme === "dark" ? "text-green" : "text-black"
              } sm:text-sm `}
            >
              Later
            </ButtonText>
          </Button>

          <Button
            className={`flex-1 rounded-full cursor-pointer 
  ${
    theme === "dark"
      ? isValid
        ? "bg-green"
        : "bg-textgrey"
      : isValid
      ? "bg-black"
      : "bg-textgrey"
  } 
  ${isValid ? "opacity-100" : "opacity-70"}`}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            <ButtonText
              className={`font-medium text-xs sm:text-sm 
  ${theme === "dark" ? "text-black" : "text-white"} 
  ${!isValid && "text-white"}`}
            >
              Next
            </ButtonText>
          </Button>
        </HStack>
      </ScrollView>
    </Box>
  );
};

export default CompanyDetails;
