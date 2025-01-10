
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

export type TypeAuthSchema = z.infer<typeof AuthSchema>
