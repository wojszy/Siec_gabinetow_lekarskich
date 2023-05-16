import { act, render, fireEvent } from "@testing-library/react";
import PrescriptionForm from "./prescriptionForm";

describe("PrescriptionForm Component", () => {
  it("input render", () => {
    const { getByTestId } = render(<PrescriptionForm showDiv={false} />);
    const input = getByTestId("input");

    expect(input).toBeTruthy();
  });
  it("change input", () => {
    act(() => {
      const { getByTestId } = render(<PrescriptionForm showDiv={true} />);
      const input = getByTestId("input");
      const inputWord = "To jest test";
      fireEvent.change(input, { target: { value: inputWord } });
      expect(input.value).toBe(inputWord);
    });
  });
});
