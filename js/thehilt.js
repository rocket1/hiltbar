var _page_names = [ "menu", "cocktails", "map" ];
var _logo_fade_speed = 1500; // ms
var _fade_speed = 900; // ms
var _shrink_speed = 900; // ms
var _hash_interval = 25; // ms
var _hash_interval_obj = null;
var _curr_page = null;
var _map_set = false;

var _map_html = "<iframe width=\"425\" height=\"350\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" src=\"http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=1934+NE+Alberta,+Portland,+OR+97211&amp;sll=45.515911,-122.569804&amp;sspn=0.007413,0.01929&amp;ie=UTF8&amp;ll=45.56797,-122.640896&amp;spn=0.007407,0.01929&amp;z=14&amp;iwloc=A&amp;output=embed\"></iframe><br /><small><a href=\"http://maps.google.com/maps?f=q&amp;source=embed&amp;hl=en&amp;geocode=&amp;q=1934+NE+Alberta,+Portland,+OR+97211&amp;sll=45.515911,-122.569804&amp;sspn=0.007413,0.01929&amp;ie=UTF8&amp;ll=45.56797,-122.640896&amp;spn=0.007407,0.01929&amp;z=14&amp;iwloc=A\" style=\"color:#0000FF;text-align:left; font-family:arial; font-size:10pt\">View Larger Map</a></small>";

function change_image( obj, new_image )
{
    if ( new_image == "" ) { return false; }
    obj.src = new_image;
    return true;
}

function init_biglogo()
{
    $("#logo_big_div").fadeIn(_logo_fade_speed);
    $("#footer").fadeIn(_logo_fade_speed);
    
    $("#menu_big_img").click( function() {
        shrink_big_logo("menu");
    });
    $("#cocktails_big_img").click( function() {
        shrink_big_logo("cocktails");
    });
    $("#map_big_img").click( function() {
        shrink_big_logo("map");
    });
    return true;
}

function thehilt_initnav()
{
    if ( is_legal_hash(_curr_page) ) {
        $("#logo_small_div").fadeIn(_logo_fade_speed);
        show_page(_curr_page);
    }
    else {
        var logo_big = $("#logo_big");
        logo_big.attr("src", "images/logo_big.png").load(init_biglogo);
    }
    return true;
}

function shrink_big_logo(page)
{
    $("#footer").hide();
    $("#logo_big_div").hide();
    
    var logo_static = $("#logo_static");
    logo_static.css("display", "block");

    $(logo_static).animate({
        width: "200px",
        marginTop: "20px"
    }, _shrink_speed, function() {
        $(logo_static).css("display", "none");
        $("#logo_small_div").css("display", "block");
        show_page(page);
    }); 
    return true;
}

function thehilt_init()
{
    _curr_page = get_url_hash();
    hide_all_pages();
    thehilt_initnav();
    set_hash_interval();
    return true;
}

function get_url_hash()
{
    var h = location.hash;
    var h_loc = h.lastIndexOf("#");

    if (h_loc > -1) { // Did we find the hash symbol?
        var hash_i = h_loc + 1; // should be 1
	  if (hash_i != 1) {
            return false;
        }
        return h.substring(hash_i);
    }
    return false;
}

function s(val)
{
    if (val == "") {return false;}
    return "#" + val + "_div";
}

function id_exists(id)
{
    return $(s(id)).length;
}

function is_legal_hash(hash_val)
{
    for (var i = 0; i < _page_names.length; i++) {
        if (hash_val == _page_names[i]) {
            return true;
        }
    }
    return false;
}

function hide_all_pages()
{
    for (var i = 0; i < _page_names.length; i++) {
        hide_page(_page_names[i]);
    }
    return true;
}

function hide_page(pname)
{
    $(s(pname)).hide();
    return true;
}

function show_page(pname)
{
    if (!id_exists(pname)) { return false; }
    $("#footer").hide();
    hide_all_pages();
    $(s(pname)).fadeIn(_fade_speed);
    location.hash = "#" + pname;
    _curr_page = pname;
    
    if (_curr_page == "map" && !_map_set) {
        $("#map_div").html(_map_html);
        _map_set = true;
    }
    $("#footer").show();
    return true;
}

function update_from_hash()
{
    var hval = get_url_hash();
    if (!is_legal_hash(hval)) {
        return false;
    }
    if (_curr_page == hval) { return false; }
    return show_page(hval);
}

function set_hash_interval()
{
    _hash_interval_obj = setInterval( update_from_hash, _hash_interval );
    return true;
}

function clear_hash_interval()
{
    clearInterval(_hash_interval);
    return true;
}

$(document).ready(thehilt_init);

