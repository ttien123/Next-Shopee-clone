'use client';
import useSearchProducts from '@/hooks/useSearchProducts';

const SearchHeader = () => {
    const { onSubmitSearch, register } = useSearchProducts();

    return (
        <form className="col-span-9" onSubmit={onSubmitSearch}>
            <div className="bg-white rounded-sm p-1 flex">
                <input
                    type="text"
                    className="text-black px-3 py-2 flex-grow border-none outline-none bg-transparent"
                    placeholder="Free Ship Đơn Từ 0Đ"
                    {...register('name')}
                />
                <button aria-label="Search" className="rounded-sm py-2 px-6 flex-shink-0 bg-orange hover:opacity-90">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
};

export default SearchHeader;
