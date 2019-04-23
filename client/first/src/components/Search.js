
import React from 'react';
import {Input,Form,Col, Row,Select,Button} from 'antd';


class SearchFilterForm extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let searchBy="&source="+values.ra+","+values.dec+","+values.radius+","+values.sexi
                this.props.search(1,searchBy,this.props.pageSize)
                this.props.setSearchP(searchBy)

            }
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (

                <Form layout="vertical" onSubmit={this.handleSubmit}>                

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="RA">
                            {getFieldDecorator('ra', {
                                rules: [{ required: true}],
                            })(
                                <Input/>
                            )}
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item label="Dec">
                            {getFieldDecorator('dec', {
                                rules: [{ required: true}],
                            })(
                                <Input/>
                            )}
                            </Form.Item>
                        </Col>
                    </Row>


                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Radius">
                            {getFieldDecorator('radius', {
                                rules: [{ required: true}],
                            })(
                                <Input/>
                            )}
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item label="Format">
                            {getFieldDecorator('sexi', {
                                rules: [{ required: true}],
                            })(
                                <Select placeholder="Please select format">
                                    <Select.Option value="false">Decimal</Select.Option>
                                    <Select.Option value="true">Sexigessimal</Select.Option>
                                </Select>
                            )}
                            </Form.Item>
                        </Col>
                    </Row>
                    

                    <div style={{textAlign: 'center',}}>
                        <Form.Item>
                            <Button htmlType="submit" type="primary">
                            Search
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                Clear
                            </Button>
                        </Form.Item>
                    </div>

                </Form>
            )
    }

}


const SearchFilter = Form.create()(SearchFilterForm);

export default SearchFilter;