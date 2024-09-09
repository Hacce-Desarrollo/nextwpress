<?php
/**
 * CPTs de Equipo
 *
 * @package omg
 */
function cpt_equipo() {
    $labels = array(
        'name'               => _x( 'Equipo', 'haccenext' ),
        'singular_name'      => _x( 'Persona', 'haccenext' ),
        'menu_name'          => __( 'Equipo', 'haccenext' ),
        'parent_item_colon'  => __( 'Persona padre', 'haccenext' ),
        'all_items'          => __( 'Todos los Equipo', 'haccenext' ),
        'view_item'          => __( 'Ver persona', 'haccenext' ),
        'add_new_item'       => __( 'Añadir persona', 'haccenext' ),
        'add_new'            => __( 'Añadir nueva', 'haccenext' ),
        'edit_item'          => __( 'Editar persona', 'haccenext' ),
        'update_item'        => __( 'Actualizar persona', 'haccenext' ),
        'search_items'       => __( 'Buscar persona', 'haccenext' ),
        'not_found'          => __( 'No encontrado', 'haccenext' ),
        'not_found_in_trash' => __( 'No encontrado en la papelera', 'haccenext' ),
    );

    $args = array(
        'label'               => __( 'Equipo', 'haccenext' ),
        'labels'              => $labels,
        'show_in_rest'        => true,
        'supports'            => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'revisions', 'excerpt' ),
        'hierarchical'        => false,
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'menu_position'       => 16,
        'menu_icon'           => 'dashicons-star-empty"', 
        'can_export'          => true,
        'has_archive'         => false,
        'exclude_from_search' => true,
        'publicly_queryable'  => true,
        'capability_type'     => 'page',
        'query_var'           => true,
        'show_in_graphql'     => true,
        'taxonomies'          => array( 'categoria_equipo' ),
    );

    register_post_type( 'equipo', $args );

}

add_action( 'init', 'cpt_equipo', 0 );

// Registrar una taxonomía personalizada para los equipo
function register_custom_taxonomy_equipo() {
    $labels = array(
        'name'                       => _x( 'Categorías de Equipo', 'taxonomy general name' ),
        'singular_name'              => _x( 'Categoría de Persona', 'taxonomy singular name' ),
        'search_items'               => __( 'Buscar Categorías de Equipo' ),
        'all_items'                  => __( 'Todas las Categorías de Equipo' ),
        'edit_item'                  => __( 'Editar Categoría de Persona' ),
        'update_item'                => __( 'Actualizar Categoría de Persona' ),
        'add_new_item'               => __( 'Añadir Nueva Categoría de Persona' ),
        'new_item_name'              => __( 'Nombre de la Nueva Categoría de Persona' ),
        'menu_name'                  => __( 'Categorías de Equipo' ),
    );

    $args = array(
        'hierarchical'          => true,
        'labels'                => $labels,
        'show_ui'               => true,
        'show_admin_column'     => true,
        'query_var'             => true,
        'rewrite'               => array( 'slug' => 'categoria-equipo' ), // Puedes personalizar el slug aquí
    );

    register_taxonomy( 'categoria_equipo', array( 'equipo' ), $args );
}

add_action( 'init', 'register_custom_taxonomy_equipo', 0 );
