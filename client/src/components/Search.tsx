import { useState } from 'react';

interface ISearchProps {
  placeholderText: string;
  // grazina paieskos teksta
  onSearch: (searchString: string) => void;
}

export const Search = ({ placeholderText, onSearch }: ISearchProps) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cleanText = searchText.replace(/[^A-z0-9À-ž._\s]/gi, '');
      onSearch(cleanText.toLocaleLowerCase());
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
    onSearch('');
  };

  return (
    <div className="flex items-center border border-violet-800 rounded-lg md:w-1/2 w-full">
      <input
        className="p-2 flex-grow bg-transparent focus:outline-none text-white"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyUp={handleSearch}
        id={placeholderText}
        type="text"
        autoComplete="off"
        placeholder={placeholderText}
        aria-label={`Search for ${placeholderText}`}
      />
      <button
        onClick={handleClearSearch}
        className={`${
          searchText ? 'visible' : 'invisible'
        } mr-1 cursor-pointer`}
      >
        ❌
      </button>
    </div>
  );
};
