export const fieldsData = [
    {
        key: '1',
        title: '主诉及病史',
        children: [
            {
                key: 'selfTell',
                title: '主诉',
            },
            {
                key: 'curMedicalHis',
                title: '现病史'
            },
            {
                key: 'pastMediacalHis',
                title: '既往史'
            }
        ]
    },
    {
        key: '2',
        title: '口腔检查',
        children: [
            {
                key: 'dentalCheck',
                title: '口腔检查'
            },
            {
                key: 'assistantCheck',
                title: '辅助检查'
            }
        ]
    },
    {
        key: '3',
        title: '诊断与治疗计划',
        children: [
            {
                key: 'diagnose',
                title: '诊断',
            },
            {
                key: 'scheme',
                title: '治疗计划'
            }
        ]
    },
    {
        key: '4',
        title: '处置与医嘱',
        children: [
            {
                key: 'disposal',
                title: '处置'
            },
            {
                key: 'medicalAdvice',
                title: '医嘱'
            }
        ]
    }
]

export const treeData  = [
    { 
        key: 1, 
        title: '一级模板目录', 
        children: [
            {
                key: 11,
                title: '二级模板目录',
                children: [
                    {
                        key: 111,
                        title: '三级模板目录',
                        children: [
                            {
                                key: 1111,
                                title: '四级模板节点',
                                content: {
                                    templateId: 11111,
                                    templateName: '这是一个模板',
                                    selfTell: '主诉内容',
                                    curMedicalHis: '现病史内容',
                                    pastMediacalHis: '既往史内容',
                                    dentalCheck: '口腔检查',
                                    assistantCheck: '辅助检查',
                                    diagnose: '诊断',
                                    scheme: '治疗方案',
                                    disposal: '处置',
                                    medicalAdvice: '医嘱'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                key: 12,
                title: '我是模板',
                content: {
                    selfTell: '我很健康哦'
                }
            },
            {
                key: 13,
                title: '空模板目录'
            }
        ] 
    },
    {
        key: 2,
        title: '上海维乐口腔',
        children: [
            {
                key: 211,
                title: '上海延长路维乐口腔',
                content: {
                    templateId: 2111,
                    templateName: '这是延长路模板',
                    selfTell: '延长路主诉内容',
                    curMedicalHis: '延长路现病史内容',
                    pastMediacalHis: '延长路既往史内容',
                    dentalCheck: '延长路口腔检查',
                    assistantCheck: '延长路辅助检查',
                    diagnose: '延长路诊断',
                    scheme: '延长路治疗方案',
                    disposal: '延长路处置',
                    medicalAdvice: '延长路医嘱'
                }
            }
        ]
    },
    {
        key: 3,
        title: '北京维乐口腔' 
    }
]

export const termData = [
    {
        key: 1,
        title: '主诉',
        children: [
            {
                key: 11,
                title: '部位',
                children: [
                    {
                        key: 111,
                        title: '左上'
                    },
                    {
                        key: 112,
                        title: '左下'
                    },
                    {
                        key: 113,
                        title: '右上'
                    },
                    {
                        key: 114,
                        title: '右下'
                    },
                ]
            },
            {
                key: 12,
                title: '症状',
                children: [
                    {
                        key: 121,
                        title: '酸痛'
                    }
                ]
            },
            {
                key: 13,
                title: '时间'
            }
        ]
    },
    {
        key: 2,
        title: '现病史',
        children: [
            {
                key: 21,
                title: '时间',
                children: [
                    {
                        key: 211,
                        title: '一周'
                    }
                ]
            },
            {
                key: 22,
                title: '口腔习惯'
            }
        ]
    },
    {
        key: 3,
        title: '既往史',
        children: [
            {
                key: 31,
                title: '常规'
            },
            {
                key: 32,
                title: '高血压'
            }
        ]
    }
]