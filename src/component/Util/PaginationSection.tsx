import React, { useEffect, useState } from 'react';
import PaginationTab from './PaginationTab';
import { AxiosHeaders, AxiosInstance } from 'axios';
import { PaginatedApi } from '@/util/types/InterFace/UtilInterface';
import { Type } from 'typescript';

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


function PaginationSection({ itemsRender, api, paginationProps, refresh }: { itemsRender: Function, api: PaginatedApi, paginationProps: PaginationProps, refresh: boolean }) {

    const [page, setPage] = useState<number>(paginationProps.current_page)
    const [limit, setLimit] = useState<number>(paginationProps.currentLimit)
    const [response, setResponse] = useState([])
    const [totalRecords, setTotalRecords] = useState<number>()
    const [currenUrl, setCurrentUrl] = useState("");


    async function fetchData() {
        try {
            console.log(api);
            const { paginated, total_records } = await api.renderType(page, limit);
            console.log(paginated);

            setResponse(paginated ?? []);
            setTotalRecords(total_records);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData()
    }, [page, limit, refresh])

    return (
        <>

            {itemsRender(response)}
            <PaginationTab onClick={(newPage) => { setPage(newPage) }} item_per_page={paginationProps.currentLimit} total_records={totalRecords} />
        </>
    )
}

export default PaginationSection;
