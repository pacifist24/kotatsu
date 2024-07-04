import KotatsuButton from '@/components/KotatsuButton';
import TableLayout from '@/components/TabLayout';

export default function Home() {
  return (
    <>
      <TableLayout />
      <KotatsuButton text="テスト" filename="test.mp3" />
    </>
  );
}
