import type { ReactNode } from 'react';
import { Heading } from './PageHeading.styles';

export function PageHeading({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <Heading>
      <div>
        <h1>{title}</h1>
      </div>
      {action}
    </Heading>
  );
}
