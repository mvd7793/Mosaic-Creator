
// Called when the Facebook Javascript (FB.init()) is finished loading
function facebookInitComplete()
{
	setupFacebook();
    checkFacebookLogin();
}

// Sets up the facebook listeners for login/logout
function setupFacebook()
{
	FB.Event.subscribe('auth.login', function(response) {
        onUserLogin();
	});

	FB.Event.subscribe('auth.logout', function(response) {
		onUserLogout();
	});
}

// Called after the user has logged in via Facebook
function onUserLogin()
{
    setUserFacebookName();

    showOnLoginItems();
}

// Called after the user has logged out via Facebook
function onUserLogout()
{
    showOnLogoutItems();
}

// Check if facebook is logged in, and do the appropriate actions
function checkFacebookLogin()
{
	// Get the facebook login status
	FB.getLoginStatus(function(response) {

		if(response.status === 'connected')
		{
			// The user is logged in, and has authenticated the app

            onUserLogin();
		}
		else if(response.status === 'not_authorized')
		{
        
			onUserLogout();
			// The user is logged into Facebook, but not authorized for the app
		}
		else
		{
			onUserLogout();
        }

	});
}

// Called when the user clicks logout
function logout()
{
	FB.logout();
}

// Shows login items
function showOnLogoutItems()
{
    $('.onLogoutSlideOut').hide(750);
    $('.onLogoutSlideIn, .onLogoutSlide').show(750);
    $('.onLogoutFadeIn').fadeIn(750);
    $('.onLogoutFadeOut').fadeOut(750);
    $('.onLogoutShow').show(0);
    $('.onLogoutHide').hide(0);
    
    $('.onLoginSlide').hide(0);

}

// Shows login items
function showOnLoginItems()
{
    $('.onLoginSlideOut').hide(750);
    $('.onLoginSlideIn, .onLoginSlide').show(750);
    $('.onLoginFadeIn').fadeIn(750);
    $('.onLoginFadeOut').fadeOut(750);
    $('.onLoginShow').show(0);
    $('.onLoginHide').hide(0);
    
    $('.onLogoutSlide').hide(0);

}

// Sets up the logout box
function setupLogoutBox()
{
    setUserFacebookName();
}

// Sets the facebook names up on the page
function setUserFacebookName()
{
	FB.api('/me', function (response){
		setFacebookName(response.name);
		setFacebookFirstName(response.first_name);
		setFacebookLastName(response.last_name);
		facebookID = response.id;
		setFacebookLinks(response.link);
	});
}

// Makes the profile links link to the user's profile
function setFacebookLinks(link)
{
	$('a.fb-profile-link').attr('href', link);
}

// Sets the user's facebook first name
function setFacebookFirstName(name)
{
	facebookFirstName = name;
	$('.fb-first-name').text(facebookFirstName);
}

// Sets the user's facebook last name
function setFacebookLastName(name)
{
	facebookLastName = name;
	$('.fb-last-name').text(facebookLastName);
}

// Sets the user's facebook name
function setFacebookName(name)
{
	facebookName = name;
	$('.fb-name').text(facebookName);
}
