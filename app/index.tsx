import AuthContext from "@/context/AuthContext";
import { isOnboardingCompleted, setOnboardingCompleted } from "@/utils/onBoardingUtils";

import { Redirect } from 'expo-router';
import { useEffect, useContext, useState } from 'react';

export default function Index() {
    const { isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            const completed = await isOnboardingCompleted();
            if (!completed) {
                setShowOnboarding(true);
            }
            setIsLoading(false);
        };

        checkOnboardingStatus();
    }, []);

    if (showOnboarding) {
        return <Redirect href={"/onboarding"} />
    }

    if (isAuthenticated) {
        return <Redirect href={"/home"} />
    } 
}
