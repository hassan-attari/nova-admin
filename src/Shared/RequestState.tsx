import { CloudOff, SearchX } from 'lucide-react';
import { useDictionary } from '../Dictionary/useDictionary';
import { RequestStatus } from '../types/Enums/RequestStatus';
import type { ApiErrorCode } from '../types/Enums/ApiErrorCode';
import { Button, StateBox } from './ui';

export function RequestState({
  status,
  error,
  empty,
  retry,
}: {
  status: RequestStatus;
  error: ApiErrorCode | null;
  empty: 'noProducts' | 'noUsers';
  retry: () => void;
}) {
  const { t } = useDictionary();
  if (status === RequestStatus.Loading || status === RequestStatus.Idle)
    return <StateBox role="status">{t('loading')}</StateBox>;
  if (status === RequestStatus.Error)
    return (
      <StateBox role="alert">
        <CloudOff size={35} aria-hidden="true" />
        <p>{t(error || 'serverError')}</p>
        <Button type="button" onClick={retry}>
          {t('retry')}
        </Button>
      </StateBox>
    );
  return (
    <StateBox>
      <SearchX size={35} aria-hidden="true" />
      <h2>{t(empty)}</h2>
      <p>{t('emptyHint')}</p>
    </StateBox>
  );
}
