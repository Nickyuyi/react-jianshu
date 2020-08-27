import React, { forwardRef, useState, useEffect } from 'react'
import { Row, Col, Button, Tree, Icon, Form, Modal, Input, Alert } from 'antd'
import BtnTabs from './BtnTabs'
import { termData } from '../data'

const TreeNode = Tree.TreeNode
const Item = Form.Item

function TermConfig() {
    const [termDataList, setTermDataList] = useState(termData)
    const [curTermData, setCurTermData] = useState(termDataList[0])
    const [showCreateTerm, setShowCreateTerm] = useState(false)
    const [isEditting, setIsEditting ] = useState(false)
    const [curTerm, setCurTerm] = useState(termDataList[0].children[0])

    const onTabChange = key => {
        if (isEditting) {
            return Modal.warn({title: '提示', content: '请先保存编辑中的内容'})
        }
        const curTerm = termDataList.find(item => item.key === key)
        setCurTermData(curTerm)
        setCurTerm(curTerm.children[0])
    }

    const renderTitle = data => {
        const { key, title } = data
        return (
            <div className="tree-title">
                <div className="tree-title-lf">{title}</div>
                <div className="tree-title-rg">
                    <Icon type="edit" title="修改类目" onClick={() => onEditTerm(data)} />
                    <Icon type="delete" title="删除类目" onClick={() => onDelTerm(data)} />
                </div>
            </div>
        )
    }

    const onCreateTerm = () => {
        setShowCreateTerm(true)
    }

    const onEditTerm = data => {
        setCurTerm(data)
        setShowCreateTerm(true)
    }

    const onCreateCancel = () => {
        setCurTerm({})
        setShowCreateTerm(false)
    }

    const onCreateSubmit = values => {
        console.log(values);
        onCreateCancel()
    }

    const onEditSubmit = values => {
        console.log(values);
        onCreateCancel()
    }

    const onDelTerm = data => {
        const { key, children=[] } = data
        if (children.length) {
            return Modal.warn({
                title: '提示',
                content: '请先清除类目中的内容'
            })
        }
        // TODO 调用删除接口
    }

    const onTreeSelect = (keys, e) => {
        const { data } = e.node.props
        if (isEditting) {
            return Modal.warn({title: '提示', content: '请先保存编辑中的内容'})
        }
        setCurTerm(data)
    }

    const onEditContent = () => {
        setIsEditting(true)
    }

    const onContentCancel = () => {
        setIsEditting(false)
    }

    const onContentSave = values => {
        console.log(values)
        onContentCancel()
    }

    return (
        <Row className="terms">
            <BtnTabs defaultActiveKey={termDataList[0].key} tabs={termDataList} onChange={onTabChange} />
            <Row className="terms-body">
                <Col span={5} className="terms-body-lf">
                    <div className="terms-lf-btn"><Button type="primary" ghost onClick={onCreateTerm}>创建词条类目</Button></div>
                    <Tree onSelect={onTreeSelect}>
                        <TreeNode key={curTermData.key} title={curTermData.title} disabled />
                        {
                            curTermData.children.map(item => (
                                <TreeNode key={item.key} title={renderTitle(item)} data={item} />
                            ))
                        }
                    </Tree>
                    <ScaleLine title="主诉" list={[{id:1,name:'时间'},{id:2,name:'部位'}]} />
                </Col>
                <Col span={10} className="terms-body-rg">
                    <WrappedTermForm data={curTerm}  isEditting={isEditting} onEdit={onEditContent} onCancel={onContentCancel} onSave={onContentSave} />
                </Col>
            </Row>

            {
                showCreateTerm && 
                <WrappedCreateTerm
                    data={curTerm}
                    onCancel={onCreateCancel}
                    onAdd={onCreateSubmit}
                    onEdit={onEditSubmit}
                />
            }
        </Row>
    )
}

export default TermConfig

// 新增/修改 类目组件
const CreateTerm = forwardRef((props, _ref) => {
    const { data = {}, onCancel, onAdd, onEdit, form: { getFieldDecorator, validateFields } } = props

    const onSubmit = () => {
        validateFields((err, values) => {
            if (err) return
            data.key ? onEdit({...values, id: data.key}) : onAdd(values)
        })
    }

    return (
        <Modal
            visible
            closable={false}
            maskClosable={false}
            title={data ? '修改类目' : '创建类目'}
            onCancel={onCancel}
            onOk={onSubmit}
        >
            <Form>
                <Item label="类目名称" labelCol={{span:6}} wrapperCol={{span:12}}>
                    {
                        getFieldDecorator('termName', {
                            rules: [{ required: true, message: '请输入类目名称' }],
                            initialValue: data.title
                        })(<Input placeholder="请输入" />)
                    }
                </Item>
            </Form>
        </Modal>
    )
})
const WrappedCreateTerm = Form.create()(CreateTerm)

// 词条查看/编辑 组件
const TermForm = forwardRef((props, _ref) => {
    const { data: { key, title, children=[] }, form: {getFieldDecorator, validateFields, getFieldValue}, isEditting, onEdit, onCancel, onSave } = props
    const [ listData, setListData ] = useState(children)

    useEffect(() => {
        setListData(children)
    }, [props.data])


    const onAddItem = () => {
        setListData(prevList => {
            console.log(prevList)
            const lastObj = prevList[prevList.length -1]
            return prevList.concat({key: lastObj ? lastObj.key+1 : 1})
        })
    }

    const onDelItem = (index, key) => {
        const curContent = getFieldValue(`content_${key}`)
        console.log(curContent);
        if (curContent === undefined || !curContent.trim()) {
            return setListData(prevList => prevList.filter((item, i) => i !== index))
        }

        Modal.confirm({
            title: '提示',
            content: '确定要删除此内容?',
            onOk: () => setListData(prevList => prevList.filter((item, i) => i !== index))
        })
    }

    const onCancelClick = () => {
        setListData(children)
        onCancel()
    }

    const onSaveClick = () => {
        const content = []
        let hasEmpty = false

        for (let item of listData) {
            console.log(content);

            const curContent = getFieldValue(`content_${item.key}`)
            if (curContent === undefined || !curContent.trim()) {
                hasEmpty = true
                break
            }
            content.push({key: item.key, value: curContent})
        }

        if (hasEmpty) {
            return Modal.warn({ title: '提示', content: '词条内容不能为空' })
        }

        onSave({key, content})
    }

    return (
        <Row>
            <Row className="term-header">
                <Col span={6}>编号</Col>
                <Col span={18}>内容</Col>
            </Row>
            <Form className="term-body">
                {
                    listData.map((item, index) => (
                        <Item 
                            colon={false} 
                            key={item.key} 
                            label={index+1} 
                            labelCol={{span:6}} 
                            wrapperCol={{span:18}} 
                            extra={isEditting && <Icon type="delete" onClick={() => onDelItem(index, item.key)} />}
                        >
                            {
                                isEditting ? getFieldDecorator(`content_${item.key}`, {
                                    initialValue: item.title
                                })(<Input />) : <div className="term-body-text">{item.title}</div>
                            }
                        </Item>
                    ))
                }
            </Form>
            { !listData.length && !isEditting && <Col className="term-body-empty">暂无词条内容</Col> }
            {
                isEditting && (
                    <Row className="term-add" onClick={onAddItem} >
                        <Icon type="plus" />新增词条
                    </Row>
                )
            }
            <Row className="term-btns">
                { !isEditting && <Button type="primary" onClick={onEdit}>编辑</Button> }
                { isEditting && <Button type="primary" onClick={onSaveClick}>保存</Button> }
                { isEditting && <Button onClick={onCancelClick}>取消</Button> }
            </Row>
        </Row>
    )
})
const WrappedTermForm = Form.create()(TermForm)

const ScaleLine = props => {
    const { title, list = [], defaultExpanded = true, onSelect } = props;
    const [expanded, setExpanded] = useState(defaultExpanded)

    const onToggleExpand = () => {
        setExpanded(expand => !expand)
    }

    return (
        <div className="scale-line">
            <div className="scale-title">
                <Icon type={expanded ? 'minus-square' : 'plus-square'} className="scale-icon" onClick={onToggleExpand} />{title}
            </div>
            <ul className={`scale-list ${!expanded ? 'hide' : ''}`}>
                {
                    list.map((item, index) => (
                        <li className="scale-item" key={item.id}>
                            <span className="line"></span>
                            <span className="text">{item.name}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}