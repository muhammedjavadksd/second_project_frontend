import React, { useEffect, useState } from 'react';
import PaginationTab from './PaginationTab';
import { AxiosHeaders, AxiosInstance } from 'axios';

interface PaginatedSectionProps {
    children?: React.ReactNode,
    onPaginated: (limit: number, page: number) => void,
    total_pages: number,
    total_records: number
}

interface PaginationProps {
    current_page: number,
    currentLimit: number
}

interface ApiInstance {
    axiosInstance: AxiosInstance,
    apiUrl: string,
    axiosHeader: AxiosHeaders,
    limitLabel: string,
    pageLabel: string
    dataLabel: string //property where axios return data
}


function PaginationSection({ itemsRender, api, paginationProps }: { itemsRender: Function, api: ApiInstance, paginationProps: PaginationProps }) {

    const [page, setPage] = useState<number>(paginationProps.current_page)
    const [limit, setLimit] = useState<number>(paginationProps.currentLimit)
    const [response, setResponse] = useState([])
    const [currenUrl, setCurrentUrl] = useState("");

    async function fetchData() {
        console.log(api);

        const url = await api.apiUrl.replace(api.pageLabel, page.toString()).replace(api.limitLabel, limit.toString())
        setCurrentUrl(url);
        try {
            const dataApi = await api.axiosInstance.get(url, { headers: api.axiosHeader });
            const data = dataApi.data;
            console.log(data);
            console.log(api.dataLabel);
            console.log(data[api.dataLabel]);


            const response = data[api.dataLabel];

            setResponse(response)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchData()
    }, [page, limit])

    return (
        <>
            {currenUrl}
            {itemsRender(response)}
            <PaginationTab from={1} onClick={(newPage) => { setPage(newPage) }} to={5} total_pages={10} total_records={100} />
        </>
    )
}

export default PaginationSection;
