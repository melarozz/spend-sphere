import { createStackNavigator } from '@react-navigation/stack';

import Index from './index';
import Analytics from './analytics';
import RegularPayments from './regularPayments';

const Stack = createStackNavigator();

function App() {
    return (
        <Stack.Navigator initialRouteName="Главная" screenOptions={{ headerShown: false, gestureEnabled: false  }}>
            <Stack.Screen name="Главная" component={Index}/>
            <Stack.Screen name="Аналитика" component={Analytics} />
            <Stack.Screen name="Регулярные платежи" component={RegularPayments} />
        </Stack.Navigator>
    );
}

export default App;
