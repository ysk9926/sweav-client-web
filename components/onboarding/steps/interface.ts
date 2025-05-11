export interface OnboardingData {
  gender: number;
  age: number;
  activityLevel: string;
}

export interface OnboardingProps {
  onBoardingData: OnboardingData;
  setOnboardingData: React.Dispatch<React.SetStateAction<OnboardingData>>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export interface ISteps {
  id: number;
  title: string;
  component: React.ComponentType<OnboardingProps>;
}

export interface MifflinModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export interface Step4Form {
  age: number;
}

export interface Step5Form {
  height: number;
  weight: number;
}

export interface Step6Form {
  activitiyLevel: string;
}

export const ActivityLevel: Record<number, string> = {
  1: "SEDENTARY",
  2: "LIGHTLY_ACTIVE",
  3: "MODERATELY_ACTIVE",
  4: "ACTIVE",
  5: "VERY_ACTIVE",
};

export interface ActivityButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export interface Step7Form {
  goalDuration: number;
  goalWeight: number;
}
