'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/common/Button';

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
  // ...
  return (
    <HeaderWrapper>
      {/* ... */}
      <Nav>
        <NavLink href="/jobs">채용공고</NavLink>
        {isLoggedIn && <NavLink href="/resumes">자소서 관리</NavLink>}
        {isLoggedIn && <NavLink href="/profile">프로필</NavLink>}
      </Nav>
      {/* ... */}
    </HeaderWrapper>
  );
}
