import { useParams } from "react-router-dom";

export default function SearchPage() {
    const { city } = useParams();
    
    return <span>Search Page for {city}</span>;
}
