'use client';

export const LoadingFullPage = ({ isLoading }: { isLoading?: boolean }) => {
    return (
        <>
            {isLoading && (
                <div className="fixed z-50 inset-0 bg-[#0000007d] flex items-center justify-center">
                    <svg width={34} height={12} viewBox="-1 0 33 12" className="m-auto">
                        <circle className="animate-loading" cx={4} cy={6} r={4} fill="#EE4D2D" />
                        <circle
                            style={{ animationDelay: '0.1s' }}
                            className="animate-loading"
                            cx={16}
                            cy={6}
                            r={4}
                            fill="#EE4D2D"
                        />
                        <circle
                            style={{ animationDelay: '0.2s' }}
                            className="animate-loading"
                            cx={28}
                            cy={6}
                            r={4}
                            fill="#EE4D2D"
                        />
                    </svg>
                </div>
            )}
        </>
    );
};

const Loading = ({ extendClassName }: { extendClassName?: string }) => {
    return (
        <div className={`min-h-[80vh] flex items-center justify-center bg-gray-200 ${extendClassName}`}>
            <svg width={34} height={12} viewBox="-1 0 33 12" className="m-auto">
                <circle className="animate-loading" cx={4} cy={6} r={4} fill="#EE4D2D" />
                <circle
                    style={{ animationDelay: '0.1s' }}
                    className="animate-loading"
                    cx={16}
                    cy={6}
                    r={4}
                    fill="#EE4D2D"
                />
                <circle
                    style={{ animationDelay: '0.2s' }}
                    className="animate-loading"
                    cx={28}
                    cy={6}
                    r={4}
                    fill="#EE4D2D"
                />
            </svg>
        </div>
    );
};

export default Loading;
