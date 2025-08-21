import StyledComponentsRegistry from '@/lib/styled-registry';
import { Providers } from './providers';

export const metadata = {
  title: 'Chee-Up : AI 취업 준비 파트너',
  description: 'AI 기반 맞춤형 자소서 생성 및 채용 정보 추천 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}