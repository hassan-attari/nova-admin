import { useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDictionary } from '../Dictionary/useDictionary';
import { useAppDispatch } from '../Redux/hooks';
import { productAdded } from '../Redux/productsSlice';
import { createProduct } from '../Utils/services/products';
import { errorCode } from '../Utils/api/client';
import { categoryKeys } from '../Utils/format';
import { productSchema } from '../Validations/product';
import { paths } from '../Routes/paths';
import type { ApiErrorCode } from '../types/Enums/ApiErrorCode';
import { PageHeading } from '../Shared/PageHeading';
import { FormField } from '../Shared/FormField';
import { CancelLink, FieldGrid, FormFields, FormPanel } from '../Shared/FormLayout';
import { Actions, Button, ErrorText, Muted } from '../Shared/ui';

const initialValues = { title: '', description: '', price: '', category: '', image: '' };
const validationSchema = productSchema((key) => key);
export function CreateProduct() {
  const { t } = useDictionary();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<ApiErrorCode | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <>
      <PageHeading title={t('newProduct')} />
      <FormPanel>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setError(null);
            try {
              const product = await createProduct({
                title: values.title.trim(),
                description: values.description.trim(),
                price: Number(values.price),
                category: values.category,
                image: values.image.trim(),
              });
              if (!formRef.current) return;
              dispatch(productAdded(product));
              navigate(paths.products, { state: { created: true } });
            } catch (failure) {
              if (formRef.current) setError(errorCode(failure));
            }
          }}
        >
          {({ isSubmitting, submitCount, isValid }) => (
            <Form ref={formRef} noValidate aria-busy={isSubmitting}>
              <FormFields disabled={isSubmitting} aria-label={t('newProduct')}>
                <FormField name="title" label={t('title')} maxLength={200} />
                <FormField name="description" label={t('description')} maxLength={3000} multiline />
                <FieldGrid>
                  <FormField
                    name="price"
                    label={t('price')}
                    type="number"
                    min="0.01"
                    step="0.01"
                    dir="ltr"
                  />
                  <FormField
                    name="category"
                    label={t('category')}
                    options={[
                      { value: '', label: t('allCategories') },
                      ...Object.entries(categoryKeys).map(([value, key]) => ({
                        value,
                        label: t(key),
                      })),
                    ]}
                  />
                </FieldGrid>
                <FormField name="image" label={t('imageUrl')} type="url" dir="ltr" />
              </FormFields>
              <Muted>{t('mockNotice')}</Muted>
              {submitCount > 0 && !isValid && <ErrorText role="alert">{t('formError')}</ErrorText>}
              {error && <ErrorText role="alert">{t(error)}</ErrorText>}
              <Actions>
                <Button type="submit" disabled={isSubmitting}>
                  {t(isSubmitting ? 'saving' : 'saveProduct')}
                </Button>
                <CancelLink to={paths.products}>{t('cancel')}</CancelLink>
              </Actions>
            </Form>
          )}
        </Formik>
      </FormPanel>
    </>
  );
}
