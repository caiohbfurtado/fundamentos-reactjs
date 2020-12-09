import React from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const { url } = useRouteMatch();
  const active = url !== '/import';

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <Link to="/" className={active ? 'active' : 'normal'}>
            Listagem
          </Link>
          <Link to="/import" className={!active ? 'active' : 'normal'}>
            Importar
          </Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
