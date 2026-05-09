type SearchBarProps = {
    query: string;
    setQuery: (value: string) => void;
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
    return (
        <>
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
            <hr/>
        </>
    )
}