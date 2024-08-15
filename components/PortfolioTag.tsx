import "../styles/globals.css";

interface PortfolioTagProps {
    tag: string,
}

/**
 * PortfolioTag:        Returns a little tag with the tag text for this item.
 * 
 * @param tag:          The string which is the text for this tag
 * @returns             JSX component
 */
export const PortfolioTag: React.FC<PortfolioTagProps> = ({tag}) => {
    return (
        <div className="rounded p-1 bg-zinc-900">
        {tag}
        </div>
    );
}