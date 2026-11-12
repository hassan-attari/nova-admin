import * as yup from 'yup';
import type { Translate } from '../Dictionary/useDictionary';

export function productSchema(t: Translate) {
  return yup.object({
    title: yup.string().trim().required(t('required')).max(200, t('tooLong')),
    description: yup.string().trim().required(t('required')).max(3000, t('tooLong')),
    price: yup
      .number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .typeError(t('invalidNumber'))
      .positive(t('positivePrice'))
      .required(t('required')),
    category: yup
      .string()
      .oneOf(['electronics', 'jewelery', "men's clothing", "women's clothing"], t('required'))
      .required(t('required')),
    image: yup
      .string()
      .trim()
      .url(t('validUrl'))
      .matches(/^https?:\/\//, { message: t('validUrl'), excludeEmptyString: true })
      .required(t('required')),
  });
}
