import LoginForm from "./LoginForm"
import Link from 'next/link';

const page = () => {
return (
    <div>
      <div className="text-2xl mb-5">Đăng nhập</div>
      <LoginForm />
      <div className='mt-8 text-center text-slate-400'>
        bạn chưa có tài khoản? <Link href={'/register'} className='text-red-400 ml-1'>Đăng ký</Link>
      </div>
    </div>
  )
}

export default page
