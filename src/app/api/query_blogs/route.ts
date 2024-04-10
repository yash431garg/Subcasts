import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { supabase } from '../../lib/supabase';
import cryptoRandomString from 'crypto-random-string';
import { authConfig } from '@/app/lib/auth';

type ResponseData = {
  id: number;
  blog: string;
  created_at: string;
};

export async function POST(req: NextRequest) {
  const data = await req.json();
  const session = await getServerSession(authConfig);
  const id = cryptoRandomString({ length: 6, type: 'distinguishable' });
  const res = await supabase.from('blogs').insert({
    id: id,
    blog: data.blogLink,
    image_link: data.linkResult.img,
    description: data?.linkResult?.description,
    user_email: session?.user?.email,
  }); // This contains the data sent in the POST request

  if (res.error != null) {
    return NextResponse.json({ error: res.statusText }, { status: 401 });
  }
  return NextResponse.json({
    message: res.statusText,
  });
}

export async function GET(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authConfig);
  const blogsDataQuery = await supabase
    .from('blogs')
    .select()
    .eq('user_email', session?.user?.email);

  const { data, error } = blogsDataQuery;
  console.log(error);
  if (error) throw error;
  const blogsData: ResponseData[] = data;

  return NextResponse.json(blogsData);
}
