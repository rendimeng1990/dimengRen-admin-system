import React, { useEffect, useRef, useState } from 'react'
import * as ECharts from 'echarts';
import _ from 'lodash'
import axios from 'axios';


export default function Chart() {
    const pieRef = useRef()
    const [allList, setallList] = useState([])
    const [pieChart, setpieChart] = useState(null)
    const { username } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get(`/news?publishState=2&_expand=category`).then(res => {
            // console.log(res.data);
            setallList(res.data)
            var currentList = res.data.filter(item => item.author === username)
            var groupObj = _.groupBy(currentList, item => item.category.title)
            var list = []
            for (var i in groupObj) {
                list.push({
                    name: i,
                    value: groupObj[i].length
                })
            }


            renderPieView(list)


        })

        return () => {
            window.onresize = null
        }

    }, [])


    const renderPieView = (list) => {
        // console.log(currentList);
        var myChart;
        if (!pieChart) {
            myChart = ECharts.init(pieRef.current);
            setpieChart(myChart)
        } else {
            myChart = pieChart
        }
        // console.log(list);

        var option
        option = {
            title: {
                text: "Current User's News Category PieChart",
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: list,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        option && myChart.setOption(option);
        window.onresize = () => {
            // console.log('dad');
            myChart.resize()
        }
    }

    return (
        <div>
            <div ref={pieRef} style={{ height: '400px', width: '100%', color: 'yellow' }}>
                {/* {renderPieView()} */}
            </div>
        </div>
    )
}
