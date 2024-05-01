import React, { useState } from "react";

import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";

import { StackNavigation } from "../App";

import { useDispatch, useSelector } from "react-redux";

import { persistData } from "../redux_store/slice";
import { RootState } from "../redux_store/rootReducer";

interface ScreenProps {
     navigation: StackNavigation
}


const BudgetEntry:React.FC<ScreenProps> = (navigation) => {
    const dispatch = useDispatch();

    /* 
        getting the list of budget entries.
        when user tries to save a new entry,
        we first create a new array by appending the new entry and then state manipulation is done.
    */
    const budgetEntryData = useSelector(((state:RootState)=>state.budgetEntrySlice.data));

    // state of the budget entry form
    const [entryData, setEntryData] = useState({itemName:'',plannedBudget:'',actualBudget:''});


    const isNumeric = (str:string):boolean => {
        if (typeof str != "string") return false
        return !isNaN(str) && !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
      }

    const onSave = ()=>{
        // basic input check
        if(entryData.itemName != "" && entryData.plannedBudget != "" && entryData.actualBudget != ""){
            // check if amounts are actually numbers
            if(isNumeric(entryData.plannedBudget) && isNumeric(entryData.actualBudget)){
                const data = [entryData, ...budgetEntryData];
                dispatch(persistData(data));
                Alert.alert("Data saved successfully!");
            } else{
                Alert.alert("Budget amount must be numeric!")
            }
        } else{
            Alert.alert("All fields are mandatory!");
        }
    }

    const onShowBudgetList = ()=>{
        navigation.navigation.navigate("Budget Entry List");
    }

    const handleInputChange = (changedField:string, newValue:string)=>{
        setEntryData({
            ... entryData,
            [changedField]:newValue
        })
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.topLayer}>
                <Text style={styles.welcomeMessage}>WELCOME</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.formGroup}>
                    <TextInput style={styles.input} value={entryData.itemName}
                    onChangeText={(value)=>handleInputChange('itemName',value)}
                    placeholder="Enter item name" placeholderTextColor={"white"}
                    autoCapitalize="none"
                    ></TextInput>
                </View>
                <View style={styles.formGroup}>
                    <TextInput style={styles.input} value={entryData.plannedBudget}
                    onChangeText={(value)=>{handleInputChange('plannedBudget',value)}}
                    placeholder="Enter planned budget" placeholderTextColor={"white"}
                    keyboardType="numeric"
                    ></TextInput>
                </View>
                <View style={styles.formGroup}>
                    <TextInput style={styles.input} value={entryData.actualBudget}
                    onChangeText={(value)=>{handleInputChange('actualBudget',value)}}
                    placeholder="Enter actual Expenses" placeholderTextColor={"white"}
                    keyboardType="numeric"
                    ></TextInput>
                </View>
                <View style={styles.butonContainer}>
                        <TouchableOpacity style={styles.button} onPress={()=>onSave()}>
                            <Text style={styles.buttonText}>SAVE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>onShowBudgetList()}>
                            <Text style={styles.buttonText}>SHOW</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export const [MAIN_COLOR, SECONDARY_COLOR, COLOR_3, COLOR_4] = ["#FF0303","#FFFFFF","#D10000","black"];

const styles = StyleSheet.create({
    container:{
        backgroundColor:MAIN_COLOR,
        justifyContent:"center",
        alignItems:"center",
        flex:1
    },
    topLayer:{
        width:"80%",
        backgroundColor:SECONDARY_COLOR
    },

    welcomeMessage:{
        fontSize:26,
        color:COLOR_4,
        textAlign:"left",
        paddingLeft:5
    },

    formContainer: {
        width: '80%',
    },

    formGroup: {
        marginTop:20
    },

    label: {
        textAlign: "center",
        color:SECONDARY_COLOR,
        fontSize:20
    },

    input: {
        borderBottomWidth:2,
        borderStyle: "solid",
        borderColor: SECONDARY_COLOR,
        borderRadius:10,
        height: 50,
        fontSize:18,
        color:SECONDARY_COLOR,
    },

    butonContainer: {
        marginTop:20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center"
    },

    button: {
        width: '48%',
        backgroundColor:COLOR_3,
        minHeight:50,
        justifyContent:"center",
        borderRadius:10
    },

    buttonText:{
        fontSize:16,
        fontWeight:"medium",
        textAlign:"center",
        color:SECONDARY_COLOR
    },
})

export default BudgetEntry;