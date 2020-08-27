import React, { useState } from 'react';
import './hisDemo.css';

// 牙位选择Demo
const hisDemo = props => {
    const [leftTopArr, setLeftTopArr] = useState([]);
    const [rightTopArr, setrightTopArr] = useState([]);
    const [leftBottomArr, setleftBottomArr] = useState([]);
    const [rightBottomArr, setrightBottomArr] = useState([]);
    const [showChooseTooth, setShowChooseTooth] = useState(false);

    const toggleChooseTooth = () => {
        setShowChooseTooth(prevState => !prevState);
    }

    const onToothClick = data => {
        const { pos, key } = data
        // 根据pos 判断 操作哪个 arr 
        let targetArr
        let targetFn
        switch (pos) {
            case 'rightTop':
                targetArr = rightTopArr
                targetFn = setrightTopArr
                break
            case 'leftTop':
                targetArr = leftTopArr
                targetFn = setLeftTopArr
                break
            case 'rightBottom':
                targetArr = rightBottomArr
                targetFn = setrightBottomArr
                break
            case 'leftBottom':
                targetArr = leftBottomArr
                targetFn = setleftBottomArr
                break
            default:
                break
        }
        if (targetArr.includes(key)) {
            targetArr = targetArr.filter(item => item !== key)
        } else {
            const index = targetArr.findIndex(item => String(item) > String(key))
            if (index === -1) {
                targetArr.push(key)
            } else {
                targetArr.splice(index, 0, key)
            }
        }
        targetFn(targetArr.concat())
    }

    const oBatchClick = type => {
        const numArr = Array.from(new Array(8), (ele, index) => index + 1)
        let targetFn
        switch (type) {
            case 'rightTop':
                targetFn = setrightTopArr
                break
            case 'leftTop':
                targetFn = setLeftTopArr
                break
            case 'rightBottom':
                targetFn = setrightBottomArr
                break
            case 'leftBottom':
                targetFn = setleftBottomArr
                break
            default:
                break
        }
        targetFn(numArr)
    }

    const onReset = () => {
        setrightTopArr([])
        setLeftTopArr([])
        setrightBottomArr([])
        setleftBottomArr([])
    }

    return (
        <div className="demo-wrapper">
            <div className="diagnose-box">
                <div className="diagnose-box-row"  onClick={toggleChooseTooth}>
                    <div className="diagnose-box-col">
                        {rightTopArr.concat().reverse().join(',')}
                    </div>
                    <div className="diagnose-box-col">
                        {leftTopArr.join(',')}
                    </div>
                </div>
                <div className="diagnose-box-row"  onClick={toggleChooseTooth}>
                    <div className="diagnose-box-col">
                        {rightBottomArr.concat().reverse().join(',')}
                    </div>
                    <div className="diagnose-box-col">
                        {leftBottomArr.join(',')}
                    </div>
                </div>

                <ChooseTooth
                    leftTopArr={leftTopArr}
                    rightTopArr={rightTopArr}
                    leftBottomArr={leftBottomArr}
                    rightBottomArr={rightBottomArr}
                    onToothClick={onToothClick}
                    oBatchClick={oBatchClick}
                    onReset={onReset}
                    scale={!showChooseTooth}
                />
            </div>
        </div>
    )
}

export default hisDemo;


function ChooseTooth(props) {
    const { leftTopArr, rightTopArr, leftBottomArr, rightBottomArr, scale, onToothClick, oBatchClick, onReset } = props;

    // console.log(leftTopArr, rightTopArr, leftBottomArr, rightBottomArr);

    const genToothObj = (from, num, pos, desc) => {
        let toothArr = [];
        if (typeof from === 'number') {
            toothArr = Array.from(new Array(num), (ele, index) => ({ key: from + index, pos }));
        } else if (typeof from === 'string') {
            const charCode = from.charCodeAt();
            toothArr = Array.from(new Array(num), (ele, index) => ({ key: String.fromCharCode(charCode + index), pos }))
        }

        desc && toothArr.reverse();
        return toothArr;
    }

    return (
        <div className={`choose-tooth-box ${scale ? 'scale' : ''}`}>
            <div className="choose-tooth-header">
                <button onClick={() => oBatchClick('leftTop')}>左上</button>
                <button onClick={() => oBatchClick('rightTop')}>右上</button>
                <button onClick={() => oBatchClick('leftBottom')}>左下</button>
                <button onClick={() => oBatchClick('rightBottom')}>右下</button>
                <button onClick={onReset}>重置</button>
            </div>
            <div className="choose-tooth-body">
                <div className="choose-tooth-body-inner">
                    <table>
                        <tbody>
                            <tr>
                                {
                                    genToothObj(1, 8, 'rightTop', true).map(item => (
                                        <Tooth key={item.pos + item.key} checked={rightTopArr.includes(item.key)} data={item} click={onToothClick} />
                                    ))
                                }
                                {
                                    genToothObj(1, 8, 'leftTop').map(item => (
                                        <Tooth key={item.pos + item.key} checked={leftTopArr.includes(item.key)} data={item} click={onToothClick} />
                                    ))
                                }
                            </tr>
                            <tr>
                                <td rowSpan="2" colSpan="3"></td>
                                {
                                    genToothObj('A', 5, 'rightTop', true).map(item => (
                                        <Tooth key={item.pos + item.key} checked={rightTopArr.includes(item.key)} data={item} click={onToothClick} />
                                    ))
                                }
                                {
                                    genToothObj('A', 5, 'leftTop').map(item => (
                                        <Tooth key={item.pos + item.key} checked={leftTopArr.includes(item.key)} data={item} click={onToothClick} />
                                    ))
                                }
                                <td rowSpan="2" colSpan="3"></td>
                            </tr>
                            <tr>
                                {
                                    genToothObj('A', 5, 'rightBottom', true).map(item => (
                                        <Tooth key={item.pos + item.key} checked={rightBottomArr.includes(item.key)} data={item} click={onToothClick} />
                                    ))
                                }
                                {
                                    genToothObj('A', 5, 'leftBottom').map(item => (
                                        <Tooth key={item.pos + item.key} checked={leftBottomArr.includes(item.key)} data={item} click={onToothClick} />
                                    ))
                                }
                            </tr>
                            <tr>
                                {
                                    genToothObj(1, 8, 'rightBottom', true).map(item => (
                                        <Tooth key={item.pos + item.key} checked={rightBottomArr.includes(item.key)} data={item} click={onToothClick} />
                                    ))
                                }
                                {
                                    genToothObj(1, 8, 'leftBottom').map(item => (
                                        <Tooth key={item.pos + item.key} checked={leftBottomArr.includes(item.key)} data={item} click={onToothClick} />
                                    ))
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function Tooth(props) {
    const { checked, data, click } = props

    return (
        <td onClick={() => click(data)}>
            <span className={`tooth-item ${checked ? 'checked' : ''}`}>{data.key}</span>
        </td>
    )
}