
import React from 'react';
import {Spin,Icon,Table} from 'antd';


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class First extends React.Component{


    onShowSizeChange=(current, pageSize)=> {
        this.props.onPageSizeChange(pageSize);
    }

    showTotal(total) {
        return `Total ${total} items`;
    }

    remove0=(record)=>{
        let data=record.replace(/^0+|0+$/g, "");
        return(
            <span>
                {data}
            </span>
        )
        
    }

    render(){
        return (
            <div>
                {!this.props.loading?
                <div>
                    <Table 
                    rowKey={record => record.ID}
                    dataSource={this.props.data.results}
                    pagination={{
                        onChange: (page) => {
                            this.props.onPageChange(page);
                        },
                        pageSize: this.props.currentPageSize,
                        total:this.props.data.count,
                        showTotal:this.showTotal,
                        current:this.props.currentPage,
                        pageSizeOptions:['5', '10', '20', '50','100','10000'],
                        showSizeChanger:true, 
                        onShowSizeChange:this.onShowSizeChange,
                    }}
                    onChange={this.handleTableChange}
                    >
                    {/* <Table.Column width={50}  key="id" title="Id" dataIndex="ID" /> */}
                    <Table.Column width={50} key="FIRST" title="FIRST" dataIndex="FIRST" />
                    <Table.Column width={50}  key="RAJ2000" title="RAJ2000" render={(record)=>this.remove0(record)} dataIndex="RAJ2000" />
                    <Table.Column width={50} key="DEJ2000" title="DEJ2000" render={(record)=>this.remove0(record)} dataIndex="DEJ2000" />
                    <Table.Column width={50} key="Fint" title="FINT" render={(record)=>this.remove0(record)} dataIndex="Fint" />
                    <Table.Column width={50} key="c1" title="C1" render={(record)=>this.remove0(record)} dataIndex="c1"/>
                    <Table.Column width={50} key="angular" title="Angular Separation" dataIndex="angular_separation" defaultSortOrder='ascend' sorter={(a, b) => a.angular_separation - b.angular_separation}/>
                    </Table>
                </div>
                :
                <Spin tip="Loading..." indicator={antIcon} />
                }
                
            </div>
        )
    }
}


export default First;