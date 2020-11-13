<template>
    <div>
        <dv-border-box-11 title="各报表填报率汇总"  style="padding: .3rem">
            <div class="content-five">
                <template v-for="(config, index) in list">
                    <div :key="index" style="text-align: center">
                        <div style="display: flex;justify-content: center;align-items: center;margin-top: 1rem">
                            <dv-charts :option="config" style="width:4rem;height:4rem" />
                        </div>
                    </div>
                </template>

            </div>
            <div class="content-five">
                <div style="padding: .1rem;display: flex;justify-content: center;">
                    <dv-border-box-8 style="height: 4rem;">
                        <div style="padding: .2rem;">
                            <dv-scroll-board :config="config" style="width:100%;height:220px;" />
                        </div>
                    </dv-border-box-8>
                </div>
                <div style="padding: .1rem;display: flex;justify-content: center;">
                    <dv-border-box-12 style="height: 4rem;">
                        <div style="padding: .2rem;">
                            <dv-scroll-board :config="config" style="width:100%;height:220px" />
                        </div>
                    </dv-border-box-12>
                </div>
                <div style="padding: .1rem;display: flex;justify-content: center;">
                    <dv-border-box-10 style="height: 4rem;">
                        <div style="padding: .2rem;">
                            <dv-scroll-board :config="config" style="width:100%;height:220px" />
                        </div>
                    </dv-border-box-10>
                </div>
                <div style="padding: .1rem;display: flex;justify-content: center;">
                    <dv-border-box-12 style="height: 4rem;">
                        <div style="padding: .2rem;">
                            <dv-scroll-board :config="config" style="width:100%;height:220px" />
                        </div>
                    </dv-border-box-12>
                </div>
                <div style="padding: .1rem;display: flex;justify-content: center;">
                    <dv-border-box-8 style="height: 4rem;">
                        <div style="padding: .2rem;">
                            <dv-scroll-board :config="config" style="width:100%;height:220px" />
                        </div>
                    </dv-border-box-8>
                </div>
            </div>
        </dv-border-box-11>


    </div>
</template>

<script>
    export default {
        name: "formCollect",
        data() {
            return {
                list: [{
                    title: {
                        text: '表_全国成品粮价格统计',
                        style: {
                            fill: '#fff'
                        }
                    },
                    series: [
                        {
                            type: 'gauge',
                            data: [ { name: '表_全国成品粮价格统计', value: 90} ],
                            center: ['50%', '60%'],
                            axisLabel: {
                                formatter: '{value}%',
                                style: {
                                    fill: '#fff'
                                }
                            },
                        }
                    ]
                },{
                    title: {
                        text: '表_全国原粮价格统计',
                        style: {
                            fill: '#fff'
                        }
                    },
                    series: [
                        {
                            type: 'gauge',
                            data: [ { name: '表_全国原粮价格统计', value: 55 } ],
                            center: ['50%', '60%'],
                            axisLabel: {
                                formatter: '{value}%',
                                style: {
                                    fill: '#fff'
                                }
                            },
                            animationCurve: 'easeInOutBack'
                        }
                    ]
                },],
                formList: [{
                    "id": 1,
                    "report_id": 1,
                    "report_name": "表_全国成品粮价格统计",
                    "value": 20, // 已上报数量
                    "total": 120, // 所有数量
                    data: [99],
                    shape: 'round'
                }, {
                    "id": 2,
                    "report_id": 2,
                    "report_name": "表_全国原粮价格统计",
                    "value": 7, // 已上报数量
                    "total": 99, // 所有数量
                    data: [55],
                    shape: 'round'
                }],
                config:{
                    header: ["未上报期数"],
                    hoverPause: true,
                    rowNum: 7, //表格行数
                    headerHeight: 35,
                    headerBGC: "#0f1325", //表头
                    oddRowBGC: "#0f1325", //奇数行
                    evenRowBGC: "#171c33", //偶数行
                    index: true,
                    columnWidth: [60],
                    align: ["center"],
                    data: [
                        ['A0-2020'],
                        ['A0-2020'],
                        ['A0-2020'],
                        ['A0-2020'],
                        ['A0-2020'],
                        ['A0-2020'],
                        ['A0-2020'],
                        ['A0-2020'],
                        ['A0-2020'],
                        ['A0-2020'],

                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>
