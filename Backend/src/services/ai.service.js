const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const qaItem = z.object({
    question: z.string().describe("The question that can be asked in the interview"),
    intention: z.string().describe("The intention of the interviewer behind asking this question"),
    answer: z.string().describe("How to answer this question, what points to cover, what approach to take")
})

const interviewReportSchema = z.object({
    title: z.string().describe("The title of the job for which the report is generated"),
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate matches the job"),
    technicalQuestions: z.array(qaItem).describe("Technical questions with intention and how to answer"),
    behavioralQuestions: z.array(qaItem).describe("Behavioral questions with intention and how to answer"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("How important the gap is for the job")
    })).describe("Skill gaps with severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("Day number, starting from 1"),
        focus: z.string().describe("Main focus of this day"),
        tasks: z.array(z.string()).describe("Tasks to do on this day")
    })).describe("Day-wise preparation plan"),
    title: z.string().describe("The tile of the job for which the interview report is generated "),
    
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate an interview report for a candidate with the following details:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}`

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite", // use a model that is valid for your key
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: z.toJSONSchema(interviewReportSchema)
        }
    })

    // validate against the schema, then return it
    return interviewReportSchema.parse(JSON.parse(response.text))
}

module.exports = { generateInterviewReport }