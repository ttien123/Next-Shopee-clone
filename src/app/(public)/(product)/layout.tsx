import Header from "../../../components/Header/Header";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div>
            <Header />
            <div className="bg-gray-200 py-6">{children}</div>
        </div>
    );
};

export default Layout;
