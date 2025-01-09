
import { z } from "zod"

export const formAuthSchema = z.object({
        email: z
            .string()
            .nonempty('Email là bắt buộc')
            .min(5, 'Độ dài từ 5 - 160 ký tự')
            .max(160, 'Độ dài từ 5 - 160 ký tự'),
        password: z
            .string()
            .nonempty('Mật khẩu là bắt buộc')
            .min(5, 'Độ dài từ 5 - 160 ký tự')
            .max(160, 'Độ dài từ 5 - 160 ký tự'),
        // confirm_password: handleConfirmPasswordz('password'),
        // price_min: z.string().test({
        //     name: 'price-not-allowed',
        //     message: 'Giá không phù hợp',
        //     test: testPriceMinMax,
        // }),
        // price_max: z.string().test({
        //     name: 'price-not-allowed',
        //     message: 'Giá không phù hợp',
        //     test: testPriceMinMax,
        // }),
        // name: z.string().trim()
    })


export type FormAuthSchema = z.infer<typeof formAuthSchema>
