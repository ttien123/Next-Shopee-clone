
import { z } from "zod"

export const AuthSchema = z.object({
        email: z
            .string()
            .nonempty('Email là bắt buộc')
            .min(5, 'Độ dài từ 5 - 160 ký tự')
            .email('Email không hợp lệ')
            .max(160, 'Độ dài từ 5 - 160 ký tự'),
        password: z
            .string()
            .nonempty('Mật khẩu là bắt buộc')
            .min(5, 'Độ dài từ 5 - 160 ký tự')
            .max(160, 'Độ dài từ 5 - 160 ký tự'),
        confirm_password: 
            z.string()
            .nonempty('Mật khẩu là bắt buộc')
            .min(5, 'Độ dài từ 5 - 160 ký tự')
            .max(160, 'Độ dài từ 5 - 160 ký tự')
    })

export const userSchema = z.object({
    name: z.string().nonempty('Trường này là bắt buộc').min(5, 'Độ dài từ 5 - 160 ký tự').max(160, 'Đọ dài tối da là 160 ký tự'),
    phone: z.string().nonempty('Trường này là bắt buộc').min(5, 'Độ dài từ 5 - 20 ký tự').max(20, 'Đọ dài tối da là 20 ký tự'),
    avatar: z.string().max(1000, 'Đọ dài tối da là 1000 ký tự'),
    address: z.string().nonempty('Trường này là bắt buộc').min(5, 'Độ dài từ 5 - 160 ký tự').max(160, 'Đọ dài tối da là 160 ký tự'),
    date_of_birth: z.date().max(new Date(), 'Hãy chọn 1 ngày trong quá khứ'),
    password: z.string()
        .nonempty('Mật khẩu là bắt buộc')
        .min(5, 'Độ dài từ 5 - 160 ký tự')
        .max(160, 'Độ dài từ 5 - 160 ký tự'),
    new_password: z.string()
        .nonempty('Mật khẩu là bắt buộc')
        .min(5, 'Độ dài từ 5 - 160 ký tự')
        .max(160, 'Độ dài từ 5 - 160 ký tự'),
    confirm_password: 
        z.string()
        .nonempty('Mật khẩu là bắt buộc')
        .min(5, 'Độ dài từ 5 - 160 ký tự')
        .max(160, 'Độ dài từ 5 - 160 ký tự')
});

export type TypeAuthSchema = z.infer<typeof AuthSchema>
export type UserSchema = z.infer<typeof userSchema>;

