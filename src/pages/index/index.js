import './pre-config.js';
import Router from './router';
import './index.less';
import Fetcher from './Fetcher';
import 'moment/locale/zh-cn';
export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: {},
      permissions: [],
      mount: false
    };
  }

  async componentDidMount() {
    const res = await Fetcher.getGlobalContext();

    const res2 = await Fetcher.getPermissions();

    this.setState({
      context: res.success == true ? res.data : {},
      permissions: res2.success == true ? res2.data : [],
      mount: true
    });
  }

  render() {
    const { mount } = this.state;
    return mount ? (
      <Router context={this.state.context} permissions={this.state.permissions} key={this.state.permissions} />
    ) : null;
  }
}

ReactDOM.render(<Page />, document.getElementById('app'));
