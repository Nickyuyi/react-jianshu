import React, { useState, useMemo, useEffect, useRef } from 'react'
import './index.css'

const timePicker = function() {
    const [startDate, setStartTime] = useState('2020-07-28 01:00')
    const [endDate, setEndTime] = useState('2020-07-28 11:30')
    const [activeHeight, setActiveHeight] = useState(21);
    const [activeTop, setActiveTop] = useState(0);

    const listRef = useRef()
    const listTopRef = useRef()
    const startRef = useRef()

    const timeRange = useMemo(() => {
        const range = []
        let startTime = new Date(startDate).getTime()
        const endTime = new Date(endDate).getTime()

        while(startTime <= endTime) {
            const date = new Date(startTime)
            const hour = date.getHours()
            const minutes = date.getMinutes()

            if (minutes === 0) {
                const hourStr = hour < 10 ? '0'+hour : hour
                range.push(hourStr + ':00')
            } else {
                range.push(minutes)
            }
            startTime += 15*60*1000
        }



        return range
    }, [startDate, endDate])

    useEffect(() => {
        listTopRef.current = listRef.current.getBoundingClientRect().top
    }, [])


    // const onMouseDown = (e, index) => {
    //     e.persist()
    //     startRef.current = e.clientY
    //     console.log('startY: ' + e.clientY)
    // }

    // const onMouseMove = e => {
    //     if (!startRef.current) return
    //     setActiveValue(e.clientY)
    // }

    // const onMouseUp = (e, index) => {
    //     e.persist()
    //     const endY = e.clientY
    //     console.log('endY: ' + endY)
        
    //     setActiveValue(endY)
    //     startRef.current = null
    // }

    // const setActiveValue = currentY => {
    //     const startY = startRef.current
    //     const height = Math.ceil(Math.abs(currentY - startY) / 21) * 21 || 21
    //     const startTop = currentY > startY ? startY : currentY
    //     const top = Math.floor((startTop - listTopRef.current) / 21) * 21

    //     console.log('height: '+ height, 'top: '+ top)
    //     setActiveHeight(height)
    //     setActiveTop(top)
    // }

    // console.log(timeRange);

    const calcActiveHeight = currentY => {
        const startY = startRef.current
        const height = Math.ceil((currentY - startY) / 21) * 21
        console.log('start: '+ startY, 'current: ' + currentY, 'height: ' + height)
        setActiveHeight(prevHeight => prevHeight + height)
    }

    const onDownMouseDown = e => {
        // 起始位置
        startRef.current = e.clientY
    }

    const onItemMouseMove = e => {
        // 只要碰到了，active 就增加21 
        if(!startRef.current) return
        setActiveHeight(prevHeight => prevHeight + 21)
    }

    const onActiveMouseUp = e => {  
        // 停止
        startRef.current = null
    }

    const onActiveMouseMove = e => {
        // 每向上 移动21 则 高度减 21 最小为 21
        console.log('start: ' +startRef.current, 'current: ' + e.clientY)
        console.log(e.clientY - startRef.current);
        if ((e.clientY - startRef.current) === 21) {
            setActiveHeight(prevHeight => prevHeight === 21 ? prevHeight : prevHeight - 21)
            startRef.current = e.clientY
        }
    }

    return (
        <div className="time-wrapper">
            <h1 className="time-header">请选择预约时间</h1>
            <div className="time-picker">
                <div className="time-picker-header">
                    <span className="header-lf"></span>
                    <span className="header-rg">星期二</span>
                </div>
                <ul className="time-picker-list" ref={listRef}>

                    {
                        timeRange.map((item, index) => (
                            <li className="time-picker-item" key={index}>
                                <span className="item-lf">{item}</span>
                                <span className="item-rg" onMouseMove={onItemMouseMove}></span>
                            </li>
                        ))
                    }
                    <div className="active-time" style={{height:activeHeight, top:activeTop}} onMouseUp={onActiveMouseUp} onMouseMove={onActiveMouseMove}>
                        <div className="active-time-down" onMouseDown={onDownMouseDown}>
                            下拉
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default timePicker
