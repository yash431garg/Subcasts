import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from '@coinbase/onchainkit';
import { supabase } from '../../lib/supabase';

type ResponseData = {
  message: string;
};

const NEXT_PUBLIC_URL = process.env.APP_URL;

export async function POST(
  req: NextRequest,
  res: NextApiResponse<ResponseData>
) {
  let accountAddress: string | undefined = '';

  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: 'NEYNAR_ONCHAIN_KIT',
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  if (message?.input) {
    const inputText = message.input;

    // Validate if the input is a valid email
    const isEmailValid = validateEmail(inputText);

    if (isEmailValid) {
      // Store the email in the Supabase database'
      await supabase.from('subscription').insert({ email: inputText });
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: `Go back: ${inputText}`,
            },
          ],
          image: {
            src: `${NEXT_PUBLIC_URL}/thanks.png`,
            aspectRatio: '1:1',
          },
          postUrl: `${body.untrustedData.url}/`,
        })
      );
    }
  }
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Enter a valid email`,
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/error.png`,
        aspectRatio: '1:1',
      },
      postUrl: `${body.untrustedData.url}/`,
    })
  );
}

// Function to validate email
function validateEmail(text: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(text);
}
