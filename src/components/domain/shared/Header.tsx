'use client';

import Button from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.large};
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 100;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.large};
  margin-left: auto; /* Push Nav to center */
  margin-right: auto; /* Push Nav to center */
`;

const NavLink = styled(Link)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;



const AuthWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const UserName = styled.span`
  font-weight: bold;
`;

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <HeaderWrapper>
      <Link href="/">
        <Image src="/images/logo.svg" alt="careergo 로고" width={100} height={32} />
      </Link>
      <Nav>
        <NavLink href="/jobs">채용공고</NavLink>
        {isLoggedIn && <NavLink href="/profile">프로필</NavLink>}
        {isLoggedIn && <NavLink href="/resumes">자소서 관리</NavLink>}
      </Nav>
      <AuthWrapper>
        {isLoggedIn ? (
          <>
            <UserName>{user?.name}님</UserName>
            <Button onClick={logout}>로그아웃</Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button>로그인</Button>
            </Link>
            <Link href="/signup">
              <Button>회원가입</Button>
            </Link>
          </>
        )}
      </AuthWrapper>
    </HeaderWrapper>
  );
}
