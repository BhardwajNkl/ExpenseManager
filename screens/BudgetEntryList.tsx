import React from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux_store/rootReducer";

export interface BudgetEntryInterface {
  itemName: string,
  plannedBudget: string,
  actualBudget: string
}

const BudgetEntryList:React.FC = () => {
  const budgetEntryData = useSelector(((state:RootState)=>state.budgetEntrySlice.data));
  console.log(budgetEntryData)
  const renderItem = ({ item }: { item: BudgetEntryInterface }) => (
    <View style={styles.item}>
      <Text>{item.itemName}</Text>
      <Text>{item.plannedBudget}</Text>
      <Text>{item.actualBudget}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={budgetEntryData}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ minHeight: 15 }}></View>}
        ListEmptyComponent={() => <View><Text>No Items</Text></View>}
      >
      </FlatList>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0F2F1',
    flex: 1,
    padding: 10,
  },

  item: {
    minWidth:'70%',
    marginHorizontal:'auto',
    borderStyle:"solid",
    borderWidth:1,
    padding:5
  }
})

export default BudgetEntryList;