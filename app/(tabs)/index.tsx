import CartButton from "@/app/compontents/CartButton";
import { images, offers } from "@/constants";
import cn from "clsx";
import { Image } from "expo-image";
import { Fragment } from "react";
import { FlatList, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    return (
        <SafeAreaView className={"flex-1 bg-white "}>

            <FlatList data={offers} renderItem={({item, index}) => {
                const isEven: any = index % 2 === 0
                return (
                    <View>

                        <Pressable className={cn("offer-card", isEven ? "flex-row-reverse" : "flex-row")}
                                   android_ripple={{color: "#fffff22"}}
                                   style={{backgroundColor: item.color}}>
                            {
                                ({pressed}) => (
                                    <Fragment>
                                        <View className={"h-full w-1/2"}>
                                            <Image source={item.image}
                                                   style={{width: '100%', height: '100%'}}
                                                   contentFit="contain"/>
                                        </View>
                                        <View className={cn("offer-card__info", isEven ? "pl-10" : "pr-10")}>
                                            <Text className="h1-bold text-white leading-tight">{item.title}</Text>
                                            <Image source={images.arrowRight}
                                                   style={{width: 40, height: 40}}
                                                   contentFit={"contain"} tintColor="#fffff"/>
                                        </View>
                                    </Fragment>
                                )
                            }
                        </Pressable>
                    </View>)

            }}
                      contentContainerClassName={"pb-28 px-5"}
                      ListHeaderComponent={() => <View className={"flex-between flex-row w-full my-5 "}>
                          <View className={"flex-start"}>
                              <Text className={"small-bold text-primary"}> DELIVER TO</Text>
                              <TouchableOpacity className={"flex-center flex-row gap-x-1 mt-0.5"}>
                                  <Text className={"paragraph-bold text-dark-100"}>Croatia</Text>
                                  <Image source={images.arrowDown} style={{width: 12, height: 12}}
                                         contentFit={"contain"}/>

                              </TouchableOpacity>
                          </View>
                          <CartButton
                          />
                      </View>}
            />
        </SafeAreaView>
    );
}
