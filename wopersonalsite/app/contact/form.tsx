"use client"

import { sendEmail } from "@/scripts/actions";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function Form() {
    const [sendEmailState, sendEmailAction] = useFormState(sendEmail, {
        error: null,
        success: false,
    })
    useEffect(() => {
        if (sendEmailState.success) {
            alert("Email sent!");
        }
        if (sendEmailState.error) {
            alert("Error sending email!");
        }
    }, [sendEmailState])

    return (
        <form action={sendEmailAction}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name"></input>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email"></input>
            <label htmlFor="message" >Message</label>
            <textarea name="message" id="message" cols={30} rows={10}></textarea>
            <button type="submit">Send</button>
        </form>
    );
}