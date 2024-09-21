

function TableHead({ head }: { head: string[] }) {

    return (
        <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
                {
                    head.map((item) => {
                        return (
                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <button className="flex items-center gap-x-3 focus:outline-none">
                                    <span>{item}</span>
                                </button>
                            </th>
                        )
                    })
                }
            </tr>
        </thead>
    )
}

export default TableHead