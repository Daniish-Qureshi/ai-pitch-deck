const crypto = require('crypto')
const express = require('express')
const router = express.Router()
const Groq = require('groq-sdk')
const Deck = require('../models/Deck')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

router.post('/generate', async (req, res) => {
  try {
    const { startupName, idea, targetAudience, businessModel, usp, fundingGoal, industry } = req.body

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

router.post('/save', async (req, res) => {
  try {
    const { startupName, slides, industry, fundingGoal, businessModel, userId } = req.body
    const shareId = crypto.randomUUID().slice(0, 8)

    const deck = new Deck({
      shareId,
      userId: userId || null,
      startupName,
      slides,
      industry,
      fundingGoal,
      businessModel
    })

    await deck.save()
    res.json({ shareId, shareUrl: `http://localhost:5173/deck/${shareId}` })

  } catch (error) {
    res.status(500).json({ message: 'Save error: ' + error.message })
  }
})

router.get('/share/:shareId', async (req, res) => {
  try {
    const deck = await Deck.findOne({ shareId: req.params.shareId })
    if (!deck) return res.status(404).json({ message: 'Deck nahi mila!' })
    res.json(deck)
  } catch (error) {
    res.status(500).json({ message: 'Error: ' + error.message })
  }
})

router.get('/my-decks/:userId', async (req, res) => {
  try {
    const decks = await Deck.find({ userId: req.params.userId }).sort({ createdAt: -1 })
    res.json({ decks })
  } catch (error) {
    res.status(500).json({ message: 'Error: ' + error.message })
  }
})

router.delete('/delete/:shareId', async (req, res) => {
  try {
    await Deck.findOneAndDelete({ shareId: req.params.shareId })
    res.json({ message: 'Deck delete ho gaya!' })
  } catch (error) {
    res.status(500).json({ message: 'Error: ' + error.message })
  }
})

router.post('/download-pptx', async (req, res) => {
  try {
    const { slides, startupName, template } = req.body
    const PptxGenJS = require('pptxgenjs')
    const pptx = new PptxGenJS()

    const TEMPLATE_COLORS = {
      default: ['1d4ed8','b91c1c','15803d','7e22ce','c2410c','0e7490','be185d','3730a3','a16207','0f766e'],
      ocean: ['1d4ed8','1e40af','1e3a8a','1d4ed8','2563eb','1d4ed8','1e40af','1e3a8a','1d4ed8','2563eb'],
      sunset: ['b91c1c','c2410c','a16207','b45309','c2410c','b91c1c','9a3412','a16207','b91c1c','c2410c'],
      forest: ['15803d','166534','14532d','15803d','16a34a','166534','15803d','14532d','166534','15803d'],
      galaxy: ['7e22ce','6d28d9','5b21b6','7c3aed','7e22ce','6d28d9','5b21b6','7c3aed','7e22ce','6d28d9'],
      fire: ['c2410c','b91c1c','a16207','c2410c','b45309','b91c1c','c2410c','a16207','b91c1c','c2410c'],
    }

    const colors = TEMPLATE_COLORS[template] || TEMPLATE_COLORS.default

    slides.forEach((slide, i) => {
      const pptSlide = pptx.addSlide()
      const bgColor = colors[i] || '1d4ed8'

      pptSlide.background = { color: bgColor }

      // Title tag
      pptSlide.addText(slide.title.toUpperCase(), {
        x: 0.5, y: 0.3, w: 9, h: 0.4,
        fontSize: 11,
        color: 'FFFFFF',
        transparency: 40,
        bold: false,
      })

      // Icon + Heading
      pptSlide.addText(`${slide.icon}  ${slide.heading}`, {
        x: 0.5, y: 0.8, w: 9, h: 1.2,
        fontSize: 28,
        bold: true,
        color: 'FFFFFF',
        wrap: true,
      })

      // Content
      pptSlide.addText(slide.content, {
        x: 0.5, y: 2.2, w: 9, h: 1.5,
        fontSize: 14,
        color: 'FFFFFF',
        transparency: 15,
        wrap: true,
      })

      // Bullet Points
      if (slide.bulletPoints && slide.bulletPoints.length > 0) {
        const bulletText = slide.bulletPoints.map(p => ({ text: `✦  ${p}`, options: { bullet: false, breakLine: true } }))
        pptSlide.addText(bulletText, {
          x: 0.5, y: 3.8, w: 9, h: 2,
          fontSize: 13,
          color: 'FFFFFF',
          transparency: 10,
          wrap: true,
        })
      }

      // Footer
      pptSlide.addText(startupName, {
        x: 0.5, y: 6.8, w: 4, h: 0.3,
        fontSize: 10,
        color: 'FFFFFF',
        transparency: 60,
      })

      pptSlide.addText(`Slide ${slide.slideNumber}`, {
        x: 6.5, y: 6.8, w: 3, h: 0.3,
        fontSize: 10,
        color: 'FFFFFF',
        transparency: 60,
        align: 'right',
      })
    })

    const buffer = await pptx.write({ outputType: 'nodebuffer' })

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
    res.setHeader('Content-Disposition', `attachment; filename="${startupName}_PitchDeck.pptx"`)
    res.send(buffer)

  } catch (error) {
    console.error('PPTX Error:', error)
    res.status(500).json({ message: 'PPTX error: ' + error.message })
  }
})

module.exports = router