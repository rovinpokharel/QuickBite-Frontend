import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 data-[state=checked]:bg-orange-500 dark:data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-500 dark:data-[state=checked]:border-orange-600"
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, cuisine]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== cuisine)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal text-gray-900 dark:text-white cursor-pointer">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;