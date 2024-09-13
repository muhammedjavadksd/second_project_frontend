import OpenAI from "openai";


export async function GET(request) {

    try {
        let url = new URL(request.url);
        let { searchParams } = url;

        let amount = searchParams.get("amount") ?? 5000;
        let category = searchParams.get("category") ?? "Education";
        let subCategory = searchParams.get("sub_category") ?? "Higher Education"
        let about = searchParams.get("description") ?? "Provide a detailed description of the cause you are fundraising for.";
        let age = searchParams.get("raiser_age") ?? 18
        let full_name = searchParams.get("raiser_name") ?? "Jabzz"
        let benificiary_relation = "For : " + searchParams.get("benificiary_relation") ?? "Self"
        let district = searchParams.get("district") ?? "Kochi";
        let state = searchParams.get("state") ?? "Kerala";
        // let city = searchParams.get("city") ?? "Kochi";
        // let description_ = searchParams.get("description") ?? ""

        let fundraisingDetails = {
            amount: amount,
            category: category,
            subCategory: subCategory,
            about: about,
            age: age,
            full_name: full_name,
            benificiary_relation: benificiary_relation,
            district: district,
            state: state,
            description: about
        };

        let query = "Please generate a fundraising profile description within 300 words based on the details provided below. The response should be start with *** and endwith *** and the content should be polite and compassionate, reflecting the nature of a request for support.";
        query += JSON.stringify(fundraisingDetails);
        query += ".";



        const openai = new OpenAI({
            apiKey: process.env.NEXT_PUBLIC_NVIDIA_API,
            baseURL: 'https://integrate.api.nvidia.com/v1',
        })



        const completion = await openai.chat.completions.create({
            model: "meta/llama3-70b-instruct",
            messages: [{ "role": "user", "content": query }],
            temperature: 0.5,
            top_p: 1,
            max_tokens: 1024,
            stream: true,
        })

        let fullResponse = ""


        for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
                fullResponse += content;
            }
        }
        console.log('Full Response:', fullResponse);

        let jsonStartIndex = fullResponse.indexOf("***") + 3;
        let jsonEndIndex = fullResponse.lastIndexOf("***") - 1;
        let description = fullResponse.substring(jsonStartIndex, jsonEndIndex);


        console.log('Full Response:', description);

        return new Response(JSON.stringify({ status: true, data: description }), { status: 200 })
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ status: false, data: description }), { status: 500 })
    }



}


// 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