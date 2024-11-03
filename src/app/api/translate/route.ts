// app/api/translate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const { text, srcLang, tgtLang } = await request.json();

  if (!text || !srcLang || !tgtLang) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  const endpoint = 'https://api.opentyphoon.ai/v1/chat/completions';
  const API_KEY = process.env.OPENTYPHOON_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  };

  const messages = [
    { role: 'user', content: `"${text}" แปลภาษา${srcLang}เป็น${tgtLang}` },
    { role: 'assistant', content: '' },
  ];

  const payload = {
    model: 'typhoon-v1.5x-70b-instruct',
    max_tokens: 512,
    messages: messages,
    temperature: 0.3,
    top_p: 0.9,
    top_k: 0,
    repetition_penalty: 1.05,
    min_p: 0,
  };

  try {
    const response = await axios.post(endpoint, payload, { headers });
    const data = response.data;

    // ปรับตามรูปแบบการตอบกลับของ API
    const translation = data.choices && data.choices[0].message.content.trim();

    if (translation) {
      return NextResponse.json({ translation }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No translation found in response' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error translating text:', error.response ? error.response.data : error.message);
    return NextResponse.json({ error: 'Error translating text' }, { status: 500 });
  }
}
