import React, { ReactElement, useState, useEffect } from 'react'
import { Button, Switch, Avatar, Popover } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import Logo from '../logo.svg'
import sun from '../sun.svg'
import moon from '../moon.svg'

import './components.css'

interface Props {

}


export default function Navbar(): ReactElement {

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      setIsDark(localStorage.getItem('theme') === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', `${isDark}`)
  }, [isDark]);

  const handleThemeChange = (checked: boolean) => {
    if (checked) {
      document.documentElement.style.setProperty('--body', "#10161A");
      document.documentElement.style.setProperty('--shadow', "#141414");

    } else {
      document.documentElement.style.setProperty('--body', "#fff");
      document.documentElement.style.setProperty('--shadow', "#d9d9d9");
    }
  }

  return (
    <header className="nav__header">
      <nav>
        <Link to="/">
          <div className="nav__title"
            style={{
              backgroundImage: `url('${Logo}')`
            }} ></div>
        </Link>
        <div className="nav__links">
          <Switch
            onChange={handleThemeChange}
            checkedChildren={<div style={{
              width: '15px',
              height: '15px',
              backgroundImage: `url('${moon}')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
            }}></div>}
            unCheckedChildren={<div style={{
              width: '15px',
              height: '15px',
              backgroundImage: `url('${sun}')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
            }}></div>}
          />
          <Link to="/">
            <Button type="link">Home</Button>
          </Link>
          <Link to="/login">
            <Button type="link">Login</Button>
          </Link>
          <Popover
            placement="bottomLeft"
            content={<div className="popup__menu">
              <Button type="link">Dashboard</Button>
              <Button type="link">Home</Button>
              <Button type="link" icon={<LogoutOutlined />}>Logout</Button>
            </div>}
          >
            <Avatar
              size={40}
              style={{ backgroundColor: '#87d068' }}
              icon={<UserOutlined />}
              className="nav__avatar" />
          </Popover>

        </div>
      </nav>
    </header>
  )
}