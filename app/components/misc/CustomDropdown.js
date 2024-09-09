import React from 'react';
import { Dropdown } from 'primereact/dropdown';

export default function CustomDropdown({ currentLanguage, languageList, handleChangeLanguage }) {
    const options = languageList.map(lang => ({
        label: lang === 'pt-pt' ? 'PT' : lang.toUpperCase(),
        value: lang,
    }));

    const customStyles = {
        dropdown: {
            textTransform: 'uppercase',
            color: '#042946',
            fontSize: '14px',
        },
        dropdownPanel: {
            backgroundColor: '#f0f0f0',
        },
        option: {
            color: '#042946', // Color del texto
            backgroundColor: '#fff', // Fondo blanco
            fontSize: '14px',
            padding: '3px 10px',
            boxShadow: '1px 3px 6px rgba(238, 238, 238, 0.85)',
            ':hover': {
                backgroundColor: '#ccc', // Fondo al pasar el ratón
                fontWeight: '600',
            },
        },
    };

    return (
        <Dropdown
            value={currentLanguage}
            className="lang-dropdown"
            options={options}
            onChange={(e) => handleChangeLanguage({ target: { value: e.value } })}
            style={customStyles.dropdown}
            panelStyle={customStyles.dropdownPanel}
            itemTemplate={(option) => (
                <div style={customStyles.option}>{option.label}</div>
            )}
        />
    );
}
