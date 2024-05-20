import { ExternalLinkButton } from "./ExternalLinkButton"

const home: string = "./";
const portfolio: string = "./portfolio";
const contact: string = "./contact";

export const Header:React.FC = () => {
    return  <div className="mx-auto max-w-5xl grid grid-cols-2 m-8">
        <img src="../images/TitleIcon.png" alt="website_icon"></img>
        <div className="pb-2 self-center">
        <div className="max-w-72 md:w-full grid grid-cols-3 gap-1">
            <ExternalLinkButton url={home} buttonText={"Home"} ></ExternalLinkButton>
            <ExternalLinkButton url={portfolio} buttonText={"Projects"} ></ExternalLinkButton>
            <ExternalLinkButton url={contact} buttonText={"Contact"} ></ExternalLinkButton>
        </div>
        </div>
    </div>

}
