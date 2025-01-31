'use client';
import useSearchProducts from '@/hooks/useSearchProducts';

const SearchCartHeader = () => {
    const { onSubmitSearch, register } = useSearchProducts();

    return (
        <form className="mt-3 md:mt-0 md:w-[50%]" onSubmit={onSubmitSearch}>
            <div className="border-2 border-orange rounded-sm flex">
                <input
                    type="text"
                    className="w-full flex-grow border-none bg-transparent px-3 py-1 text-black outline-none"
                    placeholder="Free Ship Đơn Từ 0Đ"
                    {...register('name')}
                />
                <button className="rounded-sm py-2 px-8 flex-shink-0 bg-orange hover:opacity-90">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5  h-5 stroke-white"
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

export default SearchCartHeader;
