<?php
/**
 * WP WebHook Trigger
 * 
 * @package   wp-webhook-trigger
 * @author    Hacce Soluciones <hacce@hacce.com>
 * @copyright 2021 EG SAP connector
 * @license   Private
 * @link      https://hacce.com
 * 
 * Plugin Name:         WP WebHook Trigger
 * Plugin URI:          https://hacce.com/wp-webhook-trigger
 * Description:         Trigger webhooks with diverse wordpress actions & filters
 * Version:             1.0
 * Requires at least:   6.0
 * Requires PHP:        8.0
 * Author:              Hacce Soluciones TIC
 * Author URI:          https://hacce.com
 * License:             GPLv3
 * Text Domain:         wp-webhook-trigger
 * Domain Path:         /languages
 * Namespace:           WpWebhookTrigger
 */

const WWHT_ROOT_PLUGIN_FILE = __FILE__;

add_action( 'admin_menu', 'plugin_menus' );

function plugin_menus() {
    add_management_page( 'WP WebHook Trigger', 'WebHook Trigger', 'manage_options', 'wpwebhooktrigger', 'admin_tools_page', 'dashicons-rest-api', 6  );
}

function admin_tools_page(){
    ?>
    <div class="wrap">
        <h1><?= __("WP WebHook Trigger",'wp-webhook-trigger'); ?></h1>
        <form method="post" action="options.php">
            
        </form>
    </div>
    <?php
}