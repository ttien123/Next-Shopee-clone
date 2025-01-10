import Link from 'next/link';
import RegisterForm from './RegisterForm';

const page = () => {
return (
    <div>
      <div className="text-2xl mb-5">Đăng nhập</div>
      <RegisterForm />
      <div className='mt-8 text-center text-slate-400'>
        bạn chưa có tài khoản? <Link href={'/login'} className='text-red-400 ml-1'>Đăng Nhập</Link>
      </div>
    </div>
  )
}

export default page
