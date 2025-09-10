import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import CustomInput from "../compontents/CustomInput";
import CustomButton from "../compontents/CustomButton";
import { signIn } from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";
const SignIn = () => {
  const[isSubmitting, setIsSubmitting]= useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const submit:()=> void = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error","Please enter valid email and password");
      return;
    }
    setIsSubmitting(true);
    try {

      await signIn({
        email: form.email,
        password: form.password,})
      router.replace("/"); // Redirect to home after successful sign-in
    }
    catch (error:any) {
      Alert.alert("Error", `Failed to sign in. Please try again. - ${error}`);
      Sentry.captureEvent(error );
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <View className="gap-10 bg-white-100 rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your Email"
        value={form.email}
        onChangeText={(text) => {setForm({ ...form, email: text }) }}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your Password"
        value={form.password}
        onChangeText={(text) => {
          setForm({ ...form, password: text })
        }}
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton
        title="Sign In"
        isLoading={isSubmitting}
        onPress={submit}
        style="bg-primary"
        textStyle="text-white-100"
      />
      <View className="flex justify-center items-center mt-5 flex-row gap-2">
        <Text className="base-regualr text-gray-500">
          Don't have an account?
         
        </Text>
        <Link className="text-primary base-bold" href={"/sign-up"}>
            Sign Up
          </Link>
      </View>
    </View>
  );
};

export default SignIn;
