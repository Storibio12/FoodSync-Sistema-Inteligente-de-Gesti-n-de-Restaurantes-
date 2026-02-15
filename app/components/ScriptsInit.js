"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScriptsInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !window.$) return;
    const $ = window.$;

    const initSelect2 = () => {
      if ($.fn.select2 && $(".selection-1").length && !$(".selection-1").hasClass("select2-hidden-accessible")) {
        $(".selection-1").select2({
          minimumResultsForSearch: 20,
          dropdownParent: $("#dropDownSelect1"),
        });
      }
    };

    const initDaterangepicker = () => {
      if ($.fn.daterangepicker && $(".my-calendar").length && !$(".my-calendar").data("daterangepicker")) {
        $(".my-calendar").daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          locale: { format: "DD/MM/YYYY" },
        });
      }
    };

    const initParallax = () => {
      if ($.fn.parallax100 && $(".parallax100").length) {
        $(".parallax100").parallax100();
      }
    };

    const t = setTimeout(() => {
      initSelect2();
      initDaterangepicker();
      initParallax();
    }, 100);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
