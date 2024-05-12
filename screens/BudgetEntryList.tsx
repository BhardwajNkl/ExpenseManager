import React from "react";

import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import { useSelector } from "react-redux";

import { RootState } from "../redux_store/rootReducer";

import { COLOR_3, MAIN_COLOR, SECONDARY_COLOR } from "./BudgetEntry";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons/faIndianRupee';
import { faRemove, faEdit } from "@fortawesome/free-solid-svg-icons";

export interface BudgetEntryInterface {
  itemName: string,
  plannedBudget: string,
  actualBudget: string
}

const BudgetEntryList:React.FC = () => {
  /* 
    getting the list of budget entries
  */
  const budgetEntryData = useSelector(((state:RootState)=>state.budgetEntrySlice.data));

  const renderItem = ({ item }: { item: BudgetEntryInterface }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.itemName}</Text>

      <Text style={styles.itemText}>Planned budget:
          {/* <FontAwesomeIcon style={{color:SECONDARY_COLOR}} icon={faIndianRupee} /> */}
          <Icon name="rupee" size={18} style={{color:SECONDARY_COLOR}} />
      {item.plannedBudget}
      </Text>
      <Text style={styles.itemText}>Actual budget: 
            {/* <FontAwesomeIcon style={{color:SECONDARY_COLOR}} icon={faIndianRupee} /> */}
            <Icon name="rupee" size={18} style={{color:SECONDARY_COLOR}} />
      {item.actualBudget}
      </Text>

      <View style={styles.actionButtonContainer}>
        <TouchableOpacity style={styles.actionButton}>
        {/* <FontAwesomeIcon color={SECONDARY_COLOR} icon={faEdit} /> */}
        <Icon name="edit" color={SECONDARY_COLOR} size={25} />
        <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
        {/* <FontAwesomeIcon color={SECONDARY_COLOR} icon={faRemove} /> */}
        <Icon name="trash" color={SECONDARY_COLOR} size={25} />
        <Text style={styles.actionButtonText}>Remove</Text>
        </TouchableOpacity>        
        
      </View>

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.listContainer}
        data={budgetEntryData}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ minHeight: 20 }}></View>}
        ListEmptyComponent={() => <View style={styles.listEmptyComponent}>
            <Text style={styles.listEmptyComponentText}>NO DATA FOUND!</Text>
          </View>}>
      </FlatList>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:MAIN_COLOR,
    flex: 1,
    paddingTop: 30,
    paddingBottom:30,
    alignItems:"center",
  },

  listContainer:{
    width:"80%",
    // padding:30
  },

  item: {
    borderStyle:"solid",
    borderColor:SECONDARY_COLOR,
    borderWidth:2,
    borderRadius:10,
    alignItems:"center",
    padding:10,
  },

  itemTitle:{
    color:SECONDARY_COLOR,
    textAlign:"center",
    fontSize:25,
    fontWeight:"bold",
    textTransform:"uppercase",
    marginBottom:10
  },

  itemText:{
    fontSize:20,
    marginBottom:10,
    color: SECONDARY_COLOR
  },
  
  actionButtonContainer:{
    minWidth:"90%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around"
  },

  actionButton:{
    backgroundColor:COLOR_3,
    width:"40%",
    minHeight:40,
    padding:4,
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },

  actionButtonText:{
    color:SECONDARY_COLOR,
    textAlign:"center",
    fontSize:16,
    fontWeight:"medium"
  },

  listEmptyComponent:{
    borderStyle:"solid",
    borderWidth:2,
    borderRadius:10,
    borderColor:SECONDARY_COLOR,
    height:200,
    justifyContent:"center",
    alignItems:"center",
    marginTop:"40%",
  },

  listEmptyComponentText:{
    color:SECONDARY_COLOR,
    fontSize:30
  }
})

export default BudgetEntryList;