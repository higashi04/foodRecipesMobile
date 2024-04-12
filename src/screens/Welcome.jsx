import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import React, { useEffect } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

export default function Welcome() {

    const ringOnePadding = useSharedValue(0);
    const ringTwoPadding = useSharedValue(0);

    const navigation = useNavigation();

    useEffect(() => {
        ringOnePadding.value = 0;
        ringTwoPadding.value = 0;
        setTimeout(() => {
            ringOnePadding.value = withSpring(ringOnePadding.value + hp(5));
        }, 100);
        setTimeout(() => {
            ringTwoPadding.value = withSpring(ringTwoPadding.value + hp(5.5));
        }, 300);

        setTimeout(() => {
            navigation.navigate('Home')
        }, 3000);
    }, [])
  return (
    <View
      style={tw`flex-1 justify-center items-center bg-amber-500`}
    >
      <StatusBar style="light" />

      {/** logo */}
      <Animated.View style={[tw`bg-white/20 rounded-full`, { padding: ringOnePadding }]}>
        <Animated.View style={[tw`bg-white/20 rounded-full`, { padding: ringTwoPadding }]}>
          <Image
            source={require("../../assets/images/welcome.jpg")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* title */}
      <View style={[tw`flex items-center`, { marginTop: hp(3) }]}>
        <Text
          style={[
            tw`font-bold text-white`,
            { fontSize: hp(6) },
          ]}
        >
          {" "}
          Mealsctionary{" "}
        </Text>
      </View>
    </View>
  );
}
