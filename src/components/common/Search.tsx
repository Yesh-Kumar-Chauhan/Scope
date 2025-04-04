import React from 'react'

interface SearchProps {
    searchQuery: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({searchQuery, handleSearchChange,setSearchQuery}) => {
    const clearSearch = () => {
        setSearchQuery(''); 
    };
    return (
        <div className="headerSearch">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M5 11C5 7.691 7.691 5 11 5C14.309 5 17 7.691 17 11C17 14.309 14.309 17 11 17C7.691 17 5 14.309 5 11ZM20.707 19.293L17.312 15.897C18.365 14.543 19 12.846 19 11C19 6.589 15.411 3 11 3C6.589 3 3 6.589 3 11C3 15.411 6.589 19 11 19C12.846 19 14.543 18.365 15.897 17.312L19.293 20.707C19.488 20.902 19.744 21 20 21C20.256 21 20.512 20.902 20.707 20.707C21.098 20.316 21.098 19.684 20.707 19.293Z"
                        fill="#023047" />
                </svg>
            </div>
            <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div className="crossIcon" onClick={clearSearch} style={{cursor:'pointer'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none">
                    <g opacity="0.25">
                        <path d="M17 7L7 17M17 17L7 7" stroke="black" stroke-width="2"
                            stroke-linecap="round" />
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default Search