import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import { defaultImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";

const CreateProductScreen = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (!product.name || !product.price) {
      setError("Please fill all fields");
      return false;
    }

    if (isNaN(Number(product.price))) {
      setError("Price must be a number");
      return false;
    }

    setError("");
    return true;
  };

  const onCreate = () => {
    if (!validateInputs()) {
      return;
    }

    setProduct({ name: "", price: "" });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: defaultImage }} style={styles.image} />
      <Text style={styles.textButton}>Select image</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        value={product.name}
        onChangeText={(value) =>
          setProduct({ name: value, price: product.price })
        }
        style={styles.input}
      />
      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={product.price}
        onChangeText={(value) =>
          setProduct({ name: product.name, price: value })
        }
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <Button text="Create" onPress={onCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
});

export default CreateProductScreen;
