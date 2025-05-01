import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setContactDetails } from "../store/features/owner/ownerSlice";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { config } from "@gluestack-ui/config";
import {
  Box,
  Button,
  ButtonText,
  GluestackUIProvider,
  HStack,
  Image,
  Input,
  InputField,
  Pressable,
  Text,
  VStack,
} from "@/components/ui";
import { useThemeToggle } from "@/ThemeContext";

// Define Zod schema for validation
const contactSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(/^\d{10}$/, "Please enter a valid phone number"),
});

const Contact = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  // Fetch contact details from Redux
  const contact = useSelector((state: any) => state.owner.contact);

  // Initialize react-hook-form with Zod resolver
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      phone: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (contact.email || contact.phone) {
      reset({
        email: contact.email || "",
        phone: contact.phone || "",
      });
    }
  }, [contact, reset]);

  // Handle form submission
  const onSubmit = (data: any) => {
    const contactDetails = {
      email: data.email,
      phone: data.phone,
    };

    // Dispatch to Redux
    dispatch(setContactDetails(contactDetails));
    // console.log('Submitted Contact Details:', contactDetails);

    // Navigate to Address screen
    navigation.navigate("Address");
  };

  const { theme } = useThemeToggle();

  return (
    <GluestackUIProvider>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 p-4">
          <HStack className="items-center mt-2 mb-6">
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
              className={`text-lg  ${
                theme === "dark" ? "text-white" : "text-black"
              } font-semibold`}
            >
              Owner Details
            </Text>
          </HStack>

          {/* Title */}
          <Text
            className={`text-xl  ${
              theme === "dark" ? "text-white" : "text-black"
            } font-bold mb-3`}
          >
            Contact details
          </Text>

          {/* Description */}
          <Text
            className={`text-md  ${
              theme === "dark" ? "text-textgrey" : "text-black"
            } mb-6`}
          >
            Onboarding is an essential step to activate my Datman account for
            accepting payments and receiving payouts.
          </Text>

          {/* Email Input */}
          <VStack className="mb-6" space="xs">
            <Text
              className={`  ${
                theme === "dark" ? "text-white" : "text-black"
              } text-sm font-medium`}
            >
              Email ID
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  variant="underlined"
                  className={`border-b ${
                    theme === "dark" ? "border-textgrey" : "border-black"
                  }`}
                >
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Email ID"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className={`${
                      theme === "dark"
                        ? "placeholder-textgrey text-white"
                        : "placeholder-textgrey text-black"
                    }`}
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

          {/* Phone Number Input */}
          <VStack className="mb-8" space="xs">
            <Text
              className={`text-sm  ${
                theme === "dark" ? "text-white" : "text-black"
              } font-medium`}
            >
              Phone number
            </Text>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  variant="underlined"
                  className={`border-b ${
                    theme === "dark" ? "border-textgrey" : "border-black"
                  }`}
                >
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Phone number"
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    className={`${
                      theme === "dark"
                        ? "placeholder-textgrey text-white"
                        : "placeholder-textgrey text-black"
                    }`}
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

          {/* Buttons */}
          <HStack space="md" className="justify-between mt-8">
            <Button
              variant="outline"
              className={`flex-1 ${
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
        </Box>
      </ScrollView>
    </GluestackUIProvider>
  );
};

export default Contact;
