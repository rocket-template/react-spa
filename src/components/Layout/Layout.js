/**
 * 页面外部框架
 */
import style from './Layout.less';
import { Menu, Icon, Layout as layout } from 'antd';
import { Link } from 'react-router-dom';
import User from './User';
import Forbidden from 'mods/forbidden/index';

const { Sider } = layout;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      twoLevel: ['/mp/protect'], // 配置二级菜单路径
      date: new Date().getFullYear()
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  onClick = e => {
    // console.log('selected...', e);
  };
  getOpenKeys = () => {
    let pathName = this.props.location.pathname;
    let array = ['mp', this.props.location.pathname];
    let index = this.state.twoLevel.findIndex(c => pathName.indexOf(c) !== -1);

    if (index != -1) {
      return array.concat(this.state.twoLevel[index]);
    }
    return array;
  };
  render() {
    const { forbidden, children } = this.props;
    const {
      location: { pathname }
    } = this.props;
    return (
      <div className={`cpntLayout ${style.layout}`}>
        <div className={`${style.sidebar}`}>
          <Sider collapsible className={style.sidebarInner} width="230">
            <a href="javascript:void 0;" className={style.logo}>
              <h1>管理平台</h1>
            </a>
            {/*左侧导航 start*/}
            <Menu
              parentKey="0"
              selectedKeys={[pathname]}
              defaultSelectedKeys={[pathname]}
              defaultOpenKeys={this.getOpenKeys()}
              mode="inline"
              theme="dark"
              className={style.menuList}
            >
              <Menu.SubMenu
                key="mp"
                title={
                  <span>
                    <Icon type="play-circle-o" />
                    <span>一级菜单</span>
                  </span>
                }
              >
                <Menu.Item key="/mp/right">
                  <Link to="/mp/right">
                    <i className={`${style.iconfont}`} />
                    <span>二级管理</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/mp/cpassign">
                  <Link to="/mp/cpassign">
                    <i className={`${style.iconfont}`} />
                    <span>二级管理</span>
                  </Link>
                </Menu.Item>

                <Menu.SubMenu
                  key="/mp/protect"
                  title={
                    <span>
                      <Icon type="folder" />
                      <span>三级菜单</span>
                    </span>
                  }
                >
                  <Menu.Item key="/mp/protect/whitelist">
                    <Link to="/mp/protect/whitelist">
                      <i className={`${style.iconfont}`} />
                      <span>三级管理</span>
                    </Link>
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu.SubMenu>
            </Menu>
            {/*左侧导航 end*/}
          </Sider>
        </div>
        <div className={style.wrap}>
          <div className={style.header}>
            <div className={style.more}>
              <div className={style.user}>
                <User data={this.props.context && this.props.context.loginUser} />
              </div>
            </div>
          </div>
          <div className={style.main}>{!forbidden ? children : <Forbidden />}</div>
          <div className={style.footer}>
            Copyright<Icon type="copyright" />
            {this.state.date}
          </div>
        </div>
      </div>
    );
  }
}

Layout.displayName = 'Layout';
export default Layout;
