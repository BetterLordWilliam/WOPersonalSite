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
        <div className="rounded pt-12 p-8 bg-closeiToBlack max-w-full">
        <div>
            <form action={sendEmailAction}>
                <div className="py-4">
                    <input placeholder="Your Name" className="w-full p-2 rounded bg-closeToBlack" type="text" name="name" id="name"></input>
                </div>
                <div className="py-4">
                    <input placeholder="your@email.example" className="w-full p-2 rounded bg-closeToBlack" type="email" name="email" id="email"></input>
                </div>
                <div className="py-4">
                    <textarea placeholder="Your message to me..." className="w-full p-2 rounded bg-closeToBlack resize-none" name="message" id="message" cols={30} rows={15}></textarea>
                </div>
                <button className="rounded p-1 bg-closeishToBlack hover:bg-button_green_dark" type="submit">Send</button>
            </form>
        </div>
        </div>
    );
}