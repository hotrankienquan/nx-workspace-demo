import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useForm, FormProvider } from "react-hook-form";
import DynamicField from "../../../features/detail-claims/components/DynamicField";

function RenderWithForm(fieldProps: any, error?: any) {
  const Wrapper = () => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <DynamicField field={fieldProps} control={methods.control} error={error} />
      </FormProvider>
    );
  };
  return render(<Wrapper />);
}


export default RenderWithForm;