import { images } from "@/constants";
import { Image } from "expo-image";
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const CartButton = () => {
    const totalItems = 10;
    return (
        <TouchableOpacity
            className="cart-btn" onPress={() => {
        }}>
            <Image source={images.bag} style={{width: 20, height: 20}} contentFit={"contain"}/>
            {totalItems > 0 && (
                <View
                    className="cart-badge">
                    <Text className={"small-bold  text-white"}>{totalItems}</Text>
                </View>
            )}

        </TouchableOpacity>
    )
}
export default CartButton
