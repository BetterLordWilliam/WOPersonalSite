import { NextPage } from "next";

const meImage: string = "../images/MeFull.png";
const meImage_Small: string = "../images/me.png";

const HomeIndex: NextPage = () => {
  return (
    <section className="mx-auto max-w-5xl">
        <div className="">
            <h1 className="mx-4" >Hello world!</h1>
            <div className="mb-4 rounded mx-4 p-4 bg-closeishToBlack">
                    
                    <p> 
                    <span className="text-consoleGreen">Welcome to my website.</span> Here you will find a showcase of the major projects that
                    I am currently working on as well as the projects that I&apos;ve completed in the past.
                    </p>

            </div>
            <div className="mx-4 rounded flex flex-wrap md:flex-nowrap">
                <div className="max-w-l md:max-w-xl rounded p-4 bg-closeiToBlack relative">
                    
                    <h3 className="mb-4 text-white">I am Will Otterbein, a programmer from British Columbia, Canada.</h3>
                    <p>
                    Since highschool, I've busied myself with the thrills of programming. 
                    I've always enjoyed the engagement received from solving complex problems, 
                    and do my best to elegantly code the solutions to the various problems that I have encountered.
                    </p>
                    <br/>
                    <p>
                    If you want to get in touch, you will find in the footer links to my social media which you can use to contact me.
                    If you&apos;d prefer, I&apos;ve also developed a contact page that you can use to connect via email.
                    </p>
                    <br/>
                    <p>
                    I sincerely hope that you enjoy browsing the highlights of my work as a software developer and student.
                    </p>
                    <br/><hr className="border-2 border-closeishToBlack"/><br/><br/>
                    <div className="left-0 bottom-0">
                        <p>
                        This site was developed using NextJS and Tailwindcss. It is hosted via the Vercel hosting platform for NextJS web-applications.
                        </p>
                    </div>

                </div>
                <div className="hidden max-w-48 overview-hidden ml-auto md:block">
                    <img className="rounded" src={meImage_Small} alt="me"></img>
                </div>
                <br/>
                <div className="block basis-full md:hidden">
                </div>
            </div>
        </div>
    </section>
  );
}

export default HomeIndex;