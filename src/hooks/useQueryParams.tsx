import { useSearchParams } from "next/navigation";

const useQueryParams = () => {
    const searchParams = useSearchParams()
    return  Object.fromEntries(searchParams.entries());;
};

export default useQueryParams;
