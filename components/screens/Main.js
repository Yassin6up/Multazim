import React, { useEffect , useState } from 'react'
import { SafeAreaView , View, Text , StyleSheet ,ImageBackground , ScrollView } from 'react-native'
import NavBar from '../subComponents/NavBar'
import Card from '../subComponents/Card';
import Settings from './Settings';
import NextSalat from '../subComponents/NextSalat'
import QiblaPage from './Qibla';
import HomeContent from './HomeContent';
import { useSelector , useDispatch } from 'react-redux';
import Navigation from '../Navigation';

const Main = ({todayAdhan , nextSalat , longitude , latitude}) => {

    const [timingAdhan, setTimingAdhan] = useState([]);
    const [Page , sePage] = useState("")
    const currentNavigate = useSelector((state)=> state.adhan.navigation)

    useEffect(() => {
      setTimingAdhan([
        { "الفجر": todayAdhan.timings?.Fajr },
        { "الظهر ": todayAdhan.timings?.Dhuhr },
        { "العصر": todayAdhan.timings?.Asr },
        { "المغرب": todayAdhan.timings?.Maghrib },
        { "العشاء": todayAdhan.timings?.Isha }
      ]);

      if(currentNavigate === "home"){
        sePage(<HomeContent salat={nextSalat} />)
      }else if(currentNavigate === "qibla"){
        sePage(<QiblaPage latitude={latitude} longitude={longitude}/>)
      }else if(currentNavigate === "settings"){
        sePage(<Settings />)
      }

    }, [todayAdhan ,currentNavigate ]);





  return (
    <View style={styles.container}>

        <View  style={styles.NavContainer}>
        <NavBar todayTime={todayAdhan} />
        </View>
        
        <ScrollView style={styles.TimingCards} horizontal={true}   showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
        {timingAdhan.map((time, index) => {
          return <Card key={index} i={index}  data={time} />;
        })}
      </ScrollView>


        <View style={styles.pageContent}>
        
          {Page }

        <Navigation />
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container : {
        width : "100%",
        height : "100%",
        display : 'flex' , 
        alignItems : 'center'
    },
    NavContainer : {
        width : "100%",
        display : 'flex' , 
        alignItems : 'center' , 
        justifyContent : 'center' ,
        height : '10%' ,
        backgroundColor: "#3D3B40" ,
        borderBottomLeftRadius : 30 ,
        borderBottomRightRadius : 30
    },
    TimingCards:{
        width : "100%",
        height : "25%" ,
        
    }, 
    pageContent : {
        width : "100%",
        height : "65%" ,
        backgroundColor : "#3D3B40",
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30 , 
        flexDirection : 'column',
        alignItems :"center" , 
        gap : 10

    }

})

export default Main