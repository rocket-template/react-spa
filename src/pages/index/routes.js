/**
 * 页面路由配置
 * path: 路由路径
 * redirectTo: 重定向页面
 * component: 该路径对应渲染的页面（组件）
 */

import Loadable from 'react-loadable';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import Layout from 'components/Layout/Layout';

// 动态按需加载组件，首次展现时加载相关 js，并缓存
const DynamicLoad = ({ loader, props }) => {
  const Cpnt = Loadable({
    loader,
    loading: LoadingIndicator
  });
  return <Cpnt {...props} />;
};

// 权限校验，当传入 forbidden 为 true 时，展示无访问权限页面
const Authentication = ({ children, forbidden }) => {
  return forbidden ? (
    <DynamicLoad loader={() => import(/* webpackChunkName: "forbidden-page" */ 'mods/forbidden/index')} />
  ) : (
    children
  );
};

const check = (data, type) => {
  if (data && data.passList) {
    return data.passList.indexOf(type) == -1;
  } else {
    return true;
  }
};

const routes = [
  {
    path: '/mp/right',
    component: props => {
      return (
        <Layout {...props}>
          <Authentication forbidden={check(props.attrs.permissions, 'MP')}>
            <DynamicLoad
              loader={() => import(/* webpackChunkName: "resource-page" */ 'mods/mp/right/index')}
              props={props}
            />
          </Authentication>
        </Layout>
      );
    }
  },
  {
    path: '/mp/cpassign',
    component: props => {
      return (
        <Layout {...props}>
          <Authentication forbidden={check(props.attrs.permissions, 'MP')}>
            <DynamicLoad
              loader={() => import(/* webpackChunkName: "resource-page" */ 'mods/mp/cpassign/index')}
              props={props}
            />
          </Authentication>
        </Layout>
      );
    }
  },
  {
    path: '/mp/protect/whitelist',
    component: props => {
      return (
        <Layout {...props}>
          <Authentication forbidden={check(props.attrs.permissions, 'MP')}>
            <DynamicLoad
              loader={() => import(/* webpackChunkName: "resource-page" */ 'mods/mp/protect/whitelist/index')}
              props={props}
            />
          </Authentication>
        </Layout>
      );
    }
  }
];

export default routes;
