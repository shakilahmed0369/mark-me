
import { toast } from "react-toastify";
import axios from "axios";

export const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const errors = error.response?.data?.errors;
        if (errors) {
            Object.entries(errors).forEach(([key, value]) => {
                toast.error((value as string[])[0], { position: "bottom-right" });
            });
        } else if (error.response?.data?.message) {
            toast.error(error.response.data.message, { position: "bottom-right" });
        } else {
            toast.error("Something went wrong!", { position: "bottom-right" });
        }
    } else {
        console.error("An unexpected error occurred:", error);
        toast.error("An unexpected error occurred!", { position: "bottom-right" });
    }
};
