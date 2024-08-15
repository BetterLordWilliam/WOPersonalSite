import { ExternalLinkButton } from "./ExternalLinkButton"

const InstagramLink: string = "https://www.instagram.com/lord_will_otterbein_/";
const LinkedInLink: string = "https://www.linkedin.com/in/will-otterbein-85268a2a8/";
const GitHubLink: string = "https://github.com/BetterLordWilliam";

export const Footer: React.FC = () => {
    return <div className="mx-auto max-w-5xl flex flex-col justify-between m-8 mb-12">
        <div className="pb-2 self-center"> Will Otterbein, 2024 </div>
        <div className="pb-2 self-center">
        <div className="grid grid-cols-3 gap-4">
            <ExternalLinkButton url={LinkedInLink} buttonText={"LinkedIn"} ></ExternalLinkButton>
            <ExternalLinkButton url={GitHubLink} buttonText={"GitHub"} ></ExternalLinkButton>
            <ExternalLinkButton url={InstagramLink} buttonText={"Instagram"} ></ExternalLinkButton>
        </div>
        </div>
    </div>
}