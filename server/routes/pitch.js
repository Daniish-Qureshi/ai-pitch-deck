const express = require('express')
const router = express.Router()
const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

router.post('/generate', async (req, res) => {
  try {
    const {
      startupName,
      idea,
      targetAudience,
      businessModel,
      usp,
      fundingGoal,
      industry
    } = req.body

    const prompt = `
You are an expert startup pitch deck consultant. Generate a professional 10-slide pitch deck for an Indian startup.

Startup Details:
- Name: ${startupName}
- Idea: ${idea}
- Target Audience: ${targetAudience}
- Business Model: ${businessModel}
- Unique Selling Point: ${usp}
- Funding Goal: ${fundingGoal}
- Industry: ${industry}

Generate exactly 10 slides. Return ONLY a valid JSON array with this exact format, no extra text:
[
  {
    "slideNumber": 1,
    "title": "slide title",
    "heading": "main heading",
    "content": "detailed content for this slide",
    "bulletPoints": ["point 1", "point 2", "point 3"],
    "icon": "emoji"
  }
]

Slides must be: 1) Cover 2) Problem 3) Solution 4) Market Size 5) Product 6) Business Model 7) Traction 8) Competitive Analysis 9) Team 10) The Ask

Make content specific to Indian market. Use INR for financial figures. Be professional and investor-ready.
`

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 4000,
    })

    const text = completion.choices[0]?.message?.content || ''

    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      return res.status(500).json({ message: 'AI response parse nahi hua!' })
    }

    const slides = JSON.parse(jsonMatch[0])

    res.json({ slides, startupName })

  } catch (error) {
    console.error('AI Error:', error)
    res.status(500).json({ message: 'AI error: ' + error.message })
  }
})

router.post('/score', async (req, res) => {
  try {
    const { slides, startupName } = req.body

    const prompt = `
You are an expert startup investor and pitch deck evaluator.

Analyze this pitch deck for "${startupName}" and give a detailed score.

Slides content:
${slides.map(s => `Slide ${s.slideNumber} - ${s.title}: ${s.heading}. ${s.content}`).join('\n')}

Return ONLY a valid JSON object like this:
{
  "totalScore": 78,
  "grade": "B+",
  "summary": "Overall feedback in 2-3 sentences",
  "categories": [
    { "name": "Problem Clarity", "score": 8, "maxScore": 10, "feedback": "specific feedback" },
    { "name": "Solution Strength", "score": 7, "maxScore": 10, "feedback": "specific feedback" },
    { "name": "Market Size", "score": 8, "maxScore": 10, "feedback": "specific feedback" },
    { "name": "Business Model", "score": 7, "maxScore": 10, "feedback": "specific feedback" },
    { "name": "Competitive Edge", "score": 6, "maxScore": 10, "feedback": "specific feedback" },
    { "name": "Traction", "score": 5, "maxScore": 10, "feedback": "specific feedback" },
    { "name": "Team", "score": 6, "maxScore": 10, "feedback": "specific feedback" },
    { "name": "Financial Ask", "score": 7, "maxScore": 10, "feedback": "specific feedback" }
  ],
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "investorVerdict": "Would invest / Would not invest yet / Needs more traction"
}
`

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      max_tokens: 2000,
    })

    const text = completion.choices[0]?.message?.content || ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return res.status(500).json({ message: 'Score parse nahi hua!' })
    }

    const scoreData = JSON.parse(jsonMatch[0])
    res.json(scoreData)

  } catch (error) {
    console.error('Score Error:', error)
    res.status(500).json({ message: 'Score error: ' + error.message })
  }
})

router.post('/india-schemes', async (req, res) => {
  try {
    const { industry, fundingGoal, businessModel } = req.body

    const prompt = `
You are an expert on Indian government schemes and startup funding.

For a startup with these details:
- Industry: ${industry}
- Funding Goal: ${fundingGoal}
- Business Model: ${businessModel}

Suggest the most relevant Indian government schemes, grants, and funding options.

Return ONLY a valid JSON array:
[
  {
    "name": "Scheme name",
    "ministry": "Ministry name",
    "benefit": "What benefit they get",
    "amount": "Amount in INR",
    "eligibility": "Who can apply",
    "link": "official website",
    "icon": "emoji"
  }
]

Include schemes like: Startup India, MSME loans, Mudra Yojana, SIDBI, Atal Innovation Mission, Digital India, sector-specific schemes. Give exactly 5 most relevant schemes.
`

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      max_tokens: 2000,
    })

    const text = completion.choices[0]?.message?.content || ''
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      return res.status(500).json({ message: 'Schemes parse nahi huyi!' })
    }

    const schemes = JSON.parse(jsonMatch[0])
    res.json({ schemes })

  } catch (error) {
    console.error('Schemes Error:', error)
    res.status(500).json({ message: 'Schemes error: ' + error.message })
  }
})

module.exports = router