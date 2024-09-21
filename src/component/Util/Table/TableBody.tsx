

function TableBody({ data }) {

    return (
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            <tr>
                {
                    data.map((item) => {
                        return (
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                {item}
                            </td>
                        )
                    })
                }
            </tr>
        </tbody>
    )
}

export default TableBody