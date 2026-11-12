import * as yup from 'yup';
import type { Translate } from '../Dictionary/useDictionary';
export function loginSchema(t: Translate) {
  return yup.object({
    username: yup.string().trim().required(t('required')),
    password: yup.string().required(t('required')),
  });
}
