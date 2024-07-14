'use client';
import TableLayout from '@/components/TabLayout';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

export default function Home() {
  return (
    <RecoilRoot>
      <Suspense>
        <TableLayout />
      </Suspense>
    </RecoilRoot>
  );
}
