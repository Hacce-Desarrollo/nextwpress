<?php

// El deploy lo lanzaremos en los siguientes hooks:

// Hook on save posts
add_action( 'save_post', 'automatic_deploy', 10, 3 );

// Hook ACF save options page
add_action( 'acf/options_page/save', 'automatic_deploy', 10, 2 );



// Función para lanzar el deploy
function automatic_deploy( $post_id ) {

    // Estos datos varían en cada proyecto
    $token    = "glptt-2ab75d5604b91a371a5324083d7bd97523c05d0e";                // token único
    $ref      = "develop";                                                       // Rama de git a buildear
    $endpoint = "https://git.hacce.com/api/v4/projects/852/trigger/pipeline";    // endpoint único

    // Para prevenir el refiring (que solo se ejecute 1 vez)
    if( wp_is_post_revision( $post_id) || wp_is_post_autosave( $post_id ) || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
        return;
    }

    $body = array(
        "token" => $token,
        "ref"   => $ref,
    );

    $response = wp_remote_post( $endpoint, array(
        'method'  => 'POST',
        'body'    => $body,
        'timeout' => 45,
    ) );

    if ( is_wp_error( $response ) ) {
        $error_message = $response->get_error_message();

    } else {
        $response_body = wp_remote_retrieve_body( $response );

    }
}

