import React, { useEffect, useRef } from 'react'
import * as ECharts from 'echarts';
import _ from 'lodash'
import axios from 'axios';


export default function Chart() {
    const barRef = useRef()
    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category').then(res => {
            renderBarView(_.groupBy(res.data, item => item.category.title))
        })
        return () => {
            window.onresize = null
        }

    }, [])
    const renderBarView = (obj) => {
        var myChart = ECharts.init(barRef.current);


        var option = {
            title: {
                text: 'News Categories BarChart'
            },
            tooltip: {},
            legend: {
                data: ['Number']
            },
            xAxis: {
                data: Object.keys(obj),
                axisLabel: {
                    interval: 0
                }
            },
            yAxis: {},
            series: [
                {
                    name: 'Number',
                    type: 'bar',
                    data: Object.values(obj).map(item => item.length)
                }
            ]
        };


        myChart.setOption(option);
        window.onresize = () => {
            // console.log('dad');
            myChart.resize()
        }
    }
    return (
        <div>
            <div ref={barRef} style={{ height: '400px', width: '100%', color: 'yellow' }}></div>
        </div>
    )
}
