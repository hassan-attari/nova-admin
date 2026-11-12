import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { fetchProducts } from '../Redux/productsSlice';
import { useDictionary } from '../Dictionary/useDictionary';
import { RequestStatus } from '../types/Enums/RequestStatus';
import { paths } from '../Routes/paths';
import { categoryKeys, formatMoney } from '../Utils/format';
import { PageHeading } from '../Shared/PageHeading';
import { RequestState } from '../Shared/RequestState';
import { Table, TableScroll, Toolbar, Tag, RecordName } from '../Shared/Table';
import { ButtonLink, Input, Notice, Panel } from '../Shared/ui';
import { ProductImage } from '../Shared/ProductImage';
import { Thumb } from './Products.styles';

export function Products() {
  const { t, locale } = useDictionary();
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const created = (location.state as { created?: boolean } | null)?.created;
  useEffect(() => {
    if (status === RequestStatus.Idle) void dispatch(fetchProducts());
  }, [dispatch, status]);
  const query = search.trim().toLocaleLowerCase(locale);
  const filtered = items.filter((product) =>
    `${product.title} ${product.category}`.toLocaleLowerCase(locale).includes(query),
  );
  const showTable = filtered.length > 0;
  return (
    <>
      <PageHeading
        title={t('products')}
        action={
          <ButtonLink to={paths.newProduct}>
            <Plus size={18} aria-hidden="true" />
            {t('newProduct')}
          </ButtonLink>
        }
      />
      {created && items.some((item) => item.isLocal) && (
        <Notice role="status">{t('productCreated')}</Notice>
      )}
      <Panel>
        <Toolbar>
          <Input
            type="search"
            aria-label={t('searchProducts')}
            placeholder={t('searchProducts')}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <span>
            {filtered.length.toLocaleString(locale)} {t('records')}
          </span>
        </Toolbar>
        {(status !== RequestStatus.Success || !showTable) && (
          <RequestState
            status={status}
            error={error}
            empty="noProducts"
            retry={() => void dispatch(fetchProducts())}
          />
        )}
        {showTable && (
          <TableScroll>
            <Table aria-label={t('products')}>
              <thead>
                <tr>
                  <th scope="col">{t('image')}</th>
                  <th scope="col">{t('title')}</th>
                  <th scope="col">{t('category')}</th>
                  <th scope="col">{t('price')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product, index) => (
                  <tr key={product.clientKey}>
                    <td>
                      <Thumb>
                        <ProductImage src={product.image} alt={product.title} eager={index < 6} />
                      </Thumb>
                    </td>
                    <td>
                      <RecordName>
                        <p dir="auto">{product.title}</p>
                      </RecordName>
                    </td>
                    <td>
                      <Tag>
                        {categoryKeys[product.category]
                          ? t(categoryKeys[product.category])
                          : product.category}
                      </Tag>
                    </td>
                    <td>
                      <bdi>{formatMoney(product.price, locale)}</bdi>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableScroll>
        )}
      </Panel>
    </>
  );
}
