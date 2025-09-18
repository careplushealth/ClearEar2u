/* global SimplybookWidget */
import React, { useEffect, useRef } from 'react';

function BookingWidget() {
    const widgetContainerRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = "//widget.simplybook.it/v2/widget/widget.js";
        script.onload = () => {
            new SimplybookWidget({
              "widget_type":"iframe",
              "url":"https://clearear2u.simplybook.it",
              "theme":"default",
              "theme_settings":{
                "timeline_hide_unavailable":"1",
                "hide_past_days":"0",
                "timeline_show_end_time":"0",
                "timeline_modern_display":"as_slots",
                "sb_base_color":"#7ebf41",
                "booking_nav_bg_color":"#1f7443",
                "body_bg_color":"#f2f2f2",
                "dark_font_color":"#311919",
                "light_font_color":"#f5fcff",
                "btn_color_1":"#1f7443",
                "sb_company_label_color":"#ffffff",
                "hide_img_mode":"1",
                "show_sidebar":"1",
                "sb_busy":"#c7b3b3",
                "sb_available":"#e2eaec"
              },
              "timeline":"modern",
              "datepicker":"top_calendar",
              "is_rtl":false,
              "app_config":{"clear_session":0,"allow_switch_to_ada":0,"predefined":[]},
              "container_id":"sbw_iulowy"
            });
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return <div id="sbw_iulowy" ref={widgetContainerRef}></div>;
}

export default BookingWidget;
