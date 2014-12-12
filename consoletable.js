javascript: (function(){
  if ( Y.one( '#sqs-site-frame' ) ) {
    Y = Y.one( '#sqs-site-frame' ).getDOMNode().contentWindow.Y;
  }

  var blockClasses = '.html-block, .markdown-block, .quote-block, .image-block, .gallery-block, .video-block, .audio-block, .embed-block, .spacer-block, .horizontalrule-block, .form-block, .newsletter-block,   .map-block, .code-block, .menu-block, .calendar-block, .opentable-block, .tourdates-block, .search-block, .collectionlink-block, .button-block, .summary-v2-block, .tagcloud-block, .postsbytag-block,   .postsbyauthor-block, .postsbycategory-block, .postsbymonth-block, .product-block, .amazon-block, .donation-block, .twitter-block, .foursquare-block, .socialaccountlinks-v2-block, .rss-block, .fivehundredpix-block, .instagram-block, .flickr-block, .soundcloud-block';

  var blocks = {};
  var totalBlocks = 0;
  var tempArrayToSort = [];

  Y.all( blockClasses ).each( function( block ) {
    var matches = block.getAttribute( 'class' ).match( /\S.*?-block/g ).filter( function ( string ) {
      return string.indexOf( 'sqs' ) == -1;
    } );

    if ( !blocks[matches[0]] ) {
      blocks[matches[0]] = {
        type: matches[0],
        count: Y.all( '.' + matches[0] ).size()
      };
    }
  } );

  Y.each( blocks, function ( block ) {
    tempArrayToSort.push( block );
    totalBlocks = totalBlocks + block.count;
  } );

  tempArrayToSort.sort( function ( a, b ) {
    if ( b.count < a.count ) {
      return -1;
    }

    if ( b.count > a.count ) {
      return 1;
    }

    return 0;
  } );

  blocks = {};

  Y.Array.forEach( tempArrayToSort, function ( item ) {
    blocks[ item.type ] = item;
  } );

  console.table( blocks, [ "count" ] );
  console.info( 'Total number of blocks on this page: ' + totalBlocks );
})();
