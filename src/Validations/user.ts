import * as yup from 'yup';
import type { Translate } from '../Dictionary/useDictionary';

export function userSchema(t: Translate) {
  return yup.object({
    firstName: yup.string().trim().required(t('required')).max(60, t('tooLong')),
    lastName: yup.string().trim().required(t('required')).max(60, t('tooLong')),
    username: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z0-9_.-]{3,30}$/, { message: t('validUsername'), excludeEmptyString: true })
      .required(t('required')),
    email: yup.string().trim().email(t('validEmail')).required(t('required')),
    password: yup
      .string()
      .required(t('required'))
      .min(8, t('shortPassword'))
      .max(128, t('tooLong')),
    phone: yup
      .string()
      .trim()
      .matches(/^[+\d][\d ()-]{6,19}$/, { message: t('validPhone'), excludeEmptyString: true })
      .test(
        'phone-digits',
        t('validPhone'),
        (value) => !value || value.replace(/\D/g, '').length >= 7,
      )
      .required(t('required')),
  });
}
