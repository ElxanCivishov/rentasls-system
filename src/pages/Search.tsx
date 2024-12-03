import { Loading } from "@/components/CustomLoading";
import { RoomsService } from "@/service/RoomsService";
import { useQuery } from "@tanstack/react-query";

export default function Search() {
    const { data = { data: [] }, isLoading } = useQuery({
        queryKey: ["search"],
        queryFn: async () => {
            const response = await RoomsService.getBySearch("Elxan");
            return response;
        },
    });

    // eslint-disable-next-line
    console.log("search", data);

    if (isLoading) return <Loading />;

    return <div>Axtarışlar</div>;
}
