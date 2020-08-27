import React, { useState, forwardRef } from 'react'
import { Row, Col, Tree, Icon, Button, Modal, Form, Input } from 'antd'
import { treeData } from '../data'

const { TreeNode } = Tree
const { Item } = Form
const { TextArea } = Input

function MedicalHis() {
    const [treeDataList, setTreeDataList] = useState(treeData)
    const [showCreateCatagory, setShowCreateCatagory] = useState(false)
    const [showCreateTmp, setShowCreateTmp] = useState(false)
    const [isTmpEditting, setIsTmpEditting] = useState(false)
    const [curCategory, setCurCategory] = useState()
    const [curKey, setCurKey] = useState()
    const [curTemp, setCurTemp] = useState()

    const renderTreeNode = (list, parentKey) => {
        return list.length && list.map(item => {
            const { key, children = [] } = item
            const keyStr = parentKey ?  `${parentKey}-${key}` : key+''
            return <TreeNode key={key} title={treeTitle(item, keyStr)} data={item}>{renderTreeNode(children, keyStr)}</TreeNode>
        })
    }

    const treeTitle = (data, keyStr) => {
        const { title, key, content } = data
        const level = keyStr.split('-').length
        let btnArr = []

        const renameBtn = <Icon type="edit" title="重命名" onClick={() => onRenameClick(data)} key="rename" />
        const createCateBtn = <Icon type="folder-add" title="新建子目录" key="cate" onClick={() => onCreateSubCate(key)} />   
        const createTmpBtn = <Icon type="plus" title="新建模板" key="tmp" onClick={() => onCreateTmpClick(data)} />
        const delBtn = <Icon type="delete" title="删除" key="del" onClick={() => onDelClick(data)}/>

        if (content) {
            btnArr.push(delBtn)
        } else {
            if (level < 3) {
                btnArr.push(renameBtn, createCateBtn, createTmpBtn, delBtn)
            } else if (level < 4) {
                btnArr.push(renameBtn, createTmpBtn, delBtn)
            } 
        }

        return (
            <div className="tree-title">
                <div className="tree-title-lf">{title}</div>
                <div className="tree-title-rg">
                    { btnArr }
                </div>
            </div>
        )
    }

    const onToggleCreateCata = () => {
        curCategory && setCurCategory()
        setShowCreateCatagory(prevState => !prevState)
    }

    const onCatagoryAdd = val => {
        setTreeDataList(prevList => {
            const obj = { key: prevList[prevList.length-1].key + 1, title: val.categoryName }
            return prevList.concat(obj)
        })
        onToggleCreateCata()
    }

    const onCategoryEdit = val => {
        console.log(val);
        // TODO 调修改接口
        onToggleCreateCata()
        setCurCategory()
    }

    const onRenameClick = data => {
        setCurCategory(data)
        onToggleCreateCata()
    }

    const onCreateSubCate = key => {
        setCurKey(key)
        onToggleCreateCata()
    }

    const onCreateTmpClick = data => {
        setCurCategory(data)
        setShowCreateTmp(true)
    }

    const onTmpAdd = values => {
        console.log(values);
        // TODO 调新增模板接口
        setShowCreateTmp(false)
    }

    const onDelClick = data => {
        const { key, title, children=[] } = data
        const canDel = !children.length

        Modal.confirm({
            title: '删除提示',
            content: canDel ? `确定删除 ${title}` : '该模板下还有可用的模板，不能删除',
            onOk() {
                // TODO 调删除接口
                canDel && setTreeDataList(prevList => {
                    const newList = [...prevList]
                    newList.pop()
                    return newList
                })
            }
        })
    }

    const onTreeClick = (keys, e) => {
        const { data } = e.node.props
        if (!data.content) return
        setCurTemp(data)
    }

    const onEditClick = () => {
        setShowCreateTmp(true)
        setIsTmpEditting(true)
    }

    const onTmpEdit = values => {
        console.log(values);
        setShowCreateTmp(false)
        setIsTmpEditting(false)
    }

    const onTmpCancel = () => {
        setShowCreateTmp(false)
        isTmpEditting && setIsTmpEditting(false)
    }

    return (
        <Row className="category">
            <Col span={6} className="category-left">
                <div className="category-btn">
                    <Button icon="plus" onClick={onToggleCreateCata}>创建模板目录</Button>
                </div>
                <Tree onSelect={onTreeClick}>{renderTreeNode(treeDataList)}</Tree>
            </Col>
            <Col span={18}>
                <TemplateFields {...curTemp} onEdit={onEditClick} />
            </Col>

            { 
                showCreateCatagory && 
                <WrappedCreateCategory 
                    curKey={curKey}
                    data={curCategory}
                    onCancel={onToggleCreateCata}
                    onAdd={onCatagoryAdd}
                    onEdit={onCategoryEdit}
                /> 
            }

            {
                showCreateTmp &&
                <WrappedCreateTmp
                    operateTitle={isTmpEditting ? '编辑模板' : '新增模板'}
                    data={isTmpEditting ? curTemp : curCategory}
                    onCancel={onTmpCancel}
                    onAdd={onTmpAdd}
                    onEdit={onTmpEdit}
                />
            }
        </Row>
    )
}

export default MedicalHis

// 静态模板组件
const TemplateFields = props => {
    const { content: { templateId, templateName, selfTell, curMedicalHis, pastMediacalHis, dentalCheck, assistantCheck, diagnose, scheme, disposal, medicalAdvice } = {}, onEdit } = props;
    
    return (
        <Row className="template-fields">
            <Row>
                <Col span={3}>模板名称：</Col>
                <Col span={20}>{templateName}</Col>
            </Row>
            <Row>
                <Col span={3}>主诉：</Col>
                <Col span={20}>{selfTell}</Col>
            </Row>
            <Row>
                <Col span={3}>现病史：</Col>
                <Col span={20}>{curMedicalHis}</Col>
            </Row>
            <Row>
                <Col span={3}>既往史：</Col>
                <Col span={20}>{pastMediacalHis}</Col>
            </Row>
            <Row>
                <Col span={3}>口腔检查：</Col>
                <Col span={20}>{dentalCheck}</Col>
            </Row>
            <Row>
                <Col span={3}>辅助检查：</Col>
                <Col span={20}>{assistantCheck}</Col>
            </Row>
            <Row>
                <Col span={3}>诊断：</Col>
                <Col span={20}>{diagnose}</Col>
            </Row>
            <Row>
                <Col span={3}>治疗方案：</Col>
                <Col span={20}>{scheme}</Col>
            </Row>
            <Row>
                <Col span={3}>处置：</Col>
                <Col span={20}>{disposal}</Col>
            </Row>
            <Row>
                <Col span={3}>医嘱：</Col>
                <Col span={20}>{medicalAdvice}</Col>
            </Row>
            {
                templateId && (
                    <Row>
                        <Col span={24} style={{textAlign:'center'}}>
                            <Button type="primary" style={{marginRight:10}} onClick={onEdit}>编辑</Button>
                            <Button type="primary">移动</Button>
                        </Col>
                    </Row>
                )
            }
        </Row>
    )
}

// 新增/修改 目录组件
const CreateCategory = forwardRef((props, _ref) => {
    const { data = {}, curKey, onCancel, onAdd, onEdit, form: { getFieldDecorator, validateFields } } = props

    const onSubmit = () => {
        validateFields((err, values) => {
            if (err) return
            data.key ? onEdit({...values, id: data.key}) : onAdd({...values, parentId: curKey})
        })
    }

    return (
        <Modal
            visible
            title={data.key ? '修改目录' : '新增目录'}
            closable={false}
            maskClosable={false}
            onCancel={onCancel}
            onOk={onSubmit}
        >
            <Form>
                <Item label="目录名称" labelCol={{span:6}} wrapperCol={{span:12}}>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: data.title,
                            rules: [{ required: true, message: '请输入目录名称' }]
                        })(<Input placeholder="请输入" />)
                    }
                </Item>
            </Form>
        </Modal>
    )
})
const WrappedCreateCategory = Form.create()(CreateCategory)

// 新增模板组件
const CreateTmp = forwardRef((props, _ref) => {
    const {
        data: {
            key,
            title,
            content: { templateId, templateName, selfTell, curMedicalHis, pastMediacalHis, dentalCheck, assistantCheck, diagnose, scheme, disposal, medicalAdvice } = {}, 
        },
        operateTitle,
        form: { getFieldDecorator, validateFields }, 
        onCancel, 
        onAdd, 
        onEdit,
    } = props
 
    const onSubmit = () => {
        validateFields((err, values) => {
            if (err) return
            templateId ? onEdit({...values, templateId}) : onAdd({...values, parentId: key})
        })
    }

    return(
        <Modal
            visible
            title={operateTitle}
            closable={false}
            maskClosable={false}
            onCancel={onCancel}
            onOk={onSubmit}
        >
            <Form className="create-tmp-form">
                {   
                    !templateId &&
                    <Item label="目录名称" labelCol={{span:6}} wrapperCol={{span:12}}>
                        {
                            getFieldDecorator('categoryName', {
                                initialValue: title,
                            })(<Input placeholder="请输入" disabled />)
                        }
                    </Item>
                }
                <Item label="模板名称" labelCol={{span:6}} wrapperCol={{span:12}}>
                    {
                        getFieldDecorator('templateName', {
                            initialValue: templateName,
                            rules: [{ required: true, message: '请输入模板名称' }]
                        })(<Input placeholder="请输入" />)
                    }
                </Item>
                <Item label="主诉" labelCol={{span:6}} wrapperCol={{span:12}}>
                    {
                        getFieldDecorator('selfTell', {
                            initialValue: selfTell
                        })(<TextArea placeholder="请输入" />)
                    }
                </Item>
                <Item label="现病史" labelCol={{span:6}} wrapperCol={{span:12}}>
                    {
                        getFieldDecorator('curMedicalHis', {
                            initialValue: curMedicalHis
                        })(<TextArea placeholder="请输入" />)
                    }
                </Item>
                <Item label="既往史" labelCol={{span:6}} wrapperCol={{span:12}}>
                    {
                        getFieldDecorator('pastMediacalHis', {
                            initialValue: pastMediacalHis
                        })(<TextArea placeholder="请输入" />)
                    }
                </Item>
                <Item label="口腔检查" labelCol={{span:6}} wrapperCol={{span:12}}>
                    {
                        getFieldDecorator('dentalCheck', {
                            initialValue: dentalCheck
                        })(<TextArea placeholder="请输入" />)
                    }
                </Item>
                <Item label="辅助检查" labelCol={{span:6}} wrapperCol={{span:12}}>
                    {
                        getFieldDecorator('assistantCheck', {
                            initialValue: assistantCheck
                        })(<TextArea placeholder="请输入" />)
                    }
                </Item>
                <Item label="诊断" labelCol={{span:6}} wrapperCol={{span:12}}>
                    {
                        getFieldDecorator('diagnose', {
                            initialValue: diagnose
                        })(<TextArea placeholder="请输入" />)
                    }
                </Item>
                <Item label="治疗计划" labelCol={{span:6}} wrapperCol={{span:12}}>
                    {
                        getFieldDecorator('scheme', {
                            initialValue: scheme
                        })(<TextArea placeholder="请输入" />)
                    }
                </Item>
                <Item label="处置" labelCol={{span:6}} wrapperCol={{span:12}}>
                    {
                        getFieldDecorator('disposal', {
                            initialValue: disposal
                        })(<TextArea placeholder="请输入" />)
                    }
                </Item>
                <Item label="医嘱" labelCol={{span:6}} wrapperCol={{span:12}}>
                    {
                        getFieldDecorator('medicalAdvice', {
                            initialValue: medicalAdvice
                        })(<TextArea placeholder="请输入" />)
                    }
                </Item>
            </Form>
        </Modal>
    )
})
const WrappedCreateTmp = Form.create()(CreateTmp)

