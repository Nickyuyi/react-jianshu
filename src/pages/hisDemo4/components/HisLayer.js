import React, { useState } from 'react'
import {Tabs, Row, Col, Tree} from 'antd'

import './HisLayer.css'

const { TabPane } = Tabs
const { TreeNode } = Tree

const HisLayer = props => {
    const {show, title, fieldName, termData, tempData, onTempClick} = props
    const [tempTitle, setTempTitle] = useState()
    const [tempFields, setTempFields] = useState([]) 

    const renderTreeNode = list => {
        return list.length && list.map(item => {
            const { key, title, children = [] } = item
            return <TreeNode key={key} data={item} title={title}>{renderTreeNode(children)}</TreeNode>
        })
    }

    const recursionGetField = (list, originArr, field) => {
        let arr = [...originArr]
        list.forEach(item => {
            const {content, children = []} = item
            if (content && content[field]) {
                return arr.push(content[field])
            }
            if (children.length) {
                arr = arr.concat(recursionGetField(children, arr, field))
            }
        })
        return arr
    }

    const onTreeClick = (keys, e) => {
        const { data: { title, content, children = [] } } = e.node.props
        let fields = []

        if (children.length) {
            fields = recursionGetField(children, [], fieldName)
        } else if (content && content[fieldName]) {
            fields.push(content[fieldName])
        }

        setTempTitle(title)
        setTempFields(fields)
    }

    return (
        <div className={`layer ${show?'show':''}`} id="his-layer">
            <Tabs defaultActiveKey="1">
                <TabPane key="1" tab={`${title}词条`}>
                    <Row className="term-wrapper">
                        <Row className="term-wrapper-inner">
                            {
                                termData.map(term => (
                                    <Row className="term-row" key={term.key}>
                                        <Col span={2} className="term-label">{term.title}</Col>
                                        <Col span={22}>
                                            {
                                                term.children && 
                                                term.children.map(item => (
                                                    <span className="term-text" key={item.key} onClick={() => onTempClick(item.title)}>{item.title}</span>
                                                ))
                                            }
                                        </Col>
                                    </Row>
                                ))
                            }
                        </Row>
                    </Row>
                </TabPane>
                <TabPane key="2" tab={`${title}模板`}>
                    <Row className="temp-wrapper">
                        <Col span={3} className="temp-tree">
                            <Tree onSelect={onTreeClick}>{renderTreeNode(tempData)}</Tree>
                        </Col>
                        <Col span={21} className="temp-content">
                            <div className="temp-content-inner">
                                <div className="temp-title">{tempTitle}</div>
                                <ul className="temp-list">
                                    {
                                        tempFields.map((item, index) => (
                                            <li className="temp-item" key={index}>
                                                <span className="temp-item-bar" onClick={() => onTempClick(item)}>{item}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default HisLayer