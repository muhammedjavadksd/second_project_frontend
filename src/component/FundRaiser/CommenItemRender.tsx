import { formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper";
import FundRaiserComment from "./FundRaiserComment";
import { ISingleCommentsResponse } from "@/util/types/API Response/FundRaiser";


function CommentItemRender({ cmd }: { cmd: ISingleCommentsResponse }) {

    return (
        <FundRaiserComment comment={cmd.comment} date={formatDateToMonthNameAndDate(cmd.date)} user_id={cmd.user_id} user_name={cmd.user_name} isNested={true} />
    )
}

export default CommentItemRender