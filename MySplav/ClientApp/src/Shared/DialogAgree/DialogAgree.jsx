import React, { useState } from 'react';
import './DialogAgree.css';

export default function DialogAgree({ isOpen, onClose, onConfirm, title, message, confirmText = "Удалить", cancelText = "Отмена" }) {
    if (!isOpen) return null;


    return (
        <div className="DialogAgree" onClick={onClose}>
            <div className="DialogAgree-content" onClick={(e) => e.stopPropagation()}>
                <h3 className="DialogAgree-title">{title || "Подтверждение удаления"}</h3>
                <p className="DialogAgree-message">{message || "Вы уверены, что хотите удалить этот элемент? Это действие нельзя отменить."}</p>
                <div className="DialogAgree-actions">
                    <button className="DialogAgree-btn-cancel" onClick={onClose}>
                        {cancelText}
                    </button>
                    <button className="DialogAgree-btn-confirm" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}