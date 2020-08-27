import React, { useState, useMemo, forwardRef, useEffect, useRef } from 'react'
import {Row, Col, Menu, Button, Form, Input} from 'antd'
import MedicalHisTmp from './components/MedicalHisTmp'
import HisLayer from './components/HisLayer'
import {fieldsData, termData, treeData} from './data'
import './index.css'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item
const Item = Form.Item
const TextArea = Input.TextArea

const AddMedicalHis = forwardRef(function(props, _ref) {
    const {form: { getFieldDecorator, setFieldsValue, getFieldValue }} = props
    const [showTemp, setShowTemp] = useState(false)
    const [focusField, setFocusField] = useState()
    const focusFieldRef = useRef()

    const renderMenu = () => {
        return fieldsData.map(sub => {
            const {key, title, children = []} = sub
            return (
                <SubMenu key={key} title={title}>
                    {
                        children.map(item => (
                            <MenuItem key={item.key}>{item.title}</MenuItem>
                        ))
                    }
                </SubMenu>
            )
        })
    }

    const bodyClick = e => {
        // console.log(focusFieldRef.current, focusFieldRef.current !== e.target.id, e.path);
        const includesLayer = e.path.some(item => item.id === 'his-layer')

        if (focusFieldRef.current && focusFieldRef.current !== e.target.id && !includesLayer) {
            setFocusField()
        }
        
    }

    useEffect(() => {
        document.body.addEventListener('click', bodyClick)
        return () => {
            document.body.removeEventListener('click', bodyClick)
        }
    }, [])

    const onMenuClick = ({key}) => {
        document.getElementById(key).focus()
    }

    const onShowTemp = () => {
        setShowTemp(true)
    }

    const onHideTemp = () => {
        setShowTemp(false)
    }

    const onChooseTemp = values => {
        setFieldsValue(values)
        onHideTemp()
    }

    const findTermData = field => {
        return termData.find(item => item.title == field).children
    }


    const onInputClick = e => {
        setFocusField(e.target.id)
        focusFieldRef.current = e.target.id
    }

    const onTempClick = val => {
        const preVal = getFieldValue(focusField) || ''
        setFieldsValue({[focusField]: preVal + val})
    }


    return (
        <Row className="medical-wrapper">
            <Col span={4} className="left-nav">
                <Menu mode="inline" defaultOpenKeys={fieldsData.map(item => item.key)} onClick={onMenuClick}>
                    {renderMenu()}
                </Menu>
            </Col>
            <Col span={19}>
                <Row className="temp-btn">
                    <Button type="primary" ghost onClick={onShowTemp}>病历模板</Button>
                </Row>
                <Form>
                    <Item label="主诉">
                        {
                            getFieldDecorator('selfTell')(<TextArea onClick={onInputClick} />)
                        }
                        <HisLayer show={focusField === 'selfTell'} title="主诉" termData={findTermData('主诉')} tempData={treeData} fieldName="selfTell" onTempClick={onTempClick} />
                    </Item>
                    <Item label="现病史">
                        {
                            getFieldDecorator('curMedicalHis')(<TextArea onClick={onInputClick} />)
                        }
                         <HisLayer show={focusField === 'curMedicalHis'} title="现病史" termData={findTermData('现病史')} tempData={treeData} fieldName="curMedicalHis" onTempClick={onTempClick} />
                    </Item>
                    <Item label="既往史">
                        {
                            getFieldDecorator('pastMediacalHis')(<TextArea />)
                        }
                    </Item>
                    <Item label="口腔检查">
                        {
                            getFieldDecorator('dentalCheck')(<TextArea />)
                        }
                    </Item>
                    <Item label="辅助检查">
                        {
                            getFieldDecorator('assistantCheck')(<TextArea />)
                        }
                    </Item>
                    <Item label="诊断">
                        {
                            getFieldDecorator('diagnose')(<TextArea />)
                        }
                    </Item>
                    <Item label="治疗计划">
                        {
                            getFieldDecorator('scheme')(<TextArea />)
                        }
                    </Item>
                    <Item label="处置">
                        {
                            getFieldDecorator('disposal')(<TextArea />)
                        }
                    </Item>
                    <Item label="医嘱">
                        {
                            getFieldDecorator('medicalAdvice')(<TextArea />)
                        }
                    </Item>
                </Form>
            </Col>

            {
                showTemp && <MedicalHisTmp onClose={onHideTemp} onOk={onChooseTemp} />
            }
        </Row>
    )
})

export default Form.create()(AddMedicalHis)