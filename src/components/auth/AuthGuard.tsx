'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // isLoggedIn 상태가 확정되고, false일 때만 리디렉션
    if (isLoggedIn === false) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // 로그인 상태가 확인될 때까지 로딩 상태를 보여주거나,
  // 로그인 상태일 때만 children을 렌더링
  if (!isLoggedIn) {
    // 여기에 로딩 스피너 컴포넌트를 넣으면 더 좋습니다.
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
