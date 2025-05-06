import Script from 'next/script';

export default function GoogleTag() {
  return (
    <>
      <Script 
        src="https://www.googletagmanager.com/gtag/js?id=G-G5B61LYJNK" 
        strategy="afterInteractive" 
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-G5B61LYJNK', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}