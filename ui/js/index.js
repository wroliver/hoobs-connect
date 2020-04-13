$(function(){
    const form = $("#connect-form");
    const select = $("#ssid-select");

	let networks = undefined;

	function showHideEnterpriseSettings() {
		const security = $(this).find(":selected").attr("data-security");

		if(security === "enterprise") {
			$("#identity-group").show();
		} else {
			$("#identity-group").hide();
		}
    }
    
    select.formSelect();
	select.change(showHideEnterpriseSettings);

	$.get("/networks", (data) => {
		if(data.length === 0){
			$(".before-submit").hide();
			$("#no-networks-message").removeClass("hidden");
		} else {
            networks = JSON.parse(data);

            const ssids = [];

			$.each(networks, (_index, value) => {
                if (ssids.indexOf(value.ssid) === -1) {
                    select.append(
                        $("<option>").text(value.ssid).attr("value", value.ssid).attr("data-security", value.security)
                    );

                    ssids.push(value.ssid);
                }
			});

			jQuery.proxy(showHideEnterpriseSettings, select)();
		}
	});

	form.submit((event) => {
		event.preventDefault();

		$.post("/connect", form.serialize(), () => {
			$(".before-submit").hide();
			$("#submit-message").removeClass("hidden");
		});
	});
});
