!function(){var t=document.querySelector("body"),e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]"),o=null;n.disabled=!0,e.addEventListener("click",(function(a){o=setInterval((function(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3),e.disabled=!0,n.removeAttribute("disabled")})),n.addEventListener("click",(function(t){clearInterval(o),n.disabled=!0,e.removeAttribute("disabled")}))}();
//# sourceMappingURL=01-color-switcher.fba6f5fe.js.map
