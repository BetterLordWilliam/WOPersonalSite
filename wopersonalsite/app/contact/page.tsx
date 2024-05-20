import { NextPage } from "next";
import Form from "./form";

/**
 * ContactIndex:        Page for the contact form and also expanded social media details
 * 
 * @returns  NextPage
 */
const ContactIndex: NextPage = () => {
    return (
        <div className="mx-auto max-w-4xl">
            <div className="mx-4 mb-8">
            <div>
                <h1>Let's Get in Touch</h1>
                <div className="my-4 p-2 rounded bg-closeishToBlack">
                    <p>
                        Use the form below to send me a direct email message. Alternatively, 
                        use the list of my social media links in the footer to reach out.
                    </p>
                </div>
                </div>
                <Form></Form>
            </div>
        </div>
    );

};

export default ContactIndex;