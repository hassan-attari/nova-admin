import { ShoppingBag } from 'lucide-react';
import { useDictionary } from '../Dictionary/useDictionary';
import { Wordmark } from './Brand.styles';

export function Brand() {
  const { t } = useDictionary();

  return (
    <Wordmark>
      {t('brand')}
      <ShoppingBag size={27} aria-hidden="true" />
    </Wordmark>
  );
}
