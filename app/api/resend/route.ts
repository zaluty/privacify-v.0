 
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const fromEmail = process.env.NEXT_PUBLIC_FROM_EMAIL;
const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
const audienceId = process.env.NEXT_PUBLIC_AUDIENCE_ID;
const siteUrl = process.env.NEXT_PUBLIC_DOMAIN;
const unsubscribeUrl = `${siteUrl}/unsubscribe`;
const subject = `You’re on the waitlist for ${siteName}`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
     

    const addContact = await resend.contacts.create({
      email: body.email,
      unsubscribed: false,
      audienceId: audienceId as string,
    });

    return NextResponse.json({
       
      addContact,
    });
    
  } catch (error) {
    return NextResponse.json({ error });
  }
}
