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

module.exports = router