'use client'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import SpacerHeight from "@/app/components/misc/SpacerHeight";
import { useTranslation } from 'react-i18next';
import { Calendar } from 'primereact/calendar';

export default function FormularioDonacion(props) {

    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        apellidos: "",
        phone: "",
        email: "",
        check: false,
    });

    const handleSubmit = async (event) => {
        document.getElementById('responseText').classList.add('hidden');
        event.preventDefault();

        if (!formData.name || !formData.email) {
            document.getElementById('responseText').innerHTML = t("Please fill in all required fields");
            document.getElementById('responseText').classList.remove('hidden');
            return;
        }

        try {
            const response = await fetch(process.env.BASE_URL + process.env.ENDPOINT_SEND_FORM, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                document.getElementById('responseText').innerHTML = t("The email was sent successfully.");
                document.getElementById('responseText').classList.remove('hidden');
                setFormData({
                    name: "",
                    apellidos: "",
                    email: "",
                    phone: "",
                    check: false,
                });
            } else {
                document.getElementById('responseText').innerHTML = t("Error submitting the form");
                document.getElementById('responseText').classList.remove('hidden');
            }
        } catch (error) {
            document.getElementById('responseText').innerHTML = t("Error submitting the form");
            document.getElementById('responseText').classList.remove('hidden');
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    return (

        <div className="form-haccenext form-light relative">
            <div className="innerform">
                <SpacerHeight height="" />
                <form action="/" method="post" onSubmit={handleSubmit}>
                    <div className="p-float-label mb-3">
                        <InputText
                            id="floatingInput1"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder={t("Nombre *")}
                        />
                        <label htmlFor="floatingInput1">{t("Nombre *")}</label>
                    </div>

                    <div className="p-float-label mb-3">
                        <InputText
                            id="floatingInput1"
                            name="apellidos"
                            value={formData.apellidos}
                            onChange={handleChange}
                            required
                            placeholder={t("Apellidos *")}
                        />
                        <label htmlFor="floatingInput1">{t("Apellidos *")}</label>
                    </div>

                    <div className="p-float-label mb-3">
                        <InputText
                            id="floatingInput2"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder={t("Email *")}
                        />
                        <label htmlFor="floatingInput2">{t("Email *")}</label>
                    </div>

                    <div className="p-float-label mb-3">
                        <InputText
                            id="floatingInput3"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t("Teléfono *")}
                        />
                        <label htmlFor="floatingInput3">{t("Teléfono *")}</label>
                    </div>

                    <div className="form-check mt-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                            name="check"
                            checked={formData.check}
                            onChange={handleChange}
                            required
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            {t("He leído y acepto el aviso legal y la política de privacidad")}
                        </label>
                    </div>

                    <div className="flex items-center justify-starts">
                        <Button
                            type="submit"
                            className="btnsubmit btn-custom"
                            label={t("ENVIAR")}
                        />
                    </div>
                </form>
            </div>

            <div id="responseText" className="hidden w-full bg-[#FFF] py-2 text-center text-[18px] text-[#020940] border border-solid border-1 border-[#020940]"></div>
        </div>

    );
}
