
import * as yup from 'yup'

let AI_description_validation = yup.object().shape({
    ai_description: yup.string("Please provide valid description").test("length", "Please provide minimum 50 words", (val) => {
        return val.trim().split(" ").length >= 50
    })
})

export { AI_description_validation }