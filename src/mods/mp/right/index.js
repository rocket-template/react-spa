import { Row, Col, Button, Select, message, Modal } from 'antd';
import RightList from './RightList/RightList';
import Fetcher from './Fetcher';
import RightForm from './RightList/Forms';
const Option = Select.Option;

export default class MpRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      envList: [],
      list: [],
      searchOpt: '',
      loading: true, // 列表数据是否加载中
      pageNo: 1, // 页码
      pageSize: 20, // 每页显示个数
      total: 0, // 搜索到的总数
      expandedRows: [],
      visible: false,
      formData: {},
      id: null,
      title: '',
      rightList: []
    };
  }
  getList = (args = {}) => {
    let searchParams = Object.assign(
      {
        pageNo: args.fromForm ? this.state.pageNo : 1,
        pageSize: 20,
        appId: ''
      },
      args
    );
    const that = this;
    Fetcher.getList(searchParams).then(res => {
      if (res.success === false) {
        message.error(res.message);
        return;
      }
      if (res.error === 0) {
        let arr = [];
        arr.push(res.data.data[0].id);
        that.setState({
          expandedRows: arr,
          list: res.data.data,
          total: res.data.total,
          pageNo: res.data.pageNo,
          pageSize: res.data.pageSize,
          loading: false
        });
      }
    });
  };
  getEnviroments = () => {
    Fetcher.getEnviroments().then(res => {
      if (res.success === false) {
        message.error(res.message);
        return;
      }
      if (res.error === 0) {
        this.setState({
          envList: res.data
        });
      }
    });
  };
  componentDidMount() {
    this.getEnviroments();
    this.getList();
  }
  handleChange = value => {
    this.setState({
      searchOpt: value
    });
  };
  handleSearch = () => {
    this.getList({
      appId: this.state.searchOpt
    });
  };
  handlePageChange = pageNo => {
    this.getList({
      pageNo: pageNo
    });
  };
  handleDelete = (id, cb) => {
    const that = this;
    Fetcher.deleteRight(id)
      .then(res => {
        if (res.error === 0) {
          that.getList();
          cb && cb();
        } else {
          message.error(res.message);
        }
      })
      .catch(err => {
        message.error('删除失败！');
      });
  };
  onHandleOnExpand = (expanded, record) => {
    let expandedRows = this.state.expandedRows;
    if (expanded) {
      expandedRows = [];
      expandedRows.push(record.id);
    } else {
      expandedRows.splice(expandedRows.indexOf(record.id), 1);
    }
    this.setState({
      expandedRows: expandedRows
    });
  };
  handleShowDialog = record => {
    const that = this;
    Fetcher.get(record.id).then(res => {
      if (res.error === 0) {
        Fetcher.getTopLevel({
          appId: res.data.appId
        }).then(resd => {
          if (resd.error === 0) {
            that.setState({
              id: record.id,
              title: '修改XX',
              formData: res.data,
              visible: true,
              rightList: [{ id: 0, name: '一级XX' }].concat(resd.data)
            });
          }
        });
      }
    });
  };
  handleOk = () => {
    this.setState({
      visible: false
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  handleNewRight = () => {
    const that = this;
    this.setState(
      {
        id: null,
        title: '新增XX',
        visible: true,
        formData: {
          name: '',
          value: '',
          appId: '',
          parentId: ''
        }
      },
      () => {
        setTimeout(() => {
          that.refs.form1.resetFields();
        }, 0);
      }
    );
  };
  render() {
    let { envList, list, pageNo, pageSize, total, expandedRows, loading } = this.state;
    return (
      <React.Fragment>
        <Row className="box">
          <Col lg={9} sm={15}>
            <label style={{ marginRight: 15 }}>所属YY:</label>
            <Select placeholder="选择YY" style={{ width: 190 }} onChange={this.handleChange}>
              {envList.map((current, index) => {
                return (
                  <Option value={current.id + ''} key={'k_' + index}>
                    {current.name}
                  </Option>
                );
              })}
            </Select>
            <Button style={{ marginLeft: 20 }} type="primary" onClick={this.handleSearch}>
              查询
            </Button>
          </Col>
          <Col span={2} sm={5}>
            <Button type="primary" onClick={this.handleNewRight}>
              新增XX
            </Button>
          </Col>
        </Row>
        <div className="box">
          <RightList
            list={list}
            pageNo={pageNo}
            defaultRow={expandedRows}
            pageSize={pageSize}
            total={total}
            loading={loading}
            onDel={this.handleDelete}
            onHandleOnExpand={this.onHandleOnExpand}
            onPageChange={this.handlePageChange}
            handleShowDialog={this.handleShowDialog}
          />
        </div>
        {this.state.visible && (
          <Modal
            footer={null}
            title={this.state.title}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            ref="modal"
          >
            <RightForm
              ref="form1"
              formData={this.state.formData}
              envList={this.state.envList}
              rightList={this.state.rightList}
              onOk={this.onOk}
              getList={this.getList}
              handleCancel={this.handleCancel}
              id={this.state.id}
            />
          </Modal>
        )}
      </React.Fragment>
    );
  }
}
