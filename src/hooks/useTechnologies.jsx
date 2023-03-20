import { useQuery } from "react-query";
import { api } from '../app/api';

const getTechnologies = async () => api.get('/technologies');

export default function useTechnologies() {
    return useQuery(['get-technologies'], () => getTechnologies(), {
        // onSuccess: res => console.log(res)
    })
}