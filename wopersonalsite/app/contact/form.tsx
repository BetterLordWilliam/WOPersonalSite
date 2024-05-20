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
                <div className="grid grid-cols-2 py-4">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name"></input>
                </div>
                <div className="grid grid-cols-2 py-5">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"></input>
                </div>
                <div className="grid grid-rows-2 py-5">
                    <label htmlFor="message" >Message</label>
                    <br></br>
                    <textarea name="message" id="message" cols={30} rows={10}></textarea>
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
        </div>
    );
}