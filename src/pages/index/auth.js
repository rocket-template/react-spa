import { Redirect } from 'react-router-dom';
import Layout from 'components/Layout/Layout';
import NotAuth from 'mods/forbidden/index';
const CONST_CONFIG = {
  // 后端匹配值: 入口菜单: 入口地址
  MP: ['/mp', '/mp/right']
};

const authComps = (props, attrs) => {
  if (attrs.permissions.passList.length === 0) {
    // 无权限
    return (
      <Layout {...props} attrs={attrs}>
        <NotAuth />
      </Layout>
    );
  } else {
    let arr = authObject(attrs);
    return <Redirect to={arr[1]} push />;
  }
};

const authObject = props => {
  let key = '',
    entry = ['/'];
  if (props.permissions.passList.length > 0) {
    key = props.permissions.passList[0];
    entry = CONST_CONFIG[key];
  }

  return entry;
};

export { authComps, authObject };
