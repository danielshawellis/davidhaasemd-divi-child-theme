<?php
/*
  Enqueue parent styles
*/
function divi_child_enqueue_parent_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
}
add_action( 'wp_enqueue_scripts', 'divi_child_enqueue_parent_styles' );


/*
  Child theme custom header
*/

// Add child theme support for menus
add_action( 'after_setup_theme', function() {
  add_theme_support( 'menus' );
} );

// Register child theme menu location
add_action( 'after_setup_theme', function() {
  register_nav_menu( 'child_theme_primary_menu', 'Child Theme Primary Header Menu' );
} );

// Register header scripts and styles
add_action( 'wp_enqueue_scripts', function() {
  // Remove jQuery dependency if unnecessary
  wp_register_script( 'divi-child-theme-custom-header-script', get_stylesheet_directory_uri() . '/assets/js/divi-child-theme-custom-header.js', array('jquery'), '1.0.0', true );
  // wp_register_style( 'divi-child-theme-custom-header-styles', get_stylesheet_directory() . '/assets/css/divi-child-theme-custom-header.css', array(), '1.0.0', 'all' );
} );

// Add shortcode for header template
add_shortcode( 'divi-child-theme-custom-header-main-template', function() {
  // Enque script and style
  wp_enqueue_script( 'divi-child-theme-custom-header-script' );
  // wp_enqueue_style( 'divi-child-theme-custom-header-styles' );

  // Get header tempate
  ob_start();
  get_template_part( 'templates/header-main' );
  return ob_get_clean();
} );
