import OpenAI from "openai";


export async function GET(request) {

    let paramQuery = request.query ?? {};
    let amount = paramQuery.amount ?? 5000;
    let category = paramQuery.category ?? "Education";
    let subCategory = paramQuery.subCategory ?? "Higher Education"
    let about = paramQuery.about ?? "Provide a detailed description of the cause you are fundraising for.";
    let age = paramQuery.age ?? 18
    let full_name = paramQuery.full_name ?? "Jabzz"
    let benificiary_relation = "For : " + paramQuery.benificiary_relation ?? "Self"
    let district = paramQuery.district ?? "Kochi";
    let state = paramQuery.state ?? "Kerala";

    let fundraisingDetails = {
        amount: amount,
        category: category,
        subCategory: subCategory,
        about: about,
        age: age,
        full_name: full_name,
        benificiary_relation: benificiary_relation,
        district: district,
        state: state
    };

    let query = "Please generate a fundraising profile description within 300 words based on the details provided below. The response should be in JSON format and the content should be polite and compassionate, reflecting the nature of a request for support.";
    query += JSON.stringify(fundraisingDetails);
    query += ".";



    const openai = new OpenAI({
        apiKey: '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',
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

    let jsonStartIndex = fullResponse.indexOf("```") + 3;
    let jsonEndIndex = fullResponse.lastIndexOf("```") - 1;
    let jsonData = JSON.parse(fullResponse.substring(jsonStartIndex, jsonEndIndex));


    let description = jsonData.description

    console.log("The description is");
    console.log(description);


    // console.log('Full Response:', fullResponse);
    return new Response(JSON.stringify({ data: description }))



}


// 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