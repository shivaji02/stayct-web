import type { ReactNode } from 'react';

type PlaceholderPageProps = {
  title: string;
  path: string;
  children?: ReactNode;
};

export function PlaceholderPage({ title, path, children }: PlaceholderPageProps) {
  return (
    <main>
      <h1>{title}</h1>
      <p>{path}</p>
      {children}
    </main>
  );
}
