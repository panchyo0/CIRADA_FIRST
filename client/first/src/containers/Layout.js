import React from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {Link,withRouter} from 'react-router-dom';
import '../css/Layout.css';
import * as actions from '../store/actions/index';
import{connect} from 'react-redux';
import config from '../config/setting';

const {
  Header, Content, Footer, Sider,
} = Layout;

const breadcrumbNameMap= {
  '/visdb': 'VisDb Demo',
};

class SiderBar extends React.Component {

    constructor (props){
        super(props);
        this.state = {
          collapsed: true,
          currentTab:'1',
        };

        let pathSnippets = window.location.pathname.split('/').filter(i => i);
        
        if (pathSnippets.length>0) {
            const current=pathSnippets[0]
            // console.log(pathSnippets)
            
            switch (current) {
                case "visdb": 
                    this.state={currentTab:'2',collapsed:true};
                    break;
                default:
                    this.state={currentTab:'1',collapsed:true};
                    break;
            }
        }else{
            this.state={currentTab:'1',collapsed:true};
        }
    
    }
  
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    callback=(key)=>{
        this.setState({currentTab:key.key});
    }

    render() {
        
        let pathSnippets = window.location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index+1).join('/')}`;
            if(pathSnippets[index]!=="detail"){
                return (
                <Breadcrumb.Item key={url}>
                    
                    {breadcrumbNameMap[url]}
                    
                </Breadcrumb.Item>
                );
            }else{
                return (
                <Breadcrumb.Item key={url}>
                    {breadcrumbNameMap[url]}
                </Breadcrumb.Item>
                );
            }
        });

        const breadcrumbItems = [(
            <Breadcrumb.Item key="home">
                Home
            </Breadcrumb.Item>
        )].concat(extraBreadcrumbItems);

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible={true}
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo">
                        <h2 className='text'>FIRST</h2>
                    </div>
                        <Menu theme="dark" defaultSelectedKeys={[this.state.currentTab]} onClick={this.callback} mode="inline">
                        
                            <Menu.Item key="1">
                                <Link to="/"><Icon type="table" /><span>Transient Dev</span></Link>
                            </Menu.Item>

                            <Menu.Item key="2">
                                <Link to="/visdb"><Icon type="dot-chart" /><span>VisDB Dev</span></Link>
                            </Menu.Item>

                            <Menu.Item key="3" >
                            <a href={config.url+'admin/'}><Icon type="tool" /><span>Administration</span></a>
                            </Menu.Item>

                            <Menu.Item key="4" onClick={this.props.logout}>
                            <Link to="/"><Icon type="poweroff" /><span>Logout</span></Link>
                            </Menu.Item>
                        </Menu>
                </Sider>

                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                       
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>                
                            {breadcrumbItems}
                        </Breadcrumb>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        CIRADA FIRST DEMO ©2019 Created by QI PANG
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

const mapDispatchToProps=dispatch=>{
  return{
      logout:()=>dispatch(actions.logout())

  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    userLoading:state.authReducer.userLoading,
    error:state.authReducer.error
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SiderBar));