import ChangePasswordForm from "./ChangePasswordForm";

const page = () => {
    return (
        <div className="rounded-sm bg-wihte px-2 md:px-7 pb-10 md:pb-20 shadow">
            <div className="border-b border-b-gray-200 py-6">
                <h1 className="text-lg font-medium capitalize text-gray-900">Đổi mật khẩu</h1>
                <div className="mt-1 text-sm text-gray-700">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
            </div>
            <ChangePasswordForm />
        </div>
    );
};

export default page;
