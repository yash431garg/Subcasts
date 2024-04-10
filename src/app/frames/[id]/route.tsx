/* eslint-disable react/jsx-key */
import { createFrames, Button } from 'frames.js/next';
import { supabase } from '../../lib/supabase'

const frames = createFrames();


const handleRequest = frames(async (ctx) => {
  // Split the string by '/'
  const parts = ctx.url.pathname.split('/');
  // Get the last part
  const Id = parts[parts.length - 1];
  const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL || ''

  try {
    const blogDataQuery = await supabase
      .from('blogs')
      .select()
      .eq('id', Id);

    const { data, error } = blogDataQuery;

    if (ctx?.message?.buttonIndex === 2) {
      return {
        image: (
          <div tw="text-2xl"
            style={{
              padding: '10px', textAlign: 'justify', width: '100%', color: "black"
            }
            }
          >
            {data?.[0].description}
          </div >
        ),
        buttons: [
          <Button action="post" target={`${NEXT_PUBLIC_URL}/frames/${data?.[0].id}`}>
            Go back
          </Button>,
        ],
      };
    }
    return {
      image: data?.[0].image_link,
      buttons: [
        <Button action="post" target={`${NEXT_PUBLIC_URL}/subscribe/?id=${Id}`}>
          Subscribe
        </Button>,
        <Button action="post" target={`${NEXT_PUBLIC_URL}/frames/${Id}`}>
          Read Summary
        </Button>,
        <Button action="link" target={data?.[0].blog}>
          Read Online
        </Button>,
      ],
      textInput: "Please enter your email",
    };
  } catch (error) {
    return {
      image: (
        <div tw="w-full h-full justify-center items-center flex text-4xl py-5">
          An Error Occured
        </div>
      ),
      buttons: [
        <Button action="post" target={`${NEXT_PUBLIC_URL}${ctx.url.pathname}`}>
          Retry
        </Button>,
      ],
    };
  }





});

export const GET = handleRequest;
export const POST = handleRequest;
