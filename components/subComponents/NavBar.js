import { StyleSheet, ImageBackground, View , Text} from 'react-native';
import moment from 'moment';
import { useState , useEffect } from 'react';

const NavBar =({todayTime})=>{


    const [formattedHijriDate, setFormattedHijriDate] = useState('');
    const [today, setToday] = useState('');


  useEffect(() => {
    const currentDate = new Date();

    // Specify the locale as 'ar-u-ca-islamic' for Arabic and Islamic calendar
    const hijriFormatter = new Intl.DateTimeFormat('ar-u-ca-islamic', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formattedDate = hijriFormatter.format(currentDate);

    // Extract the year from the formatted date to include 'AH'
    // const year = new Intl.DateTimeFormat('ar-u-ca-islamic', { year: 'numeric' }).format(currentDate);

    setFormattedHijriDate(`${formattedDate}`);

    setToday(moment().format('MMMM Do YYYY'))

  }, []);
        
    return (
        <View style={styles.container}>
        <Text style={styles.dateText}>{formattedHijriDate}</Text>
        <Text style={styles.subDate}>( {today} )</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width : "90%",
        height : '70%' , 
        borderRadius : 50 ,
        backgroundColor : "#525CEB",
        display :'flex' ,
        justifyContent : "center" ,
        alignItems : "center",
        
    },
    dateText : {
        color: "white" ,
        fontSize : 20 , 
        fontWeight : "600" ,
        fontFamily : 'InterMedium'
    },
    subDate : { 
        color: "white" ,
        fontSize : 15 ,
        fontFamily : 'InterMedium'
    }
})

export default NavBar