import Image from "next/image";

const spinnerPath = "/spinner.gif";

const Loading = () => {
    return (
        <div className="p-5">
            <Image src={spinnerPath} alt="test"
                width={50}
                height={50}/>
        </div>
    );
};

export default Loading;