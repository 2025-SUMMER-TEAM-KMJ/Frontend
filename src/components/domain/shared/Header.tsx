'use client';

import Button from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.info});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
`;

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

const AuthNavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent default Link navigation
      router.push('/login');
    }
    // If logged in, Link will handle navigation normally
  };

  return (
    <NavLink href={href} onClick={handleClick}>
      {children}
    </NavLink>
  );
};

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <HeaderWrapper>
      <Link href="/">
        <Logo>Chee-Up!</Logo>
      </Link>
      <Nav>
        <NavLink href="/jobs">채용공고</NavLink>
        <AuthNavLink href="/profile">프로필</AuthNavLink>
        <AuthNavLink href="/resumes">자소서 관리</AuthNavLink>
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
