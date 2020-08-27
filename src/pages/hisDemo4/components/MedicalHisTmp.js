import React, { useState } from 'react'
import {Row, Col, Input, Tree, Button} from 'antd'
import HisModal from './HisModal'
import {treeData} from '../data'
import './MedicalHisTmp.css'

const TreeNode = Tree.TreeNode
const Search = Input.Search 

function MedicalHisTemp(props) {
    const {onClose, onOk} = props
    const [curTemp, setCurTemp] = useState({})

    const renderTreeNode = list => {
        return list.length && list.map(item => {
            const { key, title, children = [] } = item
            return <TreeNode key={key} title={title} data={item}>{renderTreeNode(children)}</TreeNode>
        })
    }

    const onTreeSelect = (key, e) => {
        const { data } = e.node.props
        if (!data.content) return
        setCurTemp(data.content)
    }

    const onConfirm = () => {
        onOk(curTemp)
    }

    return (
        <HisModal title="病历模板" footer='收起病历模板' onClose={onClose}>
            <Row>
                <Col span={6} className="medical-his-lf">
                    <Search />
                    <Tree onSelect={onTreeSelect}>
                        {renderTreeNode(treeData)}
                    </Tree>
                </Col>
                <Col span={18} className="medical-his-rg">
                    <Row className="medical-his-title">{curTemp.templateName}</Row>
                    <Row className="medical-his-list">
                        <Row className="medical-his-item">
                            <Col className="his-item-label" span={4}>主诉：</Col>
                            <Col className="his-item-value" span={20}>{curTemp.selfTell}</Col>
                        </Row>
                        <Row className="medical-his-item">
                            <Col className="his-item-label" span={4}>现病史：</Col>
                            <Col className="his-item-value" span={20}>{curTemp.curMedicalHis}</Col>
                        </Row>
                        <Row className="medical-his-item">
                            <Col className="his-item-label" span={4}>既往史：</Col>
                            <Col className="his-item-value" span={20}>{curTemp.pastMediacalHis}</Col>
                        </Row>
                        <Row className="medical-his-item">
                            <Col className="his-item-label" span={4}>口腔检查：</Col>
                            <Col className="his-item-value" span={20}>{curTemp.dentalCheck}</Col>
                        </Row>
                        <Row className="medical-his-item">
                            <Col className="his-item-label" span={4}>辅助检查：</Col>
                            <Col className="his-item-value" span={20}>{curTemp.assistantCheck}</Col>
                        </Row>
                        <Row className="medical-his-item">
                            <Col className="his-item-label" span={4}>诊断：</Col>
                            <Col className="his-item-value" span={20}>{curTemp.diagnose}</Col>
                        </Row>
                        <Row className="medical-his-item">
                            <Col className="his-item-label" span={4}>治疗计划：</Col>
                            <Col className="his-item-value" span={20}>{curTemp.scheme}</Col>
                        </Row>
                        <Row className="medical-his-item">
                            <Col className="his-item-label" span={4}>处置：</Col>
                            <Col className="his-item-value" span={20}>{curTemp.disposal}</Col>
                        </Row>                        
                        <Row className="medical-his-item">
                            <Col className="his-item-label" span={4}>医嘱：</Col>
                            <Col className="his-item-value" span={20}>{curTemp.medicalAdvice}</Col>
                        </Row>
                    </Row>
                    <Row className="medical-his-btn">
                        <Button type={Object.keys(curTemp).length ? 'primary' : 'default'} onClick={onConfirm}>确定</Button>
                    </Row>
                </Col>
            </Row>
        </HisModal>
    )
}

export default MedicalHisTemp