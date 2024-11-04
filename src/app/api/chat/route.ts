// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.OPENTYPHOON_API_KEY;
const API_URL = 'https://api.opentyphoon.ai/v1/chat/completions';

const systemPrompt = `You are a senior web developer who only speaks English. 
Your expertise includes React, Next.js, TypeScript, and modern web development practices. 
You should respond professionally but friendly, providing technical guidance and best practices.
Always provide practical examples when relevant.`;

export async function POST(request: NextRequest) {
  try {
    const { userMessage, conversationHistory = [] } = await request.json();

    if (!API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // First call - Translate Thai to English
    const translateResponse = await axios.post(API_URL, {
      model: 'typhoon-v1.5x-70b-instruct',
      messages: [
        {
          role: 'system',
          content: 'You are a professional translator. Translate the following Thai message to English, maintaining technical terms as is.'
        },
        {
          role: 'user',
          content: `Translate this Thai message to English: "${userMessage}"`
        }
      ],
      temperature: 0.3,
      max_tokens: 256
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const englishMessage = translateResponse.data.choices[0].message.content.trim();

    // Second call - Get developer response
    const devResponse = await axios.post(API_URL, {
      model: 'typhoon-v1.5x-70b-instruct',
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversationHistory,
        { role: 'user', content: englishMessage }
      ],
      temperature: 0.7,
      max_tokens: 512
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const devAnswer = devResponse.data.choices[0].message.content.trim();

    // Third call - Translate response back to Thai
    const translateBackResponse = await axios.post(API_URL, {
      model: 'typhoon-v1.5x-70b-instruct',
      messages: [
        {
          role: 'system',
          content: 'You are a professional translator. Translate the following English message to Thai, maintaining technical terms in English.'
        },
        {
          role: 'user',
          content: `Translate this English message to Thai: "${devAnswer}"`
        }
      ],
      temperature: 0.3,
      max_tokens: 512
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const thaiAnswer = translateBackResponse.data.choices[0].message.content.trim();

    return NextResponse.json({
      originalMessage: userMessage,
      englishMessage,
      devResponse: devAnswer,
      thaiTranslation: thaiAnswer
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message);
    return NextResponse.json({ 
      error: 'Error processing request',
      details: error.response?.data || error.message 
    }, { status: 500 });
  }
}