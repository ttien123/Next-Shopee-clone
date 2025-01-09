import AuthHeader from "./components/AuthHeader/AuthHeader";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div>
            <AuthHeader />
            <div className='bg-[#ef532a]'>
                <div className='container bg-bgAuth flex items-center justify-end min-h-[600px] bg-no-repeat'>
                    <div className="w-[400px] p-10 bg-white rounded-sm">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
