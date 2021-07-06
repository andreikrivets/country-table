import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Header = () => (
  <>
    <a href="/">
      <Title className="logo" level={2}>
        ~countries
      </Title>
    </a>
  </>
);

export default Header;
