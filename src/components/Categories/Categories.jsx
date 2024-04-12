import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import Animated, { FadeInDown } from "react-native-reanimated";

import tw from "twrnc";
import CachedImage from "../../helpers/CachedImage";

const Categories = ({categories, activeCategory, handleCategoryChange}) => {
  return (
    <Animated.View style={tw`mt-3`} entering={FadeInDown.duration(500).springify()}>
     <ScrollView
        horizontal
        showsHorizontalScrollIndicator= {false}
        contentContainerStyle={{paddingHorizontal: 15}}>
            {
                categories.map((category, index) => {
                    const  isActive = activeCategory === category.strCategory;
                    let activeButtonClass = isActive? 'bg-amber-400' : 'bg-black/10';
                    return(
                        <TouchableOpacity key={index} style={tw`flex items-center`} 
                            onPress={() => handleCategoryChange(category.strCategory)}
                        >
                            <View style={tw`rounded-full p-[6px] mx-2 ${activeButtonClass}`}>
                                <CachedImage  uri={ category.strCategoryThumb} style={[{width: hp(6), height: hp(6)}, tw`rounded-full`]}/>
                            </View>
                            <Text style={[{fontSize: hp(1.6)}, tw`text-neutral-600`]}>{category.strCategory}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    </Animated.View>
  );
};

export default Categories;
