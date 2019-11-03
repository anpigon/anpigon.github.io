{%- if theme.google_adsense.google_ad_client %}
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "{{ theme.google_adsense.google_ad_client }}",
          enable_page_level_ads: {{ theme.google_adsense.enable_page_level_ads }}
     });
</script>
{%- endif %}