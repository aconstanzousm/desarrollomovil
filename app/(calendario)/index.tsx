import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Calendario = () => {
    return (
        <View style={styles.container}>
            <Calendar/>
        </View>
    );
};

export default Calendario;

const styles = StyleSheet.create({
    container:{
        marginTop:50
    }
});