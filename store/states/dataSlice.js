import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';


const data = createSlice({
    name : "data" ,
    initialState : {
        chnageSetting : false ,
        navigation : "home" , 
        duas : [
            {
                "id" : 0 ,
                "duas" : "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْماً نَافِعاً، وَرِزْقاً طَيِّباً، وَعَمَلاً مُتَقَبَّلاً"
            },
            {
                "id" : 1 ,
                "duas" : "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ"
            },
            {
                "id" : 2 ,
                "duas" : "سُبْحَانَ اللهِ ، والْحَمْدُ للهِ ، وَاللهُ أَكْبَرُ"
            },
            {
                "id" : 3 ,
                "duas" : "لاَ إِلَهَ إِلَّا أنْـت سُـبْحانَكَ إِنِّي كُنْـتُ مِنَ الظّـالِميـن"
            },
            {
                "id" : 4 ,
                "duas" : "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ ۖ إِنَّ عَذَابَهَا كَانَ غَرَامًا إِنَّهَا سَاءَتْ مُسْتَقَرًّا وَمُقَامًا"
            },
            {
                "id" : 5 ,
                "duas" : "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ، كَمَا يُنَقَّى الثَّوْبُ الْأَ بْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالثَّلْجِ وّالْمَاءِ وَالْبَرَدِ"
            },
            {
                "id" : 6 ,
                "duas" : "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ"
            },
            {
                "id" : 7 ,
                "duas" : "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٍ"
            },
            {
                "id" : 8 ,
                "duas" : "اللَّهُمَّ أَمْسَيْنَا نُشْهِدُكَ وَنُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلاَئِكَتَكَ وَجَمِيعَ خَلْقِكَ بِأَنَّكَ الله لاَ إِلَهَ إِلاَّ أَنْتَ وَحْدَكَ لاَ شَرِيكَ لَكَ وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ"
            },
            {
                "id" : 9 ,
                "duas" : "اللَّهُمَّ مَا أََمْسَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ."
            },
            {
                "id" : 10 ,
                "duas" : "اللّهُـمَّ إِنَّـي أَسْـأَلُـكَ خَيْـرَها، وَأَعـوذُ بِكَ مِنْ شَـرِّها"
            },
            {
                "id" : 11 ,
                "duas" : "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا"
            },
            {
                "id" : 12 ,
                "duas" : "اللّهُـمَّ إِنِّي أَعْوذُ بِكَ مِنَ الهَـمِّ وَ الْحُـزْنِ، والعًجْـزِ والكَسَلِ والبُخْـلِ والجُـبْنِ، وضَلْـعِ الـدَّيْنِ وغَلَبَـةِ الرِّجال"
            },
            {
                "id" : 13 ,
                "duas" : "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ"
            },
            {
                "id" : 14 ,
                "duas" : "حُسْبِيَ اللّٰهُ لا إِلَـهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ"
            },
            {
                "id" : 15 ,
                "duas" : "وَأُفَوِّضُ أَمْرِي إِلَى اللَّهِ ۚ إِنَّ اللَّهَ بَصِيرٌ بِالْعِبَادِ"
            },
            {
                "id" : 16 ,
                "duas" : "اللّهُـمَّ اجْعَـلْ في قَلْبـي نورا ، وَفي لِسـاني نورا، وَاجْعَـلْ في سَمْعي نورا، وَاجْعَـلْ في بَصَري نورا، وَاجْعَـلْ مِنْ خَلْفي نورا، وَمِنْ أَمامـي نورا، وَاجْعَـلْ مِنْ فَوْقـي نورا ، وَمِن تَحْتـي نورا .اللّهُـمَّ أَعْطِنـي نورا."
            },
            {
                "id" : 17 ,
                "duas" : "بِسْمِ اللَّهِ تَوَكَّلْـتُ عَلَى اللَّهِ، وَلاَ حَوْلَ وَلاَ قُـوَّةَ إِلاَّ بِاللَّهِ."
            },
            {
                "id" : 18 ,
                "duas" : "اَللَّهُـمَّ إِنِّي أَعُـوذُ بِكَ أَنْ أَضِـلَّ أَوْ أُضَـلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِـمَ أَوْ أَُظْلَـمَ، أَوْ أَجْهَلَ أَوْ يُـجْهَلَ عَلَـيَّ ."
            },
            {
                "id" : 19 ,
                "duas" : "بِسْمِ اللَّهِ اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا"
            },
            {
                "id" : 20 ,
                "duas" : "بِسْمِ اللّهِ وَالصَّلاَةُ وَالسَّلاَمُ عَلَى رَسُولِ اللّهِ، اَللَّهُـمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْـلِكَ، اَللَّهُـمَّ اعْصِمْنِـي مِنَ الشَّيْـطَانِ الرَّجِـيمِ."
            }
        
        ] , 


    }, 
    reducers :{
        setNavigate : (state, action)=>{
            console.log(action.payload)
            state.navigation = action.payload
        }, 
        setSetting: (state, action) => {
            state.chnageSetting = !state.chnageSetting
          },
    
    } ,
    
})


export const {setAdhan , setSkipWelcome , setNavigate  , setSetting } = data.actions
export default data.reducer