import React from 'react';
// import Students from '../components/student/Students';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import {Spin,Icon,Divider,Card} from 'antd';

import {errorHandler} from '../utilities/errorHandle'
import SearchFilter from '../components/Search'
import First from '../components/First';


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Transient extends React.Component {
    state = { 
        searchParams:null,
    };

    constructor(props){
        super(props)
        //reset page and pagesize
        this.props.onPageChange(1)
        this.props.onPageSizeChange(props.currentPageSize)
    }

    
    // handel page change
    componentWillUpdate(nextProps, nextState){
        const param=this.state.searchParams
        if (nextProps.currentPage!==this.props.currentPage) {
            this.props.searchList(nextProps.currentPage,param,nextProps.currentPageSize)
        }

        if(nextProps.currentPageSize!==this.props.currentPageSize){
            this.props.onPageChange(1)
            this.props.searchList(1,param,nextProps.currentPageSize)
        }
    }


      
    // onSelect(value) {
    //     console.log('onSelect', value);
    //   }
    setSearchP=(p)=>{
        this.setState({searchParams:p})
    }
    



    render(){
        //need handel error message
        let errorMessage=errorHandler(this.props.error,"FIRST");

        return (
            <div>
                {errorMessage}
                {!this.props.studentListLoading?

                    <div>
                        <Card>
                            <Divider>Search</Divider>
                            <SearchFilter search={this.props.searchList} setSearchP={this.setSearchP} pageSize={this.props.currentPageSize} />
                                
                        </Card>
                        <Divider>FIRST SOURCES</Divider>
                        <Card>
                            {this.props.firstDataList&&<First
                                loading={this.props.loading} 
                                data={this.props.firstDataList}
                                onPageChange={this.props.onPageChange}
                                onPageSizeChange={this.props.onPageSizeChange}
                                currentPage={this.props.currentPage}
                                currentPageSize={this.props.currentPageSize}
                             />}
                        </Card>
                    </div>
                    :
                        <Spin tip="Loading..." indicator={antIcon} />
                }
            </div>
        )
    }
}


const mapDispatchToProps=dispatch=>{
    return {
        searchList:(page,params,pageSize)=>dispatch(actions.searchList(page,params,pageSize)),
        onPageChange:(page)=>dispatch(actions.firstChangePage(page)),
        onPageSizeChange:(pageSize)=>dispatch(actions.firstChangePageSize(pageSize)),
    }
  }

const mapStateToProps=(state)=>{
    return {
        //attendance
        error:state.firstReducer.error,
        current:state.firstReducer.step,
        firstDataList:state.firstReducer.firstDataList,
        currentPage:state.firstReducer.page,
        currentPageSize:state.firstReducer.pageSize,
        loading:state.firstReducer.searchLoading,
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Transient);