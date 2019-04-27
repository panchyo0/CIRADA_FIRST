import React from 'react';
// import Students from '../components/student/Students';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import {Spin,Icon,Divider,Card} from 'antd';

import {errorHandler} from '../utilities/errorHandle'
import SearchFilter from '../components/Search'
import { Bubble } from 'react-chartjs-2';
import * as zoom from 'chartjs-plugin-zoom';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Visdb extends React.Component {
    state = { 
        searchParams:null,
        starData:[],
        galaxyData:[],
        blankData:[],
    };

    setSearchP=(p)=>{
        this.setState({searchParams:p})
    }


    componentWillReceiveProps(newProps) {
        if (this.props.firstDataList!==newProps.firstDataList) {
            
            const array=newProps.firstDataList
            var starData=[]
            var galaxyData=[]
            var blankData=[]
            for (let index = 0; index < array.count; index++) {
                const item=array.results[index];
                
                var data={}
                data.x=item.RAJ2000
                data.y=item.DEJ2000
                data.r=item.Fint/parseFloat(10)
                
                if (item.c1==='g') {
                    galaxyData.push(data)
                }else if(item.c1==='s'){
                    starData.push(data)
                }else{
                    blankData.push(data)
                }
            }

            this.setState({
                starData:starData,
                galaxyData:galaxyData,
                blankData:blankData,
            })
            
        }
    }


    render(){
        let errorMessage=errorHandler(this.props.error,"FIRST");

        const data={
            datasets:[{
                label: 'Star', 
                data: this.state.starData, 
                borderColor: "rgba(0,0,0,0.2)",       
                backgroundColor: "rgba(0, 0, 0, 0.45)"
                // borderColor: "rgba(60,186,159,0.2)",           
                // backgroundColor: "rgba(60,186,159,0.8)", 
            },{
                label: 'Galaxy',
                data: this.state.galaxyData,
                borderColor: "rgba(193,46,12,1)",         
                backgroundColor: "rgba(193,46,12,0.2)"
            },{
                label: 'Blank',
                data: this.state.blankData,
                // borderColor: "rgba(0,0,0,0.2)",       
                // backgroundColor: "#000"
                borderColor: "rgba(60,186,159,0.2)",           
                backgroundColor: "rgba(60,186,159,0.8)", 
            }]
        }

          const options={
                title: {
                  display: true,
                  text: 'FIRST SOURCES'
                }, 
                scales: {
                  yAxes: [{ 
                    scaleLabel: {
                      display: true,
                      labelString: "DEC"
                    }
                  }],
                  xAxes: [{ 
                    scaleLabel: {
                      display: true,
                      labelString: "RA"
                    }
                  }]
                },
                pan:{
                    enabled:true,
                    mode:'xy'
                },
                zoom:{
                    enabled:true,
                    mode:'xy'
                }
            }
        return (
            <div>
                {errorMessage}
                {!this.props.studentListLoading?

                    <div>
                        <Card>
                            <Divider>Search</Divider>
                            <SearchFilter search={this.props.searchList} setSearchP={this.setSearchP} pageSize={100000} />
                                
                        </Card>
                        <Divider>DISPLAY SOURCES</Divider>
                        <Card>
                            {/* {bubbleChart} */}
                            <Bubble 
                                data={data}
                                options={options}
                                hoverRadius={9}
                            />
                            {/* {this.props.firstDataList&&<First
                                loading={this.props.loading} 
                                data={this.props.firstDataList}
                                onPageChange={this.props.onPageChange}
                                onPageSizeChange={this.props.onPageSizeChange}
                                currentPage={this.props.currentPage}
                                currentPageSize={this.props.currentPageSize}
                             />} */}
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


export default connect(mapStateToProps,mapDispatchToProps)(Visdb);