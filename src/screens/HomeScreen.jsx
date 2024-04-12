import { StatusBar } from "expo-status-bar";
import React, {useEffect, useState} from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import axios from "axios";

import avatar from "../../assets/images/avatar.png";
import tw from "twrnc";

import Categories from "../components/Categories/Categories";
import Recipes from "../components/Recipes/Recipes";

const HomeScreen = () => {
    const [username, setUsername] = useState("Guest");
    const [activeCategory, setActiveCategory] = useState("Beef");
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchCategories();
        fetchRecipes();
    },[])

    const fetchCategories = async() => {
        try {
            const response = await axios.get("https://themealdb.com/api/json/v1/1/categories.php");
            if(response && response.data) {
                setCategories(response.data.categories);
            }
        } catch (error) {
            console.log("error: ", +error.message);
        }
    }

    const fetchRecipes = async(category = "Beef") => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            if(response && response.data) {
                setRecipes(response.data.meals);
            }
        } catch (error) {
            console.log("error: ", +error.message);
        }
    }

    const handleCategoryChange = (category) => {
        setRecipes([]);
        fetchRecipes(category);
        setActiveCategory(category);
    };

  return (
    <View style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        style={tw`pt-14`}
      >
        <View style={tw`mx-4 flex-row justify-between items-center mb-2`}>
          <Image
            style={{ height: hp(5.7), width: hp(5.7), marginTop: hp(0.5) }}
            source={avatar}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        <View style={tw`mx-4 mb-2`}>
          <Text style={[tw`text-neutral-600`, { fontSize: hp(1.7) }]}>
            Hi there, {username}!
          </Text>
          <View>
            <Text
              style={[
                tw`font-semibold text-neutral-600`,
                { fontSize: hp(3.8) },
              ]}
            >
              <Text style={tw`font-semibold text-neutral-600 text-amber-400`}>
                {" "}
                Cooking Recipes
              </Text>{" "}
              for all.
            </Text>
          </View>
        </View>

        {/* search bar */}
        <View
          style={tw`mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]`}
        >
          <TextInput
            placeholder="Search..."
            placeholderTextColor={"gray"}
            style={[
              { fontSize: hp(1.7) },
              tw`flex-1 text-base mb-1 pl-3 tracking-wider`,
            ]}
            onChangeText={(event) => setSearchText(event)}
          />
          <View style={tw`bg-white rounded-full p-3`}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray"/>
          </View>
        </View>

        {/** categories */}
        <View>
            {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleCategoryChange={handleCategoryChange} />}
        </View>

        {/** recipes */}
        <View>
            <Recipes categories={categories} meals={recipes.filter((recipe) => recipe.strMeal.toUpperCase().includes(searchText.toUpperCase()))} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
