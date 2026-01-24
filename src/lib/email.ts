import { Resend } from 'resend';

export async function sendWelcomeEmail(email: string, name: string) {
    if (!process.env.RESEND_API_KEY) {
        console.log("---------------------------------------------------------");
        console.log(`[DEV MODE] Mock sending welcome email to: ${email}`);
        console.log(`Subject: Welcome to Store!`);
        console.log(`Body: Hi ${name}, welcome to our store! We are excited to have you.`);
        console.log("---------------------------------------------------------");
        return { success: true, id: 'mock-id' };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const data = await resend.emails.send({
            from: 'Store <onboarding@resend.dev>', // Use resend.dev for testing without domain
            to: [email],
            subject: 'Welcome to Store!',
            html: `
        <div>
          <h1>Welcome to our Store, ${name}!</h1>
          <p>We are thrilled to have you join our community.</p>
          <p>Start exploring our premium collection today.</p>
          <br/>
          <p>Best regards,</p>
          <p>The Store Team</p>
        </div>
      `,
        });
        return { success: true, data };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { success: false, error };
    }
}
