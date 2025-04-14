import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function ImageSection() {
    const { control, watch } = useFormContext();
    const existingImageUrl = watch("imageUrl");
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Image</h2>
                <FormDescription className="text-gray-600 dark:text-gray-400">
                    Add an image that will be displayed on your restaurant listing in the
                    search results. Adding a new image will overwrite the existing one.
                </FormDescription>
            </div>

            <div className="flex flex-col gap-8 md:w-[50%]">
                {existingImageUrl && (
                    <AspectRatio ratio={16 / 9}>
                        <img
                            src={existingImageUrl}
                            className="rounded-md object-cover h-full w-full"
                        />
                    </AspectRatio>
                )}
                <FormField
                    control={control}
                    name="imageFile"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 file:text-gray-900 dark:file:text-white file:bg-gray-100 dark:file:bg-gray-700"
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(event) =>
                                        field.onChange(
                                            event.target.files ? event.target.files[0] : null
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage className="text-red-500 dark:text-red-400" />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}
