import React from 'react';
import PaginationTab from './PaginationTab';

interface PaginatedSectionProps {
    children?: React.ReactNode,
    onPaginated: (limit: number, page: number) => void,
    total_pages: number,
    total_records: number
}


class PaginationSection extends React.Component<PaginatedSectionProps> {

    render() {
        return (
            <>
                {this.props.children}
                <PaginationTab total_pages={this.props.total_pages} total_records={this.props.total_records} from={1} to={10} onClick={() => { }} />
            </>
        );
    }
}

export default PaginationSection;
