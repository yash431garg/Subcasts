import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { parse } from 'node-html-parser';
import * as cheerio from 'cheerio';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';
import { getFrameHtmlResponse } from '@coinbase/onchainkit';

export async function POST(req: NextRequest) {
  try {
    // const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });
    const data = await req.json(); // This contains the data sent in the POST request

    const response = await fetch(data);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const imageLink = $('meta[property="og:image"]').attr('content');
    // const description = $('meta[property="og:description"]').attr('content');

    // Parse HTML using node-html-parser
    // Remove internal style and script tags
    $('style').remove();
    $('script').remove();

    // Remove inline styles from all elements
    $('[style]').removeAttr('style');

    // Extract text content
    const textContent = $('body').text();
    // console.log(textContent);

    // const completion = await openai.chat.completions.create({
    //   messages: [{ role: 'system', content: `Summarize: ${textContent}` }],
    //   model: 'gpt-3.5-turbo',
    // });
    // console.log(completion.choices[0].message.content);
    return NextResponse.json({
      img: imageLink,
      description: '',
      // completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
