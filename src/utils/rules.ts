
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

export const SchemaPrice = z.object({
        price_min: z.string(),
        price_max: z.string()
    }).refine((data) => {
        if (data.price_min !== '' && data.price_max !== '') {
            return Number(data.price_max) >= Number(data.price_min);
        }
        return data.price_min !== '' || data.price_max !== '';
    },{
        message: "Giá không phù hợp",
        path: ["price_min"],
      });
export type TypeAuthSchema = z.infer<typeof AuthSchema>
export type TypeSchemaPrice = z.infer<typeof SchemaPrice>
