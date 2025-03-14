import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  userName,
  onConstructorClick,
  onFeedClick,
  onProfileClick
}) => {
  const location = useLocation();
  const isProfileSection =
    location.pathname === '/profile' || location.pathname === '/login';

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div
          className={(styles.menu_part_left, styles.link)}
          onClick={onConstructorClick}
        >
          <>
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10 '>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive ? styles.link : styles.link_active
                }
              >
                Конструктор
              </NavLink>
            </p>
          </>
        </div>
        <div className={styles.menu_part_left} onClick={onFeedClick}>
          <>
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>
              <NavLink
                to='/feed'
                className={({ isActive }) =>
                  isActive ? styles.link : styles.link_active
                }
              >
                Лента заказов
              </NavLink>
            </p>
          </>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last} onClick={onProfileClick}>
          <>
            <ProfileIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>
              <NavLink
                to='/profile'
                className={({ isActive }) =>
                  isActive || isProfileSection
                    ? styles.link
                    : styles.link_active
                }
              >
                {userName || 'Личный кабинет'}
              </NavLink>
            </p>
          </>
        </div>
      </nav>
    </header>
  );
};
