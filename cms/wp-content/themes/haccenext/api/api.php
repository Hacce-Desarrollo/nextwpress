<?php

//
// Fichero con los endpoints personalizados para las conexiones de NextJS
//



// Función auxiliar que cambia el idioma actual de WPML para que devuelva los datos correctos por la WP API REST
function changeCurrentWPMLLanguage( $lang ){
    do_action( 'wpml_switch_language', $lang );
    add_filter('acf/settings/current_language', 'jnz_acf_set_language');
    function jnz_acf_set_language() {
        return apply_filters( 'wpml_current_language', null );
    }    
}


// POST Envio formulario
//
// [domain]/wp-json/send/form
//
add_action( "rest_api_init", function() {
    register_rest_route( "send", "/form", [
        "methods"  => "POST",
        "callback" => "post_send_form",
    ]);
});

function post_send_form() {

    // Leer el cuerpo de la solicitud y decodificarlo a un array asociativo
    $request_body = file_get_contents( "php://input" );
    $data = json_decode( $request_body, true );

    $to = get_field( 'email_recipients', 'options' );

    $response = array();

    if( $to ) {

        $subject = $data['subject'] ? $data['subject'] : 'Nuevo Email de Solicitud de Información';
        $message = '
        <div>
            Nuevo formulario:<br><br>
            <b>Nombre: </b> ' .$data['name']. '<br>
            <b>Apellidos: </b> ' .$data['apellidos']. '<br>
            <b>Email: </b> ' .$data['email']. '<br>
            <b>Teléfono: </b> ' .$data['phone']. '<br>
            <b>Fecha de Nacimiento: </b> ' .$data['fnacimiento']. '<br>
            <b>País: </b> ' .$data['pais']. '<br>
            <b>Preferencia de contacto: </b> ' .$data['preferencia']. '<br>
        </div>
        ';

        $headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . get_field( 'email_from', 'options' ),
            'Reply-To: ' . $data['email'],
        );

        $result = wp_mail( $to, $subject, $message, $headers );
        $resultText = '';

        if( $result ) {

            $resultText = 'El correo se ha enviado correctamente.';

        } else {

            $resultText = 'Se ha producido un error al enviar el correo electrónico.';

        }

        $response = array(
            'resultFormEnviado' => $result,
            'resultText' => $resultText,
            //'fields' => $data,
        );

    } else {

        $response = array(
            'resultFormEnviado' => false,
            'resultText' => 'No recipient configured',
            //'fields' => $data,
        );

    }

    wp_send_json( $response );
}

add_action( "rest_api_init", function() {
    register_rest_route( "send", "/formcita", [
        "methods"  => "POST",
        "callback" => "post_send_form_cita",
    ]);
});

function post_send_form_cita() {

    // Leer el cuerpo de la solicitud y decodificarlo a un array asociativo
    $request_body = file_get_contents( "php://input" );
    $data = json_decode( $request_body, true );

    $to = get_field( 'email_recipients', 'options' );

    $response = array();

    if( $to ) {

        $subject = $data['subject'] ? $data['subject'] : 'Nuevo Email de Cita';
        $message = '
        <div>
            Nuevo formulario:<br><br>
            <b>Nombre: </b> ' .$data['name']. '<br>
            <b>Apellidos: </b> ' .$data['apellidos']. '<br>
            <b>Email: </b> ' .$data['email']. '<br>
            <b>Teléfono: </b> ' .$data['phone']. '<br>
            <b>Fecha de Nacimiento: </b> ' .$data['fnacimiento']. '<br>
            <b>País: </b> ' .$data['pais']. '<br>
            <b>DNI: </b> ' .$data['dni']. '<br>
            <b>Preferencia de fecha: </b> ' .$data['fcita']. '<br>
            <b>Preferencia de contacto: </b> ' .$data['preferencia']. '<br>
        </div>
        ';

        $headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . get_field( 'email_from', 'options' ),
            'Reply-To: ' . $data['email'],
        );

        $result = wp_mail( $to, $subject, $message, $headers );
        $resultText = '';

        if( $result ) {

            $resultText = 'El correo se ha enviado correctamente.';

        } else {

            $resultText = 'Se ha producido un error al enviar el correo electrónico.';

        }

        $response = array(
            'resultFormEnviado' => $result,
            'resultText' => $resultText,
            //'fields' => $data,
        );

    } else {

        $response = array(
            'resultFormEnviado' => false,
            'resultText' => 'No recipient configured',
            //'fields' => $data,
        );

    }

    wp_send_json( $response );
}

add_action( "rest_api_init", function() {
    register_rest_route( "send", "/formdonacion", [
        "methods"  => "POST",
        "callback" => "post_send_form_donacion",
    ]);
});

function post_send_form_donacion() {

    // Leer el cuerpo de la solicitud y decodificarlo a un array asociativo
    $request_body = file_get_contents( "php://input" );
    $data = json_decode( $request_body, true );

    $to = get_field( 'email_recipients', 'options' );

    $response = array();

    if( $to ) {

        $subject = $data['subject'] ? $data['subject'] : 'Nuevo Email de Donación';
        $message = '
        <div>
            Nuevo formulario:<br><br>
            <b>Nombre: </b> ' .$data['name']. '<br>
            <b>Apellidos: </b> ' .$data['apellidos']. '<br>
            <b>Email: </b> ' .$data['email']. '<br>
            <b>Teléfono: </b> ' .$data['phone']. '<br>
        </div>
        ';

        $headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . get_field( 'email_from', 'options' ),
            'Reply-To: ' . $data['email'],
        );

        $result = wp_mail( $to, $subject, $message, $headers );
        $resultText = '';

        if( $result ) {

            $resultText = 'El correo se ha enviado correctamente.';

        } else {

            $resultText = 'Se ha producido un error al enviar el correo electrónico.';

        }

        $response = array(
            'resultFormEnviado' => $result,
            'resultText' => $resultText,
            //'fields' => $data,
        );

    } else {

        $response = array(
            'resultFormEnviado' => false,
            'resultText' => 'No recipient configured',
            //'fields' => $data,
        );

    }

    wp_send_json( $response );
}