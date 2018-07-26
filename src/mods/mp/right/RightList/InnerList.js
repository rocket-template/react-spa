import { Table, Modal } from 'antd';
import { NavLink } from 'react-router-dom';
import style from './right.less';
const confirm = Modal.confirm;
export default class RightTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      visible: false
    };
    this.columns = [
      { title: '功能名称', dataIndex: 'name', key: 'name' },
      { title: 'XXKEY', dataIndex: 'value', key: 'value' },
      {
        title: '子XX',
        key: 'state',
        render: () => <span>无</span>
      },
      { title: '所属YY', dataIndex: 'appName', key: 'appName' },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (obj, record) => (
          <span className={'table-operation'}>
            <a
              onClick={() => {
                this.props.handleShowDialog(record);
              }}
            >
              修改
            </a>
            <span className={style.right_divider}>|</span>
            <a
              onClick={() => {
                this.handleDelChild(record);
              }}
            >
              删除
            </a>
          </span>
        )
      }
    ];
  }

  handleDelChild = (data, id) => {
    // console.log('handleDelChild....', this.state.data);
    const that = this;
    confirm({
      title: '您确定删除吗?',
      onOk() {
        that.props.onDel(data.id, () => {
          var d = that.state.data;
          d.splice(d.findIndex(c => c.id === id), 1);
          that.setState({
            data: d
          });
        });
      }
    });
  };
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  onOk = () => {
    this.setState({
      visible: false
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    });
  }
  render() {
    let { data } = this.state;
    return (
      <React.Fragment>
        <Table rowKey="id" columns={this.columns} dataSource={data} pagination={false} />
      </React.Fragment>
    );
  }
}
