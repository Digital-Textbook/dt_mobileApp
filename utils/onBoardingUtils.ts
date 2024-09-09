import * as SecureStore from 'expo-secure-store';

const ONBOARDING_COMPLETED_KEY = 'onboardingCompleted';

// Check if onboarding has been completed
export const isOnboardingCompleted = async (): Promise<boolean> => {
  const status = await SecureStore.getItemAsync(ONBOARDING_COMPLETED_KEY);
  return status === 'true';
};

// Set onboarding as completed
export const setOnboardingCompleted = async (): Promise<void> => {
  await SecureStore.setItemAsync(ONBOARDING_COMPLETED_KEY, 'true');
};
