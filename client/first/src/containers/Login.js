import React from 'react';
import{connect} from 'react-redux';
import {Form, Icon, Input, Button,Spin,Layout,Alert} from 'antd'; 
import '../css/Login.css';
import * as actions from '../store/actions/index'; 

const FormItem = Form.Item;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const {Header, Footer, Content,} = Layout;
  
class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            this.props.onAuth(values.userName,values.password)
        }
        });
        
    }

    render() {
        let errorMessage=null;
        if (this.props.error) {
            if(this.props.error.response){
                if (this.props.error.response.status===400){
                    errorMessage=(
                        <Alert message='Please check your username and password.' type="error" />
                    );
                }else{
                    errorMessage=(
                        <Alert message={this.props.error.message} type="error" />
                    );
                }
            }
            else{
                errorMessage=(
                    <Alert message={this.props.error.message} type="error" />
                ); 
            }
        } 
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Layout>
                    <Header>
                        <h1 style={{ color:'#f0f2f5' }}>CIRADA FIRST DEMO</h1>
                    </Header>
                    <Content className="login-content">
                        <div> 
                            {errorMessage}
                            {
                                this.props.loading?
                                <Spin indicator={antIcon} />
                                :
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <FormItem>
                                        {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                        })(
                                        <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                        )}
                                    </FormItem>
                                    <FormItem>

                                        {/* <a className="login-form-forgot" href="">Forgot password</a> */}
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                        </Button>
                                    </FormItem>
                                </Form>
                            }
                        </div>
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>
                        Makami College ©2018 Created by IT
                    </Footer>
                </Layout>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps=(state)=>{
    return {
        loading:state.authReducer.loading,
        error:state.authReducer.error
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(userName,password)=>dispatch(actions.authLogin(userName,password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm);