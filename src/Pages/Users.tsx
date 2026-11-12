import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { fetchUsers } from '../Redux/usersSlice';
import { useDictionary } from '../Dictionary/useDictionary';
import { RequestStatus } from '../types/Enums/RequestStatus';
import { paths } from '../Routes/paths';
import { PageHeading } from '../Shared/PageHeading';
import { RequestState } from '../Shared/RequestState';
import { Table, TableScroll, Toolbar, RecordName } from '../Shared/Table';
import { ButtonLink, Input, Panel } from '../Shared/ui';

export function Users() {
  const { t, locale } = useDictionary();
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.users);
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (status === RequestStatus.Idle) void dispatch(fetchUsers());
  }, [dispatch, status]);
  const query = search.trim().toLocaleLowerCase(locale);
  const filtered = items.filter((user) =>
    `${user.name.firstname} ${user.name.lastname} ${user.username} ${user.email} ${user.phone}`
      .toLocaleLowerCase(locale)
      .includes(query),
  );
  return (
    <>
      <PageHeading
        title={t('users')}
        action={
          <ButtonLink to={paths.newUser}>
            <Plus size={18} aria-hidden="true" />
            {t('newUser')}
          </ButtonLink>
        }
      />
      
      <Panel>
        <Toolbar>
          <Input
            type="search"
            aria-label={t('searchUsers')}
            placeholder={t('searchUsers')}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </Toolbar>
        {(status !== RequestStatus.Success || filtered.length === 0) && (
          <RequestState
            status={status}
            error={error}
            empty="noUsers"
            retry={() => void dispatch(fetchUsers())}
          />
        )}
        {filtered.length > 0 && (
          <TableScroll>
            <Table aria-label={t('users')}>
              <thead>
                <tr>
                  <th scope="col">{t('name')}</th>
                  <th scope="col">{t('username')}</th>
                  <th scope="col">{t('email')}</th>
                  <th scope="col">{t('phone')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.clientKey}>
                    <td>
                      <RecordName>
                        <p dir="auto">
                          {user.name.firstname} {user.name.lastname}
                        </p>
                      </RecordName>
                    </td>
                    <td>
                      <bdi>{user.username}</bdi>
                    </td>
                    <td>
                      <bdi>{user.email}</bdi>
                    </td>
                    <td>
                      <bdi>{user.phone}</bdi>
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
