'use strict';

import { Button } from 'antd';
import style from './index.less';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    return (
      <div className={style.page}>
        <div className={style.inner}>
          <h4>403</h4>
          <p>抱歉，你无权访问该页面</p>
          <p>请走标准权限申请流程，谢谢！</p>
          <a href="#" target="_blank">
            <Button size="large" type="primary">
              申请权限
            </Button>
          </a>
        </div>
      </div>
    );
  }
}
