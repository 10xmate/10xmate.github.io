const uri = window.location.href;
const segments = uri.split("/");
const cookiePolicyUrl = segments.includes('bg') ? 'https://10xmate.com/bg/privacy-policy' : 'https://10xmate.com/privacy-policy';
const popupTitle = segments.includes('bg') ? 'Уебсайтът използва бисквитки' : 'This website is using cookies';
const popupText = segments.includes('bg')
  ? 'Използваме бисквитки, за да анализираме данните от употребата на уебсайта. Можете да продължите да разглеждате, получавайки всички бисквитки, които сайтът използва или да промените своите настройки за бисквитки. С продължаване на разглеждането на уебсайта се съгласявате също с нашите <a target="_blank" href="terms-of-use">Общи условия</a> за ползване.'
  : 'We use cookies to analyse the data received for this website use. If you continue without changing your settings, wе’ll assume that you are happy to receive all cookies on this website. If you continue to use the website, we will also assume that you agree with our <a target="_blank" href="terms-of-use">Terms of Use</a>.'
const buttonContinueTitle = segments.includes('bg') ? 'Приемам' : 'Accept';
const buttonLearnmoreTitle = segments.includes('bg') ? 'Още информация' : 'Learn more';

$(document).euCookieLawPopup().init({
  cookiePolicyUrl : cookiePolicyUrl,
  popupPosition : 'bottom',
  colorStyle : 'default',
  compactStyle : false,
  popupTitle : popupTitle,
  popupText : popupText,
  buttonContinueTitle : buttonContinueTitle,
  buttonLearnmoreTitle : buttonLearnmoreTitle,
  buttonLearnmoreOpenInNewWindow : true,
  agreementExpiresInDays : 30,
  autoAcceptCookiePolicy : false,
  htmlMarkup : null
});

window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  function initialiseGoogleAnalytics() {
    gtag('js', new Date());
    gtag('config', 'UA-60444402-4');
  }

  // Subscribe for the cookie consent events
  $(document).bind("user_cookie_already_accepted", function(event, object) {
    initialiseGoogleAnalytics();
  });

  $(document).bind("user_cookie_consent_changed", function(event, object) {
    const userConsentGiven = $(object).attr('consent');
    if (userConsentGiven) {
      // User clicked on enabling cookies. Now it's safe to call the
      // init functions.
      initialiseGoogleAnalytics();
    }
});
