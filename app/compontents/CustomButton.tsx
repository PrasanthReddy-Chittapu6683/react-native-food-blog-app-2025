import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { CustomButtonProps } from "@/type";
import cn from "clsx";
const CustomButton = ({
  title = "Click Me",
  onPress,
  style,
  leftIcon,
  isLoading = false,
  textStyle,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={cn("custom-btn", style)}
      onPress={onPress}
      disabled={isLoading}
    >
      {leftIcon && <View className="left-icon">{leftIcon}</View>}
      <View className="flex-1 items-center justify-center">
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className={cn("text-white-100 paragraph-semibold", textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
