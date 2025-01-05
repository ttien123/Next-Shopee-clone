
interface Props {
    children: React.ReactNode;
}

const RegisterLayout = ({ children }: Props) => {
    return (
        <div>
            hello boi
            {children}
        </div>
    );
};

export default RegisterLayout;
