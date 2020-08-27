import React, {useEffect, Children} from 'react'
import './HisModal.css'

export default props => {
    const {title, children, footer, onClose} = props

    useEffect(() => {
        document.documentElement.style.overflow = 'hidden'
        return () => { document.documentElement.style.overflow = 'scroll' }
    }, [])

    return (
        <div className="modal-mask">
            <div className="modal-content">
                <h3 className="modal-title">{title}<span className="modal-close" onClick={onClose}>x</span></h3>
                <div className="modal-body">{children}</div>
                <div className="modal-footer" onClick={onClose}>{footer}</div>
            </div>
        </div>
    )
}