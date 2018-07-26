import { Form, Input, Radio, Select, Button, message } from 'antd';
import { formItemLayout, tailFormItemLayout } from '../../form.layout';
import Fetcher from '../Fetcher';
const FormItem = Form.Item;
const Option = Select.Option;

class RightForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validChild: true,
      disabled: false,
      rightList: [],
      formData: this.props.formData
    };
    this.dirty = false;
  }
  _catch(result) {
    if (result.success === false) {
      message.error(result.message);
      return true;
    } else {
      return false;
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.dirty = true;
    const that = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values, that.props.id);
        if (that.props.id) {
          Fetcher.updateRight(that.props.id, {
            name: values.name.trim()
          })
            .then(result => {
              if (that._catch(result)) {
                return;
              }
              if (result.error === 0) {
                message.success('修改成功');
                that.refreshList(true);
              } else if (result.error < 0) {
                message.error(result.message);
              }
            })
            .catch(err => {
              message.error(err.toString());
            });
        } else {
          Fetcher.addRight({
            name: values.name.trim(),
            value: values.value.trim(),
            appId: parseInt(values.appId),
            parentId: parseInt(values.parentId) || 0
          })
            .then(result => {
              if (that._catch(result)) {
                return;
              }
              if (result.error === 0) {
                message.success('添加成功');
                that.refreshList(false);
              } else if (result.error < 0) {
                message.error(result.message);
              }
            })
            .catch(err => {
              message.error(err.toString());
            });
        }
      }
    });
  };
  componentDidMount() {
    if (this.props.id) {
      this.setState({
        disabled: true,
        rightList: this.props.rightList
      });
    } else {
      this.setState({
        disabled: false
      });
    }
  }
  refreshList = updateFlag => {
    this.props.getList({
      fromForm: updateFlag ? true : false
    });
    this.props.handleCancel();
  };
  handleCancel = () => {
    this.props.handleCancel();
  };
  getTop = val => {
    const that = this;
    let rightArray = [{ id: 0, name: '一级XX' }];
    Fetcher.getTopLevel({
      appId: val
    }).then(res => {
      if (that._catch(res)) {
        return;
      }
      if (res.error === 0) {
        this.setState({
          rightList: rightArray.concat(res.data)
        });
      }
    });
  };
  onChangeApp = val => {
    this.getTop(val);
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { envList } = this.props;
    const { name, value, appId, parentId } = this.state.formData;
    const { rightList } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="XX名称">
          {getFieldDecorator('name', {
            id: 'name',
            initialValue: name,
            rules: [{ required: true, message: '请输入XX名称!', whitespace: true }]
          })(<Input autoComplete="off" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="XXKEY">
          {getFieldDecorator('value', {
            id: 'value',
            initialValue: value,
            rules: [{ required: true, message: '请输入XXKEY!', whitespace: true }]
          })(<Input disabled={this.state.disabled} autoComplete="off" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="所属YY">
          {getFieldDecorator('appId', {
            id: 'appId',
            initialValue: appId + '',
            rules: [{ required: true, message: '请选择所属YY!' }]
          })(
            <Select placeholder="选择YY" disabled={this.state.disabled} onChange={this.onChangeApp}>
              {envList.map((current, index) => {
                return (
                  <Option value={current.id + ''} key={'k_' + index}>
                    {current.name}
                  </Option>
                );
              })}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="父XX">
          {getFieldDecorator('parentId', {
            id: 'parentId',
            initialValue: parentId + '',
            rules: [{ required: true, message: '请选择XX!' }]
          })(
            <Select placeholder="选择XX" disabled={this.state.disabled}>
              {rightList.map((current, index) => {
                return (
                  <Option value={current.id + ''} key={'k_' + index}>
                    {current.name}
                  </Option>
                );
              })}
            </Select>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button style={{ marginLeft: 20 }} onClick={this.handleCancel}>
            取消
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields(props) {
    return {
      name: {
        value: props.formData.name
      },
      value: {
        value: props.formData.value
      },
      appId: {
        value: props.formData.appId + ''
      },
      parentId: {
        value: props.formData.parentId + ''
      }
    };
  }
})(RightForm);
