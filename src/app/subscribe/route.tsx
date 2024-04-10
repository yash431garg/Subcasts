
import { frames } from "../frames";
import { Button } from "frames.js/next";
import { supabase } from "../lib/supabase";


const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

function validateEmail(text: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(text);
}

const handleRequest = frames(async (ctx) => {
    const inputText = ctx.message?.inputText
    const url = new URL(ctx.url || '');
    const param = new URLSearchParams(url.searchParams);
    const id = param.get('id');
    const fid = ctx.message?.requesterFid

    const isEmailValid = validateEmail(inputText);
    const res = await supabase.from('subscription').insert({
        email: inputText,
        fid: fid,
        blog_id: id,
    });
    if (isEmailValid && !res.error) {


        return {
            image: `${APP_URL}/thanks.png`,
            imageOptions: {
                aspectRatio: "1:1"
            },
            buttons: [
                <Button action="post" target={`${APP_URL}/frames/M50M1K`} >
                    Go Back
                </Button >,
            ],
        };

    }

    return {
        image: `${APP_URL}/error.png`,
        imageOptions: {
            aspectRatio: "1:1"

        },
        buttons: [
            <Button action="post" target={`${APP_URL}/frames/M50M1K`} >
                Go Back
            </Button >,
        ],
    };
});

export const GET = handleRequest;
export const POST = handleRequest;