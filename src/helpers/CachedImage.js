import { Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Animated from 'react-native-reanimated';

export default function CachedImage(props) {
    const [cachedSrc, setCachedSrc] = useState(null);
    const {uri} = props;

    useEffect(() => {
        const getCachedImage = async() => {
            try {
                const cachedImgData = await AsyncStorage.getItem(uri);

                if(cachedImgData) {
                    setCachedSrc({uri: cachedImgData})
                } else {
                    const response = await fetch(uri);
                    const imageBlob = await  response.blob();
                    const base64Data = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob);
                        reader.onloadend = () => resolve(reader.result);
                    });
                    await AsyncStorage.setItem(uri, base64Data);
                    setCachedSrc({uri: base64Data});
                }

            } catch (error) {
                console.error("Error on caching img: ", error);
                setCachedSrc({uri});
            }
        } 
        getCachedImage();
    }, [])

  return (
    <Animated.Image source={cachedSrc}  {...props}/>
  )
}