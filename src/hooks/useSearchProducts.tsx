import { useForm } from 'react-hook-form';
import omit from 'lodash/omit';
import { SearchSchema, TypeSearchSchema } from '@/utils/rules';
import { zodResolver } from '@hookform/resolvers/zod';
import useQueryConfig from './useQueryConfig';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';


const useSearchProducts = () => {
    const { handleSubmit, register, reset } = useForm<TypeSearchSchema>({
        defaultValues: {
            name: '',
        },
        resolver: zodResolver(SearchSchema),
    });
    const queryConfig = useQueryConfig();
    const router = useRouter()
    const onSubmitSearch = handleSubmit((data) => {
        const config = queryConfig.order
            ? omit(
                  {
                      ...queryConfig,
                      name: data.name,
                  },
                  ['order', 'sort_by'],
              )
            : {
                  ...queryConfig,
                  name: data.name,
              };
        router.push(`/?${queryString.stringify({ ...config, limit: '20', page: '1' }).toString()}`);
    });
    return { onSubmitSearch, register, reset };
};

export default useSearchProducts;
