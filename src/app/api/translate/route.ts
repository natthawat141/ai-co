// app/api/translate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const { text, srcLang, tgtLang } = await request.json();

  if (!text || !srcLang || !tgtLang) {
    return NextResponse.json(
      { error: 'Missing required parameters' }, 
      { status: 400 }
    );
  }

  const endpoint = 'https://api.opentyphoon.ai/v1/chat/completions';
  const API_KEY = process.env.OPENTYPHOON_API_KEY;

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured' }, 
      { status: 500 }
    );
  }

  // ปรับ prompt ให้แปลอย่างเดียว
  const prompt = `แปล${text}จากภาษา${srcLang}เป็นภาษา${tgtLang} แสดงเฉพาะคำแปล`;

  try {
    const response = await axios.post(endpoint, 
      {
        model: 'typhoon-v1.5x-70b-instruct',
        max_tokens: 512,
        messages: [
          { 
            role: 'user', 
            content: prompt 
          }
        ],
        temperature: 0.3,
        top_p: 0.9,
        top_k: 0,
        repetition_penalty: 1.05,
        min_p: 0,
      }, 
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const translation = response.data.choices[0].message.content.trim();

    // กรองเอาเฉพาะคำแปล ตัดข้อความอื่นออก
    const cleanTranslation = translation
      .replace(/^["']|["']$/g, '') // ตัดเครื่องหมายคำพูด
      .replace(/^Translation:|Translated text:|Result:/i, '') // ตัดคำนำหน้า
      .trim();

    return NextResponse.json({ translation: cleanTranslation }, { status: 200 });

  } catch (error: any) {
    console.error('Translation error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Error translating text' }, 
      { status: 500 }
    );
  }
}