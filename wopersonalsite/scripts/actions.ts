"use server"
import { Resend } from "resend";
import EmailTemplate from "../components/Email";

interface State {
    error: string | null,
    success: boolean,
}

/**
 * sendEmail:           send an email with user message to me.
 *
 * Uses the Resend API to send emails to my own email
 * Allows users to contact me
 *  
 * @param prevSate      form state
 * @param formData      the content of the form as entered by the user
 * @returns 
 */
export const sendEmail = async (prevSate: State, formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
            //from: process.env.AUTO_SENDER_ADDRESS as string,
            from: `Will <${process.env.AUTO_SENDER_ADDRESS}>`,
            to: process.env.MY_EMAIL_ADDRESS as string,
            subject: "Form submission",
            react: EmailTemplate({name, email, message}),
        })
        return {
            error: null,
            success: true,
        }
    } catch (error) {
        console.log(error);
        return {
            error: (error as Error).message,
            success: false,
        }
    }
};