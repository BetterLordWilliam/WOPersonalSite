import Image from "next/image";
import { ExternalLinkButton } from "./ExternalLinkButton"

import titleImage from "../../public/images/TitleImage.png";

const home: string | undefined= "./";
const portfolio: string | undefined = "./portfolio";
const contact: string | undefined = "./contact";
const hobby: string | undefined = undefined;

export const Header:React.FC = () => {
    return (
        <div className="mx-auto max-w-5xl">
            <div className="mb-8 mx-4 grid md:grid-cols-2">
            <div className="flex justify-center">
            <Image className="" src={titleImage} alt="website_icon"></Image>
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
    );
}
