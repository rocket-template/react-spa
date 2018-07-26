import { Avatar, Dropdown, Menu, Icon } from 'antd';
import style from './User.less';

export default function User({ data = {} }) {
  const user = data;
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="#" rel="noopener noreferrer">
          <Icon type="logout" />&nbsp;&nbsp;退出
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      {user ? (
        <Dropdown overlay={menu}>
          <div className={style.user}>
            <Avatar icon="user" src={user.icon} size="small" />
            <span className={style.name}>{user.nickNameCn}</span>
          </div>
        </Dropdown>
      ) : (
        <div className={style.user}>
          <Icon type="login" />&nbsp;登录
        </div>
      )}
    </div>
  );
}
