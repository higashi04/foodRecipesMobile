import { Text, Pressable } from "react-native";
import React from "react";
import tw from "twrnc";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import CachedImage from "../../helpers/CachedImage";

export default function RecipeCard({ item, index, navigation }) {
  const isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={[
          {
            width: "100%",
            paddingLeft: isEven ? 0 : 8,
            paddingRight: isEven ? 8 : 0,
          },
          tw`flex justify-center mb-4`,
        ]}
        onPress={() => navigation.navigate("RecipeDetail", {...item})}
      >
        {/* <Image
          source={{ uri: item.strMealThumb }}
          style={[
            {
              width: "100%",
              height: index % 3 === 0 ? hp(25) : hp(35),
              borderRadius: 35,
            },
            tw`bg-black/5`,
          ]}
        /> */}
        <CachedImage
          uri={item.strMealThumb}
          style={[
            {
              width: "100%",
              height: index % 3 === 0 ? hp(25) : hp(35),
              borderRadius: 35,
            },
            tw`bg-black/5`,
          ]}
          sharedTransitionTag={item.strMeal}
        />
        <Text
          style={[
            { fontSize: hp(1.5) },
            tw`font-semibold ml-2 text-neutral-600 mt-2`,
          ]}
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20).concat("...")
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
