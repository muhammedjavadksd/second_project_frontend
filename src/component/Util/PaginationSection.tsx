import React, { useEffect, useState } from 'react';
import PaginationTab from './PaginationTab';
import { AxiosHeaders, AxiosInstance } from 'axios';
import { PaginatedApi } from '@/util/types/InterFace/UtilInterface';
import { Type } from 'typescript';
import SpinnerLoader from './SpinningLoader';
import { FaSpinner } from 'react-icons/fa';

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
    const [isLoading, setLoading] = useState<boolean>(false);


    async function fetchData() {
        setLoading(true)
        try {
            console.log(api);
            const { paginated, total_records } = await api.renderType(page, limit);
            console.log(paginated);

            setResponse(paginated ?? []);
            setTotalRecords(total_records);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [page, limit, refresh])

    return (
        <>

            {
                isLoading ? (
                    <div className='mt-3'>
                        <div className='flex justify-center items-center'>
                            <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
                        </div>
                        {/* <img className='w-full' src='/skelton.gif' /> */}
                        {/* <SpinnerLoader isLoading={true} /> */}
                    </div>
                ) : (
                    <>
                        {itemsRender(response)}
                    </>
                )
            }
            <PaginationTab onClick={(newPage) => { setPage(newPage) }} item_per_page={paginationProps.currentLimit} total_records={totalRecords} />


        </>
    )
}

export default React.memo(PaginationSection);
