import { ExternalLinkButton } from "./ExternalLinkButton"

const home: string | undefined= "./";
const portfolio: string | undefined = "./portfolio";
const contact: string | undefined = "./contact";
const hobby: string | undefined = undefined;

const websiteIcon: string = "../images/TitleIcon.png";

export const Header:React.FC = () => {
    return  <div className="mx-auto max-w-5xl">
        <div className="mb-8 mx-4 grid md:grid-cols-2">
        <div className="flex justify-center">
        <img className="" src={websiteIcon} alt="website_icon"></img>
        </div>
        <div className="flex md:justify-end justify-center">
            <div className="pb-2 self-center md:w-full grid grid-cols-4 gap-1">
                <ExternalLinkButton url={home} buttonText={"Home"} ></ExternalLinkButton>
                <ExternalLinkButton url={portfolio} buttonText={"Projects"} ></ExternalLinkButton>
                <ExternalLinkButton url={hobby} buttonText={"Hobbies"} ></ExternalLinkButton>
                <ExternalLinkButton url={contact} buttonText={"Contact"} ></ExternalLinkButton>
            </div>
        </div>
        </div>
    </div>

}
