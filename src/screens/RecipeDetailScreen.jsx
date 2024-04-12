import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import YoutubeIframe from "react-native-youtube-iframe";

import tw from "twrnc";
import CachedImage from "../helpers/CachedImage";
import { ChevronLeftIcon, ClockIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading/Loading";

export default function RecipeDetailScreen(props) {
  const item = props.route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleFavorite = () => {
    setIsFavorite((status) => !status);
  };

  useEffect(() => {
    fetchRecipe(item.idMeal);
  }, []);

  const fetchRecipe = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response && response.data) {
        setRecipe(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log("error: ", +error.message);
    }
  };

  const ingredientsIndexes = (recipe) => {
    if (!recipe) {
      return [];
    } else {
      const indexes = [];
      for (let i = 1; i <= 20; i++) {
        if (recipe["strIngredient" + i]) {
          indexes.push(i);
        }
      }
      return indexes;
    }
  };

  const getYoutubeId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if(match && match[1]) {
        return match[1];
    } else return null;
  }

  return (
    <ScrollView
      style={tw`bg-white flex-1`}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="light" />
      {/*Image*/}
      <View style={tw`flex-row justify-center`}>
        <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 5,
          }}
        />
      </View>

      {/**back btn */}
      <View
        style={tw`w-full absolute flex-row justify-between items-center pt-14`}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`p-2 rounded-full ml-5 bg-white`}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`p-2 rounded-full mr-5 bg-white`}
          onPress={() => handleFavorite()}
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading size="large" style={tw`mt-16`} />
      ) : (
        <View style={tw`px-4 flex justify-between pt-8`}>
          <View style={tw`mt-3`}>
            <Text
              style={[
                { fontSize: hp(3) },
                tw`font-bold flex-1 text-neutral-700`,
              ]}
            >
              {" "}
              {recipe?.strMeal}{" "}
            </Text>
            <Text
              style={[
                { fontSize: hp(2) },
                tw`mt-2 font-medium flex-1 text-neutral-500`,
              ]}
            >
              {" "}
              {recipe?.strArea}{" "}
            </Text>
          </View>

          {/*ingredients*/}
          <View style={tw`mt-3`}>
            <Text
              style={[
                { fontSize: hp(2.5) },
                tw`font-bold flex-1 text-neutral-700`,
              ]}
            >
              Ingredients
            </Text>
            <View style={tw`ml-3`}>
              {ingredientsIndexes(recipe).map((ingredient) => {
                return (
                  <View style={tw`flex-row mx-4`} key={ingredient}>
                    <View
                      style={[
                        tw`bg-amber-300 rounded-full my-1`,
                        { height: hp(1.5), width: hp(1.5) },
                      ]}
                    />
                    <View style={tw`flex-row mx-2`}>
                      <Text
                        style={[
                          tw`font-extrabold text-neutral-700`,
                          { fontSize: hp(1.7) },
                        ]}
                      >
                        {" "}
                        {recipe["strMeasure" + ingredient]}{" "}
                        {recipe["strIngredient" + ingredient]}{" "}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/*instructions*/}
          <View style={tw`mt-3`}>
            <Text
              style={[
                { fontSize: hp(2.5) },
                tw`font-bold flex-1 text-neutral-700`,
              ]}
            >
              Instructions
            </Text>
            <View style={tw`ml-3`}>
              <Text style={[tw`text-neutral-700`, { fontSize: hp(1.6) }]}>
                {" "}
                {recipe?.strInstructions}{" "}
              </Text>
            </View>
          </View>

          {/**video */}
          {recipe.strYoutube && (
            <View style={tw`my-4`}>
              <Text
                style={[
                  { fontSize: hp(2.5) },
                  tw`font-bold flex-1 text-neutral-700`,
                ]}
              >
                Video
              </Text>
              <View>
                <YoutubeIframe height={hp(30)} videoId={getYoutubeId(recipe.strYoutube)} />
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
