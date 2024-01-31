import NextSalat from "../subComponents/NextSalat"
import DuasCard from './../subComponents/DuasCard';
import Tasbih from "../subComponents/Tasbih";
import { ScrollView , StyleSheet } from "react-native";
const HomeContent = (props) => {
    return (
        <ScrollView  
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
       >
            <NextSalat nextPrayer={props.salat} />
            <DuasCard />
            <Tasbih />
        </ScrollView>
    )
}



export default HomeContent