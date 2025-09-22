import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function BookingWidget() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "earwaxremoval" });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#7ebf41" },
          dark: { "cal-brand": "#1f7443" },
        },
        hideEventTypeDetails: true,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "scroll" }}>
      <Cal
        namespace="earwaxremoval"
        calLink="clearear2u/earwaxremoval"
        style={{ width: "100%", height: "100%", minHeight: "700px" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
