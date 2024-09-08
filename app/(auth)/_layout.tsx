import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function Layout() {
    const defaultScreenOptions = { headerShown: false };

    return (
        <Stack>
            <Stack.Screen name="onboarding" options={defaultScreenOptions} />
            <Stack.Screen name="sign-up" options={defaultScreenOptions} />
            <Stack.Screen name="non-bhutanese-sign-up" options={defaultScreenOptions} />
            <Stack.Screen name="sign-in" options={defaultScreenOptions} />
            <Stack.Screen name="otp/[user_id]" options={defaultScreenOptions} />
            <Stack.Screen name="forgot-password" options={defaultScreenOptions} />
            <Stack.Screen name="set-password/[user_id]" options={defaultScreenOptions} />
            <Stack.Screen name="user-type" options={defaultScreenOptions} />
            <Stack.Screen name="search" options={defaultScreenOptions} />
        </Stack>
    );
}
