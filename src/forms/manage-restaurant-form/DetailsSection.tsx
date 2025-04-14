import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function DetailsSection() {
    const { control } = useFormContext();
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Details</h2>
                <FormDescription className="text-gray-600 dark:text-gray-400">
                    Enter the basic details of your restaurant
                </FormDescription>
            </div>
            <FormField
                control={control}
                name="restaurantName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-900 dark:text-white">Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                        </FormControl>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                    </FormItem>
                )}
            />
            <div className="flex gap-4">
                <FormField
                    control={control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel className="text-gray-900 dark:text-white">City</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                            </FormControl>
                            <FormMessage className="text-red-500 dark:text-red-400" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="country"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel className="text-gray-900 dark:text-white">Country</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                            </FormControl>
                            <FormMessage className="text-red-500 dark:text-red-400" />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={control}
                name="deliveryPrice"
                render={({ field }) => (
                    <FormItem className="max-w-[25%]">
                        <FormLabel className="text-gray-900 dark:text-white">Delivery price (रु.)</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="1.50" />
                        </FormControl>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="estimatedDeliveryTime"
                render={({ field }) => (
                    <FormItem className="max-w-[25%]">
                        <FormLabel className="text-gray-900 dark:text-white">Estimated Delivery Time (minutes)</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="30" />
                        </FormControl>
                        <FormMessage className="text-red-500 dark:text-red-400" />
                    </FormItem>
                )}
            />
        </div>
    )
}
