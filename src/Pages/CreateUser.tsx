import { useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDictionary } from '../Dictionary/useDictionary';
import { useAppDispatch } from '../Redux/hooks';
import { userAdded } from '../Redux/usersSlice';
import { createUser } from '../Utils/services/users';
import { errorCode } from '../Utils/api/client';
import { userSchema } from '../Validations/user';
import { paths } from '../Routes/paths';
import type { ApiErrorCode } from '../types/Enums/ApiErrorCode';
import { PageHeading } from '../Shared/PageHeading';
import { FormField } from '../Shared/FormField';
import { CancelLink, FieldGrid, FormFields, FormPanel } from '../Shared/FormLayout';
import { Actions, Button, ErrorText, Muted } from '../Shared/ui';

const initialValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  phone: '',
};
const validationSchema = userSchema((key) => key);
export function CreateUser() {
  const { t } = useDictionary();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<ApiErrorCode | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <>
      <PageHeading title={t('newUser')} />
      <FormPanel>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, helpers) => {
            setError(null);
            try {
              const user = await createUser({
                ...values,
                firstName: values.firstName.trim(),
                lastName: values.lastName.trim(),
                username: values.username.trim(),
                email: values.email.trim(),
                phone: values.phone.trim(),
              });
              if (!formRef.current) return;
              dispatch(userAdded(user));
              helpers.resetForm();
              navigate(paths.users, { state: { created: true } });
            } catch (failure) {
              if (formRef.current) setError(errorCode(failure));
            }
          }}
        >
          {({ isSubmitting, submitCount, isValid }) => (
            <Form ref={formRef} noValidate aria-busy={isSubmitting}>
              <FormFields disabled={isSubmitting} aria-label={t('newUser')}>
                <FieldGrid>
                  <FormField
                    name="firstName"
                    label={t('firstName')}
                    maxLength={60}
                    autoComplete="given-name"
                  />
                  <FormField
                    name="lastName"
                    label={t('lastName')}
                    maxLength={60}
                    autoComplete="family-name"
                  />
                </FieldGrid>
                <FieldGrid>
                  <FormField
                    name="username"
                    label={t('username')}
                    maxLength={30}
                    autoComplete="off"
                    dir="ltr"
                  />
                  <FormField
                    name="email"
                    label={t('email')}
                    type="email"
                    autoComplete="email"
                    dir="ltr"
                  />
                </FieldGrid>
                <FieldGrid>
                  <FormField
                    name="password"
                    label={t('password')}
                    type="password"
                    maxLength={128}
                    autoComplete="new-password"
                    dir="ltr"
                  />
                  <FormField
                    name="phone"
                    label={t('phone')}
                    type="tel"
                    maxLength={20}
                    autoComplete="tel"
                    dir="ltr"
                  />
                </FieldGrid>
              </FormFields>
              <Muted>{t('mockNotice')}</Muted>
              {submitCount > 0 && !isValid && <ErrorText role="alert">{t('formError')}</ErrorText>}
              {error && <ErrorText role="alert">{t(error)}</ErrorText>}
              <Actions>
                <Button type="submit" disabled={isSubmitting}>
                  {t(isSubmitting ? 'saving' : 'saveUser')}
                </Button>
                <CancelLink to={paths.users}>{t('cancel')}</CancelLink>
              </Actions>
            </Form>
          )}
        </Formik>
      </FormPanel>
    </>
  );
}
