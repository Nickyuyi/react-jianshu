import React, { useState } from 'react'
import { Row, Col } from 'antd'
import './BtnTabs.css'

const BtnTabs = props => {
    const { tabs, defaultActiveKey, onChange } = props
    const [activeKey, setActiveKey] = useState(defaultActiveKey)

    const onTabClick = key => {
        setActiveKey(key)
        onChange(key)
    }

    return (
        <Row className="term-tab">
            {
                tabs.map(item => (
                    <Col span={3} className="term-tab-item" key={item.key}>
                        <span className={`term-tab-text ${item.key === activeKey ? 'tab-checked':''}`} onClick={() => onTabClick(item.key)}>{item.title}</span>
                    </Col>
                ))
            }
        </Row>
    )
}

export default BtnTabs

