import { z } from 'zod';

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
    confirm_password: z
        .string()
        .nonempty('Mật khẩu là bắt buộc')
        .min(5, 'Độ dài từ 5 - 160 ký tự')
        .max(160, 'Độ dài từ 5 - 160 ký tự'),
});

export const PriceSchema = z
    .object({
        price_min: z.string(),
        price_max: z.string(),
    })
    .refine(
        (data) => {
            if (data.price_min !== '' && data.price_max !== '') {
                return Number(data.price_max) >= Number(data.price_min);
            }
            return data.price_min !== '' || data.price_max !== '';
        },
        {
            message: 'Giá không phù hợp',
            path: ['price_min'],
        },
    );

export const SearchSchema = z.object({
    name: z.string().trim().nonempty('Tên sản phẩm là bắt buộc'),
});

export const UserInfoSchema = z.object({
    name: z.string().max(160, 'Đọ dài tối da là 160 ký tự'),
    phone: z.string().max(20, 'Đọ dài tối da là 20 ký tự'),
    avatar: z.string().max(1000, 'Đọ dài tối da là 1000 ký tự'),
    address: z.string().max(160, 'Đọ dài tối da là 160 ký tự'),
    date_of_birth: z.date().max(new Date(), 'Hãy chọn 1 ngày trong quá khứ'),
});

export const UserChangePassword = z.object({
    password: z
        .string()
        .nonempty('Mật khẩu là bắt buộc')
        .min(5, 'Độ dài từ 5 - 160 ký tự')
        .max(160, 'Độ dài từ 5 - 160 ký tự'),
    new_password: z
        .string()
        .nonempty('Mật khẩu là bắt buộc')
        .min(5, 'Độ dài từ 5 - 160 ký tự')
        .max(160, 'Độ dài từ 5 - 160 ký tự'),
    confirm_password: z
        .string()
        .nonempty('Mật khẩu là bắt buộc')
        .min(5, 'Độ dài từ 5 - 160 ký tự')
        .max(160, 'Độ dài từ 5 - 160 ký tự'),
});

export type TypeUserInfoSchema = z.infer<typeof UserInfoSchema>;
export type TypeUserChangePassword = z.infer<typeof UserChangePassword>;
export type TypeAuthSchema = z.infer<typeof AuthSchema>;
export type TypeSchemaPrice = z.infer<typeof PriceSchema>;
export type TypeSearchSchema = z.infer<typeof SearchSchema>;
