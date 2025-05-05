import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, token: string) => {
    try {
        const url = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject: 'Reset Password',
            text: `Click on the link to reset your password: ${url}`,
        };

        await transporter.sendMail(mailOptions);
    } catch (error: any) {
        console.error('Error sending email:', error);
        throw error;
    }
};


