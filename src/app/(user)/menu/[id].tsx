import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { defaultImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { useCart } from "@/src/provider/CartProvider";
import { PizzaSize } from "@/src/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const singleProduct = products.find(
    (product) => product.id.toString() === id
  );
  const { onAddItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const router = useRouter();

  if (!singleProduct) {
    return <Text>Product not found</Text>;
  }

  const onProductAdd = () => {
    onAddItem(singleProduct, selectedSize);
    router.navigate("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${singleProduct.name}` }} />
      <Image
        source={{ uri: singleProduct.image || defaultImage }}
        style={styles.image}
      />
      <Text>Select size:</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "gainsboro" : "white",
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? "black" : "gray",
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${singleProduct.price}</Text>
      <Button text="Add to cart" onPress={onProductAdd} />
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
    marginTop: "auto",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default ProductDetailsScreen;
