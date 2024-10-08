<?php

//
// Endpoints forms
//


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

    $request_body = file_get_contents( "php://input" );
    $data = json_decode( $request_body, true );

    if( $data ) {

        $to = get_field( 'email_recipients', 'options' );

        $response = array();

        if( $to ) {

            $subject = $data['subject'] ? $data['subject'] : 'New Information Request Email';
            $message = '
            <div>
                New form:<br><br>
                <b>Name: </b> ' .$data['name']. '<br>
                <b>Surname: </b> ' .$data['surname']. '<br>
                <b>Phone: </b> ' .$data['phone']. '<br>
                <b>Email: </b> ' .$data['email']. '<br>
                <b>Legal check: </b> ' .$data['legalcheck']. '<br>
            </div>
            ';

            $headers = array(
                'Content-Type: text/html; charset=UTF-8',
                'From: ' . get_field( 'email_from', 'options' ),
                'Reply-To: ' . $data['email'],
            );

            $result = wp_mail( $to, $subject, $message, $headers );
            $resultText = $result ? 'The email has been sent successfully.' : 'An error occurred while sending the email.';

            $response = array(
                'resultFormEnviado' => $result,
                'resultText'        => $resultText,
                //'fields' => $data,
            );

        } else {

            $response = array(
                'resultFormEnviado' => false,
                'resultText'        => 'No recipient configured',
                //'fields' => $data,
            );

        }

    } else {

        $response = array(
            'resultFormEnviado' => false,
            'resultText'        => 'No data received',
            //'fields' => $data,
        );

    }

    wp_send_json( $response );

}