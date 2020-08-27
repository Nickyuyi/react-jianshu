import React from 'react'
import { Tabs } from 'antd'
import MedicalTmp from './components/MedicalTmp'
import TermConfig from './components/TermConfig'
import './index.css'

const TabPane = Tabs.TabPane

function MedicalHis() {
    return (
        <div className="wrapper">
            <Tabs defaultActiveKey="2" className="tab">
                <TabPane tab="病历模板" key="1">
                    <MedicalTmp />
                </TabPane>
                <TabPane tab="词条配置" key="2">
                    <TermConfig />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default MedicalHis