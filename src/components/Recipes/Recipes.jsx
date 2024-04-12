import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "@react-navigation/native";

import RecipeCard from "../RecipeCard/RecipeCard";
import Loading from "../Loading/Loading";

export default function Recipes({categories, meals}) {
    
  const navigation = useNavigation();

  return (
    <View style={tw`mt-2 mx-4`}>
      <Text style={[{ fontSize: hp(3) }, tw`text-neutral-600 font-semibold`]}>
        Recipes
      </Text>
      <View>
        {
            (categories.length === 0 || meals.length ===  0) ? (
                <Loading style={tw`mt-20`} size="large" />
            ) : (
                <MasonryList
                data={meals}
                keyExtractor={(item) => item.idMeal}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
              //   refreshing={isLoadingNext}
              //   onRefresh={() => refetch({ first: ITEM_CNT })}
                onEndReachedThreshold={0.1}
              //   onEndReached={() => loadNext(ITEM_CNT)}
              />
            )
        }
      </View>
    </View>
  );
}
