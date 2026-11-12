import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useDictionary } from '../Dictionary/useDictionary';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { signedIn } from '../Redux/authSlice';
import { login } from '../Utils/services/auth';
import { errorCode } from '../Utils/api/client';
import { loginSchema } from '../Validations/login';
import { paths } from '../Routes/paths';
import type { ApiErrorCode } from '../types/Enums/ApiErrorCode';
import { Brand } from '../Shared/Brand';
import { Preferences } from '../Shared/Preferences';
import { FormField } from '../Shared/FormField';
import { Button, ErrorText, IconButton, Muted } from '../Shared/ui';

import { Page, Intro, FormSide, Card, Password } from './Login.styles';

const validationSchema = loginSchema((key) => key);

export function Login() {
  const { t, locale } = useDictionary();
  const authenticated = useAppSelector((state) => state.auth.authenticated);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [error, setError] = useState<ApiErrorCode | null>(null);
  const [visible, setVisible] = useState(false);
  const from = (location.state as { from?: string } | null)?.from;
  const destination =
    Object.values(paths).find((path) => path === from && path !== paths.login) ?? paths.products;

  if (authenticated) return <Navigate to={destination} replace />;
  return (
    <Page>
      <title>{`${t('login')} | ${t('brand')}`}</title>
      <Intro>
        <Brand />
        <h1>{t('admin')}</h1>
        <p>{t('loginIntro')}</p>
      </Intro>
      <FormSide>
        <Preferences />
        <Card>
          <Brand />
          <h2>{t('welcome')}</h2>
          <Muted>{t('loginIntro')}</Muted>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, helpers) => {
              setError(null);
              try {
                await login({ username: values.username.trim(), password: values.password });
                dispatch(signedIn(values.username.trim()));
                helpers.resetForm();
              } catch (failure) {
                setError(errorCode(failure));
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form noValidate>
                <FormField
                  name="username"
                  label={t('username')}
                  autoComplete="username"
                  dir="ltr"
                />
                <Password>
                  <FormField
                    name="password"
                    label={t('password')}
                    type={visible ? 'text' : 'password'}
                    autoComplete="current-password"
                    dir="ltr"
                  />
                  <IconButton
                    type="button"
                    aria-label={t(visible ? 'hidePassword' : 'viewPassword')}
                    aria-pressed={visible}
                    onClick={() => setVisible((previous) => !previous)}
                  >
                    {visible ? (
                      <EyeOff size={18} aria-hidden="true" />
                    ) : (
                      <Eye size={18} aria-hidden="true" />
                    )}
                  </IconButton>
                </Password>
                {error && <ErrorText role="alert">{t(error)}</ErrorText>}
                <Button type="submit" disabled={isSubmitting}>
                  {t(isSubmitting ? 'loggingIn' : 'login')}
                  {locale === 'fa' ? (
                    <ArrowLeft size={18} aria-hidden="true" />
                  ) : (
                    <ArrowRight size={18} aria-hidden="true" />
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </FormSide>
    </Page>
  );
}
