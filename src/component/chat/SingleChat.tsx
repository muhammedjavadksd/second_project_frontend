import SingleChatScreen from "../section/SingleChatScreen";

function SingleChat() {

    return (
        <SingleChatScreen
            current_user={{
                name: "Muhammed Javad",
            }}
            msg={
                [{
                    from: "123",
                    timeline: "12/02/1022",
                    msg: "Hello world",
                    seen: false
                }]}
        />

    )
}

export default SingleChat