import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function Layout() {
    const defaultScreenOptions = { headerShown: false };

    return (
        <Stack>
            <Stack.Screen name="onboarding" options={defaultScreenOptions} />
            <Stack.Screen name="non-bhutanese-sign-up" options={defaultScreenOptions} />
            <Stack.Screen name="users/sign-in" options={defaultScreenOptions} />
            <Stack.Screen name="otp/[user_id]" options={defaultScreenOptions} />
            <Stack.Screen name="forgot-password" options={defaultScreenOptions} />
            <Stack.Screen name="set-password/[user_id]" options={defaultScreenOptions} />
            <Stack.Screen name="user-type" options={defaultScreenOptions} />
            <Stack.Screen name="users/search-by-cid" options={defaultScreenOptions} />
            <Stack.Screen name="users/sign-up/bhutanese" options={defaultScreenOptions} />
            <Stack.Screen name="users/sign-up/non-bhutanese" options={defaultScreenOptions} />
        </Stack>
    );
}
