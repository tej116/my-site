import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, message } = body;

    // 1. Save to MongoDB (Your existing logic)
    const contactReport = await Contact.create(body);

    // 2. Set up Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Define the Email Content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #00d2ff;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${message}
          </div>
          <br>
          <hr>
          <p style="font-size: 12px; color: #888;">This email was sent from your Portfolio Website.</p>
        </div>
      `,
    };

    // 4. Send the Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
        success: true, 
        message: "Stored in DB and Email sent!" 
    }, { status: 201 });

  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({ 
        success: false, 
        error: error.message 
    }, { status: 400 });
  }
}