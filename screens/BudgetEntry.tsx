import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { StackNavigation } from "../App";

import { useDispatch, useSelector } from "react-redux";
import {actions} from '../redux_store/slice';

import { useEffect } from "react";

import { fetchData } from "../redux_store/slice";

import { persistData } from "../redux_store/slice";
import store from "../redux_store/configureStore";
import { RootState } from "../redux_store/rootReducer";

interface ScreenProps {
     navigation: StackNavigation
}
const BudgetEntry:React.FC<ScreenProps> = (navigation) => {

    const dispatch = useDispatch();

    const budgetEntryData = useSelector(((state:RootState)=>state.budgetEntrySlice.data));

    const [entryData, setEntryData] = useState({itemName:'',plannedBudget:'',actualBudget:''});

    // useEffect(()=>{
    //     dispatch(fetchData());
    // },[])

    const onSave = ()=>{
        console.log('Data Saved');
        // validate HERE
        // dispatch(actions.addEntry(entryData));
        const data = [...budgetEntryData, entryData];
        dispatch(persistData(data));
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
            <View style={styles.formContainer}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Enter Item Name</Text>
                    <TextInput style={styles.input} value={entryData.itemName}
                    onChangeText={(value)=>handleInputChange('itemName',value)}
                    ></TextInput>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Planned Budget</Text>
                    <TextInput style={styles.input} value={entryData.plannedBudget}
                    onChangeText={(value)=>{handleInputChange('plannedBudget',value)}}
                    ></TextInput>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Actual Budget</Text>
                    <TextInput style={styles.input} value={entryData.actualBudget}
                    onChangeText={(value)=>{handleInputChange('actualBudget',value)}}
                    ></TextInput>
                </View>
                <View style={styles.butonContainer}>
                    <View style={styles.button}>
                        <Button title="save" onPress={()=>onSave()} />
                    </View>
                    <View style={styles.button}>
                        <Button title="show budget list" onPress={()=>onShowBudgetList()}>
                    </Button></View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#E0F2F1',
        flex:1
    },

    formContainer: {
        padding: 10,
        width: '80%',
        marginHorizontal: 'auto',
        marginVertical:'auto'
    },

    formGroup: {
        marginTop:5
    },

    label: {
        textAlign: "center",
        color:"#37474F",
        fontSize:20
    },

    input: {
        borderStyle: "solid",
        borderColor: 'black',
        borderWidth: 2,
        height: 40,
    },

    button: {
        width: '49%'
    },

    butonContainer: {
        paddingTop:10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export default BudgetEntry;