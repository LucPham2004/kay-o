import { useApp } from '@/utils/AppContext';
import React, { useEffect, useState } from 'react';
import { IoIosSearch, IoMdClose } from "react-icons/io";


interface SearchBarProps {
    placeholder?: string;
    onSearch: (keyword: string) => void;
    onClear?: () => void;
    debounceTime?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder,
    onSearch,
    onClear,
    debounceTime = 200,
}) => {
    const { isDarkMode } = useApp();
    const [keyword, setKeyword] = useState("");

    const handleClearInput = () => {
        setKeyword("");
        onSearch("");
        if (onClear) onClear();
    };

	useEffect(() => {
		const handler = setTimeout(() => {
			onSearch(keyword);
		}, debounceTime);

		return () => clearTimeout(handler);
	}, [keyword]);

	return (
		<form
			className={`flex items-center border rounded-full overflow-hidden w-full max-w-lg mx-auto
				${isDarkMode ? 'bg-[#3A3B3C] border-gray-900' : 'bg-gray-100 border-gray-200'}`}>
			<button
				type="submit"
				className="ps-3 py-1 rounded-full text-xl"
			>
				<IoIosSearch />
			</button>
			<input
				type="text"
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
				placeholder={placeholder}
				className={`flex-grow ps-2 pe-4 pt-1.5 pb-2 focus:outline-none text-sm
					${isDarkMode ? 'bg-[#3A3B3C] border-gray-900 text-gray-100'
						: 'bg-gray-100 border-gray-200 text-gray-700'}
				`} />
			{keyword.length > 0 && (
				<button
					type="button"
					className="py-1 pe-1 rounded-full text-lg "
					onClick={handleClearInput}
				>
					<IoMdClose /> 
				</button>
			)}
		</form>
	);
};

export default SearchBar;
