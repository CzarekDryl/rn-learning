import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default function TabOneScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
