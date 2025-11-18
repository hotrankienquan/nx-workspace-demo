import { fireEvent, screen } from "@testing-library/dom";
import RenderWithForm from "../../../globals/utils/tests/RenderWithForm";

describe("DynamicField", () => {
    it("renders a text field", () => {
        //Given
        RenderWithForm({
            type: "text",
            id: "name",
            label: "Name",
            placeholder: "Enter name",
            validation: { required: true },
        });
        //When
        const input = screen.getByLabelText(/Name/i);
        //Then
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", "Enter name");
        //When
        fireEvent.change(input, { target: { value: "Alice" } });
        //Then
        expect(input).toHaveValue("Alice");
    });

    it("renders a number field and parses numeric input", () => {
        //Given
        RenderWithForm({
            type: "number",
            id: "age",
            label: "Age",
            placeholder: "Enter age",
        });
        //When
        const input = screen.getByLabelText(/Age/i);
        fireEvent.change(input, { target: { value: "42" } });
        //Then
        expect(input).toHaveValue(42);
    });

    it("renders a dropdown with options", () => {
        //Given
        RenderWithForm({
            type: "dropdown",
            id: "country",
            label: "Country",
            options: [
                { value: "vn", label: "Vietnam" },
                { value: "us", label: "USA" },
            ],
        });

        //When
        const select = screen.getByRole("combobox", { name: /Country/i });
fireEvent.mouseDown(select);
        const option = screen.getByText(/Vietnam/i);
        //Then
        expect(option).toBeInTheDocument();
    });

    it("renders radio buttons", () => {
        //Given
        RenderWithForm({
            type: "radio",
            id: "gender",
            label: "Gender",
            options: [
                { value: "m", label: "Male" },
                { value: "f", label: "Female" },
            ],
        });
        //When
        const maleRadio = screen.getByRole("radio", { name: "Male" });
        const femaleRadio = screen.getByRole("radio", { name: "Female" });
        //Then
        expect(maleRadio).toBeInTheDocument();
        expect(femaleRadio).toBeInTheDocument();
        //When
        fireEvent.click(maleRadio);
        //Then
        expect(maleRadio).toBeChecked();
        expect(femaleRadio).not.toBeChecked();
    });

    it("renders a textarea", () => {
        //Given
        RenderWithForm({
            type: "textarea",
            id: "desc",
            label: "Description",
            placeholder: "Enter description",
        });
        //When
        const textarea = screen.getByLabelText(/Description/i);
        //Then
        expect(textarea).toBeInTheDocument();
        fireEvent.change(textarea, { target: { value: "Hello world" } });
        expect(textarea).toHaveValue("Hello world");
    });

    it("shows error message when error prop is passed", () => {
        //Given
        RenderWithForm(
            {
                type: "text",
                id: "name",
                label: "Name",
            },
            { message: "Name is required" }
        );
        //Then
        expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    });
});
