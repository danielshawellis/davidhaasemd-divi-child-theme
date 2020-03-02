/**
 DEVELOPER NOTES:
 -This script adds and removes the class 'divi-child-theme-custom-header-menu-open' to the header container when the header is open
 -Styles for the mobile menu will override desktop styles when the screen width is below the header's mobile break point
 -Styles for the open mobile menu will override styles for the default closed state when the class 'divi-child-theme-custom-header-menu-open' exists on the header container
*/

let diviChildThemeCustomHeader = {
  openCloseDuration: 600,
  classes: {
    menuOpen: 'divi-child-theme-custom-header-menu-open',
    headerOuterContainer: 'divi-child-theme-custom-header-main-outer-container',
    menuItemsContainer: 'divi-child-theme-custom-header-menu-items',
    logoContainer: 'divi-child-theme-custom-header-logo-container'
  },

  openMenu: function( duration, headerOuterContainer, menuItemsContainer, logoContaniner ) {
    // Animate height of menu items to auto and animate opacity of logo to 0
    jQuery( logoContaniner ).animate( { opacity: 0 }, duration * 1/3, function() {
      jQuery( logoContaniner ).css( 'display', 'none' );
    } );
    jQuery( menuItemsContainer ).css( 'display', 'flex' );
    jQuery( menuItemsContainer ).animateToAuto( 'height', duration, function() {
      jQuery( menuItemsContainer ).css( 'height', 'auto' );
    } );

    // Add open class to container
    jQuery( headerOuterContainer ).addClass( diviChildThemeCustomHeader.classes.menuOpen );
  },

  closeMenu: function( duration, headerOuterContainer, menuItemsContainer, logoContaniner ) {
    // Animate height of menu items to 0 and animate opacity of logo to 1
    jQuery( menuItemsContainer ).animate( { height: 0 }, duration, function() {
      jQuery( menuItemsContainer ).css( 'display', '' );
      jQuery( menuItemsContainer ).css( 'height', '' );
    } );
    setTimeout( function() {
      jQuery( logoContaniner ).css( 'display', '' );
      jQuery( logoContaniner ).animate( { opacity: 1 }, duration * 1/3 );
    }, duration * 2/3 );

    // Remove open class from container
    jQuery( headerOuterContainer ).removeClass( diviChildThemeCustomHeader.classes.menuOpen );
  }
}

// Toggle open state on hamburger button click
jQuery( '.divi-child-theme-custom-header-hamburger-container' ).click( function() {
  let duration = diviChildThemeCustomHeader.openCloseDuration;
  let headerOuterContainer = jQuery( this ).closest( '.' + diviChildThemeCustomHeader.classes.headerOuterContainer )[0];
  let menuItemsContainer = jQuery( headerOuterContainer ).find( '.' + diviChildThemeCustomHeader.classes.menuItemsContainer )[0];
  let logoContaniner = jQuery( headerOuterContainer ).find( '.' + diviChildThemeCustomHeader.classes.logoContainer )[0];

  if ( headerOuterContainer.classList.contains( diviChildThemeCustomHeader.classes.menuOpen ) ) {
    diviChildThemeCustomHeader.closeMenu( duration, headerOuterContainer, menuItemsContainer, logoContaniner );
  } else {
    diviChildThemeCustomHeader.openMenu( duration, headerOuterContainer, menuItemsContainer, logoContaniner );
  }
} );

// jQuery helper function to animate to auto
jQuery.fn.animateToAuto = function(prop, speed, callback){
    var elem, height, width;
    return this.each(function(i, el){
        el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
        height = elem.css("height"),
        width = elem.css("width"),
        elem.remove();

        if(prop === "height")
            el.animate({"height":height}, speed, callback);
        else if(prop === "width")
            el.animate({"width":width}, speed, callback);
        else if(prop === "both")
            el.animate({"width":width,"height":height}, speed, callback);
    });
}
