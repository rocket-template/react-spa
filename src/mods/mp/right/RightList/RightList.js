import { Table, Modal } from 'antd';
import { NavLink } from 'react-router-dom';
import style from './right.less';
import InnerList from './InnerList';
const confirm = Modal.confirm;
export default class RightTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '功能名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'XXKEY',
        dataIndex: 'value',
        key: 'value'
      },
      {
        title: '子XX',
        dataIndex: 'childList',
        key: 'childList',
        render(rights) {
          if (rights && rights.length) {
            return rights.map(x => x.name).join(' | ');
          }
          return '无';
        }
      },
      {
        title: '所属YY',
        dataIndex: 'appName',
        key: 'appName'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (val, record, index) => {
          return (
            <span>
              <a
                onClick={() => {
                  this.props.handleShowDialog(record);
                }}
              >
                修改
              </a>
              <span className={style.right_divider}>|</span>
              <a onClick={() => this.delete(record.id)}>删除</a>
            </span>
          );
        }
      }
    ];
    this.state = {
      childList: []
    };
  }

  delete = id => {
    const that = this;
    confirm({
      title: '您确定删除吗?',
      onOk() {
        that.props.onDel(id);
      }
    });
  };
  handleDelChild = id => {
    // console.log('handleDelChild....', id);
    this.props.onDel(id);
    // data.splice(0, 1);
  };
  expandedRowRender = render => {
    const data = [];

    const array = render.childList;
    const len = array.length;
    for (let i = 0; i < len; i++) {
      data.push({
        id: array[i].id,
        name: array[i].name,
        value: array[i].value,
        appName: array[i].appName
      });
    }
    return <InnerList data={data} handleShowDialog={this.props.handleShowDialog} onDel={this.handleDelChild} />;
  };
  expand = () => {
    //console.log('abc');
  };
  render() {
    let { pageNo, pageSize, total, onPageChange, defaultRow, onHandleOnExpand, loading } = this.props;
    return (
      <Table
        loading={loading}
        rowKey="id"
        columns={this.columns}
        dataSource={this.props.list}
        expandedRowKeys={defaultRow}
        expandedRowRender={this.expandedRowRender}
        onExpand={onHandleOnExpand}
        pagination={{
          pageSize: pageSize,
          current: pageNo,
          total: total,
          onChange: onPageChange
        }}
      />
    );
  }
}
