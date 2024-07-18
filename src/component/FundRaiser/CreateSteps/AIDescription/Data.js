
import * as yup from 'yup'

const AI_description_validation = yup.object().shape({
    ai_description: yup.string("Please provide valid description").test("length", "Please provide minimum 50 words", (val) => {
        if (val) {
            return val.trim().split(" ").length >= 50
        }
    }).required("Detail description is required")
})

export { AI_description_validation }