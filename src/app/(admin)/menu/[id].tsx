import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { defaultImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const singleProduct = products.find(
    (product) => product.id.toString() === id
  );

  if (!singleProduct) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${singleProduct.name}` }} />
      <Image
        source={{ uri: singleProduct.image || defaultImage }}
        style={styles.image}
      />
      <Text style={styles.price}>${singleProduct.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;
