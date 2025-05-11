import { render, screen, fireEvent } from "@testing-library/react";
import OnboardingNavigation from "../OnboardingNavigation";

jest.mock("../steps/steps", () => ({
  steps: [
    { id: 1, title: "1단계", isSkipped: false },
    { id: 2, title: "2단계", isSkipped: false },
    { id: 3, title: "3단계", isSkipped: true },
    { id: 4, title: "4단계", isSkipped: false },
  ],
}));

describe("OnboardingNavigation", () => {
  const mockSetCurrentStep = jest.fn(); // `setCurrentStep`을 모킹

  test("뒤로 가기 버튼 클릭 시 setCurrentStep 호출 확인", () => {
    render(<OnboardingNavigation currentStep={3} totalSteps={4} setCurrentStep={mockSetCurrentStep} />);

    const backButton = screen.getByLabelText("back");
    fireEvent.click(backButton);

    expect(mockSetCurrentStep).toHaveBeenCalledWith(2); // 현재 단계 -1이 호출되는지 확인
  });
});
