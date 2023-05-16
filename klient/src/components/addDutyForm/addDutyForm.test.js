import { act, render, fireEvent } from "@testing-library/react";
import AddDutyForm from "./addDutyForm";

describe("AddDuty Component", () => {
  it("render select", () => {
    const { getByTestId } = render(<AddDutyForm showDiv={false} />);
    const select = getByTestId("selekt");

    expect(select).toBeTruthy();
  });
  it("options changes", () => {
    act(() => {
      const { getByTestId } = render(<AddDutyForm showDiv={false} />);
      const option = getByTestId("optionSelect");
      fireEvent.change(option, { target: { value: 2 } });
      expect(option.value).toBe("2");
    });
  });
});
